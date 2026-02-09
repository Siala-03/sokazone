import Flutterwave from 'flutterwave-node-v3';

let flw: Flutterwave | null = null;

function getFlutterwaveClient() {
  if (!flw) {
    const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!publicKey || !secretKey) {
      throw new Error('Flutterwave credentials not configured');
    }

    flw = new Flutterwave(publicKey, secretKey);
  }
  return flw;
}

export interface FlutterwavePaymentParams {
  amount: number;
  currency: string;
  email: string;
  phone: string;
  name: string;
  bookingId: string;
  paymentMethod: 'mobilemoneyrwanda' | 'card';
}

export async function initializeFlutterwavePayment(params: FlutterwavePaymentParams) {
  const payload = {
    tx_ref: `SOKA-${params.bookingId}-${Date.now()}`,
    amount: params.amount,
    currency: params.currency,
    redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/confirmation?bookingId=${params.bookingId}`,
    payment_options: params.paymentMethod,
    customer: {
      email: params.email,
      phonenumber: params.phone,
      name: params.name,
    },
    customizations: {
      title: 'Soka Zone Booking Payment',
      description: `Football field booking - ${params.bookingId}`,
      logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    },
    meta: {
      booking_id: params.bookingId,
    },
  };

  try {
    const flwClient = getFlutterwaveClient();
    // Use MobileMoney charge for MoMo, standard payment for cards
    let response;
    if (params.paymentMethod === 'mobilemoneyrwanda') {
      response = await flwClient.MobileMoney.rwanda({
        ...payload,
        fullname: params.name,
      });
    } else {
      // Standard payment link for cards
      response = await flwClient.PaymentLink.create(payload);
    }

    // Handle different response structures
    const paymentUrl = response.data?.link || response.meta?.authorization?.redirect;
    const transactionId = response.data?.id?.toString() || payload.tx_ref;

    if (!paymentUrl) {
      throw new Error('Payment URL not received from Flutterwave');
    }

    return {
      success: true,
      paymentUrl,
      transactionId,
    };
  } catch (error: any) {
    console.error('Flutterwave initialization error:', error);
    return {
      success: false,
      error: error.message || 'Payment initialization failed',
    };
  }
}

export async function verifyFlutterwavePayment(transactionId: string) {
  try {
    const flwClient = getFlutterwaveClient();
    const response = await flwClient.Transaction.verify({ id: transactionId });

    if (response.data.status === 'successful' && response.data.amount >= 0) {
      return {
        success: true,
        verified: true,
        transactionId: response.data.id,
        amount: response.data.amount,
        bookingId: response.data.meta.booking_id,
      };
    }

    return { success: true, verified: false };
  } catch (error: any) {
    console.error('Flutterwave verification error:', error);
    return { success: false, error: error.message };
  }
}

export function verifyFlutterwaveWebhook(signature: string): boolean {
  // Flutterwave sends a simple hash verification
  // The signature should match your secret hash configured in the dashboard
  const secretHash = process.env.FLUTTERWAVE_SECRET_HASH || process.env.FLUTTERWAVE_SECRET_KEY!;
  return signature === secretHash;
}

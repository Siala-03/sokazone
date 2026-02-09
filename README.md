# Soka Zone - Football Pitch Booking Website

A professional football pitch booking platform built with Next.js, featuring real-time availability, interactive calendar booking, and secure authentication.

## 🌟 Features

- **Interactive Booking System** with calendar and time slot selection
- **User Authentication** with JWT and secure password hashing
- **Responsive Design** with custom green and blue color scheme
- **Real-time Availability** checking to prevent double bookings
- **Multi-step Booking Flow** with progress indicators
- **Payment Integration** ready (MoMo & Visa)
- **Professional UI/UX** with smooth animations and transitions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   
   Edit `.env.local` and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sokazone?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
Soka-Zone/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── bookings/     # Booking management
│   │   └── pitches/      # Pitch data
│   ├── auth/             # Login/Signup pages
│   ├── book/             # Booking page
│   ├── pitches/          # Facilities page
│   ├── organizations/    # Organizations page
│   ├── contact/          # Contact page
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/                   # Utility functions
│   ├── auth.ts           # JWT & password hashing
│   └── mongodb.ts        # Database connection
├── models/                # MongoDB models
│   ├── User.ts
│   ├── Pitch.ts
│   └── Booking.ts
└── .env.local            # Environment variables
```

## 🎨 Design System

### Color Palette

- **Primary Green**: `#16a34a` (green-600)
- **Dark Green**: `#15803d` (green-700)
- **Primary Blue**: `#2563eb` (blue-600)
- **Dark Blue**: `#1d4ed8` (blue-700)

### Components

- Custom button styles (primary, secondary, outline)
- Card components with hover effects
- Input fields with focus states
- Responsive navigation with mobile menu

## 🔐 Authentication

- JWT-based authentication
- Bcrypt password hashing
- HTTP-only cookies for security
- 7-day token expiration

## 📅 Booking System

The booking page features:

1. **Pitch Selection**: Choose between 5-a-side or 7-a-side
2. **Date Selection**: Interactive calendar with date validation
3. **Time Slots**: Grid view with pricing and availability
4. **Duration**: Select 1-3 hours
5. **Customer Details**: Name, email, phone, notes
6. **Payment Method**: MoMo or Visa
7. **Confirmation**: Unique booking code generation

## 🗄️ Database Models

### User
- name, email, password (hashed)
- phone, organization
- role (user/admin)

### Pitch
- name, size (5-a-side, 7-a-side)
- basePrice, peakHourPrice
- available, features

### Booking
- customer info, pitch reference
- date, startTime, endTime, duration
- paymentMethod, paymentStatus
- confirmationCode

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Pitches
- `GET /api/pitches` - Get available pitches
- `POST /api/pitches` - Create new pitch (admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings/availability` - Check availability

## 📱 Pages

- **Home** (`/`) - Hero, benefits, who plays, how it works
- **Pitches** (`/pitches`) - Facilities and pitch information
- **Book** (`/book`) - Interactive booking system
- **Organizations** (`/organizations`) - Corporate and group bookings
- **Contact** (`/contact`) - Location and contact details
- **Login** (`/auth/login`) - User authentication
- **Signup** (`/auth/signup`) - User registration

## 🔧 Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Calendar**: react-calendar
- **Date Handling**: date-fns

## 📞 Contact Information

**Soka Zone**  
Sansiro 7 Aside Pitch  
KK102St, Sanitas Kanombe, Kigali

**Email**: sokazone@gmail.com

**Phone**:
- +250 781 623 729
- +250 789 619 991
- +250 787 104 894

## 🚧 Next Steps

1. **MongoDB Setup**: Create MongoDB Atlas cluster and update connection string
2. **Payment Integration**: Integrate Flutterwave (MoMo) and Stripe (Visa)
3. **Email Notifications**: Add booking confirmation emails
4. **Admin Dashboard**: Create admin panel for managing bookings
5. **Google Maps**: Add map integration for location
6. **Deployment**: Deploy to Vercel or similar platform

## 📄 License

Private project for Soka Zone.

## 🤝 Support

For issues or questions, contact the development team or refer to the walkthrough documentation.

---

**Built with Next.js, TypeScript, and Tailwind CSS**

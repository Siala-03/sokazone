import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
    title: 'Soka Zone - Where Good Football Lives',
    description: 'Professional football pitch booking in Kigali. Book 5-a-side and 7-a-side pitches for your team, corporate events, or tournaments.',
    keywords: 'football, soccer, pitch booking, Kigali, Rwanda, 5-a-side, 7-a-side, sports facility',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="flex flex-col min-h-screen">
                <AuthProvider>
                    <Navbar />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}

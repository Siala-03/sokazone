'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }

        if (isProfileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isProfileOpen]);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' });
        setIsProfileOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative w-48 h-16">
                            <Image
                                src="/logo.png"
                                alt="Soka Zone Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/pitches"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                        >
                            Pitches
                        </Link>
                        <Link
                            href="/book"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                        >
                            Book Now
                        </Link>
                        <Link
                            href="/organizations"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                        >
                            Organizations
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                        >
                            Contact
                        </Link>

                        {session?.user ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white text-green-600 flex items-center justify-center font-semibold">
                                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="font-medium">{session.user.name}</span>
                                    <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                                            <p className="text-xs text-gray-500">{session.user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/login" className="btn-primary text-sm animate-pulse-subtle">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/pitches"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pitches
                            </Link>
                            <Link
                                href="/book"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Book Now
                            </Link>
                            <Link
                                href="/organizations"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Organizations
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            {session?.user ? (
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center space-x-3 px-4 py-3 bg-green-50 rounded-lg mb-3">
                                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
                                            {session.user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{session.user.name}</p>
                                            <p className="text-xs text-gray-600">{session.user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="btn-outline text-sm w-full"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="btn-primary text-sm text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

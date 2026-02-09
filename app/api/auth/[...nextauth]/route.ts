import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { comparePassword } from '@/lib/auth';

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please provide email and password');
                }

                await connectDB();
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('Invalid credentials');
                }

                const isValidPassword = await comparePassword(
                    credentials.password,
                    user.password
                );

                if (!isValidPassword) {
                    throw new Error('Invalid credentials');
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    image: null,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/auth/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account?.provider === 'google') {
                token.provider = 'google';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                await connectDB();

                // Check if user exists
                let existingUser = await User.findOne({ email: user.email });

                if (!existingUser) {
                    // Create new user from Google profile
                    existingUser = await User.create({
                        name: user.name,
                        email: user.email,
                        password: '', // No password for OAuth users
                        phone: '', // Can be updated later
                        role: 'user',
                    });
                }
            }
            return true;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

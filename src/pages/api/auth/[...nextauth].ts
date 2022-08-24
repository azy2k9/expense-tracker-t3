import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
        session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/signin',
    },
    providers: [
        CredentialProvider({
            name: 'Credentials',
            credentials: {
                email: { type: 'text', label: 'Email' },
                password: { type: 'password', label: 'Password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                    },
                });

                if (user && credentials?.password) {
                    const isValid = bcrypt.compareSync(
                        credentials.password,
                        user.password
                    );

                    if (isValid) {
                        return user;
                    }
                }

                throw new Error('Invalid username or password');
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export default NextAuth(authOptions);

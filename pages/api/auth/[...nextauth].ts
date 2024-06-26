import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions }  from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

const redirect = process.env.NEXTAUTH_URL ?? "http://trek.cluster-ig3.igpolytech.fr/"

export const authOptions: AuthOptions = {
    
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                } 

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: redirect,
        signOut: redirect,
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
        maxAge: 2 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,

}

export default NextAuth(authOptions)  
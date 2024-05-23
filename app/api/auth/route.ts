import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions }  from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"

// authentication options for NextAuth
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) { // authorize function to check if the user exists in the database
                if (!credentials?.email || !credentials?.password) { // check if the credentials are valid
                    throw new Error("Invalid credentials")
                } 

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user?.hashedPassword) { // check if the user exists in the database
                    throw new Error("Invalid credentials")
                }

                // check if the password is correct using bcrypt 
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

}

export default NextAuth(authOptions)  
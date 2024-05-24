import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession(){
    return await getServerSession(authOptions);
}

// get the user currently logged in
export async function getCurrentUser(){
    try {
        const session = await getSession();
        if (!session?.user?.email){
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: { // Find the user with the email
                email: session.user.email as string,
            },
        });

        if (!currentUser){
            return null;
        }
        return { // Return the user with the createdAt and updatedAt fields as strings
            ...currentUser,
            createdAt : currentUser.createdAt.toISOString(),
            updatedAt : currentUser.updatedAt.toISOString(),
        };
    } catch (error: any) {
        return null;
    }
}

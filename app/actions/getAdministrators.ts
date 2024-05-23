
import prisma from "@/app/libs/prismadb";

// get all the administrators user id from the database
export async function getAdminidtrators(){
    try {
        const admins = await prisma.administrator.findMany();
        const adminsId = [];
        for (let admin of admins) {
            adminsId.push(admin.userId);
        }
        return adminsId;

    }catch (error:any) {
        throw new Error(error);
    }
}
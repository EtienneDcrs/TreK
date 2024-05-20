
import prisma from "@/app/libs/prismadb";
 
export async function getAdminidtrators(){
    try {
        const admins = await prisma.administrator.findMany();
        const adminsId = [];
        for (let admin of admins) {
            adminsId.push(admin.id);
        }
        return adminsId;

    }catch (error:any) {
        throw new Error(error);
    }
}
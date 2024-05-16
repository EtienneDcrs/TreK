import prisma from "@/app/libs/prismadb";

export default async function getPosts() {
    try {
        const posts = await prisma.route.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return posts;
    }catch (error:any) {
        throw new Error(error);
    }


}
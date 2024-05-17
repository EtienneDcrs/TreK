import prisma from "@/app/libs/prismadb";

export default async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safePost = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
        }));
        return safePost;

    }catch (error:any) {
        throw new Error(error);
    }


}
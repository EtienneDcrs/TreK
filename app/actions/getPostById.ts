import prisma from "@/app/libs/prismadb";

interface IParams {
    postId?: string;
}

// Function to get the post by post ID
export default async function getPostById(
    params: IParams
) {
    try {
        const { postId } = params;
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
            },
        });

        if (!post) {
            return null;
        }

        return {
            ...post,
            createdAt: post.createdAt.toISOString(),
            user:{
                ...post.author,
                createdAt: post.author.createdAt.toISOString(),
                updatedAt: post.author.updatedAt.toISOString(),
            }
        };

    }catch (error:any) {
        throw new Error(error);
    }


}
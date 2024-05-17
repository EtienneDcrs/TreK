import prisma from "@/app/libs/prismadb";
import { update } from "firebase/database";

interface IParams {
    postId?: string;
}

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
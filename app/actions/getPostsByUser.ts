import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}

// Function to get the posts by author ID
export default async function getPostsByUser(
    params: IParams
) {
    try {
        const { userId } = params;
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
        });

        return (
            posts
        );

    }catch (error:any) {
        throw new Error(error);
    }


}
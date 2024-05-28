import prisma from "@/app/libs/prismadb";

// Function to get all the posts
export default async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { // sort the posts by createdAt in ascending order
                createdAt: 'asc',
            },
        });

        const safePost = posts.map((post) => ({ // convert the createdAt to string
            ...post,
            createdAt: post.createdAt.toISOString(),
        }));
        return safePost;

    }catch (error:any) {
        throw new Error(error);
    }


}
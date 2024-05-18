import prisma from "@/app/libs/prismadb";

interface IParams {
    postId?: string;
}

export default async function getPolylineById(
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

        const polyline:[number,number][] = [];
        for (let i = 0; i < post.lats.length; i++) {
            polyline.push([post.lats[i], post.lngs[i]]);
        }
        return {
            polyline
        };

    }catch (error:any) {
        throw new Error(error);
    }


}
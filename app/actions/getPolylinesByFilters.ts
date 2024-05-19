import prisma from "@/app/libs/prismadb";

interface IParams {
    category?: string,
    difficulty?: string
}

export default async function getPolylinesByFilters(params: IParams) {
    try {
        
        const { category, difficulty } = params;

        console.log(category);
        console.log(difficulty);

        let posts = await prisma.post.findMany({
            where:{
                category: category,
                difficulty: difficulty
            }
        }
        );
        //console.log(posts);
        const polylines: [number, number][][] = [];
        for (let i = 0; i < posts.length; i++) {
            const polyline: [number, number][] = [];
            for (let j = 0; j < posts[i].lats.length; j++) {
                polyline.push([posts[i].lats[j], posts[i].lngs[j]]);
            }
            polylines.push(polyline);
        }
        return (
            polylines
        );

    } catch (error: any) {
        throw new Error(error);
    }


}
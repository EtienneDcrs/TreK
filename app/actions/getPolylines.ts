import prisma from "@/app/libs/prismadb";

// Function to get all the polylines
export default async function getPolylines() {
    try {
        const posts = await prisma.post.findMany();
        const polylines: [number,number][][] = [];
        for (let post of posts) {
            const polyline :[number, number][]= [];
            for (let i = 0; i < post.lats.length; i++) {
                polyline.push([post.lats[i], post.lngs[i]]);
            }
            polylines.push(polyline);
        }
        return polylines;

    }catch (error:any) {
        throw new Error(error);
    }


}
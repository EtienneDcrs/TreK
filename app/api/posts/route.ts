import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        // revnoie le status 401 Unauthorized
        return new Response(null, {
            status: 401,
        });
    }

    const body = await request.json();
    const {
        title,
        description,
        category,
        difficulty,
        lats,
        lngs,
        elevations,
        length,
    } = body;

    Object.keys(body).forEach((key) => {
        if (!body[key]) {
            NextResponse.error();
        }
    });

    const post = await prisma.post.create({
        data: {
            title,
            description,
            authorId: currentUser.id,
            lats,
            lngs,
            elevations,
            category,
            length,
            difficulty,

        }   
    });

    return NextResponse.json(post);
};
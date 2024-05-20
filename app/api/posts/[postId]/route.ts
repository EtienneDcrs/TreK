import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    postId: string;
}

export async function DELETE (
    request:Request,
    {params}:{params:IParams}
){
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    
    const { postId } = params;

    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid Id");
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true },
    });
    if (currentUser.id !== post?.authorId) {
        return NextResponse.error();
    }

    
    const response = await prisma.post.delete({
        where: { id: postId },
    });

    return NextResponse.json(response);
}


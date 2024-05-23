import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    postId: string;
}

// define the POST and DELETE methods
export async function POST (
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


    let favoriteIds = [...currentUser.favoriteIds || []];
    favoriteIds.push(postId);

    const user = await prisma.user.update({ // update the user favoriteIds
        where: { id: currentUser.id },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
};

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

    let favoriteIds = [...currentUser.favoriteIds || []];
    favoriteIds = favoriteIds.filter((id) => id !== postId);

    const user = await prisma.user.update({ // update the user favoriteIds
        where: { id: currentUser.id },
        data: {
            favoriteIds,
        },
    });

    return NextResponse.json(user);
}


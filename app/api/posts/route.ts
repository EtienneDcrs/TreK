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
    } = body;
}
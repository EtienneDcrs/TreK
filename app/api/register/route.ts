import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
){
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;
    const hashedPassword = await bcrypt.hash(password, 12); // hash the password

    const user = await prisma.user.create({ // create a new user
        data: {
            email,
            name,
            hashedPassword,
            favoriteIds: [],
        },
    });

    return NextResponse.json(user);
}
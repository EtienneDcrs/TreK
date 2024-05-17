import { User, Post } from "@prisma/client";


export type SafePost = Omit<
    Post,
    'createdAt'
    > & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};
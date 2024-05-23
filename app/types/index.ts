import { User, Post } from "@prisma/client";


export type SafePost = Omit<
    Post,
    'createdAt'
    > & {
    createdAt: string;
};

export type SafeUser = Omit<
    User,
    'createdAt' | 'updatedAt'
> & {
    createdAt: string;
    updatedAt: string;
};
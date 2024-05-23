import { PrismaClient } from '@prisma/client'

// Declare global variable to store the PrismaClient instance
declare global {
    var prisma: PrismaClient | undefined 
}

// Create a new PrismaClient instance if it doesn't exist
const client = globalThis.prisma || new PrismaClient()
// Assign the PrismaClient instance to the global variable
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client 

export default client;
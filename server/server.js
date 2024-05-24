// server.js

const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: process.env.WEB_ORIGIN,
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {
    console.log("User connected");
    let restorePosts = await prisma.post.findMany();
    io.emit("restorePosts", restorePosts);

    socket.on("newPost", async (newPost) => {
        try {
            console.log("newPost", newPost);
            await prisma.post.create({
                data: {
                    id: newPost.id,
                    title: newPost.title,
                    description: newPost.description,
                    authorId: newPost.authorId,
                    lats: newPost.lats,
                    lngs: newPost.lngs,
                    elevations: newPost.elevations,
                    category: newPost.category,
                    length: newPost.length,
                    difficulty: newPost.difficulty,
                },
            });

            posts = await prisma.post.findMany();
            io.emit("restorePosts", posts);
        } catch (error) {
            console.error("Error saving Post:", error);
        }
    });

    socket.on("deletePost", async (postId) => {
        try {
            console.log("deletePost", postId);

            if (!postId || typeof postId !== "string") {
                throw new Error("Invalid Id");
            }

            await prisma.Post.delete({
                where: { id: postId },
            });

            const newPosts = await prisma.post.findMany();
            io.emit("restorePosts", newPosts);
        } catch (error) {
            console.error("Error deleting Post:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

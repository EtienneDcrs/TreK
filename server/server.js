// server.js

const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const { rest } = require("lodash");

const prisma = new PrismaClient();
const server = http.createServer();

// ADD cors option to allow cross-origin requests

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {
    console.log("User connected");
    let { user } = socket.handshake.query;
    //socket.join(contentId);
    if (user) user = JSON.parse(user);
    let restorePosts = await prisma.post.findMany();
    //console.log("restorePosts", restorePosts);
    io.emit("restorePosts", restorePosts);

    socket.on("newPost", async (newPost) => {
        try {
            console.log("newPost", newPost);
            // Enregistrer le nouveau Post dans la base de données avec Prisma
            await prisma.Post.create({
                data: {
                    title: newPost.title,
                    description: newPost.description,
                    authorId: user.id,
                    lats: newPost.lats,
                    lngs: newPost.lngs,
                    elevations: newPost.elevations,
                    category: newPost.category,
                    length: newPost.length,
                    difficulty: newPost.difficulty,
                },
            });

            // Envoyer le nouveau Post à tous les clients connectés
            io.emit("newPost", { ...newPost, user });
        } catch (error) {
            console.error("Error saving Post:", error);
        }
    });

    socket.on("deletePost", async (postId) => {
        try {
            console.log("deletePost", postId);
            // Enregistrer le nouveau Post dans la base de données avec Prisma

            if (!postId || typeof postId !== "string") {
                throw new Error("Invalid Id");
            }

            await prisma.Post.delete({
                where: { id: postId },
            });
            const newPosts = await prisma.post.findMany();
            // Envoyer les posts à tous les clients connectés
            io.emit("restorePosts", newPosts);
        } catch (error) {
            console.error("Error deleting Post:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// server.js

const http = require("http");
const { Server } = require("socket.io"); //import server class from socket.io
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient(); //instanciate prisma client
const server = http.createServer();

// Add cors option to allow cross-origin requests
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Manage socket.io connections
io.on("connection", async (socket) => {
    console.log("User connected");
    let restorePosts = await prisma.post.findMany(); //get all posts from database
    io.emit("restorePosts", restorePosts); // send all posts to the client

    socket.on("newPost", async (newPost) => {
        // listen to newPost event
        try {
            console.log("newPost", newPost);
            // save new Post to the database using Prisma
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

            // send all posts to all connected clients
            posts = await prisma.post.findMany();
            io.emit("restorePosts", posts);
        } catch (error) {
            console.error("Error saving Post:", error);
        }
    });

    socket.on("deletePost", async (postId) => {
        // delete post from database
        try {
            console.log("deletePost", postId);

            if (!postId || typeof postId !== "string") {
                throw new Error("Invalid Id");
            }

            await prisma.Post.delete({
                where: { id: postId },
            });

            // uptade posts with the new one
            const newPosts = await prisma.post.findMany();
            // send all posts to all connected clients
            io.emit("restorePosts", newPosts);
        } catch (error) {
            console.error("Error deleting Post:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = window.location.origin;
server.listen(PORT, () => {
    //start server on port 3001
    console.log(`Server running on port ${PORT}`);
});

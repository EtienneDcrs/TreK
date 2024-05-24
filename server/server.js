const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    const io = new Server(server, {
        cors: {
            origin: "*", //process.env.WEB_ORIGIN,
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

    const PORT = 3001; //parseInt(process.env.PORT, 10) || 3000;
    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Server running on port :${PORT}`);
    });
});

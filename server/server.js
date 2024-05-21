const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

app.post("/route", (req, res) => {
    const newPost = req.body;

    // Ajoutez le nouveau post à votre base de données ici
    console.log(req.body);
    // Émettez l'événement 'newPost' avec le nouveau post
    io.emit("newPost", newPost);

    res.json(newPost);
});

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    socket.on("newPost", (post) => {
        io.emit("newPost", post);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});

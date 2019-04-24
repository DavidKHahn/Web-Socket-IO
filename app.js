const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
// call to socketIo() to initialize a new instance by passing in the server object. By doing so we have wired up the ExpressJS server to Socket.IO.
const io = socketIo(server);
/* 
on() method takes two arguments: the name of the event, in this case “connection” and a callback which will be executed after every connection event. on() is nothing more than a core Node.js method tied to the EventEmitter class.
*/
io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});
// The socket is nothing more than the communication channel between the client and the server.
const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "https://api.darksky.net/forecast/01f32ce226abfc6e048f54f3988b6456/43.7695,11.2558"
        );
        socket.emit("FromAPI", res.data.currently.temperature);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
server.listen(port, () => console.log(`Listening on port ${port}`));
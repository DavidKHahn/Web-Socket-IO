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

const getApiAndEmit = "TODO"
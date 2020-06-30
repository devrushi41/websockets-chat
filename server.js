const express = require("express");
const socket = require("socket.io");
const app = express();
const port = 3000;

// static files
app.use(express.static("./public"));

const server = app.listen(port, () =>
  console.log(`Example app listening on port 3000!`)
);
// socket setup
const io = socket(server);

io.on("connection", function (socket) {
  console.log(`${socket.id} made connection`);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});

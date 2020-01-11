var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

app.get("/", function(request, respons) {
  respons.sendFile(__dirname + "/index.html");
});

server.listen(3000);

user = []; // все пользователи
connections = []; // подключенные пользватели

io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log("Успешное подключение");

  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Отключение");
  });

  socket.on("send mess", function(data) {
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: data.name,
      className: data.className
    });
  });
});

const socketIO = require("socket.io");
var users = [];

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    wsEngine: "ws",
    cors: {
      origin: "*",
    },
  });
};

exports.getUser = (id) => users.find((user) => user.id === id);
exports.getById = (id) => users.findIndex((user) => user.id === id)


exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log(`new client is connected ${socket.id} `);
    socket.broadcast.emit("welcome");
    socket.broadcast.emit("onlines", { users });
    socket.emit("onlines", { users });

    socket.on("join", ({username,room},) => {
      users.push({
        id: socket.id,
        username: username,
        room: room,
        online: true,
      });
      socket.join(room)
      socket.broadcast.emit("onlines", { users });
      socket.emit("onlines", { users });
    });

    socket.on('changeRoom',(newroom) => {
      const i = this.getById(socket.id);
      console.log(users[i].room)
      if(newroom){
        const oldroom = users[i].room;
        socket.leave(users[i].room)
        io.to(oldroom).emit('message',{user:'ChatBot',text:`${users[i].username}, ${newroom} odasına geçiş yaptı.`})
        users[i].room = newroom;
        socket.room = newroom;
        socket.join(newroom);
        io.to(newroom).emit("message", { user:'ChatBot',joinedUser:users[i].username,text:`${users[i].username} Odaya Katıldı.`});
      }
    })



    socket.on('sendMessage',(message)=>{
      const user = this.getUser(socket.id);
      io.to(user.room).emit('message',{user:user.username,text:message, date: new Date().getHours('Hh') + ':' + new Date().getMinutes('Mm')})
    })

    
    socket.on("busy", (data) => {
      var i = this.getById(socket.id);
      users[i].online=false;
      socket.broadcast.emit("onlines", { users });
      socket.emit("onlines", { users });
    });

    socket.on("online", (data) => {
      var i = this.getById(socket.id);
      users[i].online=true;
      socket.broadcast.emit("onlines", { users });
      socket.emit("onlines", { users });
    });

    socket.on("disconnect", (data) => {
      var i = this.getById(socket.id);
      if (i !== -1) users.splice(i, 1);
      socket.broadcast.emit("onlines", { users });
      socket.broadcast.emit("takecare");
      console.log(` client is disconnected ${socket.id}`);
    });
  });
};

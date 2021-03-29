let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);

    io.on("message", (message) => {
      // print(message);
    });

    io.on("connection", function (socket) {
      // console.log("Client connected");
      // socket.emit('start', streamRtsp.length);
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      // throw new Error('Socket.io not initialized!');
    }
    return io;
  },
};
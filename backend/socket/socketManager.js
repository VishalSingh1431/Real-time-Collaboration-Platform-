const socketio = require('socket.io');

let io;

const init = (server) => {
  io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join-document', (documentId) => {
      socket.join(documentId);
    });

    socket.on('document-update', (data) => {
      socket.to(data.documentId).emit('document-update', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = { init };
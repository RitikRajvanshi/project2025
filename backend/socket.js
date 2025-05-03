var socketIo = require('socket.io');

let io;

const initializeSocket = (server) => {
    const corsOptions = {
        origin: '*', // Replace with your Angular app URL
        methods: ['GET', 'POST'],
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
      };
  io = socketIo(server,{
    cors:corsOptions
  } );

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIo };

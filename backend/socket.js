import { Server } from "socket.io";

const initSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on('leaveRoom', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room: ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected: ', socket.id);
    });
  });

  return io;
};

export default initSocketIO;

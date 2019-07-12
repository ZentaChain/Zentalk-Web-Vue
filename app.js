const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import 'simplebar';

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`User Connected - Socket ID ${socket.id}`)
  let currentRoom = null

  /** Process a room join request. */
  socket.on('JOIN', (roomName) => {
  let room = io.sockets.adapter.rooms[roomName]
    if (room && room.length > 1) {
      io.to(socket.id).emit('ROOM_FULL', null)
      socket.broadcast.to(roomName).emit('INTRUSION_ATTEMPT', null)
    } else {
      socket.leave(currentRoom)
      socket.broadcast.to(currentRoom).emit('USER_DISCONNECTED', null)
      currentRoom = roomName
      socket.join(currentRoom)
      io.to(socket.id).emit('ROOM_JOINED', currentRoom)
      socket.broadcast.to(currentRoom).emit('NEW_CONNECTION', null)
    }
  });

  socket.on('MESSAGE', (msg) => {
    console.log(`New Message - ${msg.text}`)
    socket.broadcast.to(currentRoom).emit('MESSAGE', msg)
  });

  socket.on('PUBLIC_KEY', (key) => {
    socket.broadcast.to(currentRoom).emit('PUBLIC_KEY', key)
  });

  socket.on('disconnect', () => {
    socket.broadcast.to(currentRoom).emit('USER_DISCONNECTED', null)
  })
});

const port = process.env.PORT || 3030
http.listen(port, () => {
  console.log(`Chat server listening on port ${port}.`)
});

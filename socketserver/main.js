import { Server } from 'socket.io';

const io = new Server(3001, {
  cors: {
    origin: '*',
  },
});

const peopleInRoom = { room1: 0, room2: 0, room3: 0 };
const peopleMap = new Map(entries(peopleInRoom));
//Room names array
const avaliableRooms = Object.keys(peopleInRoom);

const connections = [];

io.on('connection', (socket) => {
  connections.push(socket);

  socket.on('fetchRooms', () => {
    socket.emit('fetchRooms', peopleInRoom);
  });

  socket.on('fetchRoom?', (room) => {
    if (avaliableRooms.includes(room)) {
      const roomData = {
        roomName: room,
        userCount: peopleInRoom[room],
      };

      socket.emit('fetchRoom', roomData);
    }
  });

  socket.on('joinRoom?', (room) => {
    if (avaliableRooms.includes(room)) {
      
      socket.join(room);

      socket.room = room;

      if (peopleInRoom[room]) {
        peopleInRoom[room] += 1;
      } else {
        peopleInRoom[room] = 1;
      }

      //tell everyone in the same room when a new user joins except the user himself (when using broadcast)
      io.to(room).emit('joinedRoom', { user: socket.id, joined: true, room: room });

      io.emit('fetchRooms', peopleInRoom);
    } else {
      socket.emit('roomNotFound', {
        joined: false,
        message: "Room doesn't exist",
      });
    }
  });

  socket.on('roomExists?', (room) => {
    if (avaliableRooms.includes(room)) {
      socket.emit('roomExists', {
        exists: true,
      })
      return;
    }
    socket.emit('roomExists', { exists: false });
  });

  socket.on('createRoom', (room) => {
    if (avaliableRooms.includes(room)) {
      socket.emit('roomCreated', {
        created: false,
        message: `Room '${room}' already exists`,
      });
    } else {
      //Add room
      avaliableRooms.push(room);
      peopleInRoom[room] = 0;

      socket.emit('roomCreated', {
        created: true,
        message: `Created room '${room}'`,
      });
    }
  });

  socket.on('leaveRoom', () => {
    handleLeaveAndDisconnect(socket);
  });

  socket.on('disconnect', () => {
    handleLeaveAndDisconnect(socket)
  });
});

function handleLeaveAndDisconnect(socket) {
  //Check if user has connected to a room
  if (socket.room) {
    peopleInRoom[socket.room] -= 1;
    io.emit('fetchRooms', peopleInRoom);
    //Leave room upon disconnection
    socket.leave(socket.room);
  }
}

//Iterator of key-value pairs
function* entries(obj) {
  for (let key in obj) {
    yield [key, obj[key]];
  }
}

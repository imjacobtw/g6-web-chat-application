const express = require('express');
const https = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = https.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost',
		methods: ["GET", "POST"],
    },
});

const userMap = new Map();
const roomMap = new Map();

function getRoomUsers(room) {
    roomSet = io.sockets.adapter.rooms.get(room);
    const nameSet = new Array();
    if (roomSet !== undefined) {
        const idSet = Array.from(roomSet);
        for (i = 0; i < idSet.length; i++) {
            nameSet.push(userMap.get(idSet[i]));
        }
    }
    return nameSet;
}

function removeRoomIfEmpty(room) {
    if (room.charAt(0) !== '*') {
        //console.log('not a private room');
        return;
    }
    roomSet = io.sockets.adapter.rooms.get(room);
    if (roomSet === undefined) {
        roomMap.delete(room);
    }
    else {
    }
    console.log(roomMap);
}

io.on('connection_error', (err) => {
       console.log('connect error due to ${err.message}'); 
    });

io.on('connection', (socket) => {
    socket.username = 'default name';
    socket.room = '0000000000'
    console.log(`User Connected: ${socket.id} : ${socket.username}`);
    userMap.set(socket.id, socket.username);

    socket.on('leave_room', (data) => {
        console.log('left room: ' + data);
        socket.leave(data);
        
        //update user lists
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' has left',
            sender: '',
            room: '',
            });
        removeRoomIfEmpty(data);
    });

    socket.on('join_room', (data) => {
        console.log('joined room: ' + data);
        socket.room = data;
        socket.join(data);
        
        //update user lists
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' has joined',
            sender: '',
            room: '',
            });
    });

    socket.on('send_global_message', (data) => {
        console.log(socket.username + ' | room: ' + data.room + ' | msg: ' + data.message);
		data.iSent = false;
        socket.to(data.room).emit('receive_global_message', data);
    });
    
    socket.on('join_private_room', (data) => {
        data.room = '*' + data.room;
        console.log('private room: ' + data.room + ' | pass: ' + data.pass);
        const roomSet = io.sockets.adapter.rooms.get(data.room);
		if (roomSet === undefined) {
            roomMap.set(data.room, data.pass);
            console.log('new room');
            socket.emit('enter_private_room',  {
                message: 'Created private room',
                sender: '',
                room: data.room,
                });
        }
        else {
            if (roomMap.get(data.room) === data.pass) {
                console.log('correct password');
                socket.emit('enter_private_room',  {
                    message: 'Joined private room',
                    sender: '',
                    room: data.room,
                });
            }
            else {
                console.log('incorrect password');
                socket.emit('deny_private_room');
                return;
            }
        }
        
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' has left',
            sender: '',
            room: '',
        });
        socket.leave(socket.room);
        removeRoomIfEmpty(socket.room);
        
        console.log('joined room: ' + data.room);
        socket.room = data.room;
        socket.join(data.room);
        
        //update user lists (join)
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' has joined',
            sender: '',
            room: '',
        });
    });
    
    socket.on('set_username', (data) => {
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' set name to ' + data,
            sender: '',
            room: '',
            });
        
        
        console.log(socket.id + ' "' + socket.username + '" set name to "' + data + '"');
        socket.username = data;
        userMap.set(socket.id, data);
        
        //update user lists
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
    });
    
    socket.on('set_username_quiet', (data) => {
        console.log(socket.id + ' "' + socket.username + '" set name to "' + data + '"');
        socket.username = data;
        userMap.set(socket.id, data);
        
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
    });
    
    socket.on('disconnect', () => {
        console.log('User Disconnected: ' + socket.id + ' : ' + socket.username); 
        userMap.delete(socket.id);
       
        io.to(socket.room).emit('recieve_room_users', getRoomUsers(socket.room));
        io.to(socket.room).emit('receive_global_message', {
            message: socket.username + ' has left',
            sender: '',
            room: '',
            });
        removeRoomIfEmpty(socket.room);
    });
});

server.listen(8081, () => {
    console.log("Server started...");
});
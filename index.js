// import express from 'express'
// import server from 'http'
// import cors from 'cors'
// import userFunc from './src/controllers/user'
// import userRoutes from './src/routes/user.routes'
// import './db'
const express = require('express')
// const server = require('http')
const cors = require('cors')
const userRoutes = require('./src/routes/user.routes')
const authRoutes = require('./src/routes/authorization.routes')
const socketAdmin = require('./src/controllers/socketAdmin')
require('./db')

const PORT = 4000;
// const app = express()
// const http = server.Server(app)

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: "*",
}));

app.use(userRoutes);
app.use(authRoutes);


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}`)
// })

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

module.exports = app

io.on("connection", socketAdmin)
// console.log(socketAdmin())

// socketIO.on("connection", (socket) => {
// 	console.log(`⚡: ${socket.id} user just connected!`);

// 	socket.on("createRoom", (name) => {
// 		socket.join(name);
// 		chatRooms.unshift({ id: generateID(), name, messages: [] });
// 		socket.emit("roomsList", chatRooms);
// 	});

// 	socket.on("findRoom", (id) => {
// 		let result = chatRooms.filter((room) => room.id == id);
// 		// console.log(chatRooms);
// 		socket.emit("foundRoom", result[0].messages);
// 		// console.log("Messages Form", result[0].messages);
// 	});

// 	socket.on("newMessage", (data) => {
// 		const { room_id, message, user, timestamp } = data;
// 		let result = chatRooms.filter((room) => room.id == room_id);
// 		const newMessage = {
// 			id: generateID(),
// 			text: message,
// 			user,
// 			time: `${timestamp.hour}:${timestamp.mins}`,
// 		};
// 		console.log("New Message", newMessage);
// 		socket.to(result[0].name).emit("roomMessage", newMessage);
// 		result[0].messages.push(newMessage);

// 		socket.emit("roomsList", chatRooms);
// 		socket.emit("foundRoom", result[0].messages);
// 	});
// 	socket.on("disconnect", () => {
// 		socket.disconnect();
// 		console.log("🔥: A user disconnected");
// 	});
// });

// app.get("/api", (req, res) => {
// 	res.json(chatRooms);
// });

// http.listen(PORT, () => {
// 	console.log(`Server listening on ${PORT}`);
// });

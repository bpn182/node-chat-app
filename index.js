const express = require('express');
const http = require('http');
const path = require('path');
var app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000

const {generateMessage ,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'./public');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log("New User Connected");

	socket.emit('message',generateMessage('Admin','welcome to app'));

	socket.broadcast.emit('message',generateMessage('Admin','New User Joined'));

	socket.on('createMessage',(message,callback)=>{
		io.emit('message',generateMessage(message.from,message.text));
		callback('this is message from server');
	});

	socket.on('createLocationMessage',(coords)=>{
		io.emit('locationmessage',generateLocationMessage('Admin',coords.latitude, coords.longitude))
	})

	socket.on('disconnect',()=>{
	console.log("disconnected from server");
	});
});



server.listen(PORT ,()=>{
	console.log("listening on port "+PORT);

});

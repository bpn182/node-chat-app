const express = require('express');
const http = require('http');
const path = require('path');
var app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 5000;
const moment = require('moment');
var date = moment();
console.log(date.format('h:mm a'));     //show current time 10:00 pm

const {generateMessage ,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname,'./public');
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
	console.log("New User Connected");

	
	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name)|| !isRealString(params.room)){
			callback('Name and room name are required');
			
		}
		socket.join(params.room);
		socket.emit('message',generateMessage('Admin','welcome to app'));

		socket.broadcast.emit(params.join).to('message',generateMessage('Admin',`${params.name} has Joined`));

		socket.on('createMessage',(message,callback)=>{
		io.emit('message',generateMessage(params.name,message.text));
		callback('this is message from server');
	});




		callback();

	})


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

	var socket = io();

	socket.on('connect',function(){
		console.log("connected to server");

	});

	socket.on('disconnect',function(){
		console.log("disconnected from server");
	});

	socket.on('message',function(message){
		console.log('New message',message);
	});
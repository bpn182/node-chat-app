	var socket = io();

	socket.on('connect',function(){
		console.log("connected to server");

	});

	socket.on('disconnect',function(){
		console.log("disconnected from server");
	});

	socket.on('message',function(message){
		console.log('New message',message);

		var li = $('<li></li>')
		li.text(`${message.from}:${message.text}`)
		$('#messages').append(li);
	});

/*	socket.emit('createMessage',{
		from:'Frank',
		text:"somebody"
	},function(data){
		console.log('got it',data);
	});
*/

	$(document).ready(function(){
		$('#message-form').on('submit',function(e){
			e.preventDefault();
			var message = $('[name=message]').val();

			socket.emit('createMessage',{
				from:'User',
				text:message
				
			},function(){

			})
		});
	}); 
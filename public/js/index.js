	var socket = io();

	// For AutoScrolling when message reaches buttom of screen

	function scrollToBottom(){
		//selectors
		var message = $('#messages');
		var newMessage = message.children('li:last-child')
		//heights

		var clientHeight = message.prop('clientHeight');
		var scrollToTop = message.prop('scrollTop');
		var scrollHeight = message.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();

		if(clientHeight + scrollToTop + newMessageHeight + lastMessageHeight >= scrollHeight){
			message.scrollTop(scrollHeight);
		}
	}

	socket.on('connect',function(){
		console.log("connected to server");

	});

	socket.on('disconnect',function(){
		console.log("disconnected from server");
	});

	socket.on('message',function(message){
		console.log(message);
		var time = moment(message.createdAt).format('h:mm a');
		var template = $('#message-template').html();
		var html = Mustache.render(template,{
			text:message.text,
			from:message.from,
			createdAt:time
		});

		
		$('#messages').append(html);
		scrollToBottom();

/*		var li = $('<li></li>')
		li.text(`${message.from}:${time} ${message.text}`)
		$('#messages').append(li);*/
	});

		socket.on('locationmessage',function(message){
		console.log('New message',message);
		var time = moment(message.createdAt).format('h:mm a');
		var template = $('#location-template').html();
		var html = Mustache.render(template,{
			from:message.from,
			createdAt:time,
			location:message.location
		});

		$('#messages').append(html);
		scrollToBottom()

/*		var li = $('<li></li>');
		var a =$('<a target="_blank">My location <img width=3% src="../images/map.png" /></a>');
		a.attr('href',message.location);
		console.log(message.location)
		li.text(`${message.from}:${time} `);
		li.append(a);
		$('#messages').append(li);*/
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
			$('[name=message]').val('');
		});
	}); 

	var locationButton = $('#send-location').click(function(){
		if(!navigator.geolocation){
			return alert('Geolocation not supported by the browser');
		}

		$(this).attr('disabled','disabled').text('sending location....');
		navigator.geolocation.getCurrentPosition(function(position){
			locationButton.removeAttr('disabled','disabled').text('Send location');
			socket.emit('createLocationMessage',{
				latitude:position.coords.latitude,
				longitude:position.coords.longitude
			})
		},function(){
			alert('Unable to fetch location');
		})
	})
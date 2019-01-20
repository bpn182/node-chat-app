var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate message from object',()=>{
		var from = 'Bipin';
		var text = 'some text';
		var message = generateMessage(from,text);

		expect(message.createdAt).toBe('number');
		expect(message).toInclude({from,text});
	});
});
const express = require('express');
const path = require('path');
var app = express();

const publicPath = path.join(__dirname,'./public');
console.log(publicPath);
const port = process.env.port || 3000;

app.use(express.static(publicPath));
app.listen(port,()=>{
	console.log(`istening on port ${port}`);
})

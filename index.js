const express = require('express');
const path = require('path');
var app = express();
const PORT = process.env.PORT || 5000

const publicPath = path.join(__dirname,'./public');
console.log(publicPath);


app.use(express.static(publicPath));

app.listen(PORT);
console.log("listening on port "+PORT);

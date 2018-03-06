var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var loadServer=require("./lib/loadServer");

app.use(express.static('blog'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
// 加载后台模块
loadServer.loadServer(io);

http.listen(3000, function(){
	console.log('listening on *:80');
});


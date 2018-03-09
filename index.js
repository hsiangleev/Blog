var express = require('express');
var app=express();
var http = require('http').Server(app);

// json解析
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 加载后台模块
var loadServer=require("./server/loadServer");
loadServer.loadServer(app);

// vue-router history模式使用
var history = require('connect-history-api-fallback');
app.use(history());

app.use(express.static('blog'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});


http.listen(3000, function(){
	console.log('listening on *:80');
});


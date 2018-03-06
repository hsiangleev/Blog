exports.select=function(io,msg){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/test';    
	 
	var selectData = function(db, callback) {  
		//连接到表  
		var collection = db.collection('blog');
		//查询数据
		if(!msg.sendMsg){
			var whereStr = msg;
		}else{
			var whereStr = msg.whereStr;
		}
		collection.find(whereStr).toArray(function(err, result) {
			if(err)
			{
				console.log('Error:'+ err);
				return;
			}     
			callback(result);
		});
	}
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		// console.log("连接成功！");
		selectData(db, function(result) {
			if(!msg.sendMsg){
				io.emit('chat message', result);
			}else{
				var sendMsg = msg.sendMsg;
				var isResult=false;
				var index=-1;
				result[0].user.forEach((val,index)=>{
					if(sendMsg.name===val.name && sendMsg.pword===val.pword){
						isResult=true;
						index=index;
					}
				})
				// 若密码正确返回1，否则返回-1
				if(isResult){
					io.emit('chat message', {result: "1", index: index});
				}else{
					io.emit('chat message', {result: "-1", index: index});
				}
			}
				
			db.close();
		});
	});
}
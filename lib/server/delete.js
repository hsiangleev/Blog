exports.delete=function(io,msg){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/test';    
	 
	var selectData = function(db, callback) {  
		//连接到表  
		var collection = db.collection('blog');
		var whereStr = {"name":''};
		collection.remove(whereStr, function(err, result) {
			if(err)
			{
				console.log('Error:'+ err);
				return;
			}     
			callback(result);
		});
	}
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		console.log("连接成功！");
		selectData(db, function(result) {
			io.emit('chat message', result);
			db.close();
		});
	});
}
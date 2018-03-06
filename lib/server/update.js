exports.update=function(io,msg){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/test';    
	 
	var selectData = function(db, callback) {  
		//连接到表  
		var collection = db.collection('blog');
		//更新数据
	    var whereStr = msg.whereStr;
	    var updateStr = msg.updateStr;
	    collection.update(whereStr,updateStr,{multi:true}, function(err, result) {
	        if(err)
	        {
	            console.log('Error:'+ err);
	            return;
	        }     
	        callback(result);
	    });
	}
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		// console.log("插入成功！");
		selectData(db, function(result) {
			io.emit('update', result);
			db.close();
		});
	});
}
exports.insert=function (io,msg){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/test';
	 
	var insertData = function(db, callback) {  
	    //连接到表 site
	    var collection = db.collection('blog');
	    // 更新数据
	    console.log(msg);
	    // var whereStr = msg.whereStr;
	    // var updateStr = msg.updateStr;
	    // collection.insert(whereStr,updateStr, function(err, result) { 
	    //     if(err)
	    //     {
	    //         console.log('Error:'+ err);
	    //         return;
	    //     }     
	    //     callback(result);
	    // });
	}
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	    console.log("连接成功！");
	    insertData(db, function(result) {
	        io.emit('chat message', result);
	        db.close();
	    });
	});
}
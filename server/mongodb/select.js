exports.select=function(whereStr,callback){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';    
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		//连接到表  
		var collection = db.collection('blog');
		
		collection.find(whereStr).toArray(function(err, result) {
			if(err)
			{
				console.log('Error:'+ err);
				return;
            }     
            callback(result);
			db.close();
		});
	});
}
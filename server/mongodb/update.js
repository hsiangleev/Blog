exports.update=function(updateMsg,callback){
	var MongoClient = require('mongodb').MongoClient;
	var DB_CONN_STR = 'mongodb://localhost:27017/test';    
	 
	MongoClient.connect(DB_CONN_STR, function(err, db) {
		//连接到表  
		var collection = db.collection('blog');
		
		var whereStr = updateMsg.whereStr;
	    var updateStr = updateMsg.updateStr;
	    collection.update(whereStr,updateStr,{multi:true}, function(err, result) {
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
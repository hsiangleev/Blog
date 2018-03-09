exports.count=function (res){
	var fs = require("fs");
	fs.readFile('./server/data/count.ini', function (err, data) {
		if (err) {
			return console.error(err);
		}

		var count=data;
		count++;
		
		fs.writeFile('./server/data/count.ini', count,  function(err) {
		   if (err) {
		       return console.error(err);
		   }
		   res.send({count: count});
		});
	});
}
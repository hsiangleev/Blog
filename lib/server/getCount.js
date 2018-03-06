exports.count=function (io){
	var fs = require("fs");
	fs.readFile('./lib/data/count.ini', function (err, data) {
		if (err) {
			return console.error(err);
		}

		var count=data;
		count++;
		
		fs.writeFile('./lib/data/count.ini', count,  function(err) {
		   if (err) {
		       return console.error(err);
		   }
		   io.emit('count', count);
		});
	});
}
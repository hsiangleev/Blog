exports.getIp=function (socket,io,msg){
	var fs = require("fs");
	fs.readFile('./lib/data/count.ini', function (err, num) {
		if (err) {
			return console.error(err);
		}

		fs.readFile('./lib/data/ip.ini', function (err, data) {
			if (err) {
				return console.error(err);
			}
			// 获取ip地址
			var address=socket.request.connection.remoteAddress;
			// ip传回前台
			io.emit('address', address);
			// 只有当传回地址时才写入文件
			if(!!msg){
				var count=data+"\r\n"+num+". "+address+"  "+getTime()+"  "+msg;
				
				fs.writeFile('./lib/data/ip.ini', count,  function(err) {
				   if (err) {
				       return console.error(err);
				   }
				});
			}
		});
	});
	// 获取当前时间
	function getTime() {
		let myDate = new Date();//获取系统当前时间
		let date=myDate.getFullYear()+"-"+(Number(myDate.getMonth())+1)+"-"+myDate.getDate();
		let time=setTime(myDate.getHours())+":"+setTime(myDate.getMinutes())+":"+setTime(myDate.getSeconds())
		let str=date+" "+time;
		return str;
	};
	// 设置时间格式
	function setTime(str) {
		if(parseInt(str)>9){
			return str;
		}else{
			return "0"+str
		}
	};
}
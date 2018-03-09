exports.getIp=function (req,res,msg){
	var fs = require("fs");
	fs.readFile('./server/data/count.ini', function (err, num) {
		if (err) {
			return console.error(err);
		}

		fs.readFile('./server/data/ip.ini', function (err, data) {
			if (err) {
				return console.error(err);
			}
			// 获取ip地址
			// var address=socket.request.connection.remoteAddress;
			var address=req.headers['x-forwarded-for'] ||  req.connection.remoteAddress ||  req.socket.remoteAddress ||  req.connection.socket.remoteAddress || ''; 
			// ip传回前台
			res.send({address: address});
			
			// 只有当传回地址时才写入文件
			msg=msg.address;
			if(!!msg){
				var count=data+"\r\n"+num+". "+address+"  "+getTime()+"  "+msg;
				
				fs.writeFile('./server/data/ip.ini', count,  function(err) {
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
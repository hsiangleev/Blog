var select=require("./../mongodb/select");
exports.login=function(io,msg){
    var whereStr=msg.whereStr;
    var sendMsg=msg.sendMsg;
    select.select(io,whereStr,function(result) {
        var isResult=false;
        var index=-1;
        result[0].user.forEach((val,i)=>{
            if(sendMsg.name===val.name && sendMsg.pword===val.pword){
                isResult=true;
                index=i;
            }
        })
        // 若密码正确返回1，否则返回-1
        if(isResult){
            var sendData={
                result: "1", 
                index: index
            }
        }else{
            var sendData={
                result: "-1", 
                index: index
            }
            
        }
        io.emit('login', sendData);
    })
}
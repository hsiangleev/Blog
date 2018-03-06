var select=require("./../mongodb/select");
exports.sign=function(io,msg){
    var whereStr=msg.whereStr;
    var name=msg.sendMsg.name;
    select.select(io,whereStr,function(result) {
        var onOff=true;
        var num=result[0].user.length;
        result[0].user.forEach((val,index)=>{
            if(val.name===name){
                onOff=false;
            }
        })
        var sendData={
            isNoExit: onOff,
            num: num
        }
        io.emit('sign', sendData);
    })
}
var select=require("./../mongodb/select");
exports.login=function(res,msg){
    var whereStr=msg.whereStr;
    var sendMsg=msg.sendMsg;
    select.select(whereStr,function(result) {
        var isResult=false;
        var index=-1;

        var name=Decrypt(Decrypt(sendMsg.name));
        var pword=Decrypt(Decrypt(sendMsg.pword));

        result[0].user.forEach((val,i)=>{
            if(name===val.name && pword===val.pword){
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
        res.send(sendData);
    })
}
// 解密
function Decrypt(str) {
    var len=str.length;
    var decryptStr="";
    for(var i=0;i<len;i++){
        decryptStr+=String.fromCharCode(str.charCodeAt(i)+520);
    }
    return decryptStr;
}
var update=require("./../mongodb/update");
exports.signAddUser=function(res,msg){
    var name=Decrypt(Decrypt(msg.name));
    var pass=Decrypt(Decrypt(msg.pass));
    var num=msg.num;

    var obj={};
    obj["user."+num+".name"] = name;
    obj["user."+num+".pword"] = pass;
    var updateStr = {$set: obj};
    var updateMsg={
        whereStr: {
            _id: "user"
        },
        updateStr: updateStr
    }
    update.update(updateMsg,function(result) {
        res.send(result);
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
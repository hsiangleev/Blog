var update=require("./../mongodb/update");
exports.loginAddSession=function(res,msg){
    var sendMsg=msg.session;
    var sendIndex=msg.index;
    
    var obj={};
    obj["user."+sendIndex+".id"] = sendMsg;
    var updateStr = {$set: obj};
    var updateMsg={
        whereStr: {
            _id: "user"
        },
        updateStr: updateStr
    }
    update.update(updateMsg,function(result) {
        res.send(result)
    })
}
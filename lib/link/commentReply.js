var update=require("./../mongodb/update");
exports.commentReply=function(io,msg){
    // 获取前台发送的数据
    var name=msg.name;
    var time=msg.time;
    var text=msg.text;
    var num=msg.num;
    var len=msg.len;
    var commentLen=msg.commentLen;
    
    // 拼接数据修改数据库
    var obj={
        ["data."+num+".comment."+commentLen+"."+len]: {
            "name": name,
            "time": time,
            "text": text
        }
    };
    let updateStr = {$set: obj};
    var updateMsg={
        whereStr: {
            _id: "blog"
        },
        updateStr: updateStr
    }
    update.update(io,updateMsg,function(result) {
        
        io.emit('comment reply', result);
    })
}
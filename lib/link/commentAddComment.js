var update=require("./../mongodb/update");
exports.commentAddComment=function(io,msg){
    var name=msg.name;
    var time=msg.time;
    var text=msg.text;
    var num=msg.num;
    var len=msg.len;
    
    var obj={
        ["data."+num+".comment."+len]: {
            "name": name,
            "time": time,
            "text": text
        }
    };

    var updateStr = {$push: obj};
    var updateMsg={
        whereStr: {
            _id: "blog"
        },
        updateStr: updateStr
    }
    update.update(io,updateMsg,function(result) {
        
        io.emit('comment addComment', result);
    })
}
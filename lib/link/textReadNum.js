var update=require("./../mongodb/update");
exports.textReadNum=function(io,msg){
    var num=msg.num;
    var readNum=msg.readNum;
    
    var obj={};
    obj["data."+num+".article.num"]=readNum;

    var updateStr = {$set: obj};
    var updateMsg={
        whereStr: {
            _id: "blog"
        },
        updateStr: updateStr
    }
    update.update(io,updateMsg,function(result) {
        
        io.emit('text readNum', result);
    })
}
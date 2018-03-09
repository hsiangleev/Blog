var update=require("./../mongodb/update");
exports.textReadNum=function(res,msg){
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
    update.update(updateMsg,function(result) {
        res.send(result)
    })
}
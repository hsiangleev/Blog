var update=require("./../mongodb/update");
exports.managerChangeNum=function(res,msg){
    // 获取前台发送的数据
    var len=msg.len;
    // 拼接数据修改数据库

    var obj={};
    for(var i=0; i<len;i++){
        obj["data."+i+".num"] = i+1;
    }
    var updateStr = {$set: obj};

    var updateMsg={
        whereStr: {
            _id: "blog"
        },
        updateStr: updateStr
    }
    update.update(updateMsg,function(result) {
        res.send(result);
    })
}
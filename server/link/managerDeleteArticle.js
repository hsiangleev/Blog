var update=require("./../mongodb/update");
exports.managerDeleteArticle=function(res,msg){
    // 获取前台发送的数据
    var num=msg.num;
    // 拼接数据修改数据库
    let obj={
        "data" : {
            "num" : num
        }
    };
    let updateStr = {$pull: obj};
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
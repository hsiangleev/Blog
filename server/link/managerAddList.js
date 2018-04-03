var update=require("./../mongodb/update");
exports.managerAddList=function(res,msg){
    var whereStr={
        _id: "classify"
    };
    var list=msg.list;

    let obj={
        "data" : list
    };
    let updateStr = {$push: obj};

    var updateMsg={
        whereStr: whereStr,
        updateStr: updateStr
    }
    update.update(updateMsg,function(result) {
        res.send(result);
    })
}
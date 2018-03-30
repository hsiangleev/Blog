var update=require("./../mongodb/update");
exports.listDeleteList=function(res,msg){
    var ruleForm=msg.ruleForm;

    ruleForm.forEach(function(val,i) {
        var obj={};
        obj["data."+val] = 1;
        
        let updateStr = {$unset : obj};
        var updateMsg={
            whereStr: {
                _id: "classify"
            },
            updateStr: updateStr
        }
        update.update(updateMsg,function(result) {
            // 直到最后一个变成null, 才开始删除数组
            if(i>=ruleForm.length-1){
                // 先把数组值变为null,再删除数组
                update.update({
                    whereStr: {
                        _id: "classify"
                    },
                    updateStr: {
                        $pull : {
                            ["data"]: null
                        }
                    }
                },function(result) {
                    res.send(result);
                })
            }
        })

    })
}
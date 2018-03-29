var update=require("./../mongodb/update");
exports.commentDelete=function(res,msg){
    var num=msg.num;
    var index=msg.index;
    var comArr=msg.comArr;

    comArr.forEach(function(val,i) {
        var obj={};
        obj["data."+(num-1)+".comment."+index+"."+val] = 1;
        
        let updateStr = {$unset : obj};
        var updateMsg={
            whereStr: {
                _id: "blog"
            },
            updateStr: updateStr
        }
        update.update(updateMsg,function(result) {
            // 直到最后一个变成null, 才开始删除数组
            if(i>=comArr.length-1){
                // 先把数组值变为null,再删除数组
                // 删除二维数组的null
                update.update({
                    whereStr: {
                        _id: "blog"
                    },
                    updateStr: {
                        $pull : {
                            ["data."+(num-1)+".comment."+index]: null
                        }
                    }
                },function(result) {
                    res.send(result);
                })
                // 删除一维数组的null
                update.update({
                    whereStr: {
                        _id: "blog"
                    },
                    updateStr: {
                        $pull : {
                            ["data."+(num-1)+".comment"]: []
                        }
                    }
                },function(result) {})
            }
        })

    })

    // var obj={};
    // obj["data."+(num-1)+".comment."+index] = 1;
    
    // let updateStr = {$unset : obj};
    // var updateMsg={
    //     whereStr: {
    //         _id: "blog"
    //     },
    //     updateStr: updateStr
    // }
    // update.update(updateMsg,function(result) {
    //     // 先把数组值变为null,再删除数组
    //     let u = {$pull : {["data."+(num-1)+".comment"]: null}};
    //     var up={
    //         whereStr: {
    //             _id: "blog"
    //         },
    //         updateStr: u
    //     }
    //     update.update(up,function(result) {
    //         res.send(result);
    //     })

    // })

}
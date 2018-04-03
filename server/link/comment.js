var select=require("./../mongodb/select");
exports.comment=function(res,msg){
    var whereStr={
        _id : "blog"
    };
    var searchNum=msg.searchNum;
    select.select(whereStr,function(result) {
        var data=result[0].data[searchNum.num].comment.reverse();
        
        var sendData={
            data: data
        }
        res.send(sendData)
    })
}
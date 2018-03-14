var select=require("./../mongodb/select");
exports.getClassify=function(res,msg){
    var whereStr=msg.whereStr;
    select.select(whereStr,function(result) {
        var data=result[0].data;
        var sendData={
            data: data,
        }
        res.send(sendData);
    })
}
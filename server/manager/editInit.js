var select=require("./../mongodb/select");
exports.editInit=function(res,msg){
    var whereStr=msg.whereStr;
    var num=msg.num;
    select.select(whereStr,function(result) {
        var data=result[0].data;
        
        var sendData={
            data: data[num],
            len: data.length
        }
        res.send(sendData);
    })
}
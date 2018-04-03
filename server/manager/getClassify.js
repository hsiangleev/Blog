var select=require("./../mongodb/select");
exports.getClassify=function(res,msg){
    var whereStr={
        _id: "classify"
    };
    select.select(whereStr,function(result) {
        var data=result[0].data;
        var sendData={
            data: data,
        }
        res.send(sendData);
    })
}
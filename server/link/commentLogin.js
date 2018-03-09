var select=require("./../mongodb/select");
exports.commentLogin=function(res,msg){
    var whereStr=msg.whereStr;
    var value=msg.value;
    select.select(whereStr,function(result) {
        var name=-1;
        result[0].user.forEach((val,index)=>{
            if(val.id===value.id){
                name=val.name;
            }
        })
        var sendData={
            data: name
        }
        res.send(sendData);
    })
}
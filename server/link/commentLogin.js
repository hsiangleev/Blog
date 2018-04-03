var select=require("./../mongodb/select");
exports.commentLogin=function(res,msg){
    var whereStr={
        _id : "user"
    };
    var value=msg.value;
    var isManager=false;
    select.select(whereStr,function(result) {
        var name=-1;
        result[0].user.forEach((val,index)=>{
            if(val.id===value.id){
                name=val.name;
                isManager=val.role==="M";
            }
        })
        var sendData={
            data: name,
            isManager: isManager
        }
        res.send(sendData);
    })
}
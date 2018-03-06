var select=require("./../mongodb/select");
exports.commentLogin=function(io,msg){
    var whereStr=msg.whereStr;
    var value=msg.value;
    select.select(io,whereStr,function(result) {
        var name=-1;
        result[0].user.forEach((val,index)=>{
            if(val.id===value.id){
                name=val.name;
            }
        })
        var sendData={
            data: name
        }
        io.emit('comment login', sendData);
    })
}
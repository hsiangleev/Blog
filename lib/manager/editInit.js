var select=require("./../mongodb/select");
exports.editInit=function(io,msg){
    var whereStr=msg.whereStr;
    var num=msg.num;
    select.select(io,whereStr,function(result) {
        var data=result[0].data;
        
        var sendData={
            data: data[num],
            len: data.length
        }
        io.emit('edit init', sendData);
    })
}
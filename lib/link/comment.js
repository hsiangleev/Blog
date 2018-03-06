var select=require("./../mongodb/select");
exports.comment=function(io,msg){
    var whereStr=msg.whereStr;
    var searchNum=msg.searchNum;
    select.select(io,whereStr,function(result) {
        var data=result[0].data[searchNum.num].comment.reverse();
        
        var sendData={
            data: data
        }
        io.emit('comment', sendData);
    })
}
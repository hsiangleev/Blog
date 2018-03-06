var select=require("./../mongodb/select");
exports.text=function(io,msg){
    var whereStr=msg.whereStr;
    var searchNum=msg.searchNum;
    select.select(io,whereStr,function(result) {
        var total=result[0].data.length;
        if(searchNum.num>total){
            var data=-1;
        }else{
            var data=result[0].data[searchNum.num];
        }
        
        var sendData={
            data: data,
            article: data.article
        }
        io.emit('text', sendData);
    })
}
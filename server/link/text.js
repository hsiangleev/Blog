var select=require("./../mongodb/select");
exports.text=function(res,msg){
    var whereStr=msg.whereStr;
    var searchNum=msg.searchNum;
    select.select(whereStr,function(result) {
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
        res.send(sendData);
    })
}
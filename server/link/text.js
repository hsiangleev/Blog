var select=require("./../mongodb/select");
exports.text=function(res,msg){
    var whereStr={
        _id: "blog"
    };
    var searchNum=msg.searchNum;
    select.select(whereStr,function(result) {
        var total=result[0].data.length;
        var num=parseInt(searchNum.num);
        // 404判断
        if(num>total-1 || num<0 || (num).toString()==="NaN"){
            var data=-1;
            var sendData={
                data: data
            }
        }else{
            var data=result[0].data[searchNum.num];
            var sendData={
                data: data,
                article: data.article
            }
        }
        res.send(sendData);
    })
}
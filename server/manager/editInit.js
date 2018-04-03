var select=require("./../mongodb/select");
exports.editInit=function(res,msg){
    var whereStr={
        _id: "blog"
    };
    var num=msg.num;
    select.select(whereStr,function(result) {
        var total=result[0].data.length;
        var data=result[0].data;

        num=parseInt(num);
        // 判断404
        if(num>total-1 || num<-1 || (num).toString()==="NaN"){
            var data=-1;
            var sendData={
                data: data
            }
        }else{
            var sendData={
                data: data[num],
                len: data.length
            }
        }
        res.send(sendData);
    })
}
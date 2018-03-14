var select=require("./../mongodb/select");
exports.getTypeLen=function(res,msg){
    var whereStr=msg.whereStr;
    select.select(whereStr,function(result) {
        var data=result[0].data;
        var typeObj={};
        data.forEach(function(val,index) {
            if(!(val.type in typeObj)){
                typeObj[val.type]=1;
            }else{
                typeObj[val.type]++;
            }
        })
        res.send(typeObj);
    })
}
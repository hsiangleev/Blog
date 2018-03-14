var select=require("./../mongodb/select");
exports.timeaxis=function(res,msg){
    var whereStr=msg.whereStr;
    var type=msg.type;
    select.select(whereStr,function(result) {
        var data=result[0].data.reverse();
        
        var tableData=[];
        if(type==="all"){
            // 取出所有的
            for(let i=0;i<data.length;i++){
                tableData.push({
                    title: '',
                    time: "",
                    num: 0,
                    type: 0,
                });
            }
            tableData.forEach((val,i)=>{
                val.title=data[i].article.title;
                val.time=data[i].article.time;
                val.num=data[i].num;
                val.type=data[i].type;
            })
        }else{
            // 只取出type类型的
            for(let i=0;i<data.length;i++){
                if(data[i].type===type){
                    tableData.push({
                        title: '',
                        time: "",
                        num: 0,
                        index: i,
                        type: 0,
                    });
                }
            }
            tableData.forEach((val,i)=>{
                val.title=data[val["index"]].article.title;
                val.time=data[val["index"]].article.time;
                val.num=data[val["index"]].num;
                val.type=data[val["index"]].type;
            })
        }
        var sendData={
            data: tableData
        }
        res.send(sendData);
    })
}
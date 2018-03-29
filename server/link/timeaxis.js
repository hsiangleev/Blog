var select=require("./../mongodb/select");
exports.timeaxis=function(res,msg){
    // 判断是否是搜索
    if(msg.search){
        var whereStr=msg.whereStr;
        var searchStr=msg.searchStr;
        var tableData=[];
        select.select(whereStr,function(result) {
            var data=result[0].data;
            data.forEach(function(val,index) {
                var searchTitle=val.article.title.indexOf(searchStr);       // 从title中查找
                var searchIndex=val.article.header.indexOf(searchStr);      // 从header中查找
                if(searchTitle!=-1 || searchIndex!=-1){
                    tableData.push({
                        index: index,
                        title: '',
                        time: "",
                        num: 0,
                        type: 0,
                    });
                }
            })
            tableData.forEach((val,i)=>{
                val.title=data[val.index].article.title;
                val.time=data[val.index].article.time;
                val.num=data[val.index].num;
                val.type=data[val.index].type;
            })
            var sendData={
                data: tableData.reverse()
            }
            res.send(sendData);
        });
            
        return;
    }
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
var select=require("./../mongodb/select");
exports.timeaxis=function(res,msg){
    var whereStr=msg.whereStr;
    select.select(whereStr,function(result) {
        var data=result[0].data.reverse();
        
        var tableData=[];
        for(let i=0;i<data.length;i++){
        	tableData.push({
        		title: '',
        		time: "",
        		num: 0,
        	});
        }
        tableData.forEach((val,index)=>{
        	val.title=data[index].article.title;
        	val.time=data[index].article.time;
        	val.num=data[index].num;
        })

        var sendData={
            data: tableData
        }
        res.send(sendData);
    })
}
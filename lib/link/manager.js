var select=require("./../mongodb/select");
exports.manager=function(io,msg){
    var whereStr=msg.whereStr;
    select.select(io,whereStr,function(result) {
        var data=result[0].data.reverse();
        
        var tableData=[];
        for(let i=0;i<data.length;i++){
        	tableData.push({
        		title: '',
        		time: "",
        		commit: '',
        		read: '',
        		num: 0,
        	});
        }
        tableData.forEach((val,index)=>{
        	val.title=data[index].article.title;
        	val.time=data[index].article.time;
        	val.commit=data[index].comment.length;
        	val.read=data[index].article.num;
        	val.num=data[index].num;
        })

        var sendData={
            data: tableData
        }
        io.emit('manager', sendData);
    })
}
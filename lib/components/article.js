var select=require("./../mongodb/select");
exports.article=function(io,msg){
    var whereStr=msg.whereStr;
    var page=msg.page;
    select.select(io,whereStr,function(result) {
        var star=(page.currentPage-1)*page.pageSize
        var end=page.currentPage*page.pageSize
        // 分页返回
        var data=result[0].data.reverse().slice(star, end);
        var total=result[0].data.length;
        var sendData={
            data: data,
            total: total
        }
        io.emit('article', sendData);
    })
}
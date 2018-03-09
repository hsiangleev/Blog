var update=require("./../mongodb/update");
exports.editArticle=function(res,msg){
    var isEdit=msg.isEdit;

    var type=msg.type;
    var title=msg.title;
    var header=msg.header;
    var ellipsis=msg.ellipsis;
    var text=msg.text;
    var origin=msg.origin;
    var num=msg.num;
    var articleLength=msg.articleLength;
    var time=msg.time;
    

    if(isEdit){
        // 编辑状态（修改部分）
        var obj={};
        obj["data."+num+".type"]=type;
        obj["data."+num+".article.title"]=title;
        obj["data."+num+".article.header"]=header;
        obj["data."+num+".article.ellipsis"]=ellipsis;
        obj["data."+num+".article.text"]=text;
        obj["data."+num+".article.origin"]=origin;
    }else{
        // 新增状态
        var obj={
            ["data."+articleLength+".num"]: articleLength+1,
            ["data."+articleLength+".type"]: type,
            ["data."+articleLength+".article"]: {
                title: title,
                header: header,
                ellipsis: ellipsis,
                text: text,
                origin: origin,
                time: time,
                num: 0
            },
            ["data."+articleLength+".comment"]: []
        };
    }
    
    let updateStr = {$set: obj};

    var updateMsg={
        whereStr: {
            _id: "blog"
        },
        updateStr: updateStr
    }
    update.update(updateMsg,function(result) {
        res.send(result);
    })
}
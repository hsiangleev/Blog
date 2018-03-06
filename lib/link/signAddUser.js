var update=require("./../mongodb/update");
exports.signAddUser=function(io,msg){
    var name=msg.name;
    var pass=msg.pass;
    var num=msg.num;

    var obj={};
    obj["user."+num+".name"] = name;
    obj["user."+num+".pword"] = pass;
    var updateStr = {$set: obj};
    var updateMsg={
        whereStr: {
            _id: "user"
        },
        updateStr: updateStr
    }
    update.update(io,updateMsg,function(result) {
        io.emit('sign addUser', result);
    })
}
var count=require("./server/getCount");
var ip=require("./server/getIp");

var article=require("./components/article");
var text=require("./link/text");
var textReadNum=require("./link/textReadNum");
var comment=require("./link/comment");
var commentLogin=require("./link/commentLogin");
var login=require("./link/login");
var loginAddSession=require("./link/loginAddSession");
var sign=require("./link/sign");
var signAddUser=require("./link/signAddUser");
var commentAddComment=require("./link/commentAddComment");
var commentReply=require("./link/commentReply");

var timeaxis=require("./link/timeaxis");

var manager=require("./link/manager");
var managerDeleteArticle=require("./link/managerDeleteArticle");
var managerChangeNum=require("./link/managerChangeNum");

var editInit=require("./manager/editInit");
var editArticle=require("./manager/editArticle");

exports.loadServer=function(io){
    io.on('connection', function(socket){
        // 获取访问次数
        socket.on('count', function(){
            count.count(io);
        });
        // 获取ip地址
        socket.on('address', function(msg){
            ip.getIp(socket,io,msg);
        });
        // 主页获取文章内容
        socket.on('article', function(msg){
            article.article(io,msg);
        });
        // 获取每一篇文章
        socket.on('text', function(msg){
            text.text(io,msg);
        });
        // 更新文章阅读次数
        socket.on('text readNum', function(msg){
            textReadNum.textReadNum(io,msg);
        });
        // 获取评论
        socket.on('comment', function(msg){
            comment.comment(io,msg);
        });
        // 评论列表验证是否登陆
        socket.on('comment login', function(msg){
            commentLogin.commentLogin(io,msg);
        });
        // 登陆
        socket.on('login', function(msg){
            login.login(io,msg);
        });
        // 重新登陆时随机生成字符写入数据库和sessionStore
        socket.on('login addSession', function(msg){
            loginAddSession.loginAddSession(io,msg);
        });
        // 判断用户名是否注册
        socket.on('sign', function(msg){
            sign.sign(io,msg);
        });
        // 注册用户名
        socket.on('sign addUser', function(msg){
            signAddUser.signAddUser(io,msg);
        });
        // 添加评论
        socket.on('comment addComment', function(msg){
            commentAddComment.commentAddComment(io,msg);
        });
        // 回复评论
        socket.on('comment reply', function(msg){
            commentReply.commentReply(io,msg);
        });
        // 时间轴
        socket.on('timeaxis', function(msg){
            timeaxis.timeaxis(io,msg);
        });
        // 后台管理
        socket.on('manager', function(msg){
            manager.manager(io,msg);
        });
        // 后台删除文章
        socket.on('manager deleteArticle', function(msg){
            managerDeleteArticle.managerDeleteArticle(io,msg);
        });
        // 后台删除文章(重新修改文章序号)
        socket.on('manager changeNum', function(msg){
            managerChangeNum.managerChangeNum(io,msg);
        });
        // 编辑文章初始化内容
        socket.on('edit init', function(msg){
            editInit.editInit(io,msg);
        });
        // 编辑文章(增加文章)
        socket.on('edit article', function(msg){
            editArticle.editArticle(io,msg);
        });

    });
}
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
var commentDelete=require("./link/commentDelete");

var timeaxis=require("./link/timeaxis");

var manager=require("./link/manager");
var managerDeleteArticle=require("./link/managerDeleteArticle");
var managerChangeNum=require("./link/managerChangeNum");

var editInit=require("./manager/editInit");
var editArticle=require("./manager/editArticle");
var getClassify=require("./manager/getClassify");
var getTypeLen=require("./manager/getTypeLen");
var managerAddList=require("./link/managerAddList");
exports.loadServer=function(app){
    app.post('/count', function(req, res){
        count.count(res);
    });
    app.post('/address', function(req, res){
        ip.getIp(req,res,req.body);
    });
    app.post('/article', function(req, res){
        article.article(res,req.body);
    });
    app.post('/text', function(req, res){
        text.text(res,req.body);
    });
    app.post('/textReadNum', function(req, res){
        textReadNum.textReadNum(res,req.body);
    });
    app.post('/comment', function(req, res){
        comment.comment(res,req.body);
    });
    app.post('/commentLogin', function(req, res){
        commentLogin.commentLogin(res,req.body);
    });
    app.post('/login', function(req, res){
        login.login(res,req.body);
    });
    app.post('/loginAddSession', function(req, res){
        loginAddSession.loginAddSession(res,req.body);
    });

    app.post('/sign', function(req, res){
        sign.sign(res,req.body);
    });
    app.post('/signAddUser', function(req, res){
        signAddUser.signAddUser(res,req.body);
    });
    app.post('/commentAddComment', function(req, res){
        commentAddComment.commentAddComment(res,req.body);
    });
    app.post('/commentReply', function(req, res){
        commentReply.commentReply(res,req.body);
    });
    app.post('/commentDelete', function(req, res){
        commentDelete.commentDelete(res,req.body);
    });
    app.post('/timeaxis', function(req, res){
        timeaxis.timeaxis(res,req.body);
    });
    app.post('/manager', function(req, res){
        manager.manager(res,req.body);
    });
    app.post('/managerDeleteArticle', function(req, res){
        managerDeleteArticle.managerDeleteArticle(res,req.body);
    });
    app.post('/managerChangeNum', function(req, res){
        managerChangeNum.managerChangeNum(res,req.body);
    });
    app.post('/editInit', function(req, res){
        editInit.editInit(res,req.body);
    });
    app.post('/editArticle', function(req, res){
        editArticle.editArticle(res,req.body);
    });
    // 获取分类信息
    app.post('/getClassify', function(req, res){
        getClassify.getClassify(res,req.body);
    });
    // 获取每条分类信息长度
    app.post('/getTypeLen', function(req, res){
        getTypeLen.getTypeLen(res,req.body);
    });
    // 添加分类
    app.post('/managerAddList', function(req, res){
        managerAddList.managerAddList(res,req.body);
    });
}
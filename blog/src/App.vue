<template>
	<div id="app">
		<lee-header></lee-header>
		<lee-content></lee-content>
		<lee-aside></lee-aside>
		<lee-icon></lee-icon>
		<lee-to-top></lee-to-top>
		<lee-loading></lee-loading>
		<lee-login></lee-login>
	</div>
</template>

<script>
import axios from "axios";
import jsonp from "jsonp"
import leeHeader from "./assets/components/lee-header.vue"
import leeContent from "./assets/components/lee-content.vue"
import leeAside from "./assets/components/lee-aside.vue"
import leeIcon from "./assets/components/lee-icon.vue"
import leeToTop from "./assets/components/lee-to-top.vue"
import leeLoading from "./assets/components/lee-loading.vue"
import leeLogin from "./assets/link/lee-login.vue"

// const leeHeader = () => import('./assets/components/lee-header.vue');
// const leeContent = () => import('./assets/components/lee-content.vue');
// const leeAside = () => import('./assets/components/lee-aside.vue');
// const leeIcon = () => import('./assets/components/lee-icon.vue');
// const leeToTop = () => import('./assets/components/lee-to-top.vue');
// const leeLoading = () => import('./assets/components/lee-loading.vue');

export default {
	name: 'app',
	data () {
		return {
			
		}
	},
	components: {
		leeAside,
		leeHeader,
		leeContent,
		leeIcon,
		leeToTop,
		leeLoading,
		leeLogin
	},
	mounted() {
		this.initCount();
		this.getClassify();
		// 调用vuex中的方法获取name
		this.$store.getters.getPower(this.init);
	},
	methods: {
		// 页面访问次数
		initCount() {
			axios({
				method: 'post',
				url: '/count',
			})
			.then((res)=>{
				this.$store.state.count=res.data.count;
				this.getAddress();
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		// 判断是否登录
		init(name) {
			// 若name为-，则说明已经在另一个窗口登陆，清空当前窗口登陆信息
			if(name!=="-"){
				// 若为管理员登陆则显示管理链接
				if(this.$store.state.isManager){
					this.$store.state.isShowManager=true;
				}else{
					this.$store.state.isShowManager=false;
				}
			}else{
				// 退出登录
				sessionStorage.removeItem("id");
				this.$store.state.loginSuccess=false;
				// 隐藏管理链接
				this.$store.state.isShowManager=false;
				this.$message({
					message: '您已在另一个窗口登陆',
					center: true,
					duration: 3000,
					type: "warning"
				});
			}
		},
		getAddress() {
			axios({
				method: 'post',
				url: '/address',
			})
			.then((res)=>{
				var ip=res.data.address.slice(7);
				jsonp('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=2CxmmAAmLukVgX3bA7CUGpe7XaS2lE14&coor=bd09ll&callback=flightHandler', null, function (err, data) {
					if (err) {
						console.error(err.message);
					} else {
						if(data.status==0){
							// 地址传回后台
							axios({
								method: 'post',
								url: '/address',
								data: {
									address: data.address
								}
							})
							.then((res)=>{
								
							})
							.catch((error)=>{
								console.log(error);
							});
						}else{
							// 地址传回后台
							axios({
								method: 'post',
								url: '/address',
								data: {
									address: data.message
								}
							})
							.then((res)=>{
								
							})
							.catch((error)=>{
								console.log(error);
							});
						}
					}
				});
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		// 获取分类长度
		getClassify() {
			this.$store.state.loading=true;
			axios({
				method: 'post',
				url: '/getClassify',
				data: {}
			})
			.then((res)=>{
				this.$store.state.ListLength=res.data.data.length;
				this.$store.state.loading=false;
			})
			.catch((error)=>{
				console.log(error);
			});
		},
	}
}
</script>

<style lang="scss">
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}
.clearfix:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.clearfix {
  zoom: 1;
}
::selection {
    background:#333; 
    color:#fff;
}
.text-right{
	text-align: right;
}
@media only screen and (max-width: 767px) {
	.el-message-box{
		width: auto;
	}
}
	

</style>

<template>
	<div id="app">
		<lee-header></lee-header>
		<lee-content></lee-content>
		<lee-aside></lee-aside>
		<lee-icon></lee-icon>
		<lee-to-top></lee-to-top>
		<lee-loading></lee-loading>
		
	</div>
</template>

<script>
import jsonp from "jsonp"
import io from "./socket.io.js"
import leeHeader from "./assets/components/lee-header.vue"
import leeContent from "./assets/components/lee-content.vue"
import leeAside from "./assets/components/lee-aside.vue"
import leeIcon from "./assets/components/lee-icon.vue"
import leeToTop from "./assets/components/lee-to-top.vue"
import leeLoading from "./assets/components/lee-loading.vue"

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
		leeLoading
	},
	mounted() {
		this.init();
	},
	methods: {
		// 页面访问次数
		init() {
			let socket = io();
			socket.emit('count');
			socket.on('count', (data)=>{
				this.$store.state.count=data;
				socket.off("count");

				this.getAddress();

			});
		},
		getAddress() {
			let socket = io();
			socket.emit('address');
			socket.on('address', (ip)=>{
				ip=ip.slice(7);
				jsonp('http://api.map.baidu.com/location/ip?ip='+ip+'&ak=2CxmmAAmLukVgX3bA7CUGpe7XaS2lE14&coor=bd09ll&callback=flightHandler', null, function (err, data) {
					if (err) {
						console.error(err.message);
					} else {
						if(data.status==0){
							// 地址传回后台
							socket.emit('address',data.address);
						}else{
							socket.emit('address',data.message);
						}
					}
				});
				socket.off("address");
			});
		}
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


</style>

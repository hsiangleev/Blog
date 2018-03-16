<template>
	<div id="header" :style="addAnimate">
		<el-row >
			<el-col :xs="24" :sm="8">
				<div class="header-logo">
					<a href="javascript:;" title="" @click="refresh">
						<transition name="bounce" appear>
							<span class="hidden-xs-only"></span>
						</transition>
						
						<transition name="logo" appear v-on:after-enter="afterEnter">
							<span :style="{opacity: navOpa}">hsianglee</span>
						</transition>
						
						<span class="hidden-xs-only"></span>
						<transition name="bounce" appear>
							<span class="hidden-xs-only"></span>
						</transition>
					</a>
					<div class="icon hidden-sm-and-up" @click="isShowNav=!isShowNav">
						<span v-for="val in 3"></span>
					</div>
				</div>
			</el-col>
			<el-col :xs="24" :sm="16">
				<!-- 电脑端 -->
				<div class="nav" v-if="!this.isPhone">
					<ul class="clearfix ">
						<li v-for="(val,index) in nav">
							<router-link :to="val.address">
								<i :class="val.fontClass"></i>
								{{ val.text }}
							</router-link>
						</li>
						<li v-if="isShowManager">
							<router-link to="/manager">
								<i class="fa fa-tags"></i>
								管理
							</router-link>
						</li>
					</ul>
				</div>
				<!-- 手机端 -->
				<transition name="nav">
					<div class="nav" v-if="phone">
						<ul class="clearfix ">
							<li v-for="val in nav">
								<router-link :to="val.address">
									<i :class="val.fontClass"></i>
									{{ val.text }}
								</router-link>
							</li>
							<li v-if="isShowManager">
								<router-link to="/manager">
									<i class="fa fa-tags"></i>
									管理
								</router-link>
							</li>
						</ul>
					</div>
				</transition>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	name: 'lee-header',
	data () {
		return {
			nav: [
				{
					text: "首页",
					fontClass: "fa fa-home",
					address: "/"
				},
				{
					text: "分类",
					fontClass: "fa fa-th-list",
					address: "/list"
				},
				{
					text: "时间轴",
					fontClass: "fa fa-archive",
					address: "/timeaxis/all"
				},
				{
					text: "关于",
					fontClass: "fa fa-user",
					address: "/about"
				},
			],
			isShowNav: false,		// 是否下拉导航
			isPhone: false,			// 是否是手机模式
			navOpa: 0,				// 渐变初始透明度
			addAnimate: {			// 头部整体右移动画
				animation: "none"
			}
		}
	},
	mounted() {
		this.init();
	},
	computed: {
		// 获取vuex中数据，判断是否点击向右按钮
		isShowAside() {
			return this.$store.state.isShowAside;
		},
		// 是否显示手机模式的下拉导航
		phone() {
			return this.isPhone && this.isShowNav;
		},
		isShowManager() {
			return this.$store.state.isShowManager;
		}
	},
	watch: {
		// 头部整体右移动画
		isShowAside(value) {
			if(value){
				this.addAnimate.animation="header-in .5s";
			}else{
				this.addAnimate.animation="header-out .5s forwards";
			}
		}
	},
	methods: {
		init() {
			// 两组导航栏切换显示
			if(document.body.offsetWidth>=768){
				this.isPhone=false;
			}else{
				this.isPhone=true;
			}
			window.addEventListener("resize",()=>{
				if(document.body.offsetWidth>=768){
					this.isPhone=false;
				}else{
					this.isPhone=true;
				}

			},false)
		},
		// 动画结束执行事件
		afterEnter() {
			this.navOpa=1;
		},
		addRouter(index) {

		},
		refresh() {
			window.location.replace("http://hsianglee.xin");
		}
	}
}
</script>

<style lang="scss">
	@keyframes header-in {
		0% {
			margin-right: 0px;
		}
		100% {
			margin-right: 300px;
		}
	}
	@keyframes header-out {
		0% {
			margin-right: 300px;
		}
		100% {
			margin-right: 0px;
		}
	}
	// 图标动画
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	@keyframes bounce-in {
		0%{
			width: 0px;
		}
		100%{
			width: 120px;
		}
	}
	// 图标中间部分动画
	.logo-enter-active {
		animation: logo-in .5s .5s;
	}
	@keyframes logo-in {
		0%{
			opacity: 0;
			transform: translateY(-15px);
		}
		100%{
			opacity: 1;
			transform: translateY(0px);
		}
	}
	// 导航动画
	.nav-enter-active {
		animation: nav-in .2s forwards;
	}
	.nav-leave-active {
		animation: nav-out .2s forwards;
	}
	@keyframes nav-in {
		0%{
			height: 0px;
		}
		100%{
			height: 151px;
		}
	}
	@keyframes nav-out {
		0%{
			height: 151px;
		}
		100%{
			height: 0px;
		}
	}

	#header{
		padding: 20px 15px;
		margin-right: 300px;
		box-sizing: border-box;
		background-color: #eee;
		position: relative;
		z-index: 1;
		.header-logo{
			height: 50px;
			width: 100%;
			display: inline-block;
			padding-left: 100px;
			a{
				display: inline-block;
				position: relative;
				height: 100%;
				width: 120px;
				span{
					position: absolute;
					text-align: center;
					width: 100%;
					font: 700 22px/50px "Microsoft Yahei";
					&:first-of-type{
						height: 2px;
						background-color: #333;
						top: 0px;
						left: 0px;
					}
					&:nth-of-type(2) {
						top: 0px;
						left: 0px;
					}
					&:last-of-type{
						height: 2px;
						background-color: #333;
						bottom: 0px;
						right: 0px;
					}
				}
			}
			.icon{
				float: right;
				width: 30px;
				height: 30px;
				border: 1px solid #69f;
				position: relative;
				top: 10px;
				right: 10px;
				cursor: pointer;
				span{
					width: 80%;
					height: 2px;
					position: absolute;
					background-color: #666;
					left: 10%;
					top: 22%;
					&:nth-of-type(2){
						top: 45%;
					}
					&:nth-of-type(3){
						top: 70%;
					}
				}
			}
		}
		.nav{
			padding-right: 100px;
			text-align: right;
			font-size: 12px;
			ul{
				display: inline-block;
				line-height: 50px;
				li{
					float: left;
					a{
						padding: 5px 10px;
						font-size: 12px;
						i{
							display: inline-block;
							width: 15px;
							text-align: center;
						}
						&:hover{
							background-color: #ccc;
						}
					}
				}
			}
			
		}
	}
	@media only screen and (max-width: 991px){
		#header{
			margin-right: 0px;
		}
	}
	@media only screen and (max-width: 767px){
		#header {
			padding: 5px 0px 0px;
			.header-logo{
				padding-left: 0px;
			}
		    .nav{
		    	width: 100%;
		    	padding-right: 0px;
		    	text-align: left;
		    	overflow: hidden;
		    	ul{
			    	width: 100%;
			    	border-top: 1px solid #aaa;
			    	li{
			    		float: none;
			    		line-height: 20px;
			    		background-color: #eee;
			    		a{
			    			width: 100%;
			    			display: inline-block;
			    		}
			    	}
		    	}
		    }
		}
	}
	@media only screen and (min-width: 1200px){
		#header {
			.header-logo{
				padding-left: 190px;
			}
		    .nav{
		    	padding-right: 190px;
		    }
		}
	}
	@media only screen and (min-width: 1500px){
		#header {
			padding: 20px 0px;
			.header-logo{
				padding-left: 266px;
			}
		    .nav{
		    	padding-right: 266px;
		    }
		}
	}

</style>

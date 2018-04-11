<template>
	<transition name="asideHide">
		<div id="aside" class="hidden-sm-and-down" v-if="isShowAside">
			<div class="aside-inner">
				<div class="img">
					<!-- <img src="/src/assets/images/photo.jpg" alt=""> -->
					<div class="img-cover"></div>
				</div>
				<div class="aside-header">
					<p>hsianglee</p>
					<h4>心有猛虎，细嗅蔷薇</h4>
				</div>
				<div class="aside-state clearfix">
					<router-link to="/timeaxis/all">
						<span>{{ logLength }}</span>
						<span>日志</span>
					</router-link>
					<router-link to="/list">
						<span>{{ listLength }}</span>
						<span>分类</span>
					</router-link>
				</div>
				<div class="aside-link">
					<a href="https://github.com/hsiangleev">
						<i class="fa fa-github"></i>
						Github
					</a>
					<router-link to="/timeaxis/all">
						<i class="fa fa-search"></i>
						search
					</router-link>
				</div>
			</div>
		</div>
	</transition>
		
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
	name: 'lee-aside',
	data () {
		return {
			
		}
	},
	computed: {
		isShowAside() {
			return this.$store.state.isShowAside;
		},
		logLength() {
			return this.$store.state.logLength;
		},
		listLength() {
			return this.$store.state.ListLength
		}
	},
}
</script>

<style lang="scss">
	.asideHide-enter-active {
		animation: aside-in .5s;
	}
	.asideHide-leave-active {
		animation: aside-in .5s reverse;
	}
	@keyframes aside-in {
		0% {
			width: 0px;
		}
		100% {
			width: 300px;
		}
	}
	#aside{
		width: 300px;
		height: 100%;
		background-color: #333;
		position: fixed;
		right: 0px;
		top: 0px;
		z-index: 2;
		.aside-inner{
			padding: 20px 10px;
			text-align: center;
			.img{
				display: inline-block;
				width: 100px;
				height: 100px;
				border: 1px solid #fff;
				position: relative;
				img{
					display: inline-block;
					width: 100%;
					height: 100%;
				}
				.img-cover{
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0px;
					left: 0px;
					z-index: 1;
				}
			}
			.aside-header{
				p{
					margin: 10px 0px;
					color: #fff;
					font-size: 16px;
					font-weight: 400;
				}
				h4{
					color: #ccc;
					font-weight: 500;
				}
			}
			.aside-state{
				margin: 30px 0px;
				a{
					color: #aaa;
					width: 50px;
					height: 50px;
					display: inline-block;
					position: relative;
					&:hover{
						color: #fff;
					}
					&::after{
						content: " ";
						width: 1px;
						height: 100%;
						background-color: #666;
						display: inline-block;
						position: absolute;
						top: -10%;
						right: 0px;
					}
					&:last-of-type{
						&::after{
							width: 0px;
						}
					}
					span{
						position: absolute;
						display: inline-block;
						text-align: center;
						width: 100%;
						top: 0px;
						left: 0px;
						font-size: 16px;
						&:last-of-type{
							top: 25px;
						}
					}
				}
			}
			.aside-link{
				text-align: center;
				a{
					color: #aaa;
					margin-right: 5px;
					display: inline-block;
					position: relative;
					&:hover{
						color: #fff;
					}
					&:after{
						content: "";
						width: 100%;
						height: 1px;
						background-color: #aaa;
						position: absolute;
						left: 0px;
						bottom: -2px;
					}
				}
			}
		}
	}
</style>

<template>
	<div id="to-top" @click="backToTop" v-show="isShow">
		<span v-for="val in 3"></span>
	</div>
</template>

<script>
export default {
	name: 'lee-to-top',
	data () {
		return {
			isShow: false,
			leader: 0,
			point: 0,
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			window.addEventListener("scroll",()=>{
				this.leader=window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
				if(this.leader>200){
					this.isShow=true;
				}
				else{
					this.isShow=false;
				}
			},false)
		},
		// 切换页面回到顶部
		backToTop() {
			let step=(this.point-this.leader)/5;
			step=step>0? Math.ceil(step) : Math.floor(step);
			this.leader=this.leader+step;
			window.scrollTo(0,this.leader);
			if(this.leader>0){
				requestAnimationFrame(this.backToTop);
			}

		}
	}
}
</script>

<style lang="scss">
	
	#to-top{
		width: 24px;
		height: 24px;
		background-color: #333;
		position: fixed;
		bottom: 30px;
		right: 15px;
		z-index: 30;
		cursor: pointer;
		span{
			width: 2px;
			height: 18px;
			display: inline-block;
			background-color: #fff;
			position: absolute;
			top: 3px;
			left: 11px;
			&:first-of-type{
				left: 7px;
				transform: rotate(35deg);
				height: 13px;
				top: 2px;
			}
			&:last-of-type{
				left: 15px;
				transform: rotate(-35deg);
				height: 13px;
				top: 2px;
			}
		}
	}
</style>

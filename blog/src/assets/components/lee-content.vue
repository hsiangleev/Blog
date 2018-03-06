<template>
	<div id="content" ref="con" :style="addAnimate">
		<lee-nest></lee-nest>
		<lee-footer></lee-footer>
	</div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import leeNest from "./lee-nest.vue"
import leeFooter from "./lee-footer.vue"
export default {
	name: 'lee-content',
	data () {
		return {
			addAnimate: {
				animation: "none",
				minHeight: "0px"
			}
		}
	},
	mounted() {
		// content添加最小高度，使footer置底
		this.addAnimate.minHeight=document.documentElement.clientHeight-93+"px";
	},
	computed: {
		isShowAside() {
			return this.$store.state.isShowAside;
		}
	},
	watch: {
		isShowAside(value) {
			if(value){
				this.addAnimate.animation="header-in .5s";
			}else{
				this.addAnimate.animation="header-out .5s forwards";
			}
		}
	},
	components: {
		leeNest,
		leeFooter
	}
}
</script>

<style lang="scss">
	#content{
		padding: 20px 15px;
		margin-right: 300px;
		background-color: #fff;
		box-sizing: border-box;
		position: relative;
		z-index: 0;
	}
	@media only screen and (max-width: 991px){
		#content{
			margin-right: 0px;
		}
	}
</style>

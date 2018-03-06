<template>
	<div id="icon" class="hidden-sm-and-down" @mouseenter="changeArrow" @mouseleave="changeInfo" @click="changeAside">
		<span ref="span1" :style="spanStyle1"></span>
		<span></span>
		<span ref="span3" :style="spanStyle3"></span>
	</div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
	name: 'lee-icon',
	data () {
		return {
			spanStyle1: {
				animation: "none"
			},
			spanStyle3: {
				animation: "none"
			}
		}
	},
	methods: {
		changeArrow() {
			this.spanStyle1={
				animation: "change1 .3s linear forwards"
			}
			this.spanStyle3={
				animation: "change3 .3s linear forwards"
			}
		},
		changeInfo() {
			this.spanStyle1={
				animation: "change2 .3s linear forwards"
			}
			this.spanStyle3={
				animation: "change4 .3s linear forwards"
			}
		},
		changeAside() {
			this.$store.commit("changeAside");
		}
	}
}
</script>

<style lang="scss">
	#icon{
		width: 24px;
		height: 24px;
		background-color: #333;
		position: fixed;
		bottom: 57px;
		right: 15px;
		z-index: 30;
		cursor: pointer;
		span{
			width: 18px;
			height: 2px;
			display: inline-block;
			background-color: #fff;
			position: absolute;
			top: 5px;
			left: 3px;
			&:nth-of-type(2){
				top: 11px;
			}
			&:nth-of-type(3){
				top: 17px;
			}
		}
	}

	@mixin ani ($deg1,$deg2,$width1,$width2,$top1,$top2){
		0%{
			transform: rotate($deg1);
			width: $width1;
			top: $top1;
		}
		100%{
			transform: rotate($deg2);
			width: $width2;
			top: $top2;
		}
	}
	
	@keyframes change1{
		@include ani(0deg,-30deg,18px,12px,5px,7px);
	}
	@keyframes change2{
		@include ani(-30deg,0deg,12px,18px,7px,5px);
	}
	@keyframes change3{
		@include ani(0deg,30deg,18px,12px,17px,15px);
	}
	@keyframes change4{
		@include ani(30deg,0deg,12px,18px,15px,17px);
	}
</style>

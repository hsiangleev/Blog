<template>
	<div id="footer">
		<p>本站总访问量{{ count }}次 Powered by hsianglee</p>
		<p>Copyright© 2018 凉宫西辰</p>
		<a href="http://www.miitbeian.gov.cn" target="_blank">皖ICP备17025017号</a>
	</div>
</template>

<script>
export default {
	name: 'lee-footer',
	data () {
		return {
			
		}
	},
	computed: {
		count() {
			return this.$store.state.count;
		}
	}
}
</script>

<style lang="scss">
	#footer{
		background-color: #eee;
		margin: 0px -15px;
		position: absolute;
		bottom: 0px;
		width: 100%;
		z-index: 1;
		text-align: center;
		line-height: 22px;
		color: #888;
		padding: 10px 0px;
		a{
			color: #888;
			&:hover{
				color: #666;
			}
		}
	}
</style>

<template>
	<div 
		id="loading" 
		v-if="loading"
		v-loading="loading"
	    element-loading-text="拼命加载中"
	    element-loading-spinner="el-icon-loading"
	    element-loading-background="rgba(0, 0, 0, 0.8)">
	    
	</div>
</template>

<script>
export default {
	name: 'lee-loading',
	data () {
		return {
			
		}
	},
	computed: {
		loading() {
			return this.$store.state.loading;
		}
	},
	mounted() {
		
	},
	methods: {
		// 获取数据，初始化数据
		
	}
}
</script>

<style lang="scss">
	#loading{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 9999;
	}
</style>

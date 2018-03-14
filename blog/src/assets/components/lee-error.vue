<template>
	<div id="error">
        <h1>404</h1>
		<h2>Page not found 
			<router-link to="/home">
				Head back home
			</router-link>
		</h2>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
	name: 'lee-error',
	data () {
		return {
			
		}
	},
}
</script>

<style lang="scss">
	#error{
		position: relative;
		z-index: 2;
		h1{
			font-size: 50px;
			text-align: center;
			margin: 120px 0px 15px;
		}
		h2{
			font-size: 30px;
			font-weight: 500;
			text-align: center;
			margin: 15px 0px;
			a{
				font-size: 20px;
				color: #f69;
				&:hover{
					text-decoration: underline;
				}
			}
		}
	}
</style>

<template>
	<div id="list">
		<div class="title">当前页面文章分类信息</div>
		<ul>
			<li v-for="(val,index) in type">
				<a href="javascript:;" @click="changeRouter(val)">{{ val }}</a>
				<span> [{{ len[index] }}]</span>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from "axios"
export default {
	name: 'lee-list',
	data () {
		return {
			type: [],
			len: []
		}
	},
	mounted() {
		this.getClassify();
		this.getTypeLen();
	},
	methods: {
		// 获取分类信息
		getClassify() {
			this.$store.state.loading=true;
			var sendData={
				whereStr: {
					_id: "classify"
				}
			}
			axios({
				method: 'post',
				url: '/getClassify',
				data: sendData
			})
			.then((res)=>{
				this.type=res.data.data;
				this.$store.state.loading=false;
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		// 获取每条分类信息长度
		getTypeLen() {
			var sendData={
				whereStr: {
					_id: "blog"
				}
			}
			axios({
				method: 'post',
				url: '/getTypeLen',
				data: sendData
			})
			.then((res)=>{
				this.len=[];
				this.type.forEach((val,index)=>{
					if(val in res.data){
						this.len.push(res.data[val]);
					}else{
						this.len.push(0);
					}
				})
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		changeRouter(msg) {
            this.$router.push({ path: `/timeaxis/${msg}` })
        }
	}
}
</script>

<style lang="scss">
	#list{
		position: relative;
		z-index: 2;
		padding: 25px 0px;
		.title{
			text-align: center;
			font-size: 18px;
		}
		ul{
			li{
				margin: 15px 0px;
				font-size: 16px;
				a{
					&:hover{
						text-decoration: underline;
						color: #f69;
					}
				}
				span{
					color: #aaa;
					font-size: 14px;
				}
			}
		}
	}
</style>

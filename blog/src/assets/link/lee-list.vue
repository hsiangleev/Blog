<template>
	<div id="list">
		<div class="title">当前页面文章分类信息</div>
		<ul>
			<li v-for="(val,index) in type">
				<div v-if="isShow">
					<el-checkbox-group v-if="len[index] == 0" v-model="ruleForm">
						<el-checkbox :label="index" name="type">
							<a href="javascript:;" @click="changeRouter(val)">{{ val }}</a>
							<span> [{{ len[index] }}]</span>
						</el-checkbox>
					</el-checkbox-group>
					<div v-else>
						<a href="javascript:;" @click="changeRouter(val)">{{ val }}</a>
						<span> [{{ len[index] }}]</span>
					</div>
				</div>
				<div v-else>
					<a href="javascript:;" @click="changeRouter(val)">{{ val }}</a>
					<span> [{{ len[index] }}]</span>
				</div>
			</li>
		</ul>
		<el-row v-if="isShow">
			<el-button-group>
				<el-button type="primary" @click="addList" plain>新增分类</el-button>
				<el-button type="danger" @click="deleteList" plain>删除分类</el-button>
			</el-button-group>
		</el-row>
	</div>
</template>

<script>
import axios from "axios"
export default {
	name: 'lee-list',
	data () {
		return {
			type: [],
			len: [],
			ruleForm: [],
		}
	},
	mounted() {
		this.getClassify();
	},
	computed: {
		isShow() {
			return this.$store.state.isManager;
		}
	},
	methods: {
		// 获取分类信息
		getClassify() {
			this.$store.state.loading=true;
			axios({
				method: 'post',
				url: '/getClassify',
				data: {}
			})
			.then((res)=>{
				this.type=res.data.data;
				this.getTypeLen();
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		// 获取每条分类信息长度
		getTypeLen() {
			axios({
				method: 'post',
				url: '/getTypeLen',
				data: {}
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
				this.$store.state.loading=false;
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		changeRouter(msg) {
            this.$router.push({ path: `/timeaxis/${msg}` })
		},
		// 添加分类
		addList() {
			this.$prompt('请输入分类信息', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPattern: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){2,16}$/,
				inputErrorMessage: '分类长度2到16位'
			}).then(({ value }) => {
				axios({
					method: 'post',
					url: '/getClassify',
					data: {}
				})
				.then((res)=>{
					var hasList=false;
					res.data.data.forEach((val)=>{
						if(val===value){
							hasList=true;
						}
					})
					// 判断是否存在此分类
					if(hasList){
						this.$message({
							type: 'wrong',
							center: true,
							duration: 1500,
							message: '此分类已存在，请重新输入'
						}); 
					}else{
						axios({
							method: 'post',
							url: '/managerAddList',
							data: {
								list: value
							}
						})
						.then((r)=>{
							if(r.data.ok==1){
								this.$message({
									type: 'success',
									center: true,
									duration: 1500,
									message: '已添加分类信息: ' + value
								});
								this.getClassify();
							}
						})
						.catch((error)=>{
							console.log(error);
						});
					}
				})
				.catch((error)=>{
					console.log(error);
				});

			}).catch(() => {
				this.$message({
					type: 'info',
					center: true,
					duration: 1500,
					message: '取消输入'
				});       
			});
		},
		deleteList() {
			if(this.ruleForm.length<=0){
				this.$message({
					type: 'warning',
					center: true,
					duration: 1500,
					message: '请选择需要删除的分类'
				});
				return;
			}
			axios({
				method: 'post',
				url: '/listDeleteList',
				data: {
					ruleForm: this.ruleForm
				}
			})
			.then((r)=>{
				if(r.data.ok==1){
					this.$message({
						type: 'success',
						center: true,
						duration: 1500,
						message: '已删除分类信息'
					});
					this.ruleForm=[];
					this.getClassify();
				}
			})
			.catch((error)=>{
				console.log(error);
			});
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
				list-style: none;
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
		.el-row{
			text-align: right;
		}
	}
</style>

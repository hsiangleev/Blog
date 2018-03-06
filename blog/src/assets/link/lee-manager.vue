<template>
	<div id="manager">
		<div class="manager-right" v-if="name==='凉宫西辰'">
			<div class="manager-right-tabs">
				<ul class="clearfix">
					<li><a href="javascript:;" class="current" title="">随笔</a></li>
					<li><a href="javascript:;" title="">随笔</a></li>
					<li><a href="javascript:;" title="">随笔</a></li>
				</ul>
			</div>
			<div class="manager-right-header">
				<ul class="clearfix">
					<li>
						<router-link to="/manager/add/0" title="">新增随笔</router-link>
					</li>
					<li><a href="javascript:;" title="">[编辑分类]</a></li>
					<li><a href="javascript:;" title="">[编辑分类]</a></li>
				</ul>
			</div>
			<div class="manager-right-content">
				<el-table
				    :data="tableData"
				    style="width: 100%"
				    >
				    <el-table-column
						prop="title"
						label="标题">
						<template slot-scope="scope">
						<a href="javascript:;" @click="changeRouter(scope.row.num)">{{ scope.row.title }}</a>
						</template>
				    </el-table-column>

				    <el-table-column
						prop="time"
						label="时间"
						sortable>
				    </el-table-column>
				    <el-table-column
				    	v-if="notPhone"
						prop="commit"
						label="评论数"
						sortable>
				    </el-table-column>
				    <el-table-column
				    	v-if="notPhone"
						prop="read"
						label="阅读数"
						sortable>
				    </el-table-column>
				    <el-table-column
						label="操作">
						<template slot-scope="scope">
							<el-button-group>
								<el-button :plain="true" size="mini" @click="editArticle(scope.row.num)">编辑</el-button>
								<el-button :plain="true" size="mini" @click="deleteArticle(scope.row.num)">删除</el-button>
							</el-button-group>
						</template>
				    </el-table-column>
				</el-table>
			</div>
		</div>
		<div class="manager-power" v-else>
			没有权限查看本页面
		</div>
	</div>
</template>

<script>
import io from "./../../socket.io.js"
export default {
	name: 'lee-manager',
	data () {
		return {
			data: [],
			tableData: [],
			notPhone: true,
			name: ""
		}
	},
	mounted() {
		// 调用vuex中的方法获取name
		this.$store.getters.getPower(this.init);
		this.initShow();
	},
	methods: {
		// 获取数据，初始化数据
		init(name) {
			// 获取当前登录的name
			this.name=name;
			this.$store.state.loading=true;
			let socket = io();
			var sendData={
				whereStr: {
					_id: "blog"
				}
			}
			socket.emit('manager', sendData);
			socket.on('manager', (data)=>{
				this.tableData=data.data;
				socket.off("manager");
				this.$store.state.loading=false;
			});
		},
		// 小屏幕隐藏部分列
		initShow() {
			if(document.body.offsetWidth>=768){
				this.notPhone=true;
			}else{
				this.notPhone=false;
			}
			window.addEventListener("resize",()=>{
				if(document.body.offsetWidth>=768){
					this.notPhone=true;
				}else{
					this.notPhone=false;
				}

			},false)
		},
		// 编辑时跳转
		editArticle(num) {
			this.$router.push({ path: `/manager/add/${num}` })
		},
		// 删除数据
		deleteArticle(num) {
			let socket = io();
			// 从数组中移除num等于num的那一项
			var sendData={
				num: num
			}
			this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				socket.emit('manager deleteArticle', sendData);
				this.$store.state.loading=true;
				socket.on('manager deleteArticle', (data)=>{
					if(data.ok==1){
						this.$store.state.loading=false;
						this.$message({
							message: '删除成功',
							center: true,
							duration: 1500,
							type: "success"
						});
					}else{
						this.$store.state.loading=false;
						console.log("删除失败")
					}
					socket.off("manager deleteArticle");
					this.changeMongodbNum();
					// 重新加载数据
					this.$store.getters.getPower(this.init);
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					center: true,
					duration: 1500,
					message: '已取消删除'
				});          
			});
			
		},
		// 修改mongodb的数组num序号
		changeMongodbNum() {
			let socket = io();
			var sendData={
				len: this.tableData.length-1
			}
			socket.emit('manager changeNum', sendData);
			socket.on('manager changeNum', (data)=>{
				if(data.ok==1){
					// console.log("重置num");
				}
				socket.off("manager changeNum");
			});
		},
		// 点击文章标题跳转
		changeRouter(index) {
			this.$router.push({ path: `/text/${index}` })
		}
	}
}
</script>

<style lang="scss">
	#manager{
		position: relative;
		top: 0px;
		left: 0px;
		margin: 30px 0px;
		z-index: 2;
		.manager-right{
			width: 100%;
			box-sizing: border-box;
			position: relative;
			top: 0px;
			margin-left: -1px;
			border: 1px solid #aaa;
			padding-bottom: 50px;
			.manager-right-tabs{
				width: 100%;
				height: 20px;
				line-height: 20px;
				position: absolute;
				top: -30px;
				ul{
					li{
						float: left;
						margin-right: 10px;
						a{
							display: inline-block;
							padding: 5px 10px;
							background-color: #69f;
							color: #fff;
							border: 1px solid #aaa;
							border-bottom: 0px;
							margin-left: -1px;
							margin-top: -1px;
							&.current{
								background-color: #6f9;
							}
						}
					}
				}
			}
			.manager-right-header{
				width: 100%;
				height: 30px;
				background-color: #6f9;
				border-bottom: 1px solid #aaa;
				position: absolute;
				top: 0px;
				ul{
					li{
						float: left;
						padding: 0px 10px;
						a{
							line-height: 30px;
							color: #fff;
							&:hover{
								color: #f69;
								text-decoration: underline;
							}
						}
					}
				}
			}
			.manager-right-content{
				width: 100%;
				position: relative;
				top: 32px;
				a{
					color: #606266;
					&:hover{
						color: #f69;
						text-decoration: underline;
					}
				}
				thead{
					tr{
						.caret-wrapper{
							height: 35px;
						}
					}
				}
			}
		}
	}
	@media only screen and (max-width: 767px){
		#manager{
			margin-left: -28px;
			margin-right: -28px;
		}
	}
</style>

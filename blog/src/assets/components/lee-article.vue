<template>
	<div id="article">
		<div class="article-content" v-for="(val,index) in data">
			<div class="article-content-header">
				<a href="javascript:;" @click="changeRouter(index)">
					{{ val.article.title }}
				</a>
			</div>
			<div class="article-content-info">
				<div class="time">
					<i class="fa fa-calendar-o"></i>
					{{ val.article.time }}
				</div>
				<span>|</span>
				<div class="assort">
					<i class="fa fa-folder-o"></i>
					{{ val.type }}
				</div>
				<span>|</span>
				<div class="read-time">
					 阅读次数
					{{ val.article.num }}
				</div>
			</div>
			<div class="article-content-explain">
				{{ val.article.header }}
			</div>
			<div class="article-content-cut">
				<div class="article-content-cut-text markdown-body" v-html="val.article.ellipsis">
					
				</div>
			</div>
			<div class="article-content-read">
	            <a href="javascript:;" class="btn" @click="changeRouter(index)">
	            	阅读全文 »
	            </a>
			</div>
		</div>
		<div class="article-page">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="currentPage"
				:page-size="pageSize"
				layout="prev, pager, next, jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import 'github-markdown-css/github-markdown.css'
import marked from "marked"
export default {
	name: 'lee-article',
	data () {
		return {
			currentPage: 1,
			data: [{
				article: {},
				comment: []
			}],
			pageSize: 4,
			total: 0,

			leader: 0,
			point: 0,

			text: ""
		}
	},
	mounted() {
		this.handleCurrentChange(this.currentPage);
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			this.$nextTick(()=>{
				this.$store.state.loading=true;
				// 传回服务器数据
				var setData={
					page: {
						pageSize: this.pageSize,
						currentPage: this.currentPage
					}
				}
				axios({
					method: 'post',
					url: '/article',
					data: setData
				})
				.then((res)=>{
					this.data=res.data.data;
					this.total=res.data.total;
					this.$store.state.logLength=res.data.total;
					this.$store.state.loading=false;
				})
				.catch((error)=>{
					console.log(error);
				});

				this.backToTop();
			})
		},
		// 页数修改回到顶部
		backToTop() {
			this.leader=window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
			let step=(this.point-this.leader)/5;
			step=step>0? Math.ceil(step) : Math.floor(step);
			this.leader=this.leader+step;
			window.scrollTo(0,this.leader);
			if(this.leader>0){
				requestAnimationFrame(this.backToTop);
			}

		},
		// 路由设置
		changeRouter(index) {
			let x=this.data[index].num
			this.$router.push({ path: `/text/${x}` })
		}
	}
}
</script>

<style lang="scss">
	#article{
		position: relative;
		top: 0px;
		left: 0px;
		z-index: 2;
		.article-content{
			margin-bottom: 80px;
			.article-content-header{
				font-size: 22px;
				font-weight: 700;
				margin: 20px 0px;
				text-align: center;
				a:hover{
					text-decoration: underline;
				}
			}
			.article-content-info{
				.time,
				.assort,
				.read-time,
				span{
					display: inline-block;
					color: #888;
					line-height: 20px;
				}
				span{
					margin: 0px 12px;
				}
				i{
					margin-right: 3px;
				}
			}
			.article-content-explain,
			.article-content-cut{
				text-indent: 25px;
				font-size: 14px;
				line-height: 22px;
				margin: 10px 0px;
				color: #666;
			}
			.article-content-cut{
				border-left: 5px solid #ccc;
				padding-left: 30px;
				margin: 20px 0px;
				.article-content-cut-text{
					// display: -webkit-box;
					// -webkit-line-clamp: 3;/*规定超过三行的部分截断*/
					// -webkit-box-orient: vertical;
					// overflow : hidden; 
					// word-break: break-all;/*在任何地方换行*/
				}
			}
			.article-content-read{
				a{
					display: inline-block;
					border-bottom: 2px solid #888;
					padding: 5px 0px;
					color: #888;
					&:hover{
						border-bottom: 2px solid #333;
						color: #333;
					}
				}
			}
		}
		.article-page{
			margin-bottom: 30px;
			padding-top: 5px;
			border-top: 1px solid #ddd;
			.el-pagination{
				white-space: normal;
			}
		}
	}
	@media only screen and (max-width: 767px){
		#article{
			.article-content{
				.article-content-header{
					text-align: center;
				}
				.article-content-info{
					text-align: center;
				}
			}
		}
	}
</style>

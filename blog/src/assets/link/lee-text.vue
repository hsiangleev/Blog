<template>
	<!-- #text被解析成路由类 -->
	<div id="text" style="position: relative; z-index: 2;">
		<div class="text-content" v-if="hasArticle">
			<div class="article-content-header">
				{{ data.num }}
			</div>
			<div class="article-content-info">
				<div class="time">
					<i class="fa fa-calendar-o"></i>
					发表于 {{ article.time }}
				</div>
				<span>|</span>
				<div class="assort">
					<i class="fa fa-folder-o"></i>
					分类于 {{ data.type }}
				</div>
				<span>|</span>
				<div class="read-time">
					阅读次数 {{ article.num+1 }}
				</div>
			</div>
			<div class="article-content-explain">
				{{ article.header }}
			</div>
			<div class="text-content-article markdown-body" v-html="article.text">
				
			</div>
			
			<div class="text-end" v-if="loading">
				<i class="fa fa-heart"></i>
				到此结束
			</div>
			<!-- 评论区 -->
			<lee-comment v-if="loading" :num="num"></lee-comment>
		</div>
		<div v-else>
			暂无此博客
		</div>
	</div>
</template>

<script>
import axios from "axios"
import 'github-markdown-css/github-markdown.css'
import marked from "marked"
import leeComment from "./lee-comment"
// import ajax from "./../../lee-ajax.js"
export default {
	name: 'lee-text',
	data () {
		return {
			data: {},
			article: {},
			loading: false,			// 等文章加载完成之后，下面评论开始加载
			hasArticle: true,		// 判断路由地址是否超出文章总数
		}
	},
	computed: {
		num() {
			return this.$route.params.id
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.$store.state.loading=true;
			var sendData={
				whereStr: {
					_id: "blog"
				},
				searchNum: {
					num: Number(this.num)-1
				}
			}

			axios({
				method: 'post',
				url: '/text',
				data: sendData
			})
			.then((res)=>{
				// 判断路由地址是否超出文章总数
				// 404判断
				if(res.data.data==-1){
					this.hasArticle=false;
					this.$router.push("../error");
				}else{
					this.data=res.data.data;
					this.article=res.data.article;
					this.updateReadNum();
				}
				this.$store.state.loading=false;
				this.loading=true;
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		// 更新文章阅读次数
		updateReadNum() {
			var sendData={
				num: Number(this.num)-1,
				readNum: this.article.num+1
			}
			
			axios({
				method: 'post',
				url: '/textReadNum',
				data: sendData
			})
			.then((res)=>{
				
			})
			.catch((error)=>{
				console.log(error);
			});
		}
	},
	components: {
		leeComment
	}
}
</script>

<style lang="scss">
	.text-content{
		margin-bottom: 80px;
		.article-content-header{
			font-size: 22px;
			font-weight: 700;
			margin: 15px 0px;
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
			margin: 15px 0px;
			color: #666;
		}
		.text-end{
			text-align: center;
			color: #f69;
			font-size: 30px;
			margin: 100px 0px;
		}
		
	}
	@media only screen and (max-width: 767px){
		.text-content{
			.article-content-header{
				text-align: center;
			}
			.article-content-info{
				text-align: center;
			}
		}
	}
</style>

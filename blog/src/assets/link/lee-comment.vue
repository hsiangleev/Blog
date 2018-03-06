<template>
	<div id="comment">
		<div class="text-content-comment-title clearfix">
			<div class="comment-title">
				评论列表<span v-if="isLogin">--当前用户：{{ name }}</span>
			</div>
			<el-button-group class="btn-group">
				<el-button :plain="true" size="mini" @click="addComment">评论</el-button>
				<el-button :plain="true" size="mini" @click="refresh">刷新</el-button>
				<el-button :plain="true" size="mini" @click="login">{{ isLogin ? "注销" : "登录" }}</el-button>
			</el-button-group>
		</div>
		<el-input
			v-if="isShowTextarea"
			type="textarea"
			autosize
			resize="none"
			class="commit-content"
			placeholder="请输入评论内容"
			v-model="textarea1">
		</el-input>
		<div class="text-content-comment-content">
			<ul>
				<li v-for="(val,index) in data">
					<div class="one-person" v-for="(value,i) in val">
						<p>
							<span class="floor" v-if="i==0"># {{ data.length-index }}楼</span>
							<span class="floor" v-else></span>
							{{ value.time }}
							<span class="name">{{ value.name }}</span>
						</p>
						<div class="text">
							{{ value.text }}
						</div>
					</div>
					<div class="text-right">
						<el-button :plain="true" size="mini" @click="reply(index,val.length)">回复</el-button>
					</div>
					<el-input
						v-if="isShowTextarea"
						type="textarea"
						autosize
						resize="none"
						placeholder="请输入评论内容"
						v-model="textarea2[index]">
					</el-input>
				</li>
			</ul>
		</div>
		<lee-login></lee-login>
	</div>
</template>

<script>
import io from "./../../socket.io.js"
import leeLogin from "./lee-login.vue"
export default {
	name: 'lee-comment',
	props: ["num"],
	data () {
		return {
			isLogin: false,		// 是否登录
			name: "",
			data: [],
			textarea1: "",
			textarea2: [],
		}
	},
	mounted() {
		this.initPage();
	},
	computed: {
		isShowTextarea() {
			return this.isLogin;
		}
	},
	methods: {
		// 初始化页面
		initPage() {
			var socket = io();
			var sendData={
				whereStr: {
					_id : "blog"
				},
				searchNum: {
					num: Number(this.num)-1
				}
			}
			socket.emit('comment', sendData);
			socket.on('comment', (data)=>{
				this.data=data.data;
				this.data.forEach((val,index)=>{
					this.textarea2[index]="";
				})
				socket.off("comment");
				// 调用vuex中的方法获取name
				this.$store.getters.getPower(this.init);
			});
		},
		// 刷新页面
		refresh() {
			var socket = io();
			var sendData={
				whereStr: {
					_id : "blog"
				},
				searchNum: {
					num: Number(this.num)-1
				}
			}
			socket.emit('comment', sendData);
			this.$store.state.loading=true;
			socket.on('comment', (data)=>{
				this.data=data.data;
				this.data.forEach((val,index)=>{
					this.textarea2[index]="";
				})
				this.textarea1="";
				socket.off("comment");
				this.$store.state.loading=false;
			});
		},
		// 判断是否登录
		init(name) {
			let value = sessionStorage.getItem("id");
			this.isLogin=!!value;
			this.name=name;
		},
		login() {
			if(this.isLogin){
				sessionStorage.removeItem("id");
				this.init();
			}else{
				this.$store.state.login=true;
			}
			
		},
		addComment() {
			if(this.isLogin){
				// 判断输入留言是否为空
				if(this.textarea1==""){
					this.$message({
						message: '请输入留言内容',
						center: true,
						duration: 3000,
						type: "warning"
					});
				}else if (this.textarea1.length>=150){
					this.$message({
						message: '字数不得超过150',
						center: true,
						duration: 3000,
						type: "warning"
					});
				}else{
					let socket = io();
					var sendData={
						name: this.name,
						time: this.getTime(),						
						text: this.textarea1,
						num: this.num-1,
						len: this.data.length
					}
					socket.emit('comment addComment', sendData);
					this.$store.state.loading=true;
					socket.on('comment addComment', (data)=>{
						if(data.ok==1){
							this.$store.state.loading=false;
							this.$message({
								message: '留言成功',
								center: true,
								duration: 1500,
								type: "success"
							});
							this.textarea1="";
							this.refresh();
						}else{
							console.log("留言失败")
						}
						socket.off("comment addComment");
					});
				}
			}else{
				// 还未登录
				this.$store.state.login=true;
			}
		},
		reply(index,len) {
			if(this.isLogin){
				// 判断输入留言是否为空
				if(this.textarea2[index]==""){
					this.$message({
						message: '请输入留言内容',
						center: true,
						duration: 3000,
						type: "warning"
					});
				}else if (this.textarea2[index].length>=150){
					this.$message({
						message: '字数不得超过150',
						center: true,
						duration: 3000,
						type: "warning"
					});
				}else{
					let socket = io();
					var self=this;
					var sendData={
						name: this.name,
						time: this.getTime(),						
						text: this.textarea2[index],
						// 第几篇文章
						num: this.num-1,
						// 当前二级评论长度
						len: len,
						// 倒数第几条评论
						commentLen: this.data.length-index-1
					}
					
					socket.emit('comment reply', sendData);
					this.$store.state.loading=true;
					socket.on('comment reply', (data)=>{
						if(data.ok==1){
							this.$store.state.loading=false;
							this.$message({
								message: '留言成功',
								center: true,
								duration: 1500,
								type: "success"
							});
							this.textarea2[index]="";
							this.refresh();
						}else{
							console.log("留言失败")
						}
						socket.off("comment reply");
					});
				}
			}else{
				// 还未登录
				this.$store.state.login=true;
			}
		},
		// 获取当前时间
		getTime() {
			let myDate = new Date();//获取系统当前时间
			let date=myDate.getFullYear()+"-"+(Number(myDate.getMonth())+1)+"-"+myDate.getDate();
			let time=this.setTime(myDate.getHours())+":"+this.setTime(myDate.getMinutes())+":"+this.setTime(myDate.getSeconds())
			let str=date+" "+time;
			return str;
		},
		// 设置时间格式
		setTime(str) {
			if(parseInt(str)>9){
				return str;
			}else{
				return "0"+str
			}
		},
	},
	components: {
		leeLogin
	}
}
</script>

<style lang="scss">
	#comment{
		margin-bottom: 50px;
		textarea{
			background-color: transparent;
		}
		.text-content-comment-title{
			font-size: 22px;
			margin: 10px 0px;
			.comment-title{
				float: left;
			}
			.btn-group{
				float: right;
			}
			button{
				background-color: transparent;
			}
		}
		.text-content-comment-content{
			ul{
				li{
					position: relative;
					border-top: 1px solid #ccc;
					font-size: 14px;
					margin: 15px 0px;
					padding: 15px 0px;
					.text{
						padding-left: 36px;
						margin: 10px 0px;
					}
					.one-person{
						p{
							padding-left: 36px;
						}
						&:first-of-type p{
							padding-left: 0px;
						}
					}
					span.name{
						color: #f69;
					}
					span.floor{
						color: #69f;
					}


					&:last-of-type{
						border-bottom: 1px solid #ccc;
					}
				}
			}
			button{
				background-color: transparent;
			}
		}
	}
</style>

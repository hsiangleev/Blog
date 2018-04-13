<template>
	<div id="add" class="add" v-cloak>
		<div class="clearfix" v-if="isShow">

			<el-upload
				class="upload-demo"
				action="../../loadImages"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				multiple
				:limit="3"
				:on-exceed="handleExceed"
				:before-upload="beforeAvatarUpload"
				:file-list="fileList">
				<el-button size="small">图片上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
			</el-upload>

			<div class="add-set">
				<el-select v-model="listValue" placeholder="文章分类">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<el-button :plain="true" @click="submit">提交</el-button>
			</div>
			<div class="add-title">
				<el-input v-model="title" placeholder="请输入你的文章标题"></el-input>
				<el-input
					type="textarea"
					:autosize="{ minRows: 2}"
					placeholder="请输入您的文章前言"
					v-model="preface">
				</el-input>
			</div>
			<div class="add-left">
				<el-input
					type="textarea"
					:autosize="{ minRows: 20}"
					placeholder="请输入您的文章内容( makedown语法 )"
					v-model="article" @keydown="supportTabs" ref="textarea">
				</el-input>
			</div>
			<div class="add-right markdown-body" v-html="msg">
				
			</div>
		</div>
		<div v-else>
			{{ errorMsg }}
		</div>
	</div>
</template>

<script>
import axios from "axios"
import 'github-markdown-css/github-markdown.css'
import marked from "marked"
export default {
	name: 'lee-manager-add',
	data () {
		return {
			errorMsg: "",
			data: "",
			title: '',		// 标题
			preface: "",	// 前言
			article: "",	// 正文(makedown)
			msg: "",		// 正文
			listValue: "",	// 分类
			ellipsis: "",
			options: [
				{
					value: '0',
					label: '== 文章分类 =='
				}, 
			],

			finishData: {},
			articleLength: 0,
			name: "",
			fileList: [
				
			],
		}
	},
	computed: {
		num() {
			return this.$route.params.id
		},
		isEdit() {
			return this.num>0;			// 是否为编辑状态
		},
		isShow() {
			return this.$store.state.isManager;
		}
	},
	mounted() {
		this.getClassify();
		// 调用vuex中的方法获取name
		this.$store.getters.getPower(this.init);
		this.msg=marked(this.article);
	},
	watch: {
		article() {
			this.msg=marked(this.article);
		}
	},
	methods: {
		// 获取分类信息
		getClassify() {
			axios({
				method: 'post',
				url: '/getClassify',
				data: {}
			})
			.then((res)=>{
				this.options=[
					{
						value: '0',
						label: '== 文章分类 =='
					}, 
				];
				res.data.data.forEach((val,index)=>{
					this.options.push({
						value: index+1+"",
						label: val
					})
				})
			})
			.catch((error)=>{
				console.log(error);
			});
		},
		init(name) {
			// 获取当前登录的name
			this.name=name;
			this.$store.state.loading=true;
			var sendData={
				num: Number(this.num)-1
			}
			axios({
				method: 'post',
				url: '/editInit',
				data: sendData
			})
			.then((res)=>{
				// 判断404
				if(res.data.data==-1){
					this.$router.push("../../error");
				}else{
					this.data=res.data.data;
					// 编辑文章初始化内容
					if(this.isEdit){
						let label=this.data.type;
						this.options.forEach((val,index)=>{
							if(val.label==label){
								this.listValue=val.value;
							}
						})
						this.title=this.data.article.title;
						this.preface=this.data.article.header;
						this.article=this.data.article.origin;
					}else{
						this.articleLength=res.data.len;
					}
				}
				this.errorMsg="没有权限查看本页面";
				this.$store.state.loading=false;
			})
			.catch((error)=>{
				console.log(error);
			});
				
		},
		
		submit() {
			// 提交编辑之后的文章
			this.$store.state.loading=true;
			if(this.title!="" && this.preface!="" && this.article!="" && this.listValue!="0"){
				let n=this.findStr(this.msg, "\n", 3);
				this.ellipsis=this.msg.slice(0,n);

				let sendData={
					isEdit: this.isEdit,
					type: this.options[Number(this.listValue)].label,
					title: this.title,
					header: this.preface,
					ellipsis: this.ellipsis,
					text: this.msg,
					origin: this.article,
					num: this.num-1,
					articleLength: this.articleLength,
					time: this.getTime()
				}
				axios({
					method: 'post',
					url: '/editArticle',
					data: sendData
				})
				.then((res)=>{
					if(res.data.ok==1){
						this.$store.state.loading=false;
						if(this.isEdit){
							this.$message({
								message: '修改成功',
								center: true,
								duration: 1500,
								type: "success"
							});
						}else{
							this.$message({
								message: '新增成功',
								center: true,
								duration: 1500,
								type: "success"
							});
						}
						
					}else{
						this.$store.state.loading=false;
						this.$message({
							message: '操作失败',
							center: true,
							duration: 1500,
							type: "error"
						});
					}
				})
				.catch((error)=>{
					console.log(error);
				});

			}else{
				this.$store.state.loading=false;
				this.$message({
					message: '信息输入不全',
					center: true,
					duration: 1500,
					type: "warning"
				});
			}
		},
		// 查找一个字符串的某个字符第num次出现的次数
		findStr(str,cha,num) {
			var x=str.indexOf(cha);
		    for(var i=0;i<num;i++){
		        x=str.indexOf(cha,x+1);
		    }
		    return x;
		},
		// 获取当前时间
		getTime() {
			let myDate = new Date();//获取系统当前时间
			let date=myDate.getFullYear()+"-"+this.setTime(Number(myDate.getMonth())+1)+"-"+this.setTime(myDate.getDate());
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
		// 支持tab缩进
		supportTabs() {
			let e=window.event || event;
			if (e.keyCode == 9) {
                e.preventDefault();
                let indent = '	';
                let start = this.$refs["textarea"].selectionStart;
                let end = this.$refs["textarea"].selectionEnd;
                let selected = window.getSelection().toString();
                selected = indent + selected.replace(/\n/g, '\n' + indent);
                this.article = this.article.substring(0, start) + selected
                        + this.article.substring(end);
                this.$refs["textarea"].setSelectionRange(start + indent.length, start
                        + selected.length);
            }
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
			const isLt2M = file.size <= 1024;

			if (!isJPG) {
				this.$message.error('上传图片只能是 JPG 或 png 或 gif 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传图片大小不能超过 1MB!');
			}
			return isJPG && isLt2M;
		}
	}
}
</script>

<style lang="scss">
	[v-cloak] {
		display: none;
	}
	.add{
		position: relative;
		top: 0px;
		left: 0px;
		z-index: 2;
		margin: 30px 0px;
		input,
		button,
		textarea{
			background-color: transparent;
		}
		.add-set{
			text-align: right;
		}
		.add-left{
			width: 100%;
			textarea{
				width: 100%;
				font-size: 14px;
			}
		}
		.add-right{
			width: 100%;
		}
	}
	@media only screen and (max-width: 767px){
		#add{
			margin-left: -40px;
			margin-right: -40px;
		}
	}
</style>

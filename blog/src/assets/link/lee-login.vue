<template>
	<div id="login" v-if="login">
		<div class="login-content">
			<transition name="login" mode="out-in">
				<div class="sign" v-if="isShowSign" key="sign">
					<div class="login-content-title">
						用户注册
					</div>
					<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="name">
							<el-input v-model.number="ruleForm2.name"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass" class="form-label">
							<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="checkPass">
							<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
							<el-button @click="resetForm('ruleForm2')">重置</el-button>
						</el-form-item>
					</el-form>
					<div class="login-content-footer">
						<a href="javascript:;" title="" @click="isShowSign=!isShowSign">登录</a>
						<a href="javascript:;" title="" @click="back">取消</a>
					</div>
				</div>
				<div class="login" v-else key="login">
					<div class="login-content-title">
						用户登录
					</div>
					<el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="70px" class="demo-ruleForm">
						<el-form-item label="用户名" prop="name">
							<el-input v-model.number="ruleForm1.name"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="pass" class="form-label">
							<el-input type="password" v-model="ruleForm1.pass" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
							<el-button @click="resetForm('ruleForm1')">重置</el-button>
						</el-form-item>
					</el-form>
					<div class="login-content-footer">
						<a href="javascript:;" title="" @click="isShowSign=!isShowSign">注册</a>
						<a href="javascript:;" title="" @click="back">取消</a>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import io from "./../../socket.io.js"
export default {
	name: 'lee-login',
	data() {
		var checkName = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('用户名不能为空'));
			}
			if (value.length<2 || value.length>16) {
				callback(new Error('用户名长度在3到16位'));
			}else{
				callback();
			}
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else if(value.length<3 || value.length>16){
				callback(new Error('密码长度在6到16位'));
			} else {
				if (this.ruleForm2.checkPass !== '') {
				this.$refs.ruleForm2.validateField('checkPass');
			}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if(value.length<3 || value.length>16){
				callback(new Error('密码长度在6到16位'));
			} else if (value !== this.ruleForm2.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};

		var checkName1 = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('用户名不能为空'));
			}
			if (value.length<2 || value.length>16) {
				callback(new Error('用户名长度在3到16位'));
			}else{
				callback();
			}
		};
		var validatePass1 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			}
			if (value.length<6 || value.length>16) {
				callback(new Error('密码长度在6到16位'));
			}else{
				callback();
			}
		};
		return {
			ruleForm2: {
				pass: '',
				checkPass: '',
				name: ''
			},
			ruleForm1: {
				pass: '',
				name: ''
			},
			rules2: {
				pass: [
					{ validator: validatePass, trigger: 'blur' }
					],
					checkPass: [
					{ validator: validatePass2, trigger: 'blur' }
					],
					name: [
					{ validator: checkName, trigger: 'blur' }
				]
			},
			rules1: {
				pass: [
					{ validator: validatePass1, trigger: 'blur' }
					],
					name: [
					{ validator: checkName1, trigger: 'blur' }
				]
			},
			isShowSign: false,
			num: 0,
			};
		},
	computed: {
		login() {
			return this.$store.state.login;
		}
	},
	mounted() {
		
	},
	watch: {
		login(value) {
			if(value){
				document.addEventListener("keydown", this.addEnterEvent, false);
			}else{
				document.removeEventListener("keydown", this.addEnterEvent, false);
			}
		}
	},
	methods: {
		submitForm(formName) {
			// this.$store.state.loading=true;
			if(formName=="ruleForm1"){
				// 登录
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var socket = io();
						var sendData={
							whereStr: {
								_id : "user"
							},
							sendMsg: {
								name: this.ruleForm1.name, 
								pword: this.ruleForm1.pass
							}	
						}
						socket.emit('login', sendData);
						
						socket.on('login', (data)=>{
							var onOff=true;
							var ind=0;
							if(data.result==="1"){
								onOff=false;
								ind=data.index;
							}
							socket.off("login");

							if(onOff){
								this.$message({
									message: '用户名或密码输入错误',
									center: true,
									duration: 3000,
									type: "wrong"
								});
								this.$refs[formName].resetFields();
							}else{
								// 登录成功，写入sessionStore和数据库
								this.addSession(ind);
							}	
							
							this.$store.state.loading=false;
							
						});
					} else {
						return false;
					}
				});
			}else{
				// 注册
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var socket = io();
						var sendData={
							whereStr: {
								_id : "user"
							},
							sendMsg: {
								name: this.ruleForm2.name
							}
						}
						socket.emit('sign', sendData);
						socket.on('sign', (data)=>{
							var onOff=data.isNoExit;
							this.num=data.num;
							// 用户名不存在
							if(onOff){
								socket.off("sign");
								// 添加到数据库
								this.addUser();
							}else{
								this.$message({
									message: '用户名已存在，请重新输入',
									center: true,
									duration: 3000,
									type: "wrong"
								});
								this.$refs[formName].resetFields();
								socket.off("sign");
							}
						});
					} else {
						return false;
					}
				});
			}
		},
		// 登录成功
		addSession(index) {
			// 每次重新登录时自动生成一个字符存到数据库和sessionStore中，进入页面时判断是否相等，相等则取出name值
			let str=new Date().getTime();
			sessionStorage.setItem("id", str);
			let socket = io();
			var sendData={
				session: str,
				index: index
			}
			socket.emit('login addSession', sendData);
			socket.on('login addSession', (data)=>{
				if(data.ok==1){
					// 评论列表用户名刷新(当前是否登陆成功状态)
					this.$store.state.loginSuccess=true;
					// this.$store.getters.getPower(this.$parent.init);
				}else{
					console.log("登陆失败")
				}
				socket.off("login addSession");
			});
			this.$store.state.login=false;
		},
		addUser() {
			let socket = io();
			var sendData={
				name: this.ruleForm2.name,
				pass: this.ruleForm2.pass,
				num: this.num
			}
			socket.emit('sign addUser', sendData);
			socket.on('sign addUser', (data)=>{
				if(data.ok==1){
					this.$message({
						message: '注册成功',
						center: true,
						duration: 3000,
						type: "success"
					});
				}else{
					console.log("注册失败")
				}
				socket.off("sign addUser");
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		changeState() {
			this.isShowSign=!this.isShowSign;
		},
		back() {
			this.$store.state.login=false;
		},
		// 点击enter键注册登录
		addEnterEvent() {
			var e=window.event || event;
			if(e.keyCode===13){
				if(this.isShowSign){
					this.submitForm('ruleForm2');
				}else{
					this.submitForm('ruleForm1');
				}
			}
		}
	}
  }
</script>

<style lang="scss">
	// 导航动画
	.login-enter-active {
		animation: login-in .3s forwards;
	}
	.login-leave-active {
		animation: login-out .3s forwards;
	}
	@keyframes login-out {
		0%{
			transform: translateX(0%);
		}
		100%{
			transform: translateX(100%);
		}
	}
	@keyframes login-in {
		0%{
			transform: translateX(-100%);
		}
		100%{
			transform: translateX(0%);
		}
	}
	#login{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: rgba(0,0,0,.6);
		z-index: 99;
		.login-content{
			width: 350px;
			height: 470px;
			border: 1px solid #fff;
			margin: 50px auto;
			padding: 0px 30px;
			position: relative;

			transform-style: preserve-3d;
			overflow: hidden;
			.sign,
			.login{
				width: 100%;
				height: 100%;
			}
			.login-content-title{
				width: 100%;
				height: 100px;
				line-height: 100px;
				text-align: center;
				font-size: 26px;
				color: #fff;
			}
			label{
				color: #fff;
			}
			.login-content-footer{
				width: 100%;
				text-align: right;
				a{
					font-size: 16px;
					color: #fff;
					margin-left: 15px;
				}
			}
		}
	}
	@media only screen and (max-width: 767px){
		#login{
			.login-content{
				width: 260px;
				height: 420px;
				padding: 0px 15px;
			}
		}
	}
</style>

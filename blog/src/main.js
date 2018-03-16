import Vue from 'vue'

// import { Pagination, FormItem, Row, Col, Loading, Form, Button, ButtonGroup, Table, Input, Message, TableColumn, MessageBox } from 'element-ui'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'

import VueRouter from "vue-router"
import VueResource from "vue-resource"
import Vuex from "vuex"

// Vue.use(Pagination)
// Vue.use(FormItem)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Loading)
// Vue.use(Form)
// Vue.use(Button)
// Vue.use(ButtonGroup)
// Vue.use(Table)
// Vue.use(Input)
// // Vue.use(Message)		不需要
// Vue.use(TableColumn)
// Vue.use(MessageBox)

Vue.use(ElementUI)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

// const home = () => import('./assets/components/lee-article.vue');
// const list = () => import('./assets/link/lee-list.vue');
// const text = () => import('./assets/link/lee-text.vue');
// const manager = () => import('./assets/link/lee-manager.vue');
// const add = () => import('./assets/manager/lee-manager-add.vue');

import home from "./assets/components/lee-article.vue"
import list from "./assets/link/lee-list.vue"
import timeaxis from "./assets/link/lee-timeaxis.vue"
import text from "./assets/link/lee-text.vue"
import about from "./assets/link/lee-about.vue"
import manager from "./assets/link/lee-manager.vue"
import add from "./assets/manager/lee-manager-add.vue"
import error from "./assets/components/lee-error.vue"
import axios from "axios"
// 注册路由
const router=new VueRouter({
	mode: "history",
	base: __dirname,
	routes: [
		{
			path: "/home",
			name: "home",
			alias: "/",
			// redirect: "/manager",
			component: home
		},
		{
			path: "/list",
			name: "list",
			component: list
		},
		{
			path: "/timeaxis/:type",
			name: "timeaxis",
			props: true,
			component: timeaxis
		},
		{
			path: "/text/:id",
			name: "text",
			props: true,
			component: text
		},
		{
			path: "/about",
			name: "about",
			props: true,
			component: about
		},
		{
			path: "/manager",
			name: "manager",
			props: true,
			component: manager
		},
		// 新增随笔
		{
			path: "/manager/add/:id",
			name: "manager/add",
			props: true,
			component: add
		},
		// 404
		{
			path: "*",
			name: "error",
			component: error
		},
	]
})

const store=new Vuex.Store({
	state: {
		managerName: "凉宫西辰",	// 管理员姓名
		isShowAside: true,
		loading: false,
		login: false,			// 是否显示登陆窗
		count: 0,
		loginSuccess: false,	// 用户是否登陆成功(主要用于用户登陆成功时刷新用户名)
		logLength: 0,			// 共计多少篇日志
		ListLength: 0,			// 共计多少分类
		isShowManager: false,	// 是否显示管理链接
	},
	mutations: {
		changeAside(state) {
			state.isShowAside=!state.isShowAside;
		},
		backToTop() {
			let leader=0,point=0;
			let step=(point-leader)/5;
			step=step>0? Math.ceil(step) : Math.floor(step);
			leader=leader+step;
			window.scrollTo(0,leader);
			if(leader>0){
				requestAnimationFrame(backToTop);
			}
		}
	},
	getters: {
		getPower: ()=>(callback)=>{
			let value = sessionStorage.getItem("id");
			if(!!value){
				// 若name为-，则说明没有拿到数据，即session已经更改，已经在另一个窗口登陆，需清空当前窗口登陆信息
				var name="-";
				var sendData={
					whereStr: {
						_id : "user"
					},
					value: {
						id: Number(value)
					}
				}

				axios({
					method: 'post',
					url: '/commentLogin',
					data: sendData
				})
				.then((res)=>{
					if(res.data.data!==-1){
						name=res.data.data;
					}
					callback(name);
				})
				.catch((error)=>{
					console.log(error);
				});
			}else{
				callback("");
			}

		}
		
	}
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

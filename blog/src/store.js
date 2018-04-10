import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)

import axios from "axios"
export default {
    store: function () {
        return new Vuex.Store({
            state: {
                isManager: false,			// 当前是否为管理员登陆
                isShowAside: true,			// 是否显示侧边栏
                loading: false,				// 是否显示加载窗
                login: false,				// 是否显示登陆窗
                count: 0,					// 网站总访问量
                loginSuccess: false,		// 用户是否登陆成功(主要用于用户登陆成功时刷新用户名)
                logLength: 0,				// 共计多少篇日志
                ListLength: 0,				// 共计多少分类
                isShowManager: false,		// 是否显示管理链接
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
                getPower: (state)=>(callback)=>{
                    let value = sessionStorage.getItem("id");
                    if(!!value){
                        // 若name为-，则说明没有拿到数据，即session已经更改，已经在另一个窗口登陆，需清空当前窗口登陆信息
                        var name="-";
                        var sendData={
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
                                state.isManager=res.data.isManager;
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
    }
}
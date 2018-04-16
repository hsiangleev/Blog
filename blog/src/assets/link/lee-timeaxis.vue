<template>
	<div id="timeaxis">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="search" placeholder="查找文章"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :plain="true" @click="searchArticle">查询</el-button>
            </el-form-item>
        </el-form>
		<ul>
            <transition-group name="list" tag="p" appear>
                <li key="-1">
                    <i></i>
                    <p>共计 {{ data.length }} 篇日志，继续努力！</p>
                </li>
                <li v-for="(val,index) in data" :key="index+1">
                    <i></i>
                    <a href="javascript:;" @click="changeRouter(val.num)">{{ val.time }} —— {{ val.title }}</a>
                </li>
                <li key="-2"></li>
            </transition-group>
        </ul>
	</div>
</template>

<script>
import axios from "axios"
export default {
	name: 'lee-timeaxis',
	data () {
		return {
            timer: null,
            data: [],
            isShow: false,
            typeArr: [],
            search: ""
		}
    },
    computed: {
        type() {
            return this.$route.params.type
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        // 获取数据，初始化数据
		init() {
			// 获取当前登录的name
			this.$store.state.loading=true;
			var sendData={
                type: this.type,
                search: false,
            }
            axios({
				method: 'post',
				url: '/timeaxis',
				data: sendData
			})
			.then((res)=>{
                if(this.type==="all"){
                    this.isShow=true;
                }
                axios({
                    method: 'post',
                    url: '/getClassify',
                    data: {}
                })
                .then((r)=>{
                    this.typeArr=res.data.data;
                    r.data.data.forEach((val,index)=>{
                        if(val===this.type){
                            this.isShow=true;
                        }
                    })

                    // 判断路由是否正确
                    if(!this.isShow){
                        this.$router.push("../error");
                        this.$store.state.loading=false;
                        return;
                    }

                    var i=0;
                    clearInterval(this.timer);
                    this.timer=setInterval(()=>{
                        if(i<res.data.data.length){
                            // 逐个放入，动画效果
                            this.data.push(res.data.data[i]);
                            i++;
                        }else{
                            clearInterval(this.timer);
                        }
                    },100)
                    this.$store.state.loading=false;
                })
                .catch((error)=>{
                    console.log(error);
                });
			})
			.catch((error)=>{
				console.log(error);
			});
        },
        changeRouter(index) {
            this.$router.push({ path: `/text/${index}` })
        },
        searchArticle() {
            if(this.search==""){
                this.$message({
					message: '请输入关键字',
					center: true,
					duration: 1500,
					type: "warning"
				});
				return;
            }
            this.$store.state.loading=true;
			var sendData={
                search: true,
                searchStr: this.search
            }
            axios({
				method: 'post',
				url: '/timeaxis',
				data: sendData
			})
			.then((res)=>{
                var i=0;
                this.data=[];
                // this.search="";
                clearInterval(this.timer);
                this.timer=setInterval(()=>{
                    if(i<res.data.data.length){
                        // 逐个放入，动画效果
                        this.data.push(res.data.data[i]);
                        i++;
                    }else{
                        clearInterval(this.timer);
                    }
                },100)
                this.$store.state.loading=false;
			})
			.catch((error)=>{
				console.log(error);
			});
        }
    }
}
</script>

<style lang="scss">
    .list-enter-active {
        transition: all 0.5s;
    }
    .list-leave-active {
        transition: all 0.2s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateY(-100px);
    }
	#timeaxis{
        padding: 25px 0px;
        position: relative;
        z-index: 2;
        button, input {
			background-color: transparent;
		}
        ul{
            border-left: 4px solid #f5f5f5;
            li{
                list-style: none;
                position: relative;
                min-height: 20px;
                padding: 20px;
                border-bottom: 1px dashed #ccc;
                &:first-of-type{
                    i{
                        top: 0px;
                        width: 14px;
                        height: 14px;
                        left: -9px;
                    }
                    p{
                        color: #333;
                        font-size: 20px;
                        position: absolute;
                        top: -3px;
                    }
                }
                &:nth-of-type(1){
                    border-bottom: 0px;
                }
                &:last-of-type{
                    border-bottom: 0px;
                    min-height: 10px;
                    padding-top: 5px;
                    padding-bottom: 5px;
                }
                i{
                    width: 8px;
                    height: 8px;
                    background-color: #ccc;
                    border-radius: 50%;
                    display: inline-block;
                    position: absolute;
                    left: -6px;
                    top: 24px;
                }
                a{
                    font-size: 14px;
                    line-height: 22px;
                    &:hover{
                        color: #f69;
                    }
                }
            }
        }
    }
</style>

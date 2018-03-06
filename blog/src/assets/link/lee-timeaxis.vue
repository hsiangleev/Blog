<template>
	<div id="timeaxis">
		<ul>
            <transition-group name="list" tag="p" appear>
                <li key="0">
                    <span></span>
                    <p>目前共计 {{ data.length }} 篇日志，继续努力！</p>
                </li>
                <li v-for="(val,index) in data" :key="index+1">
                    <span></span>
                    <a href="javascript:;" @click="changeRouter(val.num)">{{ val.time }} —— {{ val.title }}</a>
                </li>
                <li :key="len+2"></li>
            </transition-group>
        </ul>
	</div>
</template>

<script>
import io from "./../../socket.io.js"
export default {
	name: 'lee-timeaxis',
	data () {
		return {
            arr: [],
            len: 5,
            timer: null,
            data: []
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
			let socket = io();
			var sendData={
				whereStr: {
					_id: "blog"
				}
			}
			socket.emit('timeaxis', sendData);
			socket.on('timeaxis', (data)=>{
				// this.data=data.data;
                var i=0;
                clearInterval(this.timer);
                this.timer=setInterval(()=>{
                    if(i<data.data.length){
                        // 逐个放入，动画效果
                        this.data.push(data.data[i]);
                        i++;
                    }else{
                        clearInterval(this.timer);
                    }
                },200)
				socket.off("timeaxis");
                this.$store.state.loading=false;
			});
        },
        changeRouter(index) {
            this.$router.push({ path: `/text/${index}` })
        }
    }
}
</script>

<style lang="scss">
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateY(-30px);
    }
	#timeaxis{
        padding: 25px 0px;
        position: relative;
        z-index: 2;
        ul{
            border-left: 4px solid #f5f5f5;
            li{
                position: relative;
                min-height: 20px;
                padding: 20px;
                border-bottom: 1px dashed #ccc;
                &:first-of-type{
                    span{
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
                span{
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

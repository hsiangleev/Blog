<template>
	<div id="about">
        <div class="header">
            个人简介
        </div>
        <div class="dash-line"></div>
        <div class="info">
            <h2>基本信息</h2>
            <div class="info-line" v-for="(val,index) in dataInfo">
                <span>{{ val[0] }}：</span>{{ val[1] }}
            </div>
            <h2>自我介绍</h2>
            <div class="info-text">
                {{ dataText }}
            </div>
        </div>
        <div class="dash-line"></div>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
export default {
    name: 'lee-about',
	data () {
		return {
			dataInfo: [
                ["姓名","李祥"],
                ["性别","男"],
                ["出生于","1994"],
                ["常用ID","凉宫西辰"],
                ["学校","池州学院"],
                ["专业","计算机科学与技术"],
                ["邮箱","1547600955@qq.com"],
            ],
            dataText: "虽入前端，然设计灵感不足，又临毕业，故仿他人页面布局，以此做为毕业设计，不足之处，勿忘告知，原网链接（https://kongchenglc.coding.me）"
		}
	},
}
</script>

<style lang="scss">
	#about{
        position: relative;
        z-index: 2;
        .header{
            font-size: 36px;
            font-weight: 500;
            margin-top: 36px;
        }
        .dash-line{
            margin: 15px 0px;
            height: 2px;
            background: linear-gradient(45deg,              
                #f69 25%, #6f9 0, #6f9 50%,               
                #f69 0, #f69 75%, #6f9 0); 
            background-size: 10px 10px;
        }
        .info{
            h2{
                font-size: 24px;
                font-weight: 900;
                margin: 25px 0px;
            }
            .info-line{
                line-height: 30px;
                font-size: 18px;
                span{
                    display: inline-block;
                    width: 80px;
                }
            }
            .info-text{
                font-size: 16px;
                text-indent: 32px;
                line-height: 22px;
            }
        }
    }
</style>

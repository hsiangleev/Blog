<template>
	<div id="nest" ref="nest" @mousemove="addMousePoint" @mouseout="removeMousePoint">
		<canvas id="cvs"></canvas>
		<div class="cover" ref="cover"></div>
		<!-- <lee-article @addMousePoint="addMousePoint" @removeMousePoint="removeMousePoint"></lee-article> -->
		<router-view></router-view>
	</div>
</template>

<script>
import leeArticle from "./lee-article.vue"
export default {
	name: 'lee-nest',
	data () {
		return {
			ctx: "",
			cvsWidth: 0,
			cvsHeight: 0,
			randomPoint: [],
			mousePoint: {
				x: null,
				y: null,
				max: 150
			},
			allPoint: [],
			parentWidth: 0
		}
	},
	components: {
		leeArticle
	},
	mounted() {
		this.init();
		this.addRandomPoint();
		this.move();
	},
	methods: {
		init() {
			var cvs=document.getElementById('cvs');
			this.ctx=cvs.getContext('2d');
			this.cvsWidth=cvs.width=this.$refs["cover"].clientWidth;
			this.cvsHeight=cvs.height=this.$refs["cover"].clientHeight;
			
			window.addEventListener("resize", ()=>{
				this.cvsWidth=cvs.width=this.$refs["cover"].clientWidth;
				this.cvsHeight=cvs.height=this.$refs["cover"].clientHeight;
			}, false)
		},
		move() {
			this.ctx.clearRect(0, 0, this.cvsWidth, this.cvsHeight);
			this.randomPoint.forEach((val,index)=>{
				this.ctx.fillStyle='rgb(90,90,90)';
				this.ctx.fillRect(val.x-1,val.y-1,2,2);
				val.x+=val.speedX;
				val.y+=val.speedY;

				if(val.x>this.cvsWidth-5 || val.x<=0){
					val.speedX=-val.speedX;
				}
				if(val.y>this.cvsHeight-5 || val.y<=0){
					val.speedY=-val.speedY;
				}

				// 任意两点之间的距离小于定长时，连线
				for(let i=index+1; i<this.allPoint.length; i++){
					let pi=this.allPoint[i];
					if(pi.x !== null && pi.y !== null){
						let distX=val.x-pi.x;
						let distY=val.y-pi.y;
						// 两点之间的距离
						let dist=Math.floor(Math.sqrt(distX*distX+distY*distY));
						//当两点距离小于极限距离时会产生连线，当第二个点是鼠标所产生点时，第一个点在范围内会产生向鼠标点的速度，产生吸附效果
						dist < pi.max && (pi === this.mousePoint && dist >= pi.max / 2 && (val.x -= 0.08 * distX, val.y -= 0.08 * distY));

						// 两点之间的距离比率(0-1)
						let w=(val.max-dist)/val.max;		
						this.ctx.beginPath();
						this.ctx.moveTo(val.x,val.y);
						this.ctx.lineTo(pi.x,pi.y);
						this.ctx.lineWidth = w / 2;
						this.ctx.strokeStyle=`rgba(90,90,90,${w + 0.2})`;
						this.ctx.stroke();
					}
						
				}

			})
			requestAnimationFrame(this.move);
			
		},
		addRandomPoint() {
			// 手机端显示25个
			if(document.body.offsetWidth<768){
				var len=25;
			}else{
				var len=50;
			}
			for(var i=0; i<len; i++){
				let x=Math.floor(Math.random()*this.cvsWidth);
				let y=Math.floor(Math.random()*this.cvsHeight);
				let speedX=Math.random()*3-1.5;
				let speedY=Math.random()*3-1.5;
				let max=100;

				this.randomPoint[i]={x,y,speedX,speedY,max};
			}
			this.allPoint = [...this.randomPoint,this.mousePoint];
		},
		addMousePoint() {
			let e=window.event || event;
			this.mousePoint.x=e.clientX;
			this.mousePoint.y=e.clientY;
		},
		removeMousePoint() {
			this.mousePoint.x=null;
			this.mousePoint.y=null;

		}
	}
}
</script>

<style lang="scss">
	#nest{
		position: relative;
		z-index: 0;
		padding: 0px 100px;
		margin-bottom: 100px;
		box-sizing: border-box;
		canvas{
			position: fixed;
			top: 0px;
			left: 0px;
		}
		.cover{
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
	}
	@media only screen and (max-width: 767px){
		#nest{
			padding: 0px;
		}
	}
	@media only screen and (min-width: 1200px){
		#nest{
			padding: 0px 180px;
		}
	}
	@media only screen and (min-width: 1500px){
		#nest{
			padding: 0px 256px;
		}
	}
</style>

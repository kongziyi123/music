<template>
	<div class="slide3">
		<div class="block">
			<div class="demonstration">
				<span class="title-bg"></span>
			</div>
			<div class="slide-warp">
				<el-carousel  ref="carousel" :autoplay='false' trigger="click" height="280px">
				    <el-carousel-item v-for="(arr,i) in slidelength">
				    			<div v-for="item in slidearr[i]" class="imgitem-warp">
				    				<router-link  :to="/alibuminformation/+item.jump_info.url" class="imgitem">
					    		 		<img :src="item.pic_info.url" alt="" >
					    			 </router-link>		    				
				    			</div>	    	
				    </el-carousel-item>
				</el-carousel>
				<div class="switch prve" @click="prve">
					<span></span>
				</div>
				<div class="switch next" @click="next">
					<span></span>
				</div>
			</div>
 	 	</div>
	</div>
</template>
<script>
import {Playlistrecommended} from '@/api/home'
export default{
	data(){
		return{
			ind:0,
			recommendeditems:''
		}
	},
	mounted(){
		setTimeout(()=>{
			this.recommendeditems=this.imgitems;
		},100)
	},
	methods:{
		prve(){
			this.$refs.carousel.prev();
		},
		next(){
			this.$refs.carousel.next();
		},
		play123(){
			
		},		
	},
	computed:{
		slidelength(){
			let length=parseInt(this.recommendeditems.length/2);
			return length>4?4:length
		},
		slidearr(){
			let arr=[];
			for(var i=1;i<=this.slidelength;i++){
				arr.push(this.recommendeditems.slice((i-1)*2,i*2))
			}
			return arr;
		}
	},
	mounted(){
		setTimeout(()=>{
				this.recommendeditems=this.foucusimg;	
			},550)
	},
	props:{
		foucusimg:{
			default:{

			}
		},

	},
	filters:{
		conversion(num){
			return (num/10000).toFixed(1);
		}
	},
	components:{
	}

}
</script>
<style lang="less">
	.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__arrow{
  	border-radius:0px;
  	display:block;
  	font-size:60px;
  	background:none;
  	top:50%;
  	margin-top:-55px;
  	color:#000;
  }
	 .el-carousel__indicators{
		  .el-carousel__indicator{
		  		border-radius:50%;
		  		button{
			    	background:#333;
			  		width:10px;
			  		height:10px;
			  		border-radius:50%;			
		  		}
		  }  
		  .is-active{
		  	button{
		  		background:#666;
		  		opacity:1;
		  	}
		 }	
	 }
	.el-carousel__arrow{
	 	color:#fff;
	 	display:none;
	 }
  .slide3{
  	width: 100%;
	background-image:linear-gradient(to top, #fff, #f2f2f2);
  	overflow: hidden;
  	margin-bottom:20px;
  	.block{
  		width:100%;
  		overflow:hidden;
	    .demonstration{
		  	margin-top: 50px;
			display:flex;
			justify-content: center;
		  	.title-bg{
		  		display:block;
			  	width:158px;
			  	height:32px;
			  	background:url(../../assets/title.png);
			  	background-position:-20px -100px; 		  		
		  	}
	  	}	
	  	.nav{
	  		width:600px;
	  		margin:0 auto;
	  		li{
	  			float: left;
	  			margin-left: 52px;
	  			font-size:13px;
	  			cursor: pointer;
	  		}
	  		.active{
				color:rgb(49,194,124);
	  		}
	  	}
	  	.slide-warp{
	  		width:1200px;
	  		margin:0 auto;
	  		position:relative;
		  	.el-carousel{
		  		width:1200px;
		  		padding:34px 0px;  
		  		.imgitem-warp{
					width:50%;
					float:left;
					.imgitem{
						img{
							width:100%;
							height:100%;
						}
					}
				}
		  	}
		  	.switch{
		  		width:79px;
		  		height:108px;
		  		background:rgb(238,238,238);
		  		position:absolute;
		  		top:100px;
		  		z-index: 999;
		  		display:flex;
		  		justify-content:center;
		  		align-items:center;
		  		cursor:pointer;
		  		transition:all .8s;
		  		&:hover{
		  			background:#ccc;
		  		}
		  		span{
		  			width:20px;
		  			height:37px;
		  			background:url(../../assets/icon_sprite.png);
		  		}
		  	}
		  	.prve{
		  		left:-180px;	
		  		span{		
		  			background-position:-20px -120px;
		  		}
		  	}
		  	.next{
		  		right:-180px;
		  		span{
		  			background:url(../../assets/icon_sprite.png);
		  			background-position:0px -120px;		
		  		}
		  	}
		  	&:hover{
		  		.prve{
		  			left:-80px;
		  		}
		  		.next{
		  			right:-80px;
		  		}
		  	}
	  	}

  	}

  }

</style>
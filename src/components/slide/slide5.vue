<template>
	<div class="slide5">
		<div class="block">
			<div class="demonstration">
				<span class="title-bg"></span>
			</div>
			<div class="nav-warp">
				<ul class="nav clearfix">
					<li v-for="(item,index) in listname" :item_id="item.item_id" :class="{'active':ind===index}" @click="changeI(index,item.lang)" v-if='index<6'>
						{{item.name}}
					</li>
				</ul>
			</div>
 			<div class="slide-warp">
				<el-carousel  ref="carousel" :autoplay='false' trigger="click" height="450px">
				    <el-carousel-item v-for="(item,i) in slidelength">
						<ul class="clearfix">
							<li v-for="list in slidearr[i]" class="list">
								<div class="img">
									<img :src="list.picurl" alt="">
								</div>
								<p class="name">
									<a href="##">{{list.mvtitle}}</a>
								</p>
								<p class="singer">
									<a href="##">{{list.singername}}</a>
								</p>
								<p class="number"><span>{{list.listennum|conversion}}</span></p>	
							</li>
						</ul>
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
import {Playlistrecommended,addzero} from '@/api/home'
export default{
	data(){
		return{
			ind:0,
			recommendeditems:'',
			songindex:[0,1,2],
			listname:[{name:'精选',lang:'all'},{name:'内地',lang:'neidi'},{name:'韩国',lang:'korea'},{name:'港台',lang:'gangtai'},{name:'欧美',lan:'oumei'},{name:'日本',lang:"janpan"}]
		}
	},
	mounted(){
			this.recommendeditems=this.mylist;
	},
	methods:{
		changeI(index,id){
			this.ind=index;
			var option={
				g_tk:5381,
				loginUin:0,
				hostUin:0,
				format:'json',
				inCharset:'utf8',
				outCharset:'utf-8',
				notice:0,
				platform:'yqq',
				needNewCode:0,
				cmd:'shoubo',
				lan:'janpan'
			};
			option.lan=id;
			if(id)
			{
				this.ajax.get('qq/v8/fcg-bin/getmv_by_tag',{
					params:option
				}).then((resolve)=>{
					this.recommendeditems=resolve.data.data.mvlist;
				}).catch(()=>{

				})
			
			}
			this.$refs.carousel.setActiveItem(0);
		},
		prve(){
			this.$refs.carousel.prev();
		},
		next(){
			this.$refs.carousel.next();
		},
	},
	computed:{
		slidelength(){
			let length=parseInt(this.recommendeditems.length/10);
			return length>4?4:length
		},
		slidearr(){
			let arr=[];
			for(var i=1;i<=this.slidelength;i++){
				arr.push(this.recommendeditems.slice((i-1)*10,i*10))
			}
			return arr;
		}
	},
	props:{
		mylist:{
			default(){
				return{

				}
			}
		}

	},
	filters:{
		conversion(num){
			if(num>10000)
				return (num/10000).toFixed(1)+"万";
			else
			{
				return num
			}

		},
		imgadd(url){
			return "http://y.gtimg.cn/music/photo_new/T002R90x90M000"+url+".jpg?max_age=2592000";
		},
		timeset(time){
			let f=addzero(parseInt(time/60));
			let miao=addzero(parseInt(time%60));
			return f+":"+miao
		}
	},
	components:{
	},
	created(){
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
  .slide5{
  	width: 100%;
	background-image:linear-gradient(to top, #fff, #f2f2f2);
  	overflow: hidden;
  	.block{
  		width:100%;
  		overflow:hidden;
	    .demonstration{
		  	margin-top: 50px;
			display:flex;
			justify-content: center;
			margin-bottom:36px;
		  	.title-bg{
		  		display:block;
			  	width:158px;
			  	height:32px;
			  	background:url(../../assets/title.png);
			  	background-position:-20px -245px; 		  		
		  	}
	  	}	
	  	.nav-warp{
	  		display:flex;
	  		justify-content:center;
		  	.nav{
		  		display:inline-block;
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
	  	}  	

	  	.slide-warp{
	  		width:1200px;
	  		margin:0 auto;
	  		position:relative;
		  	.el-carousel{
		  		width:1200px;
		  		padding:34px 0px;
		  		.list{
					float:left;
					display:inline-block;
					width:20%;
					overflow:hidden;
					padding-left:20px;
					box-sizing:border-box;
					margin-bottom:30px;
					.img{
						position:relative;
						overflow:hidden;
						cursor:pointer;
						img{
							height:124px;
							width:100%;
							margin-bottom:15px;
						
						}
						&::before{
							content:'';
							position:absolute;
							width:50px;
							height:50px;
							top:50%;
							left:50%;
							margin-top:-25px;
							margin-left:-25px;
							background:url(../../assets/cover_play.png);
							background-size:cover;
							opacity:0;
							transition:all .4s;

						}
						&:hover{
							&::before{
								opacity:1;
								transform: scale(1.3, 1.3);
							}
						}
					}

					.name{
						width:100%;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						line-height:21px;
						a{
							color:#333;	
						}
						
					}
					.singer{
						line-height:21px;
						a{
							color:#999;
						}
					}
					.number{
						position:relative;
						color:#999;
						text-indent: 26px;
						margin-top:2px;
						&::before{
							position:absolute;
							width:20px;
							height:12px;
							content:'';
							background:url(../../assets/icon_sprite.png);
							background-position:-180px -20px;
							left:-0px;
						}
					}
				}
		  	}
		  	.switch{
		  		width:79px;
		  		height:108px;
		  		background:rgb(238,238,238);
		  		position:absolute;
		  		top:150px;
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
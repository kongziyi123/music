<template>
	<div class="slide2">
		<div class="block">
			<div class="demonstration">
				<span class="title-bg"></span>
			</div>
			<div class="nav-warp">
				<ul class="nav clearfix">
					<li v-for="(item,index) in listname" :item_id="item.item_id" :class="{'active':ind===index}" @click="changeI(index,item.id)" v-if='index<5'>
						{{item.title}}
					</li>
				</ul>
			</div>
 			<div class="slide-warp">
				<el-carousel  ref="carousel" :autoplay='false' trigger="click" height="350px">
				    <el-carousel-item v-for="(item,i) in slidelength">
				    	<ul class="newsong_warp">
				    		<div class="song_flex" v-for="song_item in songindex">
				   				<li v-if="index>=song_item*3&&index<(song_item+1)*3" class="songitem" v-for='(song,index) in slidearr[i]'>
				   				<router-link :to="/songinformation/+song.mid" class="img" :title="song.title">
				   					<img  :src="song.album.mid|imgadd" alt="">
				   				</router-link>
				   				<!-- {{song}} -->
				   				<div class="details">
				   					<router-link :to="/songinformation/+song.mid" class="song_name" :title="song.title">
				   						{{song.title}}
				   					</router-link>
									<p class="songer">
											
										<router-link :to="/singerHome/+singer.mid" v-for="singer in song.singer" :title="singer.name">
											{{singer.name}}
										</router-link>
									</p>
				   				</div>
				   				<div class="time">
				   					{{song.interval|timeset}}
				   				</div>
					    		
					    		</li> 			
				    		</div>

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
			songindex:[0,1,2]
		}
	},
	mounted(){
		setTimeout(()=>{
			this.recommendeditems=this.imgitems;
		},1000)
	},
	methods:{
		changeI(index,id){
			this.ind=index;
			if(id)
			{
				let promise=this.gettype(id);
				promise.then((resolve)=>{
					this.song_list=resolve.new_song.data.song_list;
				}).catch((reject)=>{

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
		gettype(type){
			let url="https://u.y.qq.com/cgi-bin/musicu.fcg?";
			let data={"comm":{"ct":24},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":1}}}
			data.new_song.param.type=type;
			let option={
				callback:'recom19754129272082865',
				jsonpCallback:'recom19754129272082865',
			}
			return Playlistrecommended(url,data,option);	
		}

	},
	computed:{
		slidelength(){
			let length=parseInt(this.song_list.length/9);
			return length>4?4:length
		},
		slidearr(){
			let arr=[];
			for(var i=1;i<=this.slidelength;i++){
				arr.push(this.song_list.slice((i-1)*9,i*9))
			}
			return arr;
		}
	},
	mounted(){
	},
	props:{
		listname:{
			default(){
				return{

				}
			}
		},
		song_list:{
			default(){
				return{

				}
			}
		}

	},
	filters:{
		conversion(num){
			return (num/10000).toFixed(1);
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
  .slide2{
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
			  	background-position:-20px -50px; 		  		
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
		  		.newsong_warp{
 					.song_flex{
 						display:flex;
 						margin-top:20px;
 						border-bottom:1px solid #f2f2f2;
 						.songitem{
							flex:1;
							display:flex;
							.img{
								width:86px;
								height:86px;
								float:left;
								display:block;
								cursor:pointer;
								position:relative;
								overflow:hidden;
								img{
									width:100%;
									height:100%;
									transition:all .6s;
								}
								&::before{
									content:'';
									width:100%;
									height:100%;
									background:#000;
									position:absolute;
									opacity:0;
									top:0px;
									left:0px;
									transition:all .3s;
									z-index:99;
								}
								&::after{
									content:'';
									width:40px;
									height:40px;
									position:absolute;
									top:50%;
									left:50%;
									margin-top:-20px;
									margin-left:-20px;
									background:url("../../assets/cover_play.png");
									background-size:cover;
									opacity:0;
									transition:all .6s;
									z-index:999;
								}
								&:hover{
									&::after{
										opacity:1;
										transform: scale(1.2, 1.2);
									}	
									&::before{
										opacity:.4;
									}	
									img{
										transform: scale(1.1, 1.1);
									}					
								}
							}
							.details{
								flex:1;
								box-sizing: border-box;
								padding:25px 14px;
								float:left;
								line-height:23px;
								.song_name{
									color:#333;
									transition:all .5s;
									&:hover{
										color:rgb(67,199,135);
									}
								}
								.songer{
									a{
										transition:all .5s;
										color:#999;
										&:hover{
											color:rgb(67,199,135);
										}
									}
									
								}
							}
							.time{
								float:right;
								line-height:86px;
								margin-right: 30px;
								color:#a4a4a4;
							}
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
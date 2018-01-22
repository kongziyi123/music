<template>
	<div class="slide4">
		<div class="block">
		<div class="demonstration">
				<span class="title-bg"></span>
			</div>
			<div class="nav-warp">
				<ul class="nav clearfix">
					<li v-for="(item,index) in recommendeditems.type_info" :class="{'active':ind===index}" @click="changeI(index,item.id)" v-if='index<5'>
						{{item.title}}
					</li>
				</ul>
				<li class="moreamore"><a href="">更多</a></li>
			</div>
 			<div class="slide-warp">
				<el-carousel  ref="carousel" :autoplay='false' trigger="click" height="600px">
				    <el-carousel-item v-for="(item,i) in slidelength">
				    	<ul class="newsong_warp">
							<li v-for="img in slidearr[i]" >
								<!-- <router-link :to="/alibuminformation/+img.album.mid"> -->
									<div class="img" @click="goto($event,img)">
										<div class="mask">
											<i></i>
										</div>
										<img :src="img.album.mid|imgadd" alt="">
									</div>
								<!-- </router-link> -->
								<router-link :to="/alibuminformation/+img.album.mid"  class="name">{{img.album.name}}</router-link>
								<p>
									<router-link :to="/singerHome/+s.mid" class="singer" v-for="(s,i) in img.author"><span v-if="i>0"> / </span>{{s.name}}</router-link>
								</p>	
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
import {apistr,musicurl} from '@/api/config'
import {Storage} from '@/api/home'
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
			this.recommendeditems=this.newdisc;
		},500)
	},
	methods:{
		changeI(index,id){	
			this.ind=index;
			console.log(index+","+id);
			var data1={"comm":{"ct":24},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":2,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}}};
			data1.new_album.param.type=id;
			var option={
				callback:'recom9208559516875492',
				jsonpCallback:'recom9208559516875492'
			}
			option=Object.assign({},apistr,option);
			var promise=Playlistrecommended("https://u.y.qq.com/cgi-bin/musicu.fcg?",data1,option);
			promise.then((d)=>{
				this.recommendeditems=d.new_album.data;
			})

			this.$refs.carousel.setActiveItem(0);
		},
		prve(){
			this.$refs.carousel.prev();
		},
		next(){
			this.$refs.carousel.next();
		},
		goto(event,album){
			if(event.target.nodeName.toLowerCase()==="i")
			{	
				let option={
					format:'json',
					onlysong:0,
					albummid:album.album.mid
				}
				option=Object.assign({},apistr,option);
				this.ajax.get("/qq/v8/fcg-bin/fcg_v8_album_info_cp.fcg",{
					params:option
				}).then((resolve)=>{
					let list=resolve.data.data.list;
					if(new Date().getTime()-Storage("playin")>1000)
					{
						Storage("playlist",list);
						window.open(musicurl);
					}
					else{
						if(Storage("playlist")!="")
						{
							let arr=Storage("playlist").concat(list);
							Storage("playlist",arr);
						}
						else
						{
							Storage("playlist",list);
						}
						this.$emit("tsshow");
					}
				}).catch(()=>{

				})
			}
			else{
				this.$router.push({name:'alibuminformation',params:{'id':album.album.mid}});
			}

		}
	},
	computed:{
		slidelength(){
			if(this.recommendeditems)
			{
				var l=this.recommendeditems.album_list.length;
				l=parseInt(l/10);
				return l>4?4:l;
			}
		},
		slidearr(){
			let arr=[];
			for(var i=1;i<=this.slidelength;i++){
				arr.push(this.recommendeditems.album_list.slice((i-1)*10,i*10))
			}
			return arr;
		}
	},
	props:{
		newdisc:{
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
			return "http://y.gtimg.cn/music/photo_new/T002R300x300M000"+url+".jpg?max_age=2592000";
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
  .slide4{
  	width: 100%;
	background-image:linear-gradient(to top, #fff, #f2f2f2);
  	overflow: hidden;
  	min-width: 1200px;
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
			  	background-position:-20px -150px; 		  		
		  	}
	  	}	
	  	.nav-warp{
	  		display:flex;
	  		justify-content:center;
	  		position:relative;
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
		  	.moreamore{
		  		position:absolute;
		  		right:100px;
		  		top:6px;
		  		color:#333;
		  		&::after{
		  			content:'';
		  			position:absolute;
		  			right:-14px;
		  			top:0px;
		  			display:block;
		  			width:7px;
		  			height:12px;
		  			background:url(../../assets/icon_sprite.png);
					background-position:-120px -40px; 
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
		  		box-sizing: border-box;
		  		.newsong_warp{
					li{
						float:left;
						width:20%;
						padding-left:20px;
						box-sizing:border-box;
						padding-bottom: 30px;
						cursor:pointer;
						.img{
							width:220px;
							height:220px;
							display:block;
							position:relative;
							overflow:hidden;	
							.mask{
								width:100%;
								height:100%;
								position:absolute;
								top:0px;
								left:0px;
								transition:all .8s;
								background:rgba(0,0,0,0);
								i{
									width:49px;
									height:49px;
									position:absolute;
									background:url(../../assets/cover_play.png);
									background-size: cover;
									top:50%;
									left:50%;
									margin-top:-25px;
									margin-left:-25px;
									opacity:0;
									transition:all .8s;
								}
							}
							&:hover{
								.mask{
									z-index:999;
									background:rgba(0,0,0,.4);
									i{
										opacity:1;
										transform: scale(1.2, 1.2);
									}
								}
								img{
									transform: scale(1.1, 1.1);
								}
							}
							img{
								width:100%;
								height:100%;
								transition:all .8s;
							}
						}
						a{
							display:block;
						}
						.name{
							color:#333;
							margin-top:20px;
							margin-bottom:10px;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;

						}
						.singer{
							display:inline-block;
							color:#999;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}
		  		}

		  	}
		  	.switch{
		  		width:79px;
		  		height:108px;
		  		background:rgb(238,238,238);
		  		position:absolute;
		  		top:300px;
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
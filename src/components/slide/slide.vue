<template>
	<div class="slide">
		<div class="block">
			<div class="demonstration">
				<span class="title-bg"></span>
			</div>
			<ul class="nav clearfix">
				<li v-for="(item,index) in listname" :item_id="item.item_id" :class="{'active':ind===index}" @click="changeI(index,item.item_id)" v-if='index<5'>
					{{item.item_name}}
					<!-- {{item}} -->
				</li>
			</ul>
			<div class="slide-warp">
				<el-carousel  ref="carousel" :autoplay='false' trigger="click" height="320px">
				    <el-carousel-item v-for="(item,i) in slidelength">
				    	<ul class="clearfix list-items" >
					    	<li class="list-item" v-for="liitem in slidearr[i]">
					    		<span @click="goto(liitem.content_id||liitem.tid,$event)"  class="img-warp">
					    			<img v-lazy="liitem.cover||liitem.cover_url_big" alt="" >
					    			<div class="mask">
					    			</div>
					    			<div>
						    			<img class="play" src="../../assets/cover_play.png" alt="" 
						    			>
					    			</div>
					    		</span>
					    		<router-link :to="/listdetails/+liitem.content_id||liitem.tid" class="title">
					    			{{liitem.title}}
					    		</router-link>
					    		<p class="play_size">播放量:{{liitem.listen_num||liitem.access_num|conversion}}万</p>
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
import {Playlistrecommended,Storage} from '@/api/home'
import {musicurl,apistr} from '@/api/config'
export default{
	data(){
		return{
			ind:0,
			recommendeditems:''
		}
	},
	created(){
		Storage("playin",new Date().getTime());
	},
	methods:{
		changeI(index,id){
			this.ind=index;
			let option={
				callback:'recom4001304642372845',
				jsonpCallback:'recom4001304642372845'
			}
			if(index!=0)
			{
				
				let url="https://u.y.qq.com/cgi-bin/musicu.fcg?";
				let data={"comm":{"ct":24},"playlist":{"method":"get_playlist_by_category","param":{"id":59,"curPage":1,"size":40,"order":5,"titleid":59},"module":"playlist.PlayListPlazaServer"}};
				data.playlist.param.id=id;
				let promise=Playlistrecommended(url,data,option);
				promise.then((resolve)=>{
					this.recommendeditems=resolve.playlist.data.v_playlist
					console.log(resolve.playlist.data.v_playlist);
				}).catch((reject)=>{

				})
			}
			else
			{
				this.recommendeditems=this.imgitems;
			}
			this.$refs.carousel.setActiveItem(0);
		},
		prve(){
			this.$refs.carousel.prev();
		},
		next(){
			this.$refs.carousel.next();
		},
		goto(id,event){
			//  :to="/listdetails/+()"
			if(event.target.nodeName.toLowerCase()=="img")
			{
				let option={
					type:1,
					json:1,
					utf8:1,
					onlysong:0,
					disstid:id,
					format:'json'
				}
				option=Object.assign({},apistr,option);
				this.ajax.get('/api/someApi',{
					params:option
				}
				).then((data)=>{
					let idlist=data.data.cdlist[0].songlist;
					let listarr;
					if(new Date().getTime()-Storage("playin")>1000)
					{
						// Storage("playlist",'');
						localStorage.setItem("kong_playlist","");
					}
					if(localStorage.getItem("kong_playlist")==null||localStorage.getItem("kong_playlist")=='')
					{
						listarr=[];	
					}
					else{
						listarr=JSON.parse(localStorage.getItem("kong_playlist"));
					}
					listarr=listarr.concat(idlist);
					Storage("playlist","");
					Storage("playlist",listarr);
					if(new Date().getTime()-Storage("playin")<1000)
					{
						this.$emit("tsshow");
					}
					else
					{
						window.open(musicurl);
					}


				}).catch((reject)=>{

				})
			}
			else
			{
				var obj={name: 'listdetails', params: {id: id}};
				this.$router.push(obj)
			}
		}
	},
	computed:{
		slidelength(){
			let length=parseInt(this.recommendeditems.length/5);
			return length>4?4:length
		},
		slidearr(){
			let arr=[];
			for(var i=1;i<=this.slidelength;i++){
				arr.push(this.recommendeditems.slice((i-1)*5,i*5))
			}
			return arr;
		}
	},
	mounted(){
		setTimeout(()=>{
				this.recommendeditems=this.imgitems;	
			},550)
	},
	props:{
		listname:{
			default:{

			}
		},
		imgitems:{
			default:{

			}
		}
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
  .slide{
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
			margin-bottom:36px;
		  	.title-bg{
		  		display:block;
			  	width:158px;
			  	height:32px;
			  	background:url(../../assets/title.png);
			  	background-position:-20px 0px; 		  		
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
		  		
		  		.list-items{
			  		.list-item{
			  			float:left;
						  width:224px;
						  cursor:pointer;
			  			.img-warp{
			  				width:224px;
							height:224px;
							overflow:hidden;
							display: block;
							position:relative;
							img{
								width:100%;
								height:100%;
								transition:all .4s;
								cursor:pointer;
							}
							.mask{
								position:absolute;
								width:100%;
								height:100%;
								background:rgba(0,0,0,0.3);
								top:0px;
								left:0px;
								transition:all .4s;
								opacity:0;
							}
							.play{
								width:50px;
								height:50px;
								position:absolute;
								top:50%;
								left:50%;
								margin-top:-25px;
								margin-left:-25px;
								opacity:0;
								transition:all .8s;
							}
			  			}
			  			.img-warp:hover{
			  				img{
			  					transform: scale(1.1,1.1);
			  				}
			  				.mask{
			  					opacity:1;
			  				}
			  				.play{
			  					opacity:1;
			  					transform: scale(1.4, 1.4);
			  				}
			  			}
			  			.title{
				  			font-size:12px;
				  			color:#333;
				  			line-height:22px;
				  			margin-top:10px;
				  			width:90%;
				  			display:inline-block;
						}
				  		.play_size{
				  			color:#999;
				  			width:90%;
				  			display:inline-block;
				  			margin-top:2px;
						  }
						  a:hover{
							  color:#31c27c;
						  }
			  		}
			  		.list-item+.list-item{
			  			margin-left:20px;	
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
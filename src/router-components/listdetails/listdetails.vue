<template>
	<div class="listdetails" @click.stop="jjhide">
		<div class="main">
			<div class="title clearfix">
				<div class="img">
					<img :src="list.logo" alt="">
				</div>

				<div class="details">
					<div class="name">{{list.dissname}}</div>
					<a href="#" class="user">{{list.nickname}}</a>
					<p class="label">标签: <a href="" v-for="ia in list.tags">{{ia.name}}</a> </p>
					<p class="playsize">播放量: {{list.visitnum|conversion}}万</p>
					<p class="collection">收藏量: {{list.visitnum|shoucan}}</p>
					<div class="btns-warp">
						<btns @playall='playall'></btns>
					</div>
				</div>
			</div>
			<div class="list-container">
				<div class="songlist">
					<div class="list-head">
						<div class="td1">歌曲</div>
						<div class="td2">歌手</div>
						<div class="td3">专辑</div>
						<div class="td4">时长</div>
					</div>	
					<div class="list-body-warp">
						<div class="list-body" v-for="(item,index) in list.songlist">
							<div class="td1"><div class="tit">{{index+1}}</div>
							<router-link :to="/songinformation/+item.songmid">{{item.songname}}</router-link>
								<div class="bq"> <a href="" class="dj" v-if="item.isonly==1"></a>
						<a :href="item.vid|vid" 
								class="mv"
								v-if="item.vid"></a></div>
								<div class="buttons">
									<div @click="play(item)"></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							</div>
							<div class="td2"><router-link  :to="/singerHome/+singer.mid" v-for="(singer,ii) in item.singer"><span v-if="ii>0">/</span>{{singer.name}}</router-link></div>
							<div class="td3"><router-link :to="/alibuminformation/+item.albummid">{{item.albumname}}</router-link></div>
							<div class="td4">{{item.interval|time}}</div>				
						</div>						
					</div>

				</div>
				<div class="songright">
					<div class='Introduction'>
						<h2>简介</h2>
						<p v-html='list.desc'></p>
						<span @click.stop="jjshow">[更多]</span>
						<div class="more" v-if="jjshow">
							<happyscroll ref="more">
								<div>
									<h2>简介</h2>
									<div v-html='list.desc' class="more-content">
									</div>
								</div>
							</happyscroll>	
						</div>
					</div>
					<div class="similar" v-if="similar.length!=0">
						<div>
							<h2>相似歌单</h2>
							<div class="lists">
								<div class="list" v-for="item in similar">
								<router-link :to="/listdetails/+item.dissid">
									<img :src="item.imgurl" alt="">
									</router-link>
									<p>

									<router-link :to="/listdetails/+item.dissid" class="title" >
									{{item.dissname}}
									</router-link></p>
									
									<p><a href="" class="jj">{{item.creator.name}}</a></p>
									
								</div>
							</div>
						</div>	
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import happyscroll from "@/components/happyscroll/happyscroll"
import btns from "@/components/btns/btns"
import {Playlistrecommended} from '@/api/home'
import {addzero,Storage} from '@/api/home'
import {apistr,musicurl} from '@/api/config'
export default{
	data(){
		return {
			id:'',
			list:'',
			similar:''
		}
	},
	created(){
		this.initlist();		
	},
	watch:{
		$route(){
			window.scrollTo(0,0);
			this.initlist();
		}
	},
	methods:{
		initlist(){
			this.id=this.$route.params.id;
			let option={
				type:1,
				json:1,
				utf8:1,
				onlysong:0,
				disstid:this.id,
				format:'json'
			}
			// option.disstid=;
			option=Object.assign({},apistr,option);
			this.ajax.get('/api/someApi',{
				params:option
			}
			).then((data)=>{
				this.list=data.data.cdlist[0];
			}).catch((reject)=>{
			})

			//相似歌单
			let playlist_option={
				recomtype:2,
				dissid:this.id,
				maxnum:6,
				_:1514786682390,
				format:'json'
			}
			playlist_option=Object.assign({},apistr,playlist_option);
			this.ajax.get('/qq/musichall/fcgi-bin/fcg_similar_recomm.fcg',{
				params:playlist_option
			}).then((resolve)=>{
				this.similar=resolve.data.data.items;
				console.log(this.similar);
			}).catch((reject)=>{

			});
		},
		jjshow(){
			this.$refs.more.show();
		},
		jjhide(){
			this.$refs.more.hide();
		},
		playall(){
			if(new Date().getTime()-Storage("playin")>1000)
			{
				Storage("playlist",this.list.songlist);
				window.open(musicurl);
			}
			else
			{
				if(Storage("playlist")=="")
				{
					Storage("playlist",this.list.songlist);		
				}
				else
				{
					let list=Object.prototype.toString.call(Storage("playlist"))=="[object Array]"?Storage("playlist"):[];
					list=list.concat(this.list.songlist);
					Storage("playlist",list);					
				}
				this.$emit("musicts");
			}
		},
		play(music){
			if(new Date().getTime()-Storage("playin")>1000)
			{
				let musicarr=[];
				musicarr.push(music);
				Storage("playlist",musicarr);
				window.open(musicurl);
			}
			else
			{
				if(Storage("playlist")!="")
				{
					let musicarr=Storage("playlist")
					musicarr.push(music);
					Storage("playlist",musicarr);
				}
				else
				{
					let musicarr=[];
					musicarr.push(music);
					Storage("playlist",musicarr);
				}
				this.$emit("musicts");
			}
		}
	},
	filters:{
		conversion(num){
			return (num/10000).toFixed(1);
		},
		shoucan(num){
			return parseInt(num/30);
		},
		time(time){
			let f=addzero(parseInt(time/60));
			let miao=addzero(parseInt(time%60));
			return f+":"+miao
		},
		vid(url){
			return "https://y.qq.com/n/yqq/mv/v/"+url+".html";
		}
	},
	components:{
		btns,
		happyscroll
	}
}
</script>
<style lang="less">
	@sprite:url(../../assets/icon_sprite.png);
	.listdetails{
		width:100%;
		background-image:-webkit-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:-o-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:linear-gradient(to top, #fff, #f2f2f2);
		overflow:hidden;
		.main{
			width:1200px;
			margin:40px auto;
			.title{
				width:100%;
				.img{
					width:250px;
					height:250px;
					float:left;
					img{
						width:100%;
						height:100%;
					}
				}
				.details{
					display:inline-block;
					float:left;
					margin-left:56px;
					.name{
						font-size:30px;
						color:#000;
						margin-top:24px;
					}
					.user{
						font-size:14px;
						color:#333333;
						margin-top:15px;
						display:block;
						position:relative;
						text-indent: 20px;
						&::before{
							content:'';
							display:block;
							position:absolute;
							width:15px;
							height:15px;
							top:0px;
							left:0px;
							background:url(../../assets/icon_sprite.png);
							background-position:-20px -240px;
						}
						&:hover{
							color:rgb(112,196,135);
						}
					}
					.label{
						margin-top: 20px;
						a{
							color:#333333;
							margin-right: 8px;
							&:hover{
								color:rgb(112,196,135);
							}
						}						
					}
					.playsize{
						margin:14px 0px;
					}


				}
			}
			.list-container{
				width:100%;
				margin-top:50px;
				display:flex;
				.songlist{
					width:810px;
					.list-head{
						width:100%;
						display:flex;
						div{
							flex:1;
							line-height:20px;
							color:#999;
						}
						.td1{
							flex:1;
						}
						.td2{
							width:100px;
							flex:none;	
						}
						.td4{
							width:50px;
							flex:none;
						}
						.td3{
							width:200px;
							flex:none;
						}
						div:nth-of-type(1){
							text-indent:40px;
						}
					}
					.list-body-warp{
						margin-top:30px;
						.list-body{
							width:100%;
							display:flex;
							margin-bottom:40px;
							color:#a6b5d7;
							div{
								flex:1;
							}
							.td1{
								position:relative;
								a{
									max-width: 300px;
									text-overflow: ellipsis;
									overflow:hidden;
									white-space: nowrap;
								}
								.buttons{
										position:absolute;
										top:-10px;
										right:20px;
										height:36px;
										display:inline-block;
										display:none;
										div{
											width:36px;
											height:36px;
											float:left;
											background:#ff0000;
											margin-right:5px;
											cursor:pointer;
										}
										div:nth-of-type(1){
											background:url(../../assets/btnicon.png) no-repeat;
											background-position:0 0;
											&:hover{
												background-position:-40px -0px;
											}
										}
										div:nth-of-type(2){
											background:url(../../assets/btnicon.png) no-repeat;
											background-position:0 -40px;
											&:hover{
												background-position:-40px -40px;
											}		
										}
										div:nth-of-type(3){
											background:url(../../assets/btnicon.png) no-repeat;
											background-position:0 -80px;
											&:hover{
												background-position:-40px -80px;
											}			
										}									
										div:nth-of-type(4){
											background:url(../../assets/btnicon.png) no-repeat;
											background-position:0 -120px;
											&:hover{
												background-position:-40px -120px;
											}		
										}																		
								}
								&:hover{
									.buttons{
										display:inline-block;
									}
								}

							}
							.td4,{
								width:50px;
								flex:none;
							}
							.td3{
								flex:none;
								width:200px;
							}
							.td2{
								width:100px;
								flex:none;	
								margin-right:10px;
								text-overflow: ellipsis;
								overflow:hidden;
								white-space: nowrap;
								span{
									margin:0 8px;
								}
							}
							.td1{
								.tit{
									float:left;
								}	
								a{
									float:left;
									margin-left:30px;
								}
								.bq{
									float:left;
									margin-left:10px;
									a{
										display:inline-block;
										width:34px;
										height:16px;	
										margin-left:5px;	
									}	
									.dj{
										background:@sprite;
										background-position: -80px -280px;
									}	
									.mv{
										background:@sprite;
										background-position: -40px -280px;
									}				
								}
							}

							a{
								color:#333;
							}
							a:hover{
								color:rgb(108,198,101);
							}
						}
					}
				}
				.songright{
					width:280px;
					margin-left:100px;
					.Introduction{
						position:relative;
						h2{
							font-size:20px;
							margin-bottom:16px;
						}
						p{
							height:96px;
							
							width:280px;
							overflow:hidden;	
							line-height:24px;
							font-size:12px;
						}
						span{
							display:block;
							margin-top:8px;
							cursor:pointer;
						}
						span:hover{
							color:rgb(49,194,124);
						}
						.more{
							position:absolute;
							left:-600px;
							margin-top:-100px;
							.more-content{
								line-height:22px;
							}
							&::before{
								content:'';
								width:8px;
								height:16px;
								position:absolute;
								background:url(../../assets/sanjiao.png);
								top:85px;
								right:-8px;
							}
						}
					}
					.similar{
						margin-top:40px;
						.lists{
							width:290px;
							.list{
								width:82px;
								float:left;
								margin-top: 15px;
								img{
									width:82px;
									height:82px;
								}
								.title{
									display:block;
									width:73px; 
									height:40px;
									font-size:12px;
									overflow:hidden;
									color:#333;
									font-weight: 400;
									line-height:20px;
								}
								.jj{
									color:#999;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
								}
								a:hover{
									color:#31c27c;
								}
							}
							.list+.list{
								margin-left:20px;
							}
							.list:nth-of-type(4){
								margin-left:0px;
							}
						}
					}
				}
			}
		}
	}

</style>
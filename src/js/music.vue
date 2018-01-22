<template>
	<div id="music">
		<div class="music-container" >
			<div class="heade">
				<div class="logo">
					<a href="index.html">
						<span></span>
					</a>
				</div>
				<div class="login">
					<a href="">登录</a>
					<a href="">设置</a>
				</div>
			</div>
			<div class="container" :class="{chunjing:cjswitch}">
				<div class="contarnerL">
					<div class="btns clearfix">
						<div><i></i><span>收藏</span></div>
						<div><i></i><span>添加到</span></div>
						<div><i></i><span>下载</span></div>
						<div @click="deletelist"><i></i><span>删除</span><div ref="delete" class="delete">请选择需要删除的列表</div></div>
						<div @click="clearlist"><i></i><span>清空列表</span></div>
					</div>
					<div class="list">
						<div class="list-container">
							<happy-scroll resize>
								<div>
									<div class="list-header">
										<div class="td"><span class="checkbox" @click="quanxuan" :class="{active:playlist.length==checkbox.length}"></span></div>
										<div class="td">歌曲</div>
										<div class="td">歌手</div>
										<div class="td">时长</div>
									</div>							
									<div class="scroll-container"  :class="{playin:playin}">
										<div class="line clearfix" v-for="(list,i) in playlist" :class="{active:activeindex==i}">
											<div class="column">
												<span  class="checkbox" @click="xuanze(i)" :class="{active:checkbox.indexOf(i)!=-1}"></span>
											</div>
											<div class="column">
												<span class="xuhao"><i v-if="activeindex!=i||!playin">{{i+1}}</i></span>{{list.songorig}}
												<div class="icon-btns" >
													<i class="btn-icon" @click="removelist(i)"></i>
													<i class="btn-icon" @click="changesong(list,i)"></i>
													<i class="btn-icon"></i>
													<i class="btn-icon"></i>
												</div>
											</div>
											<div class="column">
												<span v-for="singer in list.singer">{{singer.name}}</span>
											</div>
											<div class="column times">
												{{list.interval|time}}
											</div>							
										</div>	
									</div>	
								</div>					
							</happy-scroll>
						</div>	
					</div>
					<div class="control">
						<div class="container">
							<div class="btn"   :class="{playin:playin}">
								<div class="prve" @click="prveplay()"></div>
								<div class="play" @click="play()"></div>
								<div class="next" @click="nextplay()"></div>
							</div>
							<div class="tit">
								<div class="tit-header clearfix">
									<div class="header-l">{{selectsong.songname}} - <span v-for="singer in selectsong.singer">{{singer.name}}</span></div>
									<div class="time">{{currenttime}}  /  {{selectsong.interval|time}}</div>
								</div>
								<div class="tit-body">
									<el-slider :show-tooltip="false" @change="progresschange" v-model="progress"></el-slider>
								</div>
							</div>
							<div class="songcontrol">
								<div class="moshi"></div>
								<div class="shoucang"></div>
								<div class="download"></div>
								<div class="chunjing" @click="cjtoggle" :class="{activecj:cjswitch}"></div>
								<div class="shengyin">
									<div class="slider-warp">  	
										<el-slider :show-tooltip="false" @change="voicechange" v-model="voicesize"></el-slider>
									</div>							
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="containerR">
					<div class="singer-con"  id="move-yrics" >
						<div class="img">
							<img :src="selectsong.albummid|imgsrc"    id="bgimg" alt="">
						</div>
						<p>歌曲名:{{selectsong.songname}}</p>
						<p>歌手名:<span v-for="i in selectsong.singer">{{i.name}}</span>		
						</p>
						<p>专辑名:{{selectsong.albumname}}</p>
						<div class="lyrics-warp">
							<div class="yrics-container clearfix":style="{top:72+count*(cjswitch?-54:-36)+'px'}">
								<div class="yrics" ref="yrics" :class="{active:index===count-1}" v-for="(l,index) in lyric">
									<li>{{l}}</li>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<audio ref="audio" class="audioel" :src="playsrc" controls="controls">
			</audio>
		</div>
		<div class="music-bg">
			
		</div>
	</div>
</template>


<script>

import {apistr} from '@/api/config'
import {Storage,addzero} from '@/api/home'
export default{
	name:'music',
	data(){
		return {
			msg:'asdasd',
			playlist:'',
			selectsong:'',
			playsrc:'',
			voicesize:0,
			activeindex:0,
			playin:true,
			progress:0,
			currenttime:0,
			lyric:'',
			timearr:'',
			count:0,
			cjswitch:false, //纯净模式
			checkbox:[]
		}
	},
	components:{

	},
	created(){
		this.playlist=Storage("playlist");
		this.selectsong=this.playlist[0];
		this.initaudio();
		this.keyListening();
		this.getslyric();
	},
	mounted(){
		setTimeout(()=>{
			this.$refs.audio.play();	
			this.voicesize=50;
		},2000)
	},
	watch:{
		selectsong(){
			this.getslyric();
		},
		voicesize(){
			this.$refs.audio.volume=this.voicesize/100;
		},
		playlist(){

		}

		
	},
	filters:{
		time(val){
			var f=addzero(parseInt(val/60));
			var m=addzero(val%60);
			return f+":"+m
		},
		imgsrc(val){
			return "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+val+".jpg?max_age=2592000";
		}
	},
	methods:{
		// getaudiosrc
		initaudio(){
			let filename="C400"+this.selectsong.strMediaMid+".m4a";
			let option={
				format:'json',
				needNewCode:0,
				cid:205361747,
				uin:0,
				songmid:this.selectsong.songmid,
				filename:filename,
				guid:8567304396
			}
			option=Object.assign({},apistr,option);
			//获取audio的url
			this.count=0;
			this.ajax.get("qq/base/fcgi-bin/fcg_music_express_mobile3.fcg",{
				params:option
			}).then((resolve)=>{
				var d=resolve.data.data.items[0];
				var url="http://dl.stream.qqmusic.qq.com/"+d.filename+"?vkey="+d.vkey+"&guid=8567304396&uin=0&fromtag=66"; 
				this.playsrc=url;
			}).catch(()=>{
			})
		},
		//获取歌词
		getslyric(){
			let slyricoption={
				format:'jsonp',
				nobase64:1,
				musicid:this.selectsong.songid,
				id:this.selectsong.songmid,
				jsonpCallback:'jsonp1',
				callback:'jsonp1'
			}
			slyricoption=Object.assign({},apistr,slyricoption);
			this.ajax.get("/api2/information",{
				params:slyricoption
			}).then((resolve)=>{
				var data=resolve.data.slice(7);
				data=data.substring(0,data.length- 1);
				data=JSON.parse(data);
				var div=document.createElement("div");
				div.innerHTML=data.lyric;			
				// var lyric=div.innerText.replace(/\[(\d+:\d+\.\d+)](\n.*?)\[(\d+:\d+\.\d+)]/g,"<p data-startime=$1 data-endtime=$3>$2</p>");
				var arr=div.innerHTML.match(/\[(\d+:\d+\.\d+)].+/g);
				var timearr=[];
				for(let i=0;i<arr.length;i++)
				{
					timearr.push(arr[i].match(/(\d+:\d+\.\d+)/)[0]);
					arr[i]=arr[i].slice(10);
				}
				this.timearr=timearr;
				this.lyric=arr;
			}).catch((reject)=>{

			})
		},			
		voicechange(){
			this.$refs.audio.volume=this.voicesize/100;
		},
		keyListening(){
			let inmove=false;
			document.body.onkeydown=function(e){
				if(e.keyCode==38)         

				{
					this.voicesize+=5;	
				}
				else
				if(e.keyCode==40)
				{
					this.voicesize-=5;	
				}
				else
				if(e.keyCode==32)
				{
					this.play();
				}
				this.voicechange();
			}.bind(this)
			setTimeout(()=>{
				let _this=this;
				this.$refs.audio.onended=function(){
					this.nextplay();
				}.bind(this)
				this.$refs.audio.ontimeupdate=function(){
					var t=this.currentTime/_this.selectsong.interval*100;
					var minutes=parseInt(this.currentTime/60);
					var seconds=parseInt(this.currentTime%60);
					_this.currenttime=addzero(minutes)+":"+addzero(seconds);
					_this.progress=t;
					if(_this.timearr&&!inmove)
					{
						for(let i=0;i<_this.timearr.length-1;i++)
						{
							let math=_this.timearr[i].match(/\d+/g);
							var math1=_this.timearr[i+1].match(/\d+/g);
							let tt=parseInt(math[0])*60+parseInt(math[1])+parseFloat(math[2]/60);
							let tt1=parseInt(math1[0])*60+parseInt(math1[1])+parseFloat(math1[2]/60);
							if(this.currentTime>=tt&&this.currentTime<tt1)
							{
								_this.count=i+1;
							}
						}
						let max=_this.timearr[_this.timearr.length-1];
						let maxreg=max.match(/\d+/g);
						let maxtime=parseInt(maxreg[0])*60+parseInt(maxreg[1])+parseFloat(maxreg[2]/60);
						if(this.currentTime>maxtime)
						{
							_this.count=_this.timearr.length;
						}

					}

				}			
			},300)
			setInterval(function(){
				Storage("playin",new Date().getTime());
			},500)
			var _this=this;
			window.addEventListener("storage", function(){			
				if(JSON.stringify(Storage("playlist"))!==JSON.stringify(this.playlist))
				{
					_this.playlist=Storage("playlist");
				}
			});       
		},
		audioToggle(){
			if(this.$refs.audio.paused)
				this.$refs.audio.play();
			else
				this.$refs.audio.pause();
		},
		changesong(song,index){		
			if(this.activeindex===index)
			{
				this.playin=!this.playin;
				this.audioToggle();
				return
			}
			this.playin=true;
			this.count=0;
			this.activeindex=index;
			this.selectsong=song;
			this.initaudio();
			setTimeout(()=>{
				this.$refs.audio.play();
			},500)
			
		},
		removelist(i){
			this.playlist.splice(i,1);
			Storage("playlist",this.playlist);
			if(i==this.activeindex){
				this.nextplay();
			}			
		},
		play(){
			this.playin=!this.playin;
			this.audioToggle();
		},
		nextplay(){		
			let weizhi=this.playlist.indexOf(this.selectsong)+1;
			if(weizhi>=this.playlist.length)
			{
				weizhi=0;
			}
			this.selectsong=this.playlist[weizhi];
			this.initaudio();
			this.activeindex=weizhi;
			this.playin=true;
			setTimeout(()=>{
				this.$refs.audio.play();
			},500)
		},
		prveplay(){
			let weizhi=this.playlist.indexOf(this.selectsong)-1;
			if(weizhi<0)
			{
				weizhi=this.playlist.length-1;
			}
			this.playin=true;
			this.selectsong=this.playlist[weizhi];
			this.initaudio();
			this.activeindex=weizhi;
			setTimeout(()=>{
				this.$refs.audio.play();
			},500)
		},
		progresschange(){
			this.$refs.audio.currentTime=this.selectsong.interval*this.progress/100;
		},
		cjtoggle(){
			this.cjswitch=!this.cjswitch;
		},
		clearlist(){
			this.playlist="";
			Storage("playlist","");
		},

		xuanze(i){
			if(this.checkbox.indexOf(i)==-1)
				this.checkbox.push(i);
			else
				this.checkbox.splice(this.checkbox.indexOf(i),1);
		},
		quanxuan(){
			if(this.checkbox.length!=this.playlist.length)
			{
				this.checkbox=[];
				for(let i=0;i<this.playlist.length;i++)
				{
					this.checkbox.push(i);
				}
			}
			else
			{
				this.checkbox=[];
			}
		},
		deletelist(){
			if(this.checkbox.length==0)
			{
				this.$refs.delete.style.display='block';
				setTimeout(()=>{
					this.$refs.delete.style.display="none";
				},1000)
				return 
			}
			let arr=[];
			for(let i=0;i<this.checkbox.length;i++)
			{
				arr.push(this.playlist[this.checkbox[i]]);
			}
			for(let i=0;i<arr.length;i++)
			{
				this.playlist.splice(this.playlist.indexOf(arr[i]),1);
			}
			if(this.playlist.length==0)
			{
				this.playin=false;
				this.$refs.audio.pause();
			}
			else
			if(this.playlist.indexOf(this.selectsong)==-1)
			{
				this.nextplay();
			}
			Storage("playlist",this.playlist);
			this.checkbox=[];
		}

	}
}
</script>


<style lang="less">
	html,body{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.8);
	}
	#music{	
		width:100%;
		height:100%;
		overflow:hidden;
		position:relative;
		.music-container{
			position:relative;
			z-index:10;
			.heade{
				width:100%;
				height:60px;
				.logo{
					display:inline-block;
					a{
						span{
							width:78px;
							height:21px;
							display: block;
							background:url(../assets/logo2.png) no-repeat;
							position:relative;
							opacity: .3;
							margin-top: 20px;
							margin-left: 20px;
							&:hover{
								opacity:1;
							}
						}
					}
				}
				.login{
					float:right;
					display:inline-block;
					margin-right: 60px;
					font-size: 14px;
					margin-top:28px;
					a{
						color:#535354;
						margin-left:15px;
					}
				}
			}
			.container{
				width:1100px;
				margin:0 auto;
				.contarnerL{
					width:700px;
					float:left;
					.btns{
						margin-top:12px;
						div{
							float:left;	
							color:#d1d1d2;
							border-radius:2px;
							text-align: center;
							margin-right:6px;
							cursor: pointer;
							position:relative;
							display:block;
							padding: 10px 23px;
							border:1px solid #404040;
							&:hover{
								border:1px solid rgb(255,255,255);
								span{
									color:rgb(255,255,255);
								}
								i{
									opacity:1;
								}
							}
							span{
								float:left;		
								margin-left:6px;
							}
							i{
								width:16px;
								height:16px;
								display:block;
								float:left;
								opacity:.4;
							}
						}	
						.delete{
							width:200px;
							height:146px;
							background:rgba(0,0,0,.8);
							position:fixed;
							top:50%;
							left:50%;
							margin-top:-73px;
							margin-left:-100px;
							box-sizing:border-box;
							padding-top:90px;
							z-index:9999999999;
							border-radius:4px;
							display:none;
							&::after{
								content:'';
								width:50px;
								height:50px;
								position:absolute;
								top:50%;
								left:50%;
								margin-top:-50px;
								margin-left:-25px;
								background:url(../assets/iconpopup.png);
								background-position:-0px -220px;
							}
						}											
						div:nth-of-type(1){
							i{
								background:url(../assets/icon_sprite.png);
								background-position: -60px -20px;
							}
						}
						div:nth-of-type(2){
							i{
								background:url(../assets/icon_sprite.png);
								background-position: -20px -20px;
							}
						}
						div:nth-of-type(3){
							i{
								background:url(../assets/icon_sprite.png);
								background-position: -40px -240px;
							}
						}
						div:nth-of-type(4){
							i{
								background:url(../assets/icon_sprite.png);
								background-position: -100px -20px;
							}
						}
						div:nth-of-type(5){
							i{
								background:url(../assets/icon_sprite.png);
								background-position: -40px -300px;
							}
						}				
					}
					.list{
						width:100%;
						margin-top:20px;
						.list-header{
							width:100%;
							height:50px;
							border-top:1px solid rgba(255,255,255,.1);
							border-bottom:1px solid rgba(255,255,255,.1);
							overflow:hidden;
						.td{
							float:left;
							line-height: 50px;
							display:inline-block;
							color:#a9a9a9;
								.checkbox{
									display:inline-block;
									width:14px;
									height:14px;
									margin-top:18px;
									border:1px solid #fff;
									opacity:.3;
									cursor:pointer;
									&:hover{
										opacity:1;
									}
								}
								.active{
									opacity:1;
								}	

								&:nth-of-type(1){
									line-height:0;
								}	
								&:nth-of-type(2){
									margin-left:46px;
								}
								&:nth-of-type(3){
									margin-left:360px;
								}
								&:nth-of-type(4){
									margin-left:140px;
								}							
							}	
						}
						.list-container{
							height:400px;
							overflow:hidden;
							// color:#bec5c8;
							color:#ccc;
							.line{
								width:calc(~"100% - 4px");
								border-bottom:1px solid rgba(255,255,255,.1);
								.column{
									float:left;
									line-height:49px;
									
									.xuhao{
										i{
											font-style:normal;
										}
									}
									.checkbox{
										display:inline-block;
										width:14px;
										height:14px;
										margin-top:18px;
										border:1px solid #fff;
										opacity:.3;
										cursor:pointer;
										&:hover{
											opacity:1;
										}
									}
									.active{
										opacity:1;
									}									
									&:nth-of-type(2){
										width:390px;
										margin-left:20px;
										position:relative;
										span{
											margin-right:10px;
										}
										.icon-btns{
											display:inline-block;
											position:absolute;
											right:20px;
											display:none;
											top:0px;
											.btn-icon{
												width:36px;
												height:36px;
												float:left;
												display:block;
												margin-top:8px;
												margin-left:10px;
											&:nth-of-type(1){
												background:url(../assets/btnicon.png);
												background-position:0 -160px;
												right:-220px;
												margin-left:0px;
												position:absolute;
											}
											&:nth-of-type(2){
												background:url(../assets/btnicon.png);
												// background-position:0 -200px;
											}							
											&:nth-of-type(3){
												background:url(../assets/btnicon.png);
												background-position:0 -80px;
											}
											&:nth-of-type(4){
												background:url(../assets/btnicon.png);
												background-position:0 -40px;
											}		
										}			
									}
									}
									&:nth-of-type(3){
										width:120px;
										overflow:hidden;
										text-overflow:ellipsis;
										white-space: nowrap;
									}	
									&:nth-of-type(4){
										margin-left:50px;
									}
								}
								&:hover{
									cursor:pointer;	
									.column{
										.icon-btns{
											display:block;
										}									
									}
									.times{
										display:none;
									}
								}	
							}
						}
						.playin{
							.active{
								.column{
									color:#fff !important;
									.xuhao{
										width:10px;
										height:10px;
										display:inline-block;
										background:url(../assets/wave.gif);
									}
							 		.icon-btns{
							 			display:block !important;
							 			.btn-icon:nth-of-type(2)
							 			{
							 				background-position:0 -200px !important;
								 		}
							 		}
								}
								.times{
								 	display:none !important;
								 }
							}
						}
					}
					.control{
						width:100%;
						position:fixed;
						bottom:0px;
						height:100px;
						left:0px;
						.container{
							width:1200px;
							margin:30px auto;
							.btn{
								float:left;

								div{
									float:left;
								}
								.prve{
									width:20px;
									height:20px;
									background:url(../assets/icon_sprite2.png);
									background-position:0px -30px;
									margin-top:5px;
									cursor:pointer;
								}
								.play{
									cursor:pointer;
									width:20px;
									height:30px;
									background:url(../assets/icon_sprite2.png);
									margin:0 50px;
								}
								.next{
									width:20px;
									height:20px;
									background:url(../assets/icon_sprite2.png);
									background-position:0px -52px;		
									margin-top:5px;	
									cursor:pointer;					
								}
							}
							.playin{
								.play{
									background:url(../assets/icon_sprite2.png) no-repeat;
									background-position:-30px 0px;
								}
							}
							.tit{
								float:left;
								width:550px;
								margin-left:50px;
								.tit-header{
									width:100%;
									color:#c5bbbb;
									.header-l{
										display:inline-block;
										float:left;

									}
									.time{
										float:right;
									}
								}
								.tit-body{
									.el-slider__runway{
										background:#6e7b82;
									}
									.el-slider__bar{
										background:#d3d7d9;
									}
									.el-slider__button{
										background:#fff;
										width:8px;
										height:8px;
										border:none;
									}
									.el-slider{
										height: 6px;
									}
								}
							}
							.songcontrol{
								float:left;
								display:inline-block;
								margin-left:58px;
								margin-top:10px;
								.moshi{
									float:left;
									cursor:pointer;
									margin-right:24px;
									background:url(../assets/icon_sprite2.png);
									width:26px;
									height:25px;	
									background-position:0 -205px;
								}
								.shoucang{
									float:left;
									cursor:pointer;
									margin-right:24px;
									background:url(../assets/icon_sprite2.png);
									width:23px;
									height:21px;
									background-position:0 -96px;						
								}
								.download{
									float:left;
									cursor:pointer;
									margin-right:24px;
									background:url(../assets/icon_sprite2.png);								
									width:21px;
									height:21px;
									background-position:0 -120px;		

								}	
								.chunjing{
									float:left;
									cursor:pointer;
									margin-right:24px;
									background:url(../assets/icon_sprite2.png);
									width:74px;
									height:26px;
									background-position:0 -282px;
								}
								.activecj{
									background:url(../assets/icon_sprite2.png);
									background-position:0 -310px;
								}
								.shengyin{
									width:24px;
									background-position:0 -144px;
									position:relative;
									float:left;
									.slider-warp{
										width:80px;
										position:absolute;
										top:-6px;
										.el-slider__runway{
											height: 4px;
											background:#6c3e43;
										}
										.el-slider__button{
											width: 10px;
											height: 10px;
											background:#ccc;
											border:none;
											margin-top:-2px;
										}
										.el-slider__bar{
											background:#d4c6c7;
											height: 4px;
										}
									}

								}
							}
						}
					}

				}
				.containerR{
					width:300px;
					height:400px;
					float:right;
					margin-top:20px;
					margin-left:100px;
					font-family:poppin,Tahoma,Arial,sans-serif;
					.singer-con{
						width:100%;
						padding-bottom: 100px;
						.img{
							width:186px;
							height:186px;
							position:relative;
							margin:0 auto;
							img{
								width:100%;
								height:100%;
							}
							&::after{
								content:'';
								width:100%;
								height:100%;
								position:absolute;
								background:url(../assets/album_cover1.png);
								background-size:100% 100%;
								z-index: 999;
								top:0px;
								left:10px;
							}
						}
						p{
							text-align:center;
							color:#c8bebd;
							line-height:28px;
							&:nth-of-type(1){
								margin-top: 10px;
							}
						}
						.lyrics-warp{
							height:100px;
							position:relative;
							overflow:hidden;
							color:#aba6a9;
							margin-top:40px;
							text-align:center;
							-webkit-mask-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,.6) 85%,rgba(255,255,255,0) 100%);
							.yrics-container{
								position:absolute;
								top:-65px;   
								width:100%;
								user-select:none;
								cursor:pointer;
								.yrics{	
									li{
										line-height:36px;
										letter-spacing: 2px;
										font-size:14px;
										font-family: poppin;
										text-overflow: ellipsis;
										overflow: hidden;
										white-space: nowrap;
									}
								}
								.active{
									color:#3da673;
									// margin:22px 0px;
								}
							}
						}
					}
				}
			}
			.chunjing{
				.btns{
					display:none;
				}
				.list{
					display:none;
				}
				.containerR{
					.img{
						display:none;
					}
					p{
						display:none;
					}
					.lyrics-warp{
						position:fixed !important;
						width:600px !important;
						height:370px !important;
						top:50% !important;
						left:50% !important;
						margin-left:-300px !important;
						margin-top:-185px !important;
						-webkit-mask-image: linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,.6) 85%,rgba(255,255,255,0) 100%);
						li{
							line-height:58px !important;
							cursor:grab !important;
							font-size:22px !important;
						}
					}
				}
			}
			.audioel{
				visibility: hidden;
			}
		}
		.music-bg{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.35);
			position:absolute;top:0px;
			left: 0px;
		}

	}
</style>
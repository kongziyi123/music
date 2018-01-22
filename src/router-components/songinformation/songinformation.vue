<template>
	<div class="information" @click="morehide">
		<div class="header">
			<div class="header-left">
				<img :src="information.album.mid|imgadd" alt="">
				<i v-if="false"></i>
			</div>
			<div class="header-right">
				<h2>{{information.title}}</h2>
				<div class="user"><span v-for="(item,ii) in information.singer"><span v-if="ii>0" class="xie">/</span><router-link :to="/singerHome/+item.mid">{{item.name}}</router-link></span></div>
				<div class="items clearfix">
					<div class="item">专辑:
						{{information.album.title}}
					</div>
					<div class="item">流派: {{Introduction.genre}}</div>
					<div class="item">发行公司:{{Introduction.company}}</div>
					<div class="item">语种:{{language}}</div>
					<div class="item">发行时间: {{information.time_public}}</div>
				</div>
				<div class="btns-warp">
					<btns @playall="play"></btns>	
				</div>
			</div>
		</div>
		<div class="container">
			<div class="lyrics">
				<h2>歌词</h2>
				<div class="geci" v-html="thelyrics">
					
				</div>
			</div>
			<div class="newmusci">
				<div v-if="Introduction.desc">
					<h2>简介</h2>
					<div class="desc">
						{{Introduction.desc}}
					</div>
					<div class="more" @click.stop="moreshow()">[更多]
							<div class="more-warp">
								<scroll ref="scrolldom">
									<div class="more-content">
										<h2>专辑简介</h2>
										{{Introduction.desc}}
									</div>
								</scroll>
							</div>
						<i></i>
					</div>
				</div>
				<div v-if="xslist.length">
					<h2 class="warp">包含此单曲的热门歌单</h2>
					<div class="items clearfix">
						<div class="item" v-for="item in xslist">
							<router-link :to="/listdetails/+item.dissid">
								<img :src="item.imgurl" alt="">
								<h2>{{item.dissname}}</h2>
							</router-link>
							<p v-if="item.createTime">{{item.createTime}}</p>
						</div>
					</div>
				</div>				
				<div v-if="information.mv.vid">
					<h2 class="mv">相关MV</h2>
					<div class="img">
						<img :src="information.mv.vid|mvsec" alt="">
						<i></i>
					</div>
					<p>{{information.title}}</p>
					<p><span v-for="item in information.singer">{{item.name}}</span></p>
				</div>

			</div>
		</div>
	</div>
</template>

<style lang="less">
	.information{
		width:100%;
		padding: 40px 80px;
		box-sizing: border-box;
		min-width: 1200px;
		background-image:-webkit-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:-o-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:linear-gradient(to top, #fff, #f2f2f2);
		overflow: hidden;
		.header{
			display: flex;
			background:none;
			.header-left{
				width: 250px;
				height: 250px;
				float:left;
				margin-right: 50px;
				position:relative;
				img{
					width:100%;
					height:100%;
				}
	
			}
			.header-right{
				flex:1; 
				h2{
					font-size:34px;
					margin-top:23px;
					color:#333;
				}
				.user{
					position:relative;
					text-indent: 20px;
					margin-top:10px;
					margin-bottom: 18px;
					color:#8b336c;
					font-size:16px;
					&::before{
						content:'';
						width:15px;
						height:15px;
						left:-0px;
						background:url(../../assets/icon_sprite.png);
						background-position:-20px -240px;
						position:absolute;
					}
					.xie{
						margin:0 10px;			
					}
					a{
						color:#666;
						&:hover{
							color:#6cc665;
						}
					}						
				}
				.items{
					width:340px;
					overflow: hidden;
					.item{
						width:170px;
						float:left;
						margin-bottom:15px;
						color:#333;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}				
			}
		}
		.container{
			width:100%;
			display:flex;
			.lyrics{
				flex:1;
				h2{
					font-size:20px;
					margin-top:46px;
					margin-bottom:15px;
				}				
				.geci{
					font-size:12px;
					color:#000;

					p{
						line-height:26px;
					}
				}
			}
			.newmusci{
				margin-left:40px;
				width:270px;
				h2{
					font-size:20px;
					margin-bottom:20px;
				}
				.desc{
					line-height: 24px;
					height:96px;
					overflow:hidden;
					font-size:12px;
					font-weight: 400;
				}
				.more{
					position:relative;
					cursor:pointer;
					.more-warp{
						position:absolute;
						left:-550px;
						top:-50px;
						.more-content{
							color:#333;
							line-height:22px;
						}
						&::before{
							content:'';
							width:15px;
							height:15px;
							background:url(../../assets/sanjiao.png);
							position:absolute;
							right:-13px;
							top:50px;
						}
					}					
				}
				.mv{
					margin-top:40px;
					margin-bottom: 20px;
				}
				.img{
					width:290px;
					height:163px;
					overflow:hidden;
					position:relative;
					img{
						width:100%;
						height:100%;
						transition:all .8s;
					}
					img:hover{
						transform: scale(1.1, 1.1);

					}
					i{
						width:50px;
						height:50px;
						background:url(../../assets/cover_play.png);
						background-size:cover;
						position:absolute;
						top:50%;
						left:50%;
						margin-top:-25px;
						margin-left:-25px;
						opacity:0;
						transition:all .8s;
					}
					&:hover{
						i{
						opacity:1;
						transform:scale(1.3,1.3);
						
						}
					}

				}
				p{
					margin-top: 10px;
				}
				p:nth-of-type(2){
					color:rgb(153,153,153);
					cursor: pointer;
					&:hover{
						color:rgb(49,194,124);
					}
					
				}
				.warp{
					margin-top:30px;
				}
				.items{
					.item{
						float:left;

						img{
							width:82px;
							height:82px;
						}
						h2{
							width:82px;
							font-size:12px;
							line-height:20px;
							height:40px;
							overflow:hidden
						}								
					}
					.item+.item{
						margin-left:10px;
					}
					.item:nth-of-type(4){
						margin-left:0px !important;
					}
			
				}
			}
		}
	}

</style>
<script>
import scroll from '@/components/happyscroll/happyscroll'
import {apistr,musicurl} from '@/api/config.js'
import btns from'@/components/btns/btns'	
import {Playlistrecommended,Storage} from '@/api/home'
import jsonp from 'jsonp'
export default{
	data(){
		return{
			id:"",
			information:"",
			thelyrics:"",
			Introduction:"",
			xslist:""
		}
	},
	components:{
		btns,
		scroll
	},
	methods:{
		singerInit(){
			//获取歌曲header信息
			var option={
				songmid:this.id,
				tpl:'yqq_song_detail',
				format:'json',
				needNewCode:0
			}
			var option=Object.assign({},apistr,option);
			this.ajax.get("/qq/v8/fcg-bin/fcg_play_single_song.fcg",{params:option}).then((resolve)=>{
				this.information=resolve.data.data[0];
				var data={
					nobase64:1,
					musicid:this.information.id,
					id:this.id,
					format:'json',
				 	//这里有一个坑不能发送json，后端只会返回jsonp
					jsonpCallback:'jsonp1',
					callback:'jsonp1',

				};
				data=Object.assign({},apistr,data);
				setTimeout(()=>{
					this.ajax.get('/api2/information',{
						params:data
					}).then((aa)=>{
						//将返回的jsonp字符串切割
						var data=aa.data.slice(7);
						data=data.substring(0,data.length- 1);
						var data=JSON.parse(data);
						var lyric=data.lyric.replace(/(?:\[[^\[\]]*\]\s*){1,2}/g,"<p>");
						this.thelyrics=lyric;
					})
				},30)


				var option2={
					albummid:this.information.album.mid,
					needNewCode:0
				}	
				option2=Object.assign({},apistr,option2);
				this.ajax.get("/qq/v8/fcg-bin/fcg_v8_album_info_cp.fcg",{params:option2}).then((resolve)=>{
						this.Introduction=resolve.data.data;
					}).catch((e)=>{

				})
			// https://c.y.qq.com
				var option3={
					cid:338,
					ct:20,
					songid:this.information.id,
					uin:10000,
					format:'json',
					p:0.6925107492285707
				}
				option3=Object.assign({},apistr,option3);
				this.ajax.get('qq/rcmusic/fcgi-bin/fcg_iphone_music_rec_songlist',{
					params:option3
				}).then((data)=>{
					this.xslist=data.data.list;
				})


			}).catch(()=>{

			})
		},
		moreshow(){
			this.$refs.scrolldom.show();
		},
		morehide(){
			this.$refs.scrolldom.hide();
		},
		play(){
			let xiabiao;
			for(var i=0;i<this.Introduction.list.length;i++)
			{
				if(this.Introduction.list[i].songmid==this.id)
				{
					xiabiao=i;
				}
			}
			if(new Date().getTime()-Storage("playin")>1000){
				let arr=[];
				arr.push(this.Introduction.list[xiabiao]);
				Storage("playlist",arr);
				window.open(musicurl);
			}
			else{
				let playlist=Storage("playlist");
				if(!playlist)
				{
					let arr=[];
					arr.push(this.Introduction.list[xiabiao]);
					Storage("playlist",arr);
				}
				else
				{
					playlist.push(this.Introduction.list[xiabiao]);
					Storage("playlist",playlist);
				}
				this.$emit("musicts");
			}	
		}
	
	},
	created(){
		this.id=this.$route.params.id;
		this.singerInit();
	},
	computed:{
		language(){
			var l="";
			if(this.information)
			{
				switch(this.information.language){
					case 0:
						l="国语";
						break;
					case 1:
						l="粤语";
						break;
					case 5:
						l="英语";
						break;
					case 4:
						l="韩语";
						break;	
					case 3:
						l="日语";
						break;	
					default:
						l="数据未知";											
				}
				return l;
			}
		}
	},
	filters:{
		imgadd(url){
			return "//y.gtimg.cn/music/photo_new/T002R300x300M000"+url+".jpg?max_age=2592000";
		},	
		mvsec(url){
			return "http://shp.qpic.cn/qqvideo_ori/0/"+url+"_360_204/0";
		}	
	}
}

</script>
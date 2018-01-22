<!-- 专辑 -->
<template>
	<div class="album"  @click="changescreen(0)">
		<div>
			<div class="area-warp">
				<selectView :selectitems="tags.area" @selectchange="areachange"></selectView>		
			</div>
			<div class="genre biaoti clearfix">
				<div class="tit">流派</div>
				<div class="genre-warp">
					<selectView :selectitems="tags.genre" @selectchange="genrechange" ref="tags2"></selectView>
				</div>
			</div>
			<div class="type biaoti clearfix">
				<div class="tit">类别</div>
				<div class="type-warp">.
					<selectView :selectitems="tags.type"  @selectchange="typechange" ref="tags3"></selectView>
				</div>	
			</div>		
			<div class="screening biaoti clearfix">
				<div class="tit">筛选</div>
				<div class="screeningyear">
					<span :class="{active:choose4!=0}" @click.stop="changescreen(1)">{{choose4==0?'年代':year}}
						<div class="year-warp"  v-show="screening==1">
							<selectView :selectitems="tags.year" @selectchange="yearchange" ref="tags4"></selectView>
						</div>
					</span>
				</div>
				<div class="screeningcompany">
					<span  :class="{active:choose5!=0}"  @click.stop="changescreen(2)">{{choose5==0?'唱片公司':record}}
						<div class="company-warp" v-show="screening==2">
							<selectView :selectitems="tags.company" @selectchange="recordchange" ref="tags5"></selectView>
						</div>	
					</span>			
				</div>		
			</div>
		</div>
		<div class="container clearfix">
			<div class="container-head">
				<div class="areaname">{{tags.area[choose1].name}} 
					<div class="tags">
						<div class="tag" v-if="choose2!=0">
							<span>{{tags.genre[choose2].name}}</span>
							<i @click="choosezero(2)"></i>
						</div>
						<div class="tag" v-if="choose3!=0">
							<span>{{tags.type[choose3].name}}</span>
							<i @click="choosezero(3)"></i>
						</div>
						<div class="tag" v-if="choose4!=0">
							<span>{{tags.year[choose4].name}}</span>
							<i @click="choosezero(4)"></i>
						</div>		
						<div class="tag" v-if="choose5!=0">
							<span>{{tags.company[choose5].name}}</span>
							<i @click="choosezero(5)"></i>
						</div>																		
					</div>
				</div>
				<div class="btns">
					<div class="btn" :class="{active:sort==2}" @click="newschange(2)">最新</div>
					<div class="btn" :class="{active:sort==5}" @click="newschange(5)">最热</div>
				</div>
			</div>
			<div class="album-list">
				<div class="list-item" v-for="(album,index) in albumlist">
					<div class="list-item-main" v-if="index<20">
						<div class="img" @click="playall(album,$event)">
							<img :src="album.album_mid|imgadd" alt="">
							<i></i>
						</div>
						<router-link :to="/alibuminformation/+album.album_mid" class="name">{{album.album_name}}</router-link>
						<p class="singer"><span v-for="singer in album.singers">{{singer.singer_name}}</span></p>	
						<p class="data">{{album.public_time}}</p>
					</div>
				</div>
			</div>
		</div>
        <div class="page-warp">
            <el-pagination class="page-warp"
                    background
                    layout="prev, pager, next"
                    :total="total/2"
                    :current-page="page" 
					@current-change="currenchange"    
            >           
			    
            </el-pagination>
        </div>
		
	</div>
</template>

<script>
import {apistr} from '@/api/config'
import {playsong} from '@/api/home'
import selectView from '@/components/select/selectView'
export default{
	data(){
		return{
			tags:'',
			screening:"",
			albumlist:'',
			total:0,
			page:1,
			year:'年代',
			record:'唱片公司',
			choose1:0,
			choose2:0,
			choose3:0,
			choose4:0,
			choose5:0,
			sort:2
		}
	},
	components:{
		selectView
	},
	created(){
		
		this.initmodel();
	},
	filters:{
		imgadd(val){
			return '//y.gtimg.cn/music/photo_new/T002R300x300M000'+val+".jpg?max_age=2592000";
		}
	},
	watch:{
		choose1(){
			this.ch();
		},
		choose2(){
			this.ch();
		},
		choose3(){
			this.ch();
		},
		choose4(){
			this.ch();
		},
		choose5(){
			this.ch();
		},
		year(){
			this.ch();	
		},
		record(){
			this.ch(); 
		}								
	},
	methods:{
		ch(){
			this.page=0;
			this.initmodel();
		},
		initmodel(){
			let obj={"albumlib":{"method":"get_album_by_tags","param":{"area":1,"company":-1,"genre":-1,"type":-1,"year":-1,"sort":2,"get_tags":1,"sin":0,"num":20,"click_albumid":0},"module":"music.web_album_library"}};
			let area;	
			obj.albumlib.param.sort=this.sort;
			if(!!this.tags)
			{
				obj.albumlib.param.type=this.tags.type[this.choose3].id;
				obj.albumlib.param.area=this.tags.area[this.choose1].id;
				obj.albumlib.param.genre=this.tags.genre[this.choose2].id;
				obj.albumlib.param.year=this.tags.year[this.choose4].id;
				obj.albumlib.param.company=this.tags.company[this.choose5].id;
			}
			obj.albumlib.param.sin=(this.page-1)*20;
			let option={
				format:'json',
				g_tk:856411593,
				data:obj		
			}
			option=Object.assign({},apistr,option);
			this.ajax.get("/uqq/cgi-bin/musicu.fcg",{
					params:option
				}).then((reslove)=>{
					this.albumlist=reslove.data.albumlib.data.list;
					this.tags=reslove.data.albumlib.data.tags;
					this.total=reslove.data.albumlib.data.total;
				})
		},
		changescreen(i){
			this.screening=i;
			this.initmodel();
		},
		areachange(i){
			this.choose1=i;
		},
		genrechange(i){
			this.choose2=i;
		},
		newschange(i){
			console.log(i);
			if(this.sort==i)
			{
				return 
			}
			this.sort=i;
			this.initmodel();
		},
		typechange(i){
			this.choose3=i;
		},
		currenchange(page){
			this.page=page;
		},
		yearchange(i){
			this.choose4=i;
			this.year=this.tags.year[this.choose4].name;
		},
		recordchange(i){
			this.choose5=i;
			this.record=this.tags.company[this.choose5].name;
		},
		choosezero(i){
			this['choose'+i]=0;
			this.$refs['tags'+i].clear();
			this.initmodel();
		},
		playsong:playsong,
		playall(album,e){
			//router-link :to="+"
			if(e.target.nodeName.toLowerCase()=='i')
			{
				console.log(album);
				// playsong(album.singers);
				let option={
					format:'json',
					albummid:album.album_mid
				}
				option=Object.assign({},apistr,option);
				this.ajax.get("/qq/v8/fcg-bin/fcg_v8_album_info_cp.fcg",{
					params:option
				}).then((resolve)=>{
					this.playsong(resolve.data.data.list);
				})
			}
			else
			{
				var obj={name: 'alibuminformation', params: {id: album.album_mid}};
				this.$router.push(obj);
			}
		}

	}
}

</script>
<style lang="less">
	.album{
		background-image:linear-gradient(to top, #fff, #f2f2f2);
		padding: 50px 80px;
		min-width: 900px;
		.biaoti{
			display:flex;
			margin-top: 15px;
			.tit{
				float: left;
				width: 50px;
			}
		}
		.area-warp{
			margin-left: 50px;
		}
		.genre{
			.tit{
				margin-top: 10px;
			}
			.genre-warp{
				flex:1;
			}

		}

		.type{
			margin-top:0px;
			.tit{
				margin-top: 20px;
			}			
			.type-warp{
				float:left;
			}
		}
		.screening{
			position: relative;	
			.screeningyear{
				margin-right: 20px;
				span{
					padding:8px;
					cursor: pointer;
					display:block;
					&::after{
						content: '';
						width: 10px;
						height: 6px;
						background: url(../../assets/icon_sprite.png);
						background-position:-140px -260px;
						display:block;
						float: right;
						margin-top: 3px;
						margin-left: 5px;
					}
				}
				.year-warp{
					padding:20px 0px 20px 65px;
					box-sizing: border-box;
					width: 90%;
					position: absolute;
					top:30px;
					border:1px solid #e9e9e9;
					background: #fff;
					z-index: 99999999;
					box-shadow:  0px 0px 3px #e9e9e9;
				
				}	
				.active{
					color:#fff;
					background: #31c27c;
					&::after{
						background-position:-160px -260px;
					}
				}	
			}
			.tit{
				margin-top: 8px;
			}
		}
		.screeningcompany{
			span{
				padding:8px;
				cursor: pointer;
				display:block;
				&::after{
					content: '';
					width: 10px;
					height: 6px;
					background: url(../../assets/icon_sprite.png);
					background-position:-140px -260px;
					display:block;
					float: right;
					margin-top: 3px;
					margin-left: 5px;
				}				
			}
			.company-warp{
				position: absolute;
				top:30px;
				z-index: 999;
				border:1px solid #e9e9e9;
				padding:20px 0px 20px 65px;
				box-sizing: border-box;
				width: 90%;
				background: #fff;
			}
			.active{
				color:#fff;
				background: #31c27c;
				&::after{
					background-position:-160px -260px;
					
				}
			}
		}
		.container{
			width: 100%;
			margin-top: 40px;
			.container-head{
				width: 100%;
				display: flex;
				max-width: 1200px;
				min-width: 900px;
				.btns{
					width: 150px;
					text-align: right;
					.btn{
						width:62px;
						height:40px;
						text-align: center;
						line-height: 40px;
						float: left;
						box-sizing: border-box;
						background: #fcfbfc;
						color:#333;
						border:1px solid #c9c9c9;
						cursor: pointer;
						&:nth-of-type(1){
							border-top-left-radius: 4px;
							border-right:none;
						}
						&:nth-of-type(2){		
							border-top-right-radius: 4px;
							border-left:none;
						}
					}
					.active{
						background: #31c27c;
						color:#fff;
						border:none;
					}
				}
				.areaname{
					flex:1;
					font-size: 24px;
					line-height: 40px;
					position: relative;
					.tags{
						position: absolute;
						top:5px;
						left:0px;
						background: #fff;
						.tag{
							float: left;
							font-size: 12px;
							padding: 12px 6px 12px 10px;
							border:1px solid #c9c9c9;
							span{
								line-height:12px;
								float: left;
							}
							i{
								width: 8px;
								height: 8px;
								background: url(../../assets/icon_sprite.png);
								background-position: -164px -124px;
								margin-left: 8px;
								margin-top: 3px;
								float:left;
								cursor: pointer;
							}
							&:hover{
								background: #37c27c;
								color:#fff;
								i{
									background-position:-164px -84px;
								}
							}
						}
						.tag+.tag{
							margin-left: 6px;
						}
					}
				}
			}
			.album-list{
				margin-top: 15px;
				width: 100%;
				max-width: 1200px;
				min-width: 900px;
				.list-item{
					width: 20%;
					float: left;
					overflow: hidden;
					.list-item-main{
						margin-right: 20px;
						.img{
							width: 100%;
							position: relative;
							cursor: pointer;
							display: block;
							overflow: hidden;
							img{
								width: 100%;
								transition:all .8s;
							}
							i{
								width: 50px;
								height: 50px;
								background: url('../../assets/cover_play.png');
								position:absolute;
								top:50%;
								left:50%;
								margin-top:-25px;
								margin-left: -25px;
								background-size:cover;
								opacity: 0;
								transition:all .8s;
								cursor: pointer;
							}
							&::before{
								content: '';
								width: 100%;
								height: 100%;
								background: rgba(0,0,0,0);
								position: absolute;
								top:0px;
								left:0px;
								transition:all .8s;
							}
							&:hover{
								i{
									opacity: 1;
									transform:scale(1.3,1.3);
								}
								&::before{
									background: rgba(0,0,0,.6);
								}
								img{
									transform:scale(1.1,1.1);
								}
							}
						}
						.name{
							margin-top: 20px;
							display:block;
							color:#333;
							text-overflow:ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.singer{
							margin: 10px 0px;
							color:#999;
							text-overflow:ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.data{
							color:#999;
							padding-bottom:44px; 	
						}
					}

				}
			}

		}
		.page-warp {
			text-align: center;
			.el-pagination {
			display: inline-block;
			color: #abc5e7;
			.number {
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.btn-next,
			.btn-prev {
				line-height: 50px;
				width: 50px;
				height: 50px;
			}
			.el-icon-more {
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.el-icon-d-arrow-left,
			.el-icon-d-arrow-right {
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.active {
				background: #31c27c !important;
			}
			}
		}

	}
</style>
		<!-- 首页 -->
<template>
	<div class="home">
		<slide :listname="listname" :imgitems="imgitems" @tsshow="tsshow">
		</slide>
		<slide2 :listname="type_info" :song_list="song_list">
		</slide2>
		<slide3 :foucusimg="foucusimg">
		</slide3>
		<slide4 :newdisc="newdisc"  @tsshow="tsshow">
		</slide4>
		<div class="list">
			<div class="top">
				<h2 class="tit"></h2>
				<a href="#" class="more">更多<span></span></a>
			</div>
		
			<div class="list-items">
				<div  class="list-item" v-for="item in newlist">
					<div class="dfb">巅峰榜</div>
					<h2>{{item.name|tit}}</h2>
					<div class="line" @click="listplay(item)"></div>
					<li class="ls" v-for="(i,index) in item.songlist">
						<h3>{{index+1}}  
							<a href="">
						{{i.track_name}}
							</a>
						</h3>
						<p>{{i.singer_name}}</p>
					</li>
				</div>
			</div>			
		</div>
		<slide5 :mylist="mylist">
		</slide5>
	</div>


</template>


<script>
import {apistr,musicurl} from '@/api/config.js'
import {home,Storage} from '@/api/home.js'
import slide from '@/components/slide/slide'
import slide2 from '@/components/slide/slide2'
import slide3 from '@/components/slide/slide3'
import slide4 from '@/components/slide/slide4'
import slide5 from '@/components/slide/slide5'
export default{
	data(){
		return{
			listname:'',
			imgitems:'',
			type_info:'',
			song_list:'',
			foucusimg:'',
			newdisc:'',
			mylist:''
		}
	},
	components:{
		slide,
		slide2,
		slide3,
		slide4,
		slide5
	},
	created(){
		var option={
			callback:'recom3971194846314787',
			jsonpCallback:'recom3971194846314787'
		}
		var mypromise=home(option);
		var _this=this;
		mypromise.then((resolve)=>{
			console.log(resolve);
			let arr=[{item_name:"为你推荐"}];
			this.type_info=resolve.new_album.data.type_info;
			_this.listname=arr.concat(resolve.category.data.category[0].items);
			_this.imgitems=resolve.recomPlaylist.data.v_hot;
			this.song_list=resolve.new_song.data.song_list;
			this.foucusimg=resolve.focus.data.content;
			// console.log();
			this.newdisc=resolve.new_album.data;
			this.list=resolve.toplist.data.group_list[0].list;
		}).catch((reject)=>{
			console.log("失败"+reject);
		});
		var option2={
			g_tk:368604386,
			cmd:'shoubo',
			lan:'all',
			format:'json'
		}
		var option2=Object.assign({},apistr,option2);
		this.ajax.get("/qq/v8/fcg-bin/getmv_by_tag",{
			params:option2
		}).then((resolve)=>{
			
			this.mylist=resolve.data.data.mvlist;		
		}).catch(()=>{

		})
	},
	computed:{
		newlist(){
			var arr=[];
			// if(this.list)
			// {
				arr.push(this.list[0]);
				arr.push(this.list[1]);
				arr.push(this.list[2]);
				arr.push(this.list[7]);
				arr.push(this.list[8]);
			// }
			return arr;
		}
	},
	filters:{
		tit(val){
			var arr=val.split("·");
			return arr[arr.length-1];
		}
	},
	mounted(){

	},
	methods:{
		listplay(item){
			if(new Date().getTime()-Storage("playin")>1000)
			{
				Storage("playlist",item.songlist);
				window.open(musicurl);
			}
			else{
				if(Storage("playlist"))
				{
					let arr=Storage("playlist").concat(item);
					Storage("playlist",arr);
				}
				else
				{
					Storage("playlist",item.songlist);
				}
				// this.$refs.showdlog.addmusicshow();
			}
		
		},
		tsshow(){
			this.$emit("musicts");
		}

	}
}

</script>

<style lang="less">
.home{
	.list{
		width:100%;
		background-image:-webkit-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:-o-linear-gradient(bottom, #fff, #f2f2f2);
		background-image:linear-gradient(to top, #fff, #f2f2f2);
		.top{
			overflow:hidden;
			position:relative;
			.tit{
				width:200px;
				height:36px;
				background:url(../../assets/title.png);
				background-position:0px -200px;
				margin:30px auto;
			}
			.more{
				display:inline-block;
				position:absolute;
				right:100px;
				top:40px;
				width:50px;
				font-size:16px;
				span{
					content:'';
					width:7px;
					height:12px;
					position:absolute;
					background:url(../../assets/icon_sprite.png);
					background-position:-40px -120px;
					right:2px;
					top:3px;

				}
			}
		}
		.list-items{
			max-width:1200px;
			width:100%;
			display:flex;
			margin:0 auto;
			margin-bottom:30px;
			.list-item{
				flex:1;
				margin-right:20px;
				min-width: 164px;
				padding: 50px 30px 20px 30px;
				box-sizing: border-box;
				color:#f9f0f2;
				.dfb{
					font-size:20px;
					text-align: center;
					margin-bottom:10px;
				}
				h2{
					text-align:center;
					font-size:26px;
					font-weight:500;
				}
				.line{
					width:36px;
					height:2px;
					background:#fff;
					margin:40px auto;
					position:relative;
					&::before{
						content:'';
						position:absolute;
						width:50px;
						height:50px;
						background:url(../../assets/cover_play.png);
						background-size: cover;
						top:-20px;
						left:-10px;
						transform: scale(0.5, 0.5);
						opacity:0;
						transition:all .6s;
					}
				}
				&:hover{
					.line{
						background:rgba(255,255,255,0);
						&::before{
							opacity:1;
							transform: scale(1, 1);
						}
					}
				}
				.ls{
					margin-bottom: 20px;
					h3{
						line-height: 30px;
						width:150px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;						
					}
					p{
						margin-top:10px;
						margin-left: 15px;
						width:150px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					a{
						color:#fff;
					}
				}
			}
			.list-item:last-child{
				margin-right:0px;
			}
			.list-item:nth-of-type(1){
				background:url(../../assets/bg_index_top.jpg) no-repeat;
				background-position: 0 0;
			}
			.list-item:nth-of-type(2){
				background:url(../../assets/bg_index_top.jpg);
				background-position: -224px 0;
			}
			.list-item:nth-of-type(3){
				background:url(../../assets/bg_index_top.jpg);
				background-position: -448px 0;
			}
			.list-item:nth-of-type(4){
				background:url(../../assets/bg_index_top.jpg);
				background-position: -672px 0;
			}		
			.list-item:nth-of-type(5){
				background:url(../../assets/bg_index_top.jpg);
				background-position: -897px 0;
			}											
		}		
	}
}
</style>
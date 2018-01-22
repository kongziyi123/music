<!-- 歌手 -->
<template>
	<div class="singer">
		<div class="banner">
			<div class="tit">
				万千歌手  尽在眼前
			</div>
			<p>登录查看你关注的歌手</p>
			<button>立即登录</button>
		</div>
		<div class="category clearfix">
			<ul class="singercategory">
				<li v-for="(item,$index) in category" :data-key="item.key" :class="{active:$index===categoryxb}" @click="changeactive($index,item)">{{item.name}}</li>
			</ul>
			<ul class="Theletter clearfix">
				<li v-for="(item,$index) in Theletter" :data-key="item.key" :class="{active:$index===tenletterxb}" @click="changetenletter($index,item)">{{item.name}}</li>
			</ul>
		</div>
		<div>
			<div class="singerlist">
				<div class="singer-top clearfix" v-if="page==1">
					<div v-for="singer in topsinger" class="singer-item">
						<router-link :to="/singerHome/+singer.Fsinger_mid" class="item-img">
							<img :src="singer.Fsinger_mid|urladd" alt="">
						</router-link>
						<router-link :to="/singerHome/+singer.Fsinger_mid"> 
							{{singer.Fsinger_name}}
						</router-link>
					</div>
				</div>
				<div class="singer-bottom clearfix">
					<div v-for="bottonsinger in bottomsiger" class="item">
						<router-link :to="/singerHome/+bottonsinger.Fsinger_mid"> 
							{{bottonsinger.Fsinger_name}}
						</router-link>
					</div>
				</div>
			</div>
			<div class="page-warp">
				<el-pagination
				background
				layout="prev, pager, next"
				:total="model.total_page*10"
				@current-change="currenchange"
				:current-page="page"
				>
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import {singername,singercategory,apistr} from '@/api/config.js'
export default{
	data(){
		return{
			category:'',
			categoryxb:0,
			Theletter:'',
			tenletterxb:0,
			model:'',
			page:1,
			type:"all_all_all"
		}
	},
	created(){
		this.category=singercategory;
		this.Theletter=singername;
		this.getsinger();
	},
	methods:{
		changeactive(i,item){
			this.categoryxb=i;
			this.tenletterxb=0;
			this.type=this.category[this.categoryxb].key+"_"+this.Theletter[this.tenletterxb].key;
			this.page=1;
			this.getsinger();
		},
		changetenletter(i,item){
			this.tenletterxb=i;		
			this.type=this.category[this.categoryxb].key+"_"+this.Theletter[this.tenletterxb].key;
			this.page=1;
			if(item.key=="#")
			{
				this.type=this.category[this.categoryxb].key+"_9";
			}
			this.getsinger();
		},
		getsinger(){
			let option={
				channel:'singer',
				page:'list',
				key:this.type,
				pagesize:100,
				pagenum:this.page,
				format:'json'
			}
			option=Object.assign({},apistr,option);
			this.ajax.get("/qq/v8/fcg-bin/v8.fcg",{params:option}).then((resolve)=>{
				this.model=resolve.data.data;
			}).catch((reject)=>{

			})
		},
		currenchange(i){
			this.page=i;
			this.getsinger();
		}
	},
	watch:{
	},
	computed:{
		topsinger(){
			if(this.model)
			{
				let arr=[];
				arr=this.model.list.slice(0,10);
				return arr
			}
		},
		bottomsiger(){
			if(this.model)
			{
				let arr=[];
				if(this.page==1)
				{
					arr=this.model.list.slice(10,100);
				}
				else
				{
					arr=this.model.list;
				}
				return arr;
			}
		}
	},
	filters:{
		urladd(val){
			return "//y.gtimg.cn/music/photo_new/T001R150x150M000"+val+".jpg?max_age=2592000";
		}
	}
}

</script>
<style lang="less">
.singer{
	font-family: poppin,Tahoma,Arial,sans-serif;
	.banner{
		width: 100%;
		height: 380px;
		background: url(../../assets/bg_singer.jpg);
		background-position: -280px 0;
		overflow: hidden;
		text-align: center;
		color:#fff;
		font-weight: 100;
		.tit{
			font-size: 58px;
			margin-top:100px;	
			
		}
		p{
			font-size:22px;
			margin-top: 24px;
		}
		button{
			width: 172px;
			height: 46px;
			background:transparent;
			border:1px solid #464646;
			color:#fff;
			cursor:pointer;
			transition:all .6s;
			border-radius:2px;
			margin-top: 20px;
			&:hover{
				border: 1px solid#fff;
			}
		}
	}
	.category{
		max-width: 1180px;
		margin-left:110px;
		padding:50px 0;
		color:#666;
		.singercategory{
			width: 100%;
			overflow: hidden;
			min-width: 860px;
			li{
				margin-top: 14px;
				float: left;
				margin-right: 30px;
				padding: 7px;
				cursor:pointer;
			}
			li:nth-of-type(1){
				margin-right: 36px;
			}
			.active{
				background:#31c27c;
				color:#fff;
			}
		}
		.Theletter{
			width: 100%;
			min-width: 860px;
			li{
				margin-top: 14px;
				float: left;
				margin-right: 13px;
				padding: 7px;
				cursor:pointer;
			}
			li:nth-of-type(1){
				margin-right: 30px;
			}
			.active{
				background:#31c27c;
				color:#fff;
			}
		}
	}
	.singerlist{	
		min-width: 1250px;
		overflow: hidden;
		.singer-top{
			margin-left: 120px;
			.singer-item{
				float: left;
				width: 140px;
				height:180px;
				margin-bottom:85px;
				margin-right: 100px;
				text-align:center;
				&:nth-of-type(5){
					margin-right:0px;
				}
				&:nth-of-type(10){
					margin-right:0px;
				}				
				.item-img{
					width: 140px;
					height: 140px;;
					border-radius:50%;
					overflow: hidden;
					cursor: pointer;
					background:url(../../assets/singer_300.png);
					background-size:cover;	
				}
				a{
					display:block;
				}
				a:nth-of-type(2){
					color:#666;
					margin-top: 24px;
					cursor: pointer;
					font-size:14px;
					text-overflow:ellipsis;
					overflow: hidden;
					white-space: nowrap;
					display:block;
					&:hover{
						color:#31c27c;
					}
				}
			}
		}
		.singer-bottom{
			overflow: hidden;
			width: 1220px;
			margin-left:78px;
			.item{
				float: left;
				width: 20%;
				margin-bottom:22px;
				a{
					color:#666;
					&:hover{
						color:#31c27c;
					}
				}
				
			}
		}
	}
	.page-warp{
		text-align: center;
		margin: 50px 0;
		.el-pagination{
			display: inline-block;
			color:#abc5e7;
			.number{
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.btn-next,.btn-prev{
				line-height: 50px;
				width: 50px;
				height: 50px;
			}
			.el-icon-more{
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.el-icon-d-arrow-left,.el-icon-d-arrow-right{
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
			.active{
				background:#31c27c !important;
			}
		}
	}
}
</style>
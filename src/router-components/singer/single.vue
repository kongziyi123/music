<template>
  <div class="singer">
    <h2>单曲 {{singer.total}}</h2>
    <div type="button" class="play-all" @click="playall">播放全部</div>
      <div class="list-container">
            <div class="songlist">
                <div class="list-head">
                    <div class="td1">歌曲</div>
                    <div class="td3">专辑</div>
                    <div class="td4">时长</div>
                 </div>	
                <div class="list-body-warp">
                    <div class="list-body" v-for="(item,index) in singer.list">
                        <div class="td1"><div class="tit">{{index+1}}</div>
                            <router-link :to="/songinformation/+item.musicData.songmid">{{item.musicData.songname}}<span class="albumdesc">{{item.musicData.albumdesc}}</span></router-link>
                            <div class="bq"> 
                                <a href="" class="dj" v-if="item.musicData.isonly==1"></a>
                                <a :href="item.musicData.vid|vid" 
                                    class="mv"
                                    v-if="item.vid"></a></div>
                                <div class="buttons">
                                    <div @click="play(item)"></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div class="td3">
                            <router-link :to="/alibuminformation/+item.musicData.albummid">
                                {{item.musicData.albumname}}
                                </router-link>
                            </div>
                            <div class="td4">
                                {{item.musicData.interval|time}}  
                            </div>
                        </div>
                    </div>						 
               </div>
            </div>    
            
  			<div class="page-warp">
				<el-pagination
				background
				layout="prev, pager, next"
				:total="singer.total/3"
                :current-page="page"
                @current-change="currenchange"
				>
				</el-pagination>
			</div>          
  </div>
</template>
<script>
import {apistr,addzero,playsong} from '@/api/home'
export default {
data(){
    return{
        singer:"",
        page:1
    }
},
created(){
    this.getsongs();
},
methods:{
    getsongs(){
        //获取列表歌曲
        let option={
            format:'json',
            singermid:this.$route.params.id,
            order:'listen',
            begin:(this.page-1)*30,
            num:30,
            songstatus:1,
            platform:'h5page',
            from:'h5'
        }
        option=Object.assign({},apistr,option);
        this.ajax.get("/qq/v8/fcg-bin/fcg_v8_singer_track_cp.fcg",{
            params:option
        }).then((resolve)=>{
            if(resolve.data.message=="succ")
                this.singer=resolve.data.data;
        })        
    },
    currenchange(page){
        this.page=page;
        this.getsongs();
    },
    play(item){
        this.playsong(item.musicData);
    },
    playall(){
        this.playsong(this.songlist);
    },
    playsong:playsong
},
filters:{
    time(time){
		let f=addzero(parseInt(time/60));
		let miao=addzero(parseInt(time%60));
		return f+":"+miao
    },
 	vid(url){
		return "https://y.qq.com/n/yqq/mv/v/"+url+".html";
	}      
},
computed:{
    songlist(){
        let arr=[];
        for(var i=0;i<this.singer.list.length;i++)
        {
            arr.push(this.singer.list[i].musicData);
        }
        return arr
    }
}

};
</script>
<style lang="less">
	@sprite:url(../../assets/icon_sprite.png);
.singer{
    max-width: 1200px;
    margin:50px auto;
    h2{
        font-size: 26px;
        margin-bottom:20px;
    }
    .play-all{
        width: 120px;
        height: 36px;
        border:1px solid #c9c9c9;
        background:#fff;
        position: relative;
        text-align: center;
        line-height: 36px;
        text-indent: 15px;
        cursor: pointer;
        &::before{
            content: '';
            width: 15px;
            height: 15px;
            position: absolute;
            background:url(../../assets/icon_sprite.png);
            background-position: -60px -220px;
            left:26px;
            top:11px;
        }
    }
  .list-container {
    width: 100%;
    display: flex;
    min-width: 800px;
    margin:20px auto;
    .songlist {
      width: 100%;
      .list-head {
        width: 100%;
        display: flex;
        div {
          flex: 1;
          line-height: 20px;
          color: #999;
        }
        .td1 {
          flex: 1;
          width: 55%;
        }
        .td2 {
          width: 100px;
          flex: none;
        }
        .td4 {
          width: 5%;
          flex: none;
        }
        .td3 {
          flex: none;
          width: 40%;
        }
        div:nth-of-type(1) {
          text-indent: 40px;
        }
      }
      .list-body-warp {
        margin-top: 30px;
        .list-body {
          width: 100%;
          display: flex;
          margin-bottom: 40px;
          color: #a6b5d7;
          .td1 {
            width: 55%;
            min-width: 400px;
            position: relative;
            a {
              max-width: 300px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .buttons {
              position: absolute;
              top: -10px;
              right: 20px;
              height: 36px;
              display: inline-block;
              display: none;
              div {
                width: 36px;
                height: 36px;
                float: left;
                background: #ff0000;
                margin-right: 5px;
                cursor: pointer;
              }
              div:nth-of-type(1) {
                background: url(../../assets/btnicon.png) no-repeat;
                background-position: 0 0;
                &:hover {
                  background-position: -40px -0px;
                }
              }
              div:nth-of-type(2) {
                background: url(../../assets/btnicon.png) no-repeat;
                background-position: 0 -40px;
                &:hover {
                  background-position: -40px -40px;
                }
              }
              div:nth-of-type(3) {
                background: url(../../assets/btnicon.png) no-repeat;
                background-position: 0 -80px;
                &:hover {
                  background-position: -40px -80px;
                }
              }
              div:nth-of-type(4) {
                background: url(../../assets/btnicon.png) no-repeat;
                background-position: 0 -120px;
                &:hover {
                  background-position: -40px -120px;
                }
              }
            }
            &:hover {
              .buttons {
                display: inline-block;
              }
            }
          }
          .td4 {
            width: 5%;
            flex: none;
          }
          .td3 {
            flex: none;
            width: 40%;
          }
          .td1 {
            .tit {
              float: left;
            }
            a {
              float: left;
              margin-left: 30px;
              .albumdesc {
                margin-left: 10px;
                color: #999;
              }
            }
            .bq {
              float: left;
              margin-left: 10px;
              a {
                display: inline-block;
                width: 34px;
                height: 16px;
                margin-left: 5px;
              }
              .dj {
                background: @sprite;
                background-position: -80px -280px;
              }
              .mv {
                background: @sprite;
                background-position: -40px -280px;
              }
            }
          }

          a {
            color: #333;
          }
          a:hover {
            color: rgb(108, 198, 101);
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

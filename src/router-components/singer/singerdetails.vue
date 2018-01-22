<template>
    <div class="singerdetails">
        <div class="container">
            <div class="singer-news">
                <div class="singer-tit clearfix">
                    <h2>热门歌曲</h2>
                    <a href="##">全部></a>
                </div>
                <div class="list-container">
                    <div class="songlist">
                        <div class="list-head">
                            <div class="td1">歌曲</div>
                            <div class="td3">专辑</div>
                            <div class="td4">时长</div>
                        </div>	
                        <div class="list-body-warp">
                            <div class="list-body" v-for="(item,index) in singer.list" v-if="index<10">
                                <div class="td1"><div class="tit">{{index+1}}</div>
                                    <router-link :to="/songinformation/+item.musicData.songmid">{{item.musicData.songname}}<span class="albumdesc">{{item.musicData.albumdesc}}</span></router-link>
                                    <div class="bq"> <a href="" class="dj" v-if="item.musicData.isonly==1"></a>
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
            </div>
            <div class="singer-album">
                <div class="singer-tit clearfix">
                    <h2>专辑</h2>
                    <a href="##">全部></a>
                </div>     
                <div class="album-items clearfix">
                    <div class="album-item" v-for="(album,$index) in singer.albumlist" v-if="$index<5">
                        <router-link :to="/alibuminformation/+album.albummid" class="img">
                            <img :src="album.pic" alt="">
                            <span class="play"></span>
                        </router-link>
                        <p>{{album.name}}</p>
                        <span>{{album.publish_date}}</span>
                    </div>
                </div>
            </div>
            <div class="singer-album">
                <div class="singer-tit clearfix">
                    <h2>MV</h2>
                    <a href="##">全部></a>
                </div>     
                <div class="album-items clearfix">
                    <div class="album-item" v-for="(album,$index) in mv">
                        <a :href="album.vid|vid" class="img mvimg">
                            <img :src="album.pic" alt="">
                            <span class="play"></span>
                        </a>
                        <p>{{album.title}}</p>
                        <span><i class="count"></i> {{album.listenCount|quwan}}万</span>
                    </div>
                </div>
            </div>
            <div class="singer-album">
                <div class="singer-tit clearfix">
                    <h2>粉丝上传</h2>
                    <a href="##">全部></a>
                </div>     
                <div class="album-items clearfix">
                    <div class="album-item" v-for="(album,$index) in fansmv.list">
                        <a :href="album.vid|vid" class="img mvimg">
                            <img :src="album.pic" alt="">
                            <span class="play"></span>
                        </a>
                        <p><a :href="album.vid|vid">{{album.title}}</a></p>
                        <div class="upload_nick"><span>{{album.upload_nick}}</span></div>
                        <span><i class="count"></i> {{album.listenCount}}</span>
                    </div>
                </div>
            </div>
            <div class="singer-album">
                <div class="singer-tit clearfix">
                    <h2>相似歌手</h2>
                </div>     
                <div class="similar-songer clearfix">
                    <div class="similar-item" v-for="similaritem in similar">
                        <router-link :to="/singerdetails/+similaritem.mid" class="img">
                            <img :src="similaritem.pic" alt="">
                        </router-link>
                        <router-link :to="/singerdetails/+similaritem.mid">{{similaritem.name}}</router-link>
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>

import {apistr,musicurl} from '@/api/config'
import {addzero,Storage,playsong} from '@/api/home'
export default{
data(){
    return{
        mid:'',
        singer:'',
        mv:'',
        fansmv:'',
        similar:''
    }
},
created(){
    this.mid==this.$route.params.id;
    this.init();
},
methods:{
    init(){
        //获取列表歌曲
        let option={
            format:'json',
            singermid:this.$route.params.id,
            order:'listen',
            begin:0,
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
                console.log(this.singer);
        })
        let option2={
            cid:205360581,
            singermid:this.$route.params.id,
            order:'listen',
            begin:0,
            num:5,
            format:'json'
        }
        option2=Object.assign({},apistr,option2);
        this.ajax.get("/qq/mv/fcgi-bin/fcg_singer_mv.fcg",{
            params:option2
        }).then((resolve)=>{
            if(resolve.data.message=="succ"){
                this.mv=resolve.data.data.list;
            }
        })
        //mv/fcgi-bin/fcg_singer_mv.fcg
        let option3={
            order:"time",
            cmd:1
        }
        option3=Object.assign({},option2,option3);
        this.ajax.get("/qq/mv/fcgi-bin/fcg_singer_mv.fcg",{
            params:option3
        }).then((resolve)=>{
            if(resolve.data.message=="succ"){
                this.fansmv=resolve.data.data;
            }
        })  
        let option4={
            singer_mid:this.$route.params.id,
            start:0,
            num:5,
            g_tk:5381,
            format:'jsonp'
        }
        option4=Object.assign({},apistr,option4);
        this.ajax.get("/qq/v8/fcg-bin/fcg_v8_simsinger.fcg",{
            params:option4
        }).then((resolve)=>{
             this.similar=resolve.data.singers.items;
        })  

    },
    playsong:playsong,
    play(data){
        this.playsong(data.musicData);
    }
},
filters:{
    imgadd(val){
        return '//y.gtimg.cn/music/photo_new/T001R300x300M000'+val+'.jpg?max_age=2592000';
    },
    quwan(val){
        return (val/10000).toFixed(1);
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
watch:{
    $route(){
        this.init();
        window.scrollTo(0,0);
    }
}


}
</script>
<style lang="less" scoped>
	@sprite:url(../../assets/icon_sprite.png);
    .singerdetails{
        // background-image:linear-gradient(to top, #fff, #f2f2f2);
        width: 100%;
        overflow: hidden;
        .container{
            width: 1200px;
            margin:40px auto;
            .singerdetails-header{
                color:#333;
                display: flex;
                .header-img{
                    width: 250px;
                    height: 250px;
                    border-radius:50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height:100%;
                    }
                }
                .header-tit{
                    flex:1;
                    margin-left: 50px;
                    margin-top: 35px;
                    h2{
                        font-size: 38px;
                    }
                    .singer-jjwarp{
                        margin-top: 26px;
                        position: relative;
                        margin-bottom:20px;
                        span{
                            float: left;
                        }
                        .singer-jj{
                            width: 700px;
                            float: left;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                            
                            font-size: 14px;
                        }
                        .more{
                            z-index: 9999;
                            position: absolute;
                            line-height: 22px;
                            left:230px;
                            top:25px;
                            h2{
                                font-size: 20px;
                                margin-bottom:24px;
                            }
                           .scroll::before{
                                content:'';
                                display: block;
                                width: 17px;
                                height: 8px;
                                background:url('../../assets/sanjiao.png');
                                background-position: -12px 0;
                                position: absolute;
                                top:-7px;
                                right:50px;
                                z-index: 999999;
                            }
                        }

                    }
                    .works{
                        margin-bottom:24px;
                        div{
                            float:left;
                            padding-right: 20px;
                            font-size: 18px;
                        }
                        span{
                            font-size: 24px;
                            margin-left: 12px;
                        }
                        div+div{
                            border-left:1px solid #c9c9c9;
                            padding-left: 20px;
                        }
                    }
                    .btns{
                        .btn{
                             padding:0 24px;
                             line-height:38px;
                             float: left;
                             text-align: center;
                             height: 38px;
                             box-sizing:border-box;
                             cursor: pointer;
                             position: relative;
                             text-indent: 13px;
                            span{
                                margin-left: 5px;
                            }
                        }
                        .btn:nth-of-type(1){
                            background: #31c27c;
                            color:#fff;
                          
                            &::before{
                                content: '';
                                width: 13px;
                                height: 16px;
                                position: absolute;
                                background: url(../../assets/icon_sprite.png);
                                background-position:-80px -220px;
                                left:20px;
                                top:11px;
                            }
                        }
                         .btn:nth-of-type(2){
                             margin-left: 6px;
                            background: #fcfbfc;
                            border:1px solid #c9c9c9;
                            color:#666;
                            &::before{
                                content: '';
                                width: 17px;
                                height: 16px;
                                position: absolute;
                                background: url(../../assets/icon_sprite.png);
                                background-position:0px -180px;
                                left:15px;
                                top:11px;
                            }


                        }                      
                    }

                }

            }
            .singer-news{              
                .singer-tit{
                     margin-top: 50px;
                     margin-bottom: 40px; 
                    h2{
                        float: left;
                        display: inline-block;
                        font-size: 23px;
                    }
                    a{
                        font-size: 14px;
                        color:#666;
                        float:right;
                    }
                }
                .list-container{
                    width:100%;
                    margin-top:50px;
                    display:flex;
                    .songlist{
                        width:100%;
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
                                width: 55%;
                            }
                            .td2{
                                width:100px;
                                flex:none;	
                            }
                            .td4{
                                width: 5%;
                                flex:none;
                            }
                            .td3{
                                flex:none;
                                width: 40%;
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
                                .td1{
                                    width: 55%;
                                    min-width: 400px;
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
                                    width:5%;
                                    flex:none;
                                }
                                .td3{
                                    flex:none;
                                    width:40%;
                                }
                                .td1{
                                    .tit{
                                        float:left;
                                    
                                    }	
                                    a{
                                        float:left;
                                        margin-left:30px;
                                        .albumdesc{
                                            margin-left: 10px;
                                            color:#999;
                                        }
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
            .singer-album{
                .singer-tit{
                     margin-top: 20px;
                     margin-bottom:20px; 
                    h2{
                        float: left;
                        display: inline-block;
                        font-size: 23px;
                    }
                    a{
                        font-size: 14px;
                        color:#666;
                        float:right;
                    }
                }    
                .similar-songer{
                    margin-left: 40px;
                    .similar-item{
                        float:left;
                        text-align: center;
                        .img{
                            width: 140px;
                            height: 140px;
                            overflow: hidden;
                            border-radius:50%;
                             margin-bottom:24px;
                             display: block;
                            img{
                                width: 100%;
                                height: 100%;
                               
                            }
                        }
                        a{
                            color:#666;
                            font-size: 14px;
                        }

                    }
                    .similar-item+.similar-item{
                        margin-left: 100px;
                    }
                }
                .album-items{
                    .album-item{
                        float:left;
                        width: 224px;
                        overflow: hidden;
                        .img{
                            position: relative;
                            overflow: hidden;
                            cursor: pointer;
                             width: 224px;
                            height: 225px;
                            display: block;
                            &::before{
                                content: '';
                                height:100%;
                                background: rgba(0,0,0,0);
                                position:absolute;
                                width: 100%;
                                top:0px;
                                left:0px;
                                transition:all .8s;
                            }
                             &:hover{
                                 &::before{
                                     background: rgba(0,0,0,.3);     
                                 }
                                 img{
                                    transform:scale(1.1,1.1);
                                 }
                                 .play{
                                     opacity: 1;
                                     transform:scale(1.4,1.4);
                                 }
                                
                            }
                           
                            img{
                                width: 100%;
                                height: 100%;
                                transition:all .8s;
                            }
                            .play{
                                width: 50px;
                                height: 50px;
                                background: url('../../assets/cover_play.png');
                                background-size:cover;
                                position:absolute;
                                top:50%;
                                left:50%;
                                margin-top: -25px;
                                margin-left: -25px;
                                opacity: 0;
                                transition:all 1s;
                            }
                        }
                        p{
                            margin-top: 10px;
                            color:#333333;
                            font-weight: 500;
                            margin-bottom:6px;
                            text-overflow:ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .upload_nick{
                            margin-bottom:6px;
                        }
                        span{
                            color:#a6b5d7;
                            marign-bottom:8px;
                        }
                        .mvimg{
                            height:125px;
                            display: block;
                        }
                        .count{
                            width: 20px;
                            height: 12px;
                            margin-right: 6px;
                            display: block;
                            float: left;
                            background: url(../../assets/icon_sprite.png);
                            background-position:-180px -20px;
                        }
                    }
                    .album-item+.album-item{
                        margin-left: 19px;  

                    }

                }            
            }
            .singer-album+.singer-album
            {
                 margin-top: 50px; 
            }
        }

    }

</style>

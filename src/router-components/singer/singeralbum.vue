<template>
  <div class="singeralbum">
    <div class="paging">
        <h2>专辑<span>{{album.total}}</span></h2>
        <div class="container clearfix">
            <div class="album-item" v-for="item in album.list">
                <div class="item-content">
                    <router-link :to="/alibuminformation/+item.albumMID" class="img">
                        <img :src="item.albumMID|imgurl" alt="">
                        <i></i>
                    </router-link>
                    <router-link :to="/alibuminformation/+item.albumMID" class="tit">{{item.albumName}}</router-link>
                    <p>{{item.pubTime}}</p>
                </div>
            </div>
        </div>
        <div class="page-warp">
            <el-pagination class="page-warp"
                    background
                    layout="prev, pager, next"
                    :total="album.total/3"
                    :current-page="page"
                    @current-change="currenchange"
            >                
            </el-pagination>
        </div>
    </div>
  </div>
</template>
<script>
    import {apistr} from '@/api/config'
    export default{
        data(){
            return{
                album:"",
                page:1

            }
        },
        created(){
            this.init();
        },
        components:{
        },
        methods:{
            currenchange(page){
                this.page=page;
                this.init();
            },
            init(){
                let option={
                    g_tk:5381,
                    format:'json',
                    singermid:this.$route.params.id,
                    order:'time',
                    begin:(this.page-1)*30,
                    num:30,
                    exstatus:1
                }
                option=Object.assign({},apistr,option);
                // https://c.y.qq.com/
                this.ajax.get('/qq/v8/fcg-bin/fcg_v8_singer_album.fcg',{
                    params:option
                }).then((resolve)=>{
                    this.album=resolve.data.data;
                }).catch(()=>{

                })
            }
        },
        filters:{
            imgurl(val){
                return '//y.gtimg.cn/music/photo_new/T002R300x300M000'+val+'.jpg?max_age=2592000';
            }
        }

    }
</script>


<style lang="less">
    .singeralbum{
        max-width: 1200px;
        margin:50px auto;
        min-width: 900px;
        width: 100%;
        .paging{
            h2{
                color:#333;
                font-size: 24px;
                span{
                    margin-left: 10px;
                }
            }
            .page-warp{
                text-align: center;
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
            .container{
                margin-top: 20px;
                width: 100%;
                .album-item{
                    width: 20%;
                    float: left;
                    .item-content{
                        margin-right: 20px;
                        padding-bottom:50px;
                        .tit{
                            margin-top:18px;
                            display: block;
                            color:#333;
                            margin-bottom:10px;
                            text-overflow:ellipsis;
				            overflow: hidden;
					        white-space: nowrap;
                        }
                        p{
                            color:#b3d7ff;
                        }
                        .img{
                            display: block;
                            width: 100%;
                            position: relative;
                            overflow: hidden;
                            img{
                                width: 100%;
                                transition:all .8s;   
                            }
                            &:hover{
                                &::before{
                                    background: rgba(0,0,0,.4);
                                }
                                i{
                                    opacity: .8;
                                    transform:scale(1.3,1.3);
                                }
                                img{
                                    transform: scale(1.1,1.1);
                                }
                            }
                            &::before{
                                content: '';
                                height:100%;
                                background:rgba(0,0,0,0);
                                position:absolute;
                                top:0px;
                                left:0px;
                                width: 100%;
                                transition:all .6s;

                            }
                            i{
                                position:absolute;
                                width:50px;
                                height: 50px;
                                background:url(../../assets/cover_play.png);
                                background-size: cover;
                                top:50%;
                                left:50%;
                                margin-top: -25px;
                                margin-left: -25px;
                                opacity: 0;
                                transition:all .8s;

                            }
                        }
                        a:hover{
                           color:#317217;
                        }
                    }

                }
            }
        }        
    }

</style>

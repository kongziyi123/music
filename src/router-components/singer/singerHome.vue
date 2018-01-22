<template>
    <div class="singerHome" @click="morehide">
        <div class="singerdetails-header">
            <div class="header-img">
                <img :src="singer.singer_mid|imgadd" alt="">
            </div>
            <div class="header-tit">
              <router-link :to="/singerHome/+this.$route.params.id">
                <h2>{{singer.singer_name}}</h2>
              </router-link>
                <div class="singer-jjwarp clearfix">
                    <p class="singer-jj">{{singer.SingerDesc}}</p>
                    <span @click.stop="moreshow">[ 更多 ]</span> 
                    <div class="more">
                        <happyscroll ref="Scroll">
                            <span class="sanjiao"></span>
                            <h2>歌手简介</h2>
                            {{singer.SingerDesc}}                           
                        </happyscroll>
                    </div> 
                </div>
                <div class="works clearfix">
                    <router-link :to="/singerHome/+this.$route.params.id+/single/" class="danqu">单曲<span>{{singer.total}}</span></router-link>
                    <router-link :to="/singerHome/+this.$route.params.id+/singeralbum/"iv class="zj">专辑<span>{{singer.albumTotal}}</span></router-link>
                    <router-link :to="/singerHome/+this.$route.params.id+/singermv/" class="MV">MV<span>{{singer.mvTotal}}</span></router-link>
                </div>
                <div class="btns">
                    <div class="btn" @click="playall">
                            播放歌手热门歌曲
                    </div>
                    <div class="btn">
                        关注<span>{{singer.fans|quwan}}万</span>
                    </div>
                </div>                   
            </div>
        </div>  
        <router-view @musicts="musicts"></router-view>
    </div>
</template>

<script>
import { apistr, musicurl } from "@/api/config";
import { addzero, Storage,playsong} from "@/api/home";
import happyscroll from "@/components/happyscroll/happyscroll";
export default {
  data() {
    return {
      singer: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //获取列表歌曲
      let option = {
        format: "json",
        singermid: this.$route.params.id,
        order: "listen",
        begin: 0,
        num: 30,
        songstatus: 1,
        platform: "h5page",
        from: "h5"
      };
      option = Object.assign({}, apistr, option);
      this.ajax
        .get("/qq/v8/fcg-bin/fcg_v8_singer_track_cp.fcg", {
          params: option
        })
        .then(resolve => {
          if (resolve.data.message == "succ") this.singer = resolve.data.data;
        });
    },
    playsong:playsong,
    playall() {
      this.playsong(this.musicData);
    },
    moreshow() {
      this.$refs.Scroll.show();
    },
    morehide() {
      this.$refs.Scroll.hide();
    },
    musicts(){
      this.$emit("musicts");
    }
  },
  filters: {
    imgadd(val) {
      return (
        "//y.gtimg.cn/music/photo_new/T001R300x300M000" +
        val +
        ".jpg?max_age=2592000"
      );
    },
    quwan(val) {
      return (val / 10000).toFixed(1);
    }
  },
  components: {
    happyscroll
  },
  computed: {
    musicData() {
      let arr = [];
      for (var i = 0; i < this.singer.list.length; i++) {
        arr.push(this.singer.list[i].musicData);
      }
      return arr;
    }
  }
};
</script>


<style lang="less">
.singerHome {
  width: 100%;
  background-image:linear-gradient(to top, #fff, #f2f2f2);
  .singerdetails-header {
    color: #333;
    display: flex;
    margin: 0 auto;
    min-width: 1200px;
    margin-left: 80px;
    .header-img {
      width: 250px;
      height: 250px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header-tit {
      flex: 1;
      margin-left: 50px;
      margin-top: 35px;
      h2 {
        color:#333;
        font-size: 38px;
      }
      .singer-jjwarp {
        margin-top: 26px;
        position: relative;
        margin-bottom: 20px;
        span {
          float: left;
        }
        .singer-jj {
          width: 700px;
          float: left;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;

          font-size: 14px;
        }
        .more {
          z-index: 9999;
          position: absolute;
          line-height: 22px;
          left: 230px;
          top: 25px;
          h2 {
            font-size: 20px;
            margin-bottom: 24px;
          }
          .scroll::before {
            content: "";
            display: block;
            width: 17px;
            height: 8px;
            background: url("../../assets/sanjiao.png");
            background-position: -12px 0;
            position: absolute;
            top: -7px;
            right: 50px;
            z-index: 999999;
          }
        }
      }
      .works {
        margin-bottom: 24px;
        a {
          float:left;
          padding-right: 20px;
          font-size: 18px;
          color:#333;
        }
        span {
          font-size: 24px;
          margin-left: 12px;
        }
        a + a {
          border-left: 1px solid #c9c9c9;
          padding-left: 20px;
        }
      }
      .btns {
        .btn {
          padding: 0 24px;
          line-height: 38px;
          float: left;
          text-align: center;
          height: 38px;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;
          text-indent: 13px;
          span {
            margin-left: 5px;
          }
        }
        .btn:nth-of-type(1) {
          background: #31c27c;
          color: #fff;

          &::before {
            content: "";
            width: 13px;
            height: 16px;
            position: absolute;
            background: url(../../assets/icon_sprite.png);
            background-position: -80px -220px;
            left: 20px;
            top: 11px;
          }
        }
        .btn:nth-of-type(2) {
          margin-left: 6px;
          background: #fcfbfc;
          border: 1px solid #c9c9c9;
          color: #666;
          &::before {
            content: "";
            width: 17px;
            height: 16px;
            position: absolute;
            background: url(../../assets/icon_sprite.png);
            background-position: 0px -180px;
            left: 15px;
            top: 11px;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="singermv">
        <h2>MV<span>{{mvlist.total}}</span></h2>
        <div class="container clearfix">
            <div class="mv-item" v-for="item in mvlist.list">
                <div class="item-container">
                    <a  :href="item.vid|mvurl" class="img">
                        <img v-lazy="item.pic" alt="">
                        <i></i>
                    </a>
                    <a :href="item.vid|mvurl" class="tit" >{{item.title}}</a>
                    <p class="number">{{item.listenCount|quwang}}万</p>
                </div>
            </div>
        </div>
        <div class="page-warp">
            <el-pagination class="page-warp"
                    background
                    layout="prev, pager, next"
                    :total="mvlist.total/5"
                    :current-page="page"
                    @current-change="currenchange"
            >                
            </el-pagination>
        </div>
  </div>
</template>


<script>
import { apistr } from "@/api/config";
export default {
  data() {
    return {
      mvlist: "",
      page: 1
    };
  },
  created() {
    this.init();
  },
  methods: {
    currenchange(page) {
      this.page = page;
      this.init();
      window.scrollTo(0, 0);
    },
    init() {
      let option = {
        g_tk: 5381,
        format: "json",
        singermid: this.$route.params.id,
        order: "listen",
        begin: (this.page - 1) * 52,
        num: 52,
        exstatus: 1,
        cid: 205360581
      };
      option = Object.assign({}, apistr, option);
      // ttps://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg
      this.ajax
        .get("/qq/mv/fcgi-bin/fcg_singer_mv.fcg", {
          params: option
        })
        .then(resolve => {
          this.mvlist = resolve.data.data;
        })
        .catch(() => {});
    }
  },
  filters: {
    imgurl(val) {
      return (
        "//shp.qpic.cn/qqvideo_ori/0/b0020d8wsqm_360_204/0" + val + "_360_204/0"
      );
    },
    mvurl(val) {
      return (
        "https://y.qq.com/n/yqq/mv/v/" +
        val +
        ".html#stat=y_new.singer.mv.mv_play"
      );
    },
    quwang(val) {
      return (val / 10000).toFixed(1);
    }
  }
};
</script>


<style lang="less">
.singermv {
  width: 100%;
  max-width: 1200px;
  min-width: 900px;
  margin: 50px auto;
  h2 {
    font-size: 24px;
    margin-bottom: 25px;
    span {
      margin-left: 10px;
    }
  }
  .container {
    width: 100%;
    .mv-item {
      width: 25%;
      float: left;
      .item-container {
        margin-left: 20px;
        .img {
          width: 100%;
          height: 100%;
          display: block;
          position: relative;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            transition:all .8s;
          }
          &:hover {
            &::before {
              background: rgba(0, 0, 0, 0.4);
            }
            i {
              opacity: 0.8;
              transform: scale(1.3, 1.3);
            }
            img {
              transform: scale(1.1, 1.1);
            }
          }
          &::before {
            content: "";
            height: 100%;
            background: rgba(0, 0, 0, 0);
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            transition: all 0.6s;
          }
          i {
            position: absolute;
            width: 50px;
            height: 50px;
            background: url(../../assets/cover_play.png);
            background-size: cover;
            top: 50%;
            left: 50%;
            margin-top: -25px;
            margin-left: -25px;
            opacity: 0;
            transition: all 0.8s;
          }
        }
        .tit {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          margin-top: 16px;
          display: block;
          margin-bottom: 6px;
        }
        .number {
          color: #999999;
          margin-bottom: 50px;
          padding-left: 24px;
          position: relative;
          &::before {
            content: "";
            width: 20px;
            height: 12px;
            position: absolute;
            background: url(../../assets/icon_sprite.png);
            background-position: -180px -20px;
            left: 0px;
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

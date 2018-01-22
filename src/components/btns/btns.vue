<template>
	<div class="btns clearfix">
		<div class="playbtn" @click="playall" ><span>播放全部</span></div>
		<div class="collectionbtn"><span><a href="">收藏</a></span></div>
		<div class="more"><span><a href="">更多</a></span></div>		
	</div>
</template>

<script>
export default {
  methods: {
    playall() {
      this.$emit("playall");
    }
  }
};
</script>


<style lang="less" scoped>
.btns {
  margin-top: 20px;
  width: 100%;
  div {
    width: 123px;
    height: 38px;
    line-height: 38px;
    float: left;
    margin-right: 6px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 2px;
    span {
      position: relative;
    }
    span::after {
      content: "";
      width: 16px;
      height: 16px;
      display: block;
      float: left;
      position: absolute;
      left: -20px;
      top: 0px;
    }
  }
  div:nth-of-type(1) {
    background: #31c27c;
    color: #fff;
    span::after {
      background: url("../../assets/icon_sprite.png");
      background-position: -80px -220px;
    }
  }
  div:nth-of-type(2) {
    background: #fcfbfc;
    color: #333333;
    border: 1px solid #c9c9c9;
    span::after {
      background: url("../../assets/icon_sprite.png");
      background-position: -60px 0px;
      top: 1px;
    }
  }
  div:nth-of-type(3) {
    background: #fcfbfc;
    color: #333333;
    border: 1px solid #c9c9c9;
    span::after {
      background: url("../../assets/icon_sprite.png");
      background-position: -20px -80px;
    }
  }
}
</style>
<template>
  <div id="app">
        <headView></headView>
         <router-view @musicts="addmusicfn"></router-view>
        <footerview></footerview>	
        <div class="addmusic" v-if="addmusic" >
          <div class="bg"></div>
          <p>已加入播放器</p>	
        </div>
    </div>
</template>

<script>
import footerview from './components/footer/foot'
import headView from  './components/headerView/headerView'
export default {
  name: 'app',
  data(){
    return{
       addmusic:false
    }
  },
  methods:{
    addmusicfn(){
			this.addmusic=true;
			setTimeout(()=>{
				this.addmusic=false;
			},2000)
		}
  },
  components:{
    headView,
    footerview
  }
}
</script>

<style lang="less">
	.addmusic{
		text-align: center;
		.bg{
			width: 50px;
			height: 50px;
			background: url(./assets/iconpopup.png);
			background-position:0 -150px;
			display: inline-block;
		}
		padding: 30px 40px;
		background:rgba(0,0,0,.6);
		border-radius:6px;
		position:fixed;
		top:50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 99999;
		color:#fff;
	}
</style>

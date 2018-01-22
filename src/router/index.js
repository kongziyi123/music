import Vue from 'vue'
import Router from 'vue-router'
import Home from '../router-components/Home/Home'
import album from '../router-components/album/album'
import dligitalablum from '../router-components/digitalablum/digitalablum'
import list from '../router-components/list/list'
import mv from '../router-components/MV/mv'
import playlist from '../router-components/playlist/playlist'
import radio from '../router-components/radio/radio'
import singer from '../router-components/singer/singer'
import listdetails from '../router-components/listdetails/listdetails'
import songinformation from '../router-components/songinformation/songinformation'
import alibuminformation from '../router-components/album/albuminformation'
import singerHome from '../router-components/singer/singerHome'  //歌手首页
import singerdetails from '../router-components/singer/singerdetails' //详细信息子路由
import single from '../router-components/singer/single' //单曲子路由
import singeralbum from '../router-components/singer/singeralbum'
import singermv from '../router-components/singer/singermv'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },   
    {
      path: '/album',
      name: 'album',
      component: album
    },    
    {
      path: '/dligitalablum',
      name: 'dligitalablum',
      component: dligitalablum 
    },
    {
      path: '/mv',
      name: 'mv',
      component: mv
    },    
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },    
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path:'/listdetails/:id',
      name:'listdetails',
      component:listdetails
    },
    {
      path:'/songinformation/:id',
      name:'songinformation',
      component:songinformation
    },
    {
      path:'/alibuminformation/:id',
      name:'alibuminformation',
      component:alibuminformation
    },
    {
      path:'/singerHome/:id',
      name:'singerHome',
      component:singerHome,
      children:[
        {
          path:'',
          component:singerdetails 
        },
        {
          path:'single',
          component:single
        },
        {
          path:'singeralbum',
          component:singeralbum
        },
        {
          path:"singermv",
          component:singermv
        }
      ]
    }
  ]
})

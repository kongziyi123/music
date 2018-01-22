// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Carousel,CarouselItem,Pagination } from 'element-ui'
import HappyScroll from 'vue-happy-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-happy-scroll/docs/happy-scroll.css'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.ajax=axios;

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(HappyScroll);
Vue.use(Pagination);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

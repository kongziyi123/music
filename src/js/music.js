import Vue from 'vue'
import music from './music.vue'
import '../../static/reset.css'
import axios from 'axios'
import { Slider }from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-happy-scroll/docs/happy-scroll.css'
import HappyScroll from 'vue-happy-scroll'
Vue.config.productionTip=false;
Vue.use(HappyScroll);
Vue.prototype.ajax=axios;
Vue.use(Slider);
new Vue({
	el:'#music',
	render:h=>h(music)
})
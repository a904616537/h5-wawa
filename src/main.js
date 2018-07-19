// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue    from 'vue'
import App    from './App'
import router from './router'
import Store  from './store'
import Icon   from 'vue2-svg-icon/Icon.vue'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueVideoPlayer from 'vue-video-player'
// import SvgIcon from 'vue-svgicon'
// import './assets/svgs'
// require styles
import 'swiper/dist/css/swiper.css'
import 'vue-material/dist/vue-material.min.css'
import 'video.js/dist/video-js.css'

import Mixins from './Mixins';

Vue.use(Store)
Vue.use(VueAwesomeSwiper)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(VueVideoPlayer)

// Vue.use(SvgIcon, {
//     tagName: 'svgicon'
// })

Vue.component('icon', Icon)
Vue.config.productionTip = false;
Vue.setting = {
	api : 'http://waguo.vip/mobile'
}

/* eslint-disable no-new */
new Vue({
	router,
	el         : '#app',
	store      : Store,
	components : { App },
	template   : '<App/>',
	mixins     : [Mixins]
})

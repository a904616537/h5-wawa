// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue    from 'vue'
import App    from './App'
import router from './router'
import Store  from './store'
import Icon   from 'vue2-svg-icon/Icon.vue'
import VueAwesomeSwiper    from 'vue-awesome-swiper'
import VueVideoPlayer      from 'vue-video-player'
import VueProgress         from 'vue-progress'
import VueTabs             from 'vue-nav-tabs'
import VModal              from 'vue-js-modal'
import VueAPlayer          from 'vue-aplayer'
import VueRouterTransition from 'vue-router-transition'
import VueClipboards       from 'vue-clipboards';

 

import 'vue-nav-tabs/themes/vue-tabs.css'
import 'videojs-contrib-hls'


// import SvgIcon from 'vue-svgicon'
// import './assets/svgs'
// require styles
import 'swiper/dist/css/swiper.css'
// import 'vue-material/dist/vue-material.min.css'
import 'video.js/dist/video-js.css'
import '../static/css/iconfont.css'

import Mixins from './Mixins';

Vue.use(Store)
Vue.use(VueAwesomeSwiper)
Vue.use(VueProgress)
Vue.use(VueVideoPlayer)
Vue.use(VueTabs)
Vue.use(VModal, { dialog: true })
Vue.use(VueClipboards);
Vue.component('aplayer', VueAPlayer)

// Vue.transition('slideFromRightToLeft', {})
// Vue.transition('slideFromLeftToRight', {})

// Vue.use(SvgIcon, {
//     tagName: 'svgicon'
// })

Vue.component('icon', Icon)
Vue.config.productionTip = false;
Vue.setting = {
	api        : 'http://waguo.vip/mobile'
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

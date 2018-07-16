import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/common/index'
import Play from '@/common/play'
import Profile from '@/common/profile'

Vue.use(Router)

var routers = [
	{
		path : '/',
		component : Index
	},
	{
		path : '/play',
		component : Play
	},
	{
		path : '/profile',
		component : Profile
	}
]

const router = new Router({
  	routes: routers,
})

router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	next();
})

export default router;
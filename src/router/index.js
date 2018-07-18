import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/common/index'
import Play from '@/common/play'
import Profile from '@/common/profile'
import Recharge from '@/common/recharge'
import Items from '@/common/items'
import Address from '@/common/address'
import Share from '@/common/share'

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
	},
	{
		path : '/recharge',
		component : Recharge
	},
	{
		path : '/items',
		component : Items
	},
	{
		path : '/address',
		component : Address
	},
	{
		path : '/share',
		component : Share
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
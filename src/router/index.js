import Vue      from 'vue'
import Router   from 'vue-router'
import Index    from '@/common/index'
import Play     from '@/common/play'
import Profile  from '@/common/profile'
import Recharge from '@/common/recharge'
import Items    from '@/common/items'
import Address  from '@/common/address'
import Share    from '@/common/share'
import Delivery from '@/common/delivery'
import Shop     from '@/common/shop'
import Bag      from '@/common/bag'
import Payintro from '@/common/payintro'

Vue.use(Router)

var routers = [
	{
		name : 'home',
		path : '/',
		component : Index
	},
	{
		name      : 'play',
		path      : '/play',
		component : Play,
		props     : (route) => ({ data : route.query })
	},
	{
		name : 'profile',
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
	},
	{
		path : '/delivery',
		component : Delivery
	},
	{
		path : '/bag',
		component : Bag
	},
	{
		path : '/shop',
		component : Shop
	},
	{
		path : '/payintro',
		component : Payintro
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
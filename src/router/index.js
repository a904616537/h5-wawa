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
import Bag      from '@/common/bag' //红包（没有礼包页）
import FirstPayBag from '@/common/firstPayBag' //红包（赠送礼包页）
import Payintro from '@/common/payintro'
import Ticket   from '@/common/tickets'
import ShopItem from '@/common/shopItem'
import Menu   from '@/components/menu'

Vue.use(Router)
Vue.component('v-menu',Menu)

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
	},
	{
		path : '/firstPayBag',
		component : FirstPayBag
	},
	{
		path : '/ticket',
		component : Ticket
	},
	{
		path : '/shopItem',
		component : ShopItem
	}
]

const router = new Router({
	mode: 'history',
  	routes: routers,
})

router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	next();
})

export default router;
import Vue           from 'vue'
import Router        from 'vue-router'
import Index         from '@/common/index'
import Play          from '@/common/play'
import Profile       from '@/common/profile'
import Recharge      from '@/common/recharge'
import Items         from '@/common/items'
import Address       from '@/common/address'
import Share         from '@/common/share'
import Delivery      from '@/common/delivery'
import Shop          from '@/common/shop'
import Bag           from '@/common/bag' //红包（没有礼包页）
import FirstPayBag   from '@/common/firstPayBag' //红包（赠送礼包页）
import Payintro      from '@/common/payintro'
import Ticket        from '@/common/tickets'
import ShopItem      from '@/common/shopItem'
import Covert        from '@/common/covert' 
import CovertMore    from '@/common/covertMore'
import Sign          from '@/common/sign'      //签到   
import PlayLog       from '@/common/playLog'
import PlayLogInfo   from '@/common/playLogInfo'
import PlayLogReport from '@/common/playLogReport'
import Goods         from '@/common/goods' //新改我的物品页面
import Postage       from '@/common/postage' //包邮卡信息页面
import GoodsInfor    from '@/common/goodsInfor' //我的娃娃详情(待发货)
import Logistics     from '@/common/logistics' //物流信息

import Menu   from '@/components/menu'
import Nav    from '@/components/nav' 

Vue.use(Router)
Vue.component('v-menu',Menu)
Vue.component('v-nav',Nav)

var routers = [
	{
		name : 'home',
		path : '/',
		component : Index,
		$$routerTransition: {
			forward : 'roll'
		}
	},
	{
		name      : 'play',
		path      : '/play',
		component : Play,
		props     : (route) => ({ data : route.query }),
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		name : 'profile',
		path : '/profile',
		component : Profile,
		$$routerTransition: {
			forward : 'roll'
		}
	},
	{
		path : '/recharge',
		component : Recharge,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/items',
		component : Items,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/address',
		component : Address,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/share',
		component : Share,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/delivery',
		component : Delivery,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/bag',
		component : Bag,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/shop',
		component : Shop,
		$$routerTransition: {
			forward : 'roll'
		}
	},
	{
		path : '/payintro',
		component : Payintro,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/firstPayBag',
		component : FirstPayBag,
		$$routerTransition: {
			forward : 'roll'
		}
	},
	{
		path : '/ticket',
		component : Ticket,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/shopItem',
		component : ShopItem,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/covert',
		component : Covert,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/covertMore',
		component : CovertMore,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/sign',
		component : Sign,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/playlog',
		component : PlayLog,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/playloginfo',
		component : PlayLogInfo,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/playlogreport',
		component : PlayLogReport,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/goods',
		component : Goods,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/postage',
		component : Postage,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
	{
		path : '/goodsInfor',
		component : GoodsInfor,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll' 
		}
	},
	{
		path : '/logistics',
		component : Logistics,
		$$routerTransition: {
			forward : 'roll',
			back    : 'roll'
		}
	},
]

const router = new Router({
	// mode: 'history',
  	routes: routers,
})

router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	next();
})

export default router;
import Vue          from 'vue'
import Vuex         from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import User         from './module/user'
import Pomelo       from './module/pomelo'
import Hall         from './module/hall'
import Room         from './module/room'
import Shop         from './module/shop'
import Vouchers     from './module/vouchers'
import MonthtoSign  from './module/monthtosign'
import LuckyDraw    from './module/luckydraw'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules : {
		User,
		Pomelo,
		Hall,
		Room,
		Shop,
		Vouchers,
		MonthtoSign,
		LuckyDraw
	},
	// strict  : debug
})
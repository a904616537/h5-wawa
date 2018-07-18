import Vue          from 'vue'
import Vuex         from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import  User        from './module/user'
import  Pomelo      from './module/pomelo'
import  Hall        from './module/hall'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	getters,
	modules : {
		User,
		Pomelo,
		Hall
	},
	// strict  : debug
})
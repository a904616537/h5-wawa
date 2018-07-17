import Vue          from 'vue'
import Vuex         from 'vuex'
import * as actions from './actions'
import  User        from './module/user'
import  Pomelo      from './module/pomelo'

Vue.use(Vuex)

export default new Vuex.Store({
	actions,
	modules : {
		User,
		Pomelo
	},
	// strict  : debug
})
import * as types  from '../mutation-types'
import Pomelo from 'pomelo-client-websocket/core';
const pomelo = new Pomelo();

// initial state
const state = {
	pomelo : null,
	login  : false
}

const actions = {
	onPomeloInit({commit}, data) {
		commit(types.POMELO_INIT, data);
	},
	/**
	 * [onPomeloLogin description] pomelo 没有登陆前不能获得服务器数据
	 */
	onPomeloLogin({commit}, data) {
		commit(types.POMELO_LOGIN, data);
	}
}

// mutations
const mutations = {
	[types.POMELO_INIT] (state, data) {
		const {next} = data;
		pomelo.init({
		    host   : '106.15.90.130',
		    port   : 80,
		    scheme : 'ws'
		}, (res) => {
			state.pomelo = pomelo;
		    
		    if(next) next();
		    
		});
	},
	[types.POMELO_LOGIN] (state, data) {
		state.login = true;
	}
}

export default {
	state,
	actions,
	mutations
}

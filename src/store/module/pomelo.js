import * as types  from '../mutation-types'
import Pomelo from 'pomelo-client-websocket/core';
const pomelo = new Pomelo();

// initial state
const state = {
	pomelo : null
}

const actions = {
	onPomeloInit({commit}, data) {
		commit(types.POMELO_INIT, data);
	},
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
	}
}

export default {
	state,
	actions,
	mutations
}

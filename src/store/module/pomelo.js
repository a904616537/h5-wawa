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
		    host   : '127.0.0.1',
		    port   : 3010,
		    scheme : 'ws'
		}, (res) => {
			console.log('服务端 Pomelo 链接成功', res);
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

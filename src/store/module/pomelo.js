import * as types  from '../mutation-types'
import Pomelo from 'pomelo-client-websocket/core';

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
		const pomelo = new Pomelo();
		pomelo.init({
			// host                 : '106.15.90.130',
			// port                 : 80,

			host                 : '192.168.1.199',
			port                 : 3301,
			scheme               : 'ws',
			reconnect            : true,	// 开启重链
			reconnectDelay       : 3000,	// 连接超时事件
			maxReconnectAttempts : 10		// 最大重连次数
		}, (res) => {
			console.log('pomelo 连接成功', res)
			state.login = true;
			state.pomelo = pomelo;
		    if(data && data.next) data.next();
		    
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

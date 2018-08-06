/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-08-03 14:26:05
* @Description 王国券
* @Flow 
*/

import * as types  from '../mutation-types'


const state = {
	init   : false,	// 初始化王国券？
	ticket : 0,		// 账户券数量
	signin_type : {			// 签到默认奖励
		general : 20,		// 普通每日
		award   : 40		// 连续签奖励
	},
	list : [{			// 记账列表
		type    : '签到',
		value   : 20,
		time    : '2018-5-10',
		text    : '20 王国券',
		running : 'income'
	}]
	
}

const actions = {
	onVouchersInit({commit}, data) {
		commit(types.VOUCHERS_INIT, data);
	},
	setTicket({commit}, data) {
		commit(types.VOUCHERS_TICKET, data);
	}
}

// mutations
const mutations = {
	[types.VOUCHERS_INIT] (state, payload) {
		
		state.list   = payload.data;
		state.ticket = payload.ticket;
		state.init   = true;
	},
	[types.VOUCHERS_TICKET] (state, data) {
		console.log('更新王国券', data);
		state.ticket = data;
	}
}

export default {
	state,
	actions,
	mutations
}
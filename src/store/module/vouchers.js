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
	},
	// 补签
	onSupplement({commit}, data) {
		commit(types.VOUCHERS_SUPPLEMENT, data);
	},
	onObtain({commit}, data) {
		commit(types.VOUCHERS_OBTAIN, data);
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
	},
	[types.VOUCHERS_SUPPLEMENT] (state, data) {
		// vouchers_number 消耗的券数量
		const {vouchers_number, next} = data;
		if(state.ticket >= vouchers_number) {
    		// 网络请求处理，返回后执行
			state.ticket -= 80;
			if(next)next({status : true})
		} else if(next) next({status : false, msg : '王国券不足'})
	},
	[types.VOUCHERS_OBTAIN](state, data) {
		const {signin_type} = state;
		const value = signin_type[data.signin_type];
		state.ticket += value;

	}
}

export default {
	state,
	actions,
	mutations
}
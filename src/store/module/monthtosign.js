/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-08-06 11:01:09
* @Description
* @Flow 
*/

import * as types from '../mutation-types'
import service from '../service/month.service'

const state = {
	award_day  : new Set([6, 14, 21, 30]),	// 连续签到奖励天数
	bonus      : new Map(),			// 连续签到奖励
	day_list   : [],
	count      : 0,
	startDate  : null,
	keyboard   : [],	// 日历按钮
	continuous : new Set()	// 连续签到
}

const actions = {
	initMonth({commit}, data) {
		commit(types.INIT_MONTH, data);
	},
	signMonth({commit}, data) {
		commit(types.SIGNIN_MONTH, data);
	},
	continuous({commit}, data) {
		commit(types.CONTINUOUS_SIGNIN_MONTH, data);
	},
	
}

// mutations
const mutations = {
	// 初始化日历参数
	[types.INIT_MONTH] : (state, action) => {
		state.day_list = action.sign_data;
		// 配置日历按钮
		service.onInit(state, action);
		// console.log('init', state)
	},
	// 签到
	[types.SIGNIN_MONTH] : (state, action) => {
		state.day_list.push(action.time);
		service.onInit(state, action);
	},
	// 连续签到计算
	[types.CONTINUOUS_SIGNIN_MONTH] : (state, action) => {
		service.onContinuous(state, action);
	}
}

export default {
	state,
	actions,
	mutations
}
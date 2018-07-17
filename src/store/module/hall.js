import * as types  from '../mutation-types'
import Cookie      from 'vue-cookie';

// initial state
const state = {
	weixin_pay    : 0,		// 无首充？？？
	category      : [],		// 大厅分类
	contentconfig : [],		// 内容合集
	firstpay      : {},		// 礼包？？？
	pay_list      : []		// 充值列表
	shareNotice   : '', 	// 分享内容
	task_pay_list : []		// 付费任务列表

}

const actions = {
	setHallSetting({commit}, data) {
		commit(types.HALL_SETTING, data);
	}
}

// mutations
const mutations = {
	[types.HALL_SETTING] (state, data) {
	},
}

export default {
	state,
	actions,
	mutations
}
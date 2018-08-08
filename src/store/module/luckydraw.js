/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-08-06 11:01:09
* @Description
* @Flow 
*/

import * as types from '../mutation-types'
import service    from '../service/luckydraw.service'

const state = {
	prizes : [
		{
			name   : '王国券50',
			type   : 0,
			number : 50,	// 礼券或者王国币才有此参数
			luck   : 200
		},{
			name   : '王国券200',
			type   : 0,
			number : 200,
			luck   : 10
		},{
			name   : '王国礼包',
			type   : 1,
			number : 0,
			luck   : 20
		},{
			name   : '口红',
			type   : 2,
			number : 0,
			luck   : 10
		},{
			name   : '音响',
			type   : 2,
			number : 0,
			luck   : 10
		},{
			name   : '娃娃',
			type   : 2,
			number : 0,
			luck   : 10
		}
	],
	lucky_draw_count : 0,	// 可使用的抽奖次数
	lucky_draw_log   : [	//抽奖记录
		// {
		// 	days  : 0,	// 天数
		// 	prize : '',	// 奖品
		// 	type  : 0,	// 奖品类型， 0：礼券，1：王国币，2:物品
		// 	time  : Date.now()	// 记录领取时间
		// }
	],
}

const actions = {
	onLuckyInit({commit}, data) {
		commit(types.LUCKY_INIT, data);
	},
	onAddDraw({commit}, data) {
		commit(types.LUCKY_ADD_DRAW, data);
	},
	onPlay({commit}, data) {
		commit(types.LUCKY_DRAW, data);	
	}
}

const mutations = {
	[types.LUCKY_INIT] : (state, action) => {
		service.onInit(state, action);
		return {...state}
	},
	// 增加抽奖次数
	[types.LUCKY_ADD_DRAW] : (state, action) => {
		state.lucky_draw_count ++;
		if(action.next) {
			action.next(state.lucky_draw_count)
		}
		return {...state}
	},
	// 抽奖搞起来
	[types.LUCKY_DRAW] : (state, action) => {
		service.onPlayLucky(state, action);
		return {...state}
	},
}

export default {
	state,
	actions,
	mutations
}
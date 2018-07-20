import * as types from '../mutation-types'
import Cookie     from 'vue-cookie';
import {onGame}   from '../service/room.service'

// initial state
const state = {
	current_room : {},		// 当前房间
	players      : new Map(),	// 房间玩家
	status       : 1,			// 默认状态闲置
}

const actions = {
	setRoomInfo({commit}, data) {
		commit(types.ROOM_INFO, data);
	},
	setGame({commit}, data) {
		commit(types.ROOM_STATUS, data);	
	}
}

// mutations
const mutations = {
	[types.ROOM_INFO] (state, data) {
		console.log('传递当前房间', data);
	},
	// 改变房间状态
	[types.ROOM_STATUS] (state, data) {
		console.log('game=======>', data)
		onGame(data, state);
	}
}

export default {
	state,
	actions,
	mutations
}
import * as types from '../mutation-types'
import Cookie     from 'vue-cookie';
import {onGame}   from '../service/room.service'

// initial state
const state = {
	current_room : {},			// 当前房间
	master       : null,		// 当前玩家
	players      : [],			// 房间玩家
	status       : 1,			// 默认状态闲置
	queue        : [],			// 游戏玩家队列
	drop_rank    : [],			// 排名
	top_rank     : [],			// 排行榜
	chats        : [],			// 聊天内容
	duration     : 0,			// 持续时间？
	roundtime    : 30			// 计时器时间
}

const actions = {
	setRoomInfo({commit}, data) {
		commit(types.ROOM_INFO, data);
	},
	setGame({commit}, data) {
		commit(types.ROOM_STATUS, data);
	},
	setMaster({commit}, data) {
		commit(types.ROOM_MASTER, data);	
	}
}

// mutations
const mutations = {
	[types.ROOM_INFO] (state, data) {
		if(typeof data.lives == 'string') data.lives = JSON.parse(data.lives);
		// data.videos = data.lives.map(val => {
		// 	let arr = val.split('://');
		// 	if(arr.length > 0) {
		// 		const url = `http://${arr[1]}.m3u8`;
		// 		return url;
		// 	} else return '';
		// });
		console.log('data.lives', data.lives)
		data.videos = data.lives;
		state.current_room = data;
	},
	// 改变房间状态
	[types.ROOM_STATUS] (state, data) {
		onGame(data, state);
	},
	[types.ROOM_MASTER] (state, data) {
		let {master, players, status, masterQueue, dropRank, topRank, chats, duration,roundtime} = data;

		if(data.master == 0) state.master = null;
		else state.master = data.master;
		
		state.players   = players;
		state.status    = status;
		state.queue     = masterQueue;
		state.drop_rank = dropRank;
		state.top_rank  = topRank;
		state.chats     = chats;
		state.duration  = duration;
		state.roundtime = roundtime;
	}
}

export default {
	state,
	actions,
	mutations
}
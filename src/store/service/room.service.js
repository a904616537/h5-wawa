import Pubsub from 'pubsub-js';

const onClickMap = new Map([
	['USJN', updateRoomJoin], 	// 进入房间
	['USLV', () => {}], 		// 退出房间
	['CGDP', roomCgdp], 		// 抓到娃娃
	['CGD0', updateUserCard], 	// 没有抓到娃娃
	['CSCE', setRoomMaster], 	// 房间状态变化
	['MSQU', updateRoomQueue], 	// 等待抓娃娃队列
	['CRSC', updateRoomStatus]	//  房间状态变更
])

function setRoomMaster(data, state) {
	state.master    = data.master;
	state.duration  = data.duration;
	state.roundtime = data.roundtime;
}

function updateRoomStatus(data, state) {
	PubSub.publish('hall.room.update', data);
}
/**
 * [updateUserCard 更新玩家娃娃币]
 */
function updateUserCard(data, state) {
	PubSub.publish('user.room.card.update', data);
	Pubsub.publish('hall.room.failure', data);
}
/**
 * [updateRoomJoin 进入房间后操作]
 */
function updateRoomJoin(data, state) {
	console.log('进入房间 ========》', data)
}
/**
 * [updateRoomQueue 玩家队列更新]
 */
function updateRoomQueue(data, state) {
	console.log('玩家队列更新', data);
	state.queue = data.masterQueue;
}

function roomCgdp(data, state) {
	Pubsub.publish('hall.room.success', data);
}



export const onGame = (data, state) => {
	if(data.c != 'CRSC') console.log('game data', data)
	const fun = onClickMap.get(data.c);
	if(fun) fun(data, state);
}
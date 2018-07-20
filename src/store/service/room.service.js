
const onClickMap = new Map([
	['USJN', updateRoomJoin], 	// 进入房间
	['USLV', () => {}], 	// 退出房间
	['CGDP', roomCgdp], 	// 抓到娃娃
	['CGD0', () => {}], 	// 没有抓到娃娃
	['CSCE', () => {}], 	// 房间状态变化
	['MSQU', updateRoomQueue], 	// 等待抓娃娃队列
	['CRSC', updateRoomStatus]		//  房间状态变更
])

function updateRoomStatus(data, state) {
	// 查询房间
	let room = state.rooms.find(val => val.gsid == data.gsid);
	if(room) {
		room.status = data.s;
	}
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

}

function roomCgdp(data, state) {
	// console.log('用户抓到娃娃', data)
}



export const onGame = (data, state) => {
	if(data.c != 'CRSC') console.log('game data', data)
	const fun = onClickMap.get(data.c);
	if(fun) fun(data, state);
}
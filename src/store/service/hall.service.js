
const onClickMap = new Map([
	['USJN', () => {}], 	// 进入房间
	['USLV', () => {}], 	// 退出房间
	['CGDP', roomCgdp], 	// 抓到娃娃
	['CGD0', () => {}], 	// 没有抓到娃娃
	['CSCE', () => {}], 	// 房间状态变化
	['MSQU', () => {}], 	// 等待抓娃娃队列
	['CRSC', updateRoomStatus]		//  房间状态变更
])

function updateRoomStatus(data, state) {
	
	// 查询房间
	let room = state.rooms.find(val => val.gsid == data.gsid);
	if(room) {
		room.status = data.s;
	}
}

function roomCgdp(data, state) {
	// console.log('用户抓到娃娃', data)
}



export const onGame = (data, state) => {
	const fun = onClickMap.get(data.c);
	if(fun) fun(data, state);
}
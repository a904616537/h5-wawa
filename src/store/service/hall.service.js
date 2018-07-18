
const onClickMap = new Map([
	['USJN', () => {}], 	// 进入房间
	['USLV', () => {}], 	// 退出房间
	['CGDP', roomCgdp], 	// 抓到娃娃
	['CGD0', () => {}], 	// 没有抓到娃娃
	['CSCE', updateRoomStatus], 	// 房间状态变化
	['MSQU', () => {}], 	// 等待抓娃娃队列
])

function updateRoomStatus(data, state) {
	console.log('改变该房间状态', data);
	// 查询房间
}

function roomCgdp(data, state) {
	console.log('用户抓到娃娃', data)
}





export const onGame = (data, state) => {
	const fun = onClickMap.get(data.c);
	fun(data, state)
}
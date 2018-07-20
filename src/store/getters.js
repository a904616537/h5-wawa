/*
* @Author: Kain Shi
* @Date:   2018-07-17 11:37:44
* @Last Modified by:   Kain Shi
* @Last Modified time: 2018-07-17 18:49:43
*/
export const hallRooms = (state, getters) => {
	const {selected_cate, rooms} = state.Hall;
	if(selected_cate === 1) return rooms;
	const room = rooms.filter(val => val.key === selected_cate);
	console.log('getters room list', room);
	if(room) return room;
	else return [];
}
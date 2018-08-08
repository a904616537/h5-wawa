/*
* @Author: Kain Shi
* @Date:   2018-07-17 11:37:44
* @Last Modified by:   Kain Shi
* @Last Modified time: 2018-08-07 15:18:06
*/
export const hallRooms = (state, getters) => {
	const {selected_cate, rooms, category} = state.Hall;
	if(selected_cate === 1) return rooms;
	const room = category.find(val => val.key === selected_cate).list;
	if(room) return room;
	else return [];
}
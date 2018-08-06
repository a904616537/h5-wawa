import * as types  from '../mutation-types'
import Cookie      from 'vue-cookie';

// initial state
const state = {
	showFrom     : false,
	isLogin      : Cookie.get('user-token') != null && Cookie.get('user-token') != 'undefined',
	user         : JSON.parse(Cookie.get('user')),
	token        : Cookie.get('user-token'),
	platformData : Cookie.get('platform-data'),
	address      : [],	// 地址
	delivery     : [],	// 配送中
	post         : [],	// 消息
	wawas        : [],	// 我的物品
	wawaplayer   : {
		delivery_card_num : 0,	// 包邮卡
		firstpay          : 0,	// 首充用户
		recharge          : 0,	// 
		sim_times         : 0,
		total_gift_num    : 0	// 总礼物数
	},
	wechat           : {},
	address_selected : null		// 配送选中地址
}

const actions = {
	onLogin({commit}, data) {
		commit(types.USER_LOGIN, data);
	},
	Logout({commit}, data) {
		commit(types.USER_LOGOUT, data);
	},
	SetWechatUser({commit}, data) {
		commit(types.USER_SET_WECHAT, data);
	},
	SetAddress({commit}, data) {
		commit(types.USER_SET_ADDRESS, data);
	},
	updateUserRoomCard({commit}, data) {
		commit(types.USER_SET_ROMMCARD, data)
	},
	updateUserInfo({commit}, data) {
		commit(types.USER_UPDATE_INFO, data)
	},
	setWawaPlayer({commit}, data) {
		commit(types.USER_UPDATE_PLAYER, data)
	},
	updateAddress({commit}, data) {
		commit(types.USER_UPDATE_DEF_ADDRESS, data)
	},
	editAddress({commit}, data) {
		commit(types.USER_UPDATE_EDIT_ADDRESS, data);
	},
	onRoomCardsChange({commit}, data) {
		commit(types.USER_UPDATE_ROOMCARD, data);
	}
}

// mutations
const mutations = {
	[types.USER_LOGIN] (state, data) {
		const {user, token, platformData} = data;
		state.user     = user;
		Cookie.set('user', JSON.stringify(user));

		if(token) {
			state.token    = token;
			Cookie.set('user-token', token);
		}
		if(platformData) {
			Cookie.set('platform-data',JSON.stringify(platformData));
			state.platformData = platformData;
		}
		console.log('get login', token)
		state.isLogin  = true;
		state.showFrom = false;
	},
	[types.USER_LOGOUT] (state, data) {
		state.isLogin = false;
		state.token   = '';
		state.user    = {};
		Cookie.delete('user');
		Cookie.delete('user-token');
	},
	[types.USER_SET_WECHAT] (state, data) {
		state.wechat = data;
	},
	[types.USER_SET_ADDRESS] (state, data) {
		state.address = data;
	},
	[types.USER_SET_ROMMCARD] (state, data) {
		console.log('USER_SET_ROMMCARD', data)
		state.user.room_card = data.master.room_card;
		state.user = {...state.user};
	},
	[types.USER_UPDATE_INFO] (state, data) {
		state.wawas    = data.wawas;
		// 配送中的物品没有图片
		state.delivery = data.delivery.map(val => {
			const wawa = data.wawas.find(wawa => val.gift_no == wawa.gift_no);
			val.pic = wawa.gift_pic;
			return val;
		})
		if(data.post) state.post = data.post;
		if(data.address) {
			state.address  = data.address;
			// 设置默认配送地址
			const def_address = data.address.find(val => val.default == 1);
			if(def_address) state.address_selected = def_address;
			else if(data.address.length > 0) state.address_selected = data.address[0];
		}
	},
	[types.USER_UPDATE_PLAYER] (state, data) {
		state.wawaplayer = {...data};
	},
	[types.USER_UPDATE_DEF_ADDRESS](state, data) {
		state.address_selected = data;
	},
	[types.USER_UPDATE_EDIT_ADDRESS] (state, data) {
		state.address = data;
		const def_address = state.address.find(val => val.default == 1);
		if(def_address) state.address_selected = def_address;
		else if(state.address.length > 0) state.address_selected = state.address[0];
	},
	[types.USER_UPDATE_ROOMCARD] (state, data) {
		state.user.room_card = data.room_card;
		state.user = {...state.user};
	}
}

export default {
	state,
	actions,
	mutations
}
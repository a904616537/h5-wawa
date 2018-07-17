import * as types  from '../mutation-types'
import Cookie      from 'vue-cookie';

// initial state
const state = {
	showFrom : false,
	isLogin  : Cookie.get('user-token') != null,
	user     : JSON.parse(Cookie.get('user')),
	token    : Cookie.get('user-token'),
	address  : {},
	wechat   : {}
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
}

// mutations
const mutations = {
	[types.USER_LOGIN] (state, data) {
		state.user     = data.user;
		state.token    = data.token;
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
	}
}

export default {
	state,
	actions,
	mutations
}
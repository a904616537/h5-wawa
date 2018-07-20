
import PubSub from 'pubsub-js';
import * as types from '../mutation-types'
import Cookie     from 'vue-cookie';

// initial state
const state = {
	weixin_pay    : 0,		// 无首充？？？
	category      : [],		// 大厅分类
	rooms         : [],		// 大厅房间
	banners       : [],		// 内容合集
	firstpay      : {},		// 礼包？？？
	pay_list      : [],		// 充值列表
	shareNotice   : '', 	// 分享内容
	shortpkey     : {},		// pomolo 链接内容
	task_pay_list : [],		// 付费任务列表
	selected_cate : 1		// 当前选择的分类
}

const actions = {
	setHallSetting({commit}, data) {
		commit(types.HALL_SETTING, data);
	},
	setHallRoom({commit}, data) {
		commit(types.HALL_ROOM, data)
	},
	setRoom({commit}, data) {
		commit(types.HALL_ROOM_SET, data)
	},
	setStatus({commit}, data) {
		commit(types.HALL_ROOM_STATUS, data)
	},
	updateRoomCate({commit}, data) {
		commit(types.HALL_SELECTED, data)
	}
}

// mutations
const mutations = {
	[types.HALL_SETTING] (state, data) {
		console.log('receive data', data);
		let banner = data.contentconfig.find(val => val.id == 10);
		if(banner) banner = JSON.parse(banner.content);
		else {
			banner = [];
			console.log('大厅广告轮播获取失败');
		}
		state.category      = data.category;
		state.weixin_pay    = data.weixin_pay;
		state.banners       = banner;
		state.firstpay      = data.firstpay;
		state.pay_list      = data.pay_list;
		state.shareNotice   = data.shareNotice;
		state.task_pay_list = data.task_pay_list;
		state.shortpkey     = data.shortpkey;
	},
	// 选择分类
	[types.HALL_SELECTED] (state, data) {
		state.selected_cate = data;
	},
	[types.HALL_ROOM] (state, data) {
		console.log('得到房间数据', data)
		for(let room of data) {
            // 绑定分类
            const cate = state.category.find(cate => (room.cate&cate.key) === cate.key);
            if(cate) room = Object.assign(room, {order : cate.order, cateName : cate.cateName, key : cate.key});
        }
        // 根据order 排序
        // data.sort(compare("order"));
        
        state.rooms = data;

        state.category = state.category.map(cate => {
            if(cate.key === 1)
                cate.list = data;
            else {
                let list = data.filter(room => (room.cate&cate.key) === cate.key);
                // 排序一下
                // list.sort(compare("tp"));
                cate.list = list;
            }
            return cate
        })
	},
	// 进入房间传递房间数据
	[types.HALL_ROOM_SET] (state, data) {
		const {gsid} = data;
		const room = state.rooms.find(val=> val.gsid == gsid);
		console.log('进入房间传递房间数据', data, room)
		if(room) {
			PubSub.publish('setRoom', room);
		}
	},
	// 改变房间状态
	[types.HALL_ROOM_STATUS] (state, data) {
			// 查询房间
		let room = state.rooms.find(val => val.gsid == data.gsid);
		if(room) {
			room.status = data.s;
		}
	}
}

export default {
	state,
	actions,
	mutations
}
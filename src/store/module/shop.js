/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-08-03 13:36:08
* @Description
* @Flow 
*/


import * as types from '../mutation-types'

const state = {
	init     : false,
	products : []
}

const actions = {
	initShop({commit}, data) {
		commit(types.SHOP_INIT, data);
	}
}

// mutations
const mutations = {
	[types.SHOP_INIT] (state, payload) {
		state.init     = true;
		state.products = payload.data.map(val => {
        	return {
                no      : val.gift_no,
                imgurl  : val.gift_pic,
                name    : val.gift_name,
                voucher : val.exchange_ticket,	// 所需礼品券
                price   : val.real_price,
                pics    : typeof val.pics === 'string'?JSON.parse(val.pics) : val.pics
        	}
        });
	},
}

export default {
	state,
	actions,
	mutations
}
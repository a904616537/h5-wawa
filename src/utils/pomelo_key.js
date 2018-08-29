/**
* FileType js
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-02 10:52:43
* @Description
* @Flow 
*/

export default {
	hall : {
		user : {
			joinRoom     : 'hall.user.joinRoom',
			modifyMyInfo : 'hall.user.modifyMyInfo',
			wawalist     : 'hall.user.getMyWawaList'
		}
	},
	room : {
		user : {
			update : 'user.room.card.update'
		},
		play : {
			start  : 'hall.g.start',
			l      : "hall.g.l",
			s      : "hall.g.s",
			custom : "hall.g.custom",
			o      : "hall.g.o",
		}
	},
	user : {
		info     : "modifyMyInfo",
		get      : 'hall.user.getMyInfo',
	}
}

export const deliveryState = new Map([
	[0, '等待配送'],
	[1, '配送中'],
	[2, '已签收'],
	[3, '确认完成'],
	[4, '其他']
]);

export const RoomStatus = {
	STATUS_ERROR          : 0,	// 房间错误
	STATUS_IDLE           : 1,	// 闲置
	STATUS_PLAYING        : 2,	// 游戏中
	STATUS_WAITING_RESULT : 3,	// 等待结束
}

export const ControlBtnStatus = {
	play_start_btn         : 'play_start_btn',			// 可以开始
	play_state_waiting_btn : 'play_state_waiting_btn',	// 抓娃娃等待中
	play_sim_btn           : 'play_sim_btn',			// 模拟抓娃娃？？
	play_start_queue_btn   : 'play_start_queue_btn',	// 队列
	play_cancel_queue_btn  : 'play_cancel_queue_btn'  	// 取消队列
}

export const RoomEnterState = {
    ENTER_OK: 0,
    ENTER_WRONG_INGAME: 1, //游戏中
    ENTER_NEED_RECONNECT: 2, //需要断线重连
    ENTER_WRONG_SERVER_NOT_FOUNDL: 3, //服务器不不存在
    ENTER_WRONG_GOLDS: 4, //玩家金币不符合要求
    ENTER_WRONG_ACCOUNT: 5, //帐号异常，禁止登陆
    ENTER_WRONG_OTHERLOGIN: 6, //帐号在别处上线
    ENTER_WRONG_UNKNOWN: 7, //未知问题，通道无法建立
    ENTER_WRONG_OTHERGAME: 8, //在另外的游戏中
    ENTER_WRONG_NULLPOP: 9, //连续15把不下注，或者携带筹码小于最底倍连续5把不下注；踢回大厅
    ENTER_WRONG_GOLDS_LITTLE: 10, //玩家金币不符合要求，太少
    ENTER_WRONG_GOLDS_MUCH: 11, //玩家金币不符合要求，太多
    ENTER_WRONG_TABLE_VIP: 12, //桌子VIP
    ENTER_WRONG_OTHER_PLAYING: 13,//其他人在玩
    ENTER_WRONG_OTHER_MAY_PLAY: 14, //其他人先申请了扣款玩游戏，请稍后
    ENTER_WRONG_GSID: 15,//其他人先申请了扣款玩游戏，请稍后
    ENTER_WRONG_ALREADY_IN_QUEUE: 16,//已经排队中
}
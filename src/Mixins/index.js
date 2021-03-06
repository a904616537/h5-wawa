/**
* FileType js
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-16 16:49:58
* @Description
* @Flow 
*/


import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

const default_Fun = (key) => {console.log(key)}

const mixin = {
	created(){
		console.log('钩子函数被调用')
		this.onStart();
	},
	data() {
		return {
			is_set : false,
			pomelo_Listen : new Map([
				['chat', default_Fun],
				['voice', default_Fun],
				['quit', default_Fun],
				['closeGame', default_Fun],
				['gamelist', default_Fun],
				['user', default_Fun],
				['serverLeave', default_Fun], //服务器端离线，广播全体
				['newlist', this.setHallRoom],
				['reconnect', default_Fun],
				['laba', default_Fun],
				['game', this.setGame],
				['wawaPlayer', this.setWawaPlayer],
				['ready_to_play', default_Fun],
				['goldsChange', default_Fun],
				['roomCardsChange', this.onRoomCardsChange],
				['serverReboot', default_Fun],
				['updateClient', default_Fun],
				['ticketChange', default_Fun],
				['level', default_Fun],
				['vipLevel', default_Fun],
				['expsAll', default_Fun],
				['vip_rounds', default_Fun],
				['prop', default_Fun],
				['packet_award', default_Fun],
				['emoji', default_Fun],
				['matchresult', default_Fun],
				['matchConfirm', default_Fun],
				['stonesChange', default_Fun],
				['close', this.onReset],
				['error', default_Fun],
				['wawasChange', (data) => {console.log('------->>>wawasChange', data)}]
			])
		}
	},
	computed : mapState({
		pomelo       : state => state.Pomelo.pomelo,
		pomelo_login : state => state.Pomelo.login,
		shortpkey    : state => state.Hall.shortpkey,
    }),
    // 监听用户获取状态
    watch: {
    	// 是否有登陆
    	shortpkey : function(val, oldVal) {
    		if(val === oldVal) return;
    		if(this.pomelo_login && !this.is_set) {
    			this.is_set = true;
    			this.setOnPomelo();
    		}
    	},
    	pomelo_login : function(val, old) {
    		console.log('pomelo_login', val, this.is_set, this.shortpkey);
    		
    		if(val && !this.is_set && this.shortpkey){
    			this.is_set = true;
    			this.setOnPomelo();
    		}
    	}
    },
	methods: {
		...mapActions([
            'onPomeloInit',
            'onPomeloLogin',
            'setHallRoom',
            'setGame',
            'setWawaPlayer',
            'onRoomCardsChange'
        ]),
        onReset() {
        	setTimeout(() => {
        		console.log('重新连接 Pomelo')
		    	this.onPomeloInit();
		    }, 3000);
        },
        onStart() {
        	console.log('连接 Pomelo')
        	this.onPomeloInit({next : () => {}});
        },
        setOnPomelo(){
        	const {pomelo_Listen, pomelo, listen, shortpkey} = this;
        	if(pomelo) {
        		console.log('监听Pomelo')
        		// this.pomelo.disconnect();
        		// 监听Pomelo 连接断开
				
        		pomelo_Listen.forEach((fun, key) => {
        			listen(key, (data) => {
        				fun(data)
					})
        		})
				pomelo.request("connector.user.login", shortpkey, (data) => {
			        console.log('connector.user.login', data);
					if(data.code == 200) {
						this.onPomeloLogin();
					}
			    });
        	} else {
        		console.log('未找到Pomelo')
        		this.onReset();
        	}
        },
		listen(key, next) {
			this.pomelo.on(key, next);
		},
		connect() {
			console.log('Socket开启事件')
		},
		close() {
			console.log('监听Socket关闭事件')
		}
	},
	destroyed() {
		console.log('销毁');
		if(this.pomelo) this.pomelo.disconnect();
	}
}
export default mixin;
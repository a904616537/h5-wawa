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
				['game', this.setStatus],
				['wawaPlayer', default_Fun],
				['ready_to_play', default_Fun],
				['goldsChange', default_Fun],
				['roomCardsChange', default_Fun],
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
				['close', default_Fun],
				['error', default_Fun]
			])
		}
	},
	computed : mapState({
		pomelo    : state => state.Pomelo.pomelo,
		shortpkey : state => state.Hall.shortpkey
    }),
    // 监听用户获取状态
    watch: {
    	shortpkey : function(val, oldVal) {
    		if(val === oldVal) return;
    		this.setOnPomelo();
    	}
    },
	methods: {
		...mapActions([
            'onPomeloInit',
            'onPomeloLogin',
            'setHallRoom',
            'setStatus',
        ]),
        onStart() {
        	this.onPomeloInit({next : ()=> {
				this.pomelo.on('close', (data) => {
				    console.log('断开Pomelo');
				});
			}});
        },
        setOnPomelo(){
        	const {pomelo_Listen, pomelo, listen, shortpkey} = this;
        	if(pomelo) {
        		// this.pomelo.disconnect();
        		// 监听Pomelo 连接断开
				
        		pomelo_Listen.forEach((fun, key) => {
        			listen(key, (data) => {
        				console.log('-------> key:', key)
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
	}
}
export default mixin;
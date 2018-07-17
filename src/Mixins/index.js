/**
* FileType js
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-16 16:49:58
* @Description
* @Flow 
*/


import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

const mixin = {
	created(){
		console.log('钩子函数被调用')

		this.onStart();
	},
	computed : mapState({
        pomelo : state => state.Pomelo.pomelo,
    }),
	methods: {
		...mapActions([
            'onPomeloInit'
        ]),
        onStart() {
        	this.onPomeloInit({next : ()=> {
				this.setOnPomelo();
			}});
        },
        setOnPomelo(){
        	if(this.pomelo) {
        		// this.pomelo.disconnect();
        		// 监听Pomelo 连接断开
				this.pomelo.on('close', (data) => {
				    console.log('断开Pomelo');
				});
				this.listen('connector.entryHandler.entry', (data) => {
					console.log('connector.entryHandler.entry', data)
				})
				this.pomelo.request("connector.entryHandler.entry", "hello pomelo", (data) => {
			        // console.log(data);
			    });
        	} else {
        		console.log('未找到Pomelo')
        	}
        },
		listen(key, next) {
			console.log('监听事件')
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
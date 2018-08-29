<template>
	<!-- <div class="barrage"> -->
		<transition-group name="bounce-fade" class="barrage"
		@after-enter="onReload"
		>
			<div v-for="(item, index) in current" :key="index" class="barrage_item" :style="'top : '+item.height+'vh; color : '+ item.color +';'">{{item.text}}</div>
		</transition-group>
</template>

<script>
	import Pubsub from 'pubsub-js';
	// 消息类型定义
	const BARRAGEMSGSTYLE = {
		SYSTEM : 0,
		MYSELF : 1,
		OTHER  : 2
	}
	export default{
		name : 'barrage',
		data() {
			return {
				index      : 0,
				height     : 10,
				intertimer : null,
				timer      : null,
				task_timer : null,
				current    : [
				
				],	//存储当前输入框的内容
				is_task    : true,
				task_list  : []		// 待清除弹幕
			}
		},
		props : {
			type : {
				type    : String,
				default : 'HALL'
			}
		},
		watch : {
			is_task : function(val, old) {
				if(val) {
					while(this.current.length > 0) {
	    				const task = this.current.shift();
	    			}
				}
			}
		},
		methods : {
		    getFontColor( nMsgStyle ){
		        switch ( nMsgStyle ) {
		            case BARRAGEMSGSTYLE.SYSTEM: {
		                return '#6fd8ff';
		            }
		                break;
		            case BARRAGEMSGSTYLE.MYSELF: {
		                return '#ffd042';
		            }
		                break;
		            case BARRAGEMSGSTYLE.OTHER:
		            default:
		                return 'white';
		                break;
		        }
		    },
			// 重置初始弹幕位置
			onReload() {
				if(this.timer) clearInterval(this.timer);
				// 10秒没有弹幕，位置归零
				this.timer = setTimeout(() => {
					this.height = 0;
					clearInterval(this.timer)
					this.timer = null;
				}, 10000);
			},
			onReloadTask() {
				this.is_task = false;

				if(this.task_timer) clearInterval(this.task_timer);
				this.task_timer = setTimeout(() => {
					this.is_task = true;
					this.task_timer = null;
				}, 10000);
			},
			onSend(text, color, type) {
				if(type == this.type) {
					const is_same = this.current.find(val => val.text == text);

					if(is_same) return;

					this.current.push({text, height : this.height, color : this.getFontColor(color)})
					if(this.height < 80) this.height += 10;
					else this.height = 0;
					this.onReloadTask();
				}
			}
		},
		mounted() {
			Pubsub.subscribe('barrage', (key, msg) => this.onSend(msg.text, msg.color, msg.type));
		}
	}
</script>



<style>
.barrage {
	position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
}
.barrage_item {
	position         : absolute;
	top              : 0;
	left             : -200vw;
	display          : block;
	z-index          : 1000;
	font-weight      : 900;
	font-size        : 14pt;
	text-shadow      : 0.1em 0.1em #888;
	background-color : transparent;
}

.barrage_item div{
	width       : 100%;
	height      : 20px;
	line-height : 20px;
	position    : absolute;
}

.barrage_item .text{
	font-size     : 20px;
	height        : 30px;
	border-radius : 4px;
	border        : 1px solid #c8cccf;
	color         : #6a6f77;
}

.bounce-fade-enter-active {
    animation: bounce-in 15s;
}
.bounce-fade-leave-active {
    opacity: 0;
}

.bounce-fade-enter, .bounce-fade-leave-to {
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: translateX(300vw);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
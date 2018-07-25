<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div class="ibutton playstart" :style="btn_img" @click="onPress">
		<p v-if="showtext" class="ibutton text">当前排队{{queue}}人</p>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		name : 'playbutton',
		data() {
			return {
			}
		},
		props: {
			btn : {
				type    : String,
				default : 'play_start_btn'
			},
			onPress : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
				queue : state => {
					console.log('state.Room.queue', state.Room.queue.length);
					return state.Room.queue.length;
				},
			}),
			btn_img() {
				return `background-image: url(/static/images/hall/videoplay/${this.btn}.png);`
			},
			showtext() {
				return this.btn == 'play_start_queue_btn';
			}
		},
	}
</script>

<style>
.ibutton {
	width           : 45vw;
	height          : 18vw;
	background-size : 100% 100%;
	display         : flex;
	justify-content : center;
	align-items     : flex-end;
}
.ibutton .text {
	color     : #7d483d;
	font-size : 12;
}
/*开始*/
.ibutton.playstart{
	background-image: url(/static/images/hall/videoplay/play_start_btn.png);
}
/*预约*/
.ibutton .play_start_queue_btn{
	background-image: url(/static/images/hall/videoplay/play_start_queue_btn.png);
}
/*取消预约*/
.ibutton .play_cancel_queue_btn{
	background-image: url(/static/images/hall/videoplay/play_cancel_queue_btn.png);
}
/*稍等*/
.ibutton .play_state_waiting_btn{
	background-image: url(/static/images/hall/videoplay/play_state_waiting_btn.png);
}
.ibutton.change_machine{
	background-image: url(/static/images/hall/videoplay/change_machine.png);
	width: 18vw;
	height: 18vw;
}
</style>
<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div class="control_btn">
		<div class="rocker">
			<div class="iconbtn" :style="iconClass.left" @click.prevent="left"></div>
			<div>
				<div class="iconbtn" :style="iconClass.up" @click.prevent="up"></div>
				<div class="iconbtn" :style="iconClass.down" @click.prevent="down"></div>
			</div>
			
			<div class="iconbtn" :style="iconClass.right" @click.prevent="right"></div>
		</div>
		<div class="claws">
			<div class="iconbtn claws" :style="iconClass.claw" @click.prevent="claw"></div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key from '@/utils/pomelo_key';
	export default{
		name : 'control',
		data() {
			return {
				speed : 2
			}
		},
		props: {
			btn : {
				type    : String,
				default : 'play_start_btn'
			},
			onOver : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
				pomelo : state => state.Pomelo.pomelo,
			}),
			iconClass() {
				return {
					up    : `background-image: url(./static/images/hall/videoplay/up.png); margin-bottom:5px;`,
					down  : `background-image: url(./static/images/hall/videoplay/down.png); margin-top:5px;`,
					left  : `background-image: url(./static/images/hall/videoplay/left.png); margin-right:5px;`,
					right : `background-image: url(./static/images/hall/videoplay/right.png); margin-left:5px;`,
					claw  : `background-image: url(./static/images/hall/videoplay/claw.png);`
				}
			}
		},
		methods: {
			// [up 爪子上移]
			up() {
				console.log('up')
			    this.pomelo.request(pomelo_key.room.play.s, {c: "left", p: [0, -this.speed]});
			},
			// [up 爪子下移]
			down() {
				console.log('down')
			    this.pomelo.request(pomelo_key.room.play.s, {c: "right", p: [0, this.speed]});
			},
			// [up 爪子左移]
			left() {
				console.log('left')
			    this.pomelo.request(pomelo_key.room.play.s, {c: "up", p: [-this.speed]});
			},
			// [up 爪子右移]
			right() {
				console.log('right')
			    this.pomelo.request(pomelo_key.room.play.s, {c: "down", p: [this.speed]});
			},
			// [claw Game Over]
		    claw() {
		    	console.log('claw')
		        this.pomelo.request(pomelo_key.room.play.s, {c: "claw"});
		        this.onOver();
		    },
		    // 放？
		    // fnKeyDown(event) {
		    //     if (keyispress) {
		    //         if (keypresscode == event.keyCode) {
		    //             return;
		    //         }
		    //     }
		    //     keyispress = true;
		    //     keypresscode = event.keyCode;
		    //     clearInterval(keymon);
		    //     // speed=speedMin;
		    //     keymon = setInterval(monKey, 100);
		    //     monKey();
		    // },
		    // // 收？
		    // fnKeyup(event) {
		    //     if (!keyispress)return;
		    //     if (keypresscode != event.keyCode) {
		    //         return;
		    //     }
		    //     clearInterval(keymon);
		    //     keyispress = false;
		    //     keypresscode = 0;
		    // }
		}
	}
</script>

<style>
.control_btn {
	display         : flex;
	flex-direction  : row;
	align-items     : center;
	justify-content : center;
	width           : 100%;
}
.control_btn .iconbtn {
	width           : 15vw;
	height          : 15vw;
	background-size : 100% 100%;
}
.control_btn .rocker {
	margin-right    : 20vw;
	display         : flex;
	flex-direction  : row;
	justify-content : center;
	align-items     : center;

}
.control_btn .claws {
	width  : 20vw;
	height : 20vw;
}
</style>
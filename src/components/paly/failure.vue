<template>
    <div class="play_success">
    	<div class="failure_view">
    		 <div class="_view">
    		 	<p class="text">本次掉落4王国券！</p>
    		 </div>
    		 <div class="buttons">
    		 	<div class="btn" @click="onCancel">遗憾放弃</div>
    		 	<div class="btn" v-if="nomoney" @click="onPress">继续挑战</div>
    		 	<div class="btn" v-else @click="onToPay">立即充值</div>
    		 </div>
    	</div>
    </div>
    
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        data() {
            return {
            }
        },
        props: {
        	data : {
				type    : Object,
				default : () => {return {}}
        	},
        	onPress : {
				type    : Function,
				default : () => {}
        	},
        	onCancel : {
        		type    : Function,
				default : () => {}
        	},
        	onToPay : {
        		type    : Function,
				default : () => {}
        	},
        },
        computed : {
			...mapState({
				user         : state => state.User.user || {},
				current_room : state => state.Room.current_room
			}),
			nomoney() {
				return this.user.room_card > this.current_room.gold_price;
			}
		},
        methods : {
        }
    }
</script>

<style>
.play_success {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	display          : flex;
	position         : fixed;
	align-items      : center;
	justify-content  : center;
	background-color : rgba(0,0,0,0.4);
}
.play_success .failure_view {
	width            : 80vw;
	height           : 60vh;
	display          : flex;
	flex-direction   : column;
	align-items      : center;
	justify-content  : flex-end;
	background-size  : 100% 100%;
	background-image : url('/static/images/hall/videoplay/bgFail.png');
}
.failure_view ._view {
	
}
.failure_view ._view .text {
	color: #e06868;
}
.failure_view .buttons {
	margin         : 3vh 0;
	display        : flex;
	flex-direction : row;
	align-items    : center;
}
.failure_view .buttons .btn {
	width            : 30vw;
	height           : 6vh;
	margin           : 0 1vw;
	border-radius    : 3vh;
	color            : #fff;
	font-weight      : 800;
	font-size        : 16px;
	background-color : #8c83b8;
	display          : flex;
	justify-content  : center;
	align-items      : center;
}
</style>
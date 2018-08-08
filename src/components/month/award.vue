<template>
<div class="award">
	<div class="award-view">
		<div class="award-title">连续签到{{count}}天</div>
		<div class="award-desc">获得<span>1 次抽奖机会</span></div>
		<div class="award-msg">王国券 +40</div>
		<div class="award-prompt">
			<div class="prompt_view">
				<div class="prompt_title">剩余<span>{{lucky_draw_count}}次</span>抽奖机会</div>
				<div class="prompt_btn" @click="onPress">马上抽奖</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import Vue    from 'vue';
	import axios  from 'axios';
	import moment from 'moment';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'

	export default{
		name : 'calendar',
		data() {
			return {

			}
		},
		computed : {
			...mapState({
				token    : state => state.User.token,
			})
		},
		props : {
			lucky_draw_count : {
				type    : Number,
				default : 0
			},
			count : {
				type    : Number,
				default : 0
			},
			onPress : {
				type : Function,
				default : () => {}
			}
		},
		methods : {
			...mapActions([
				'signMonth',
				'onObtain',
				'onSupplement',
			]),
		},
		created() {
		}

	}
</script>

<style>
.award {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	position         : fixed;
	display          : flex;
	justify-content  : center;
	align-items      : center;
	background-color : rgba(0,0,0,0.5);
}
.award-view{
	width            : 70vw;
	padding          : 3vh 3vw;
	border-radius    : 30px;
	background-color : #fff;
	display          : flex;
	align-items      : center;
	justify-content  : flex-start;
	flex-direction: column;
}
.award-title {
	margin-bottom : 1vh;
	font-size     : 20px;
	font-weight   : bold;
}
.award-desc {
	color     : #999;
	font-size : 16px;
}
.award-desc span{
	margin-left : 1em;
	color       : #f46565;
}
.award-msg {
	color     : #f46565;
	font-size : 16px;
}
.award-prompt {
	width            : 60vw;
	height           : 16vh;
	margin-top       : 1vh;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	background-color : #ffc852;
}
.prompt_view {
	width            : 50vw;
	height           : 12vh;
	background-color : #ffecb1;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	flex-direction   : column;
}
.prompt_title {
	font-size     : 14px;
	margin-bottom : 10px;
}
.prompt_title span{
	color: #ff2121;
	font-size: 16px;
}
.prompt_btn {
	width            : 35vw;
	height           : 5vh;
	border-radius    : 3vh;
	font-size        : 16px;
	font-weight      : bold;
	color            : #fff;
	background-color : #e34d4d;
	display          : flex;
	align-items      : center;
	justify-content  : center;

}
</style>
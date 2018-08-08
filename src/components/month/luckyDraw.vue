<template>
<div class="lucky">
	<div class="lucky-view">
		<div class="lucky-title">恭喜你获得了</div>
		<div class="lucky-desc">{{data.bonus_name}}</div>
		<div class="luckybg" :style="'background-image:url('+lucky_bg+')'">
			<div class="lucky-icon">
				<img :src="icon"/>
			</div>
		</div>
		<div class="lucky-close" @click="onClose">
			关闭
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
		name : 'lucky',
		data() {
			return {
				ticket_icon   : './static/images/shop/record/ticket.png',
				currency_icon : './static/images/shop/record/currency.png',
				gift_icon     : './static/images/shop/record/gift.png',
				lucky_bg      : './static/images/shop/record/redpack.png',
			}
		},
		props : {
			data : {
				type    : Object,
				default : () => ({
					bonus_type : 0
				})
			},
			onClose : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
				token    : state => state.User.token,
			}),
			icon() {
		    	switch(this.data.bonus_type) {
		    		case 0:
		    		return this.ticket_icon;
		    		break;
		    		case 1:
		    		return this.currency_icon;
		    		break;
		    		case 2:
		    		return this.gift_icon;
		    		break;
		    	}
			}
		},
		methods : {
			...mapActions([
			]),	
		}
	}
</script>

<style>
.lucky {
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
.lucky-view {
	width            : 70vw;
	padding          : 3vh 3vw;
	border-radius    : 30px;
	background-color : #fff;
	display          : flex;
	align-items      : center;
	justify-content  : flex-start;
	flex-direction   : column;
}
.lucky-title {
	color         : #333;
	margin-bottom : 1vh;
	font-size     : 20px;
	font-weight   : bold;
}
.lucky-desc {
	color     : #f15135;
	font-size : 16px;
}
.luckybg {
	width             : 50vw;
	height            : 25vh;
	margin-top        : 2vh;
	background-repeat : no-repeat;
	background-size   : contain;
	display           : flex;
	align-items       : flex-start;
	justify-content   : center;
}
.lucky-icon {
	width            : 15vw;
	height           : 15vw;
	border-radius    : 20vw;
	background-color : #fff;
	margin-top       : 1.5vh;
	border           : 5px solid #f2cc79;
	display          : flex;
	align-items      : center;
	justify-content  : center;
}
.lucky-icon img {
	width  : 13vw;
	height : 13vw;
}
.lucky-close {
	width            : 50vw;
	height           : 6vh;
	border-radius    : 3vh;
	font-size        : 20px;
	display          : flex;
	color            : #e07a20;
	align-items      : center;
	justify-content  : center;
	background-color : #ffc852;
}
</style>
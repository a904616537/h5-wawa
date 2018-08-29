<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-23 15:49:02
* @Description
* @Flow 
-->

<template>
	<div v-show="keep" class="fastpay-view" @click="onClose">
		<transition
		name="fastpay"
		@before-enter="beforeEnter"
		@after-leave="afterLeave"
		>
		    <div v-show="show" class="fastpay">
		    	<div class="header">请选择充值</div>
		    	<div class="list">
					<div v-if="firstpay.paykey" class="item" @click="() => onPayment(firstpay.paykey)" style="width: 90vw;">
						<div class="gold">
							<div class="img-style" :style="toIndex(0)"></div>
							<div class="info">
								<div class="gold-num">首充限量大礼，立抢599</div>
								<div class="tip">{{firstpay.name.zh_TW}}</div>
								<div class="tip">送{{firstpay.pay_gift_num}}张包邮卡</div>
							</div>
						</div>
						<div class="money">¥ {{onMoney(firstpay.money)}}</div>
		    		</div>
		    		<div v-for="(item, index) in pay_list" class="item" @click="() => onPayment(item.paykey)" :style="onMargin(index)">
						<div class="gold">
							<div class="img-style" :style="toIndex(index)"></div>
							<div class="info">
								<div class="gold-num">{{onBuy(item.money)}}币</div>
								<div v-if="onGift(item.golds, item.money) > 0" class="tip">送{{onGift(item.golds, item.money)}}币</div>
								<div v-if="item.delivery_card_num > 0" class="tip">送{{item.delivery_card_num}}张包邮卡</div>
							</div>
						</div>
						<div class="money">¥ {{onMoney(item.money)}}</div>
		    		</div>
		    	</div>
		    </div>
		</transition>
	</div>
</template>

<script>
	import payment                            from '@/utils/payment';
	import pomelo_key                         from '@/utils/pomelo_key';
	import PubSub                             from 'pubsub-js';
	import {mapState, mapGetters, mapActions} from 'vuex'
    export default{
        data() {
            return {
				keep   : false,
				bglist : new Map([
					[0, "background-image: url('./static/images/hall/pay/gold_1.png')"],
					[1, "background-image: url('./static/images/hall/pay/gold_2.png')"],
					[2, "background-image: url('./static/images/hall/pay/gold_3.png')"],
					[3, "background-image: url('./static/images/hall/pay/gold_4.png')"],
					[4, "background-image: url('./static/images/hall/pay/gold_5.png')"],
					[5, "background-image: url('./static/images/hall/pay/gold_6.png')"],
				])
            }
        },
        props: {
            show : {
                type    : Boolean,
                default : false
            },
            onClose : {
				type    : Function,
				default : () => {}
            }
        },
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user,
				pay_list     : state => state.Hall.pay_list,
				firstpay     : state => state.Hall.firstpay,
				platformData : state => state.User.platformData,
			})
		},
        methods : {
        	beforeEnter() {
        		this.keep = true;
        	},
        	afterLeave() {
        		if(!this.show) {
        			this.keep = false;
        			this.onClose();
        		}
        	},
        	onMargin(index) {
        		const bo = (index % 2) == 0;
        		if(bo) return 'margin-right : 2vw;'
        		else return 'margin-left : 2vw;'
        	},
        	onMoney(money) {
				return parseInt(money)
			},
			onBuy(money) {
				return parseInt(money) * 10;
			},
			onGift(golds, money) {
				return golds - parseInt(money) * 10;
			},
			toIndex(index) {
				const t = Math.floor(index / this.pay_list.length * 6);
				return this.bglist.get(t);
			},
			onPayment(pkey) {
				const {openid, unionid} = this.platformData;

				payment.onPayment(openid, unionid, pkey)
				.then(res => {
					console.log('支付结果！', res)
				})
				.catch(err => {
				})
			},
        },

        mounted() {
		}
    }
</script>

<style>
.fastpay-view {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100vh;
	position         : fixed;
	background-color : rgba(0,0,0,0.4);
}
.fastpay {
	position         : fixed;
	bottom           : 0;
	left             : 0;
	width            : 100%;
	height           : 200px;
	background-color : #EEE;
}
.fastpay .header {
	padding          : 0 4vw;
	height           : 20px;
	font-size        : 9pt;
	justify-content  : flex-start;
	background-color : #EEE;
}

.fastpay .list {
	display         : flex;
	align-items     : center;
	justify-content : center;
	flex-direction  : row;
	flex-wrap       : wrap;
	height          : 180px;
	overflow-y      : scroll;
}

.fastpay .list .item {
	width            : 43vw;
	height           : 80px;
	margin           : 2vw;
	background-color : #fff;
	border-radius    : 5px;
	display          : flex;
	flex-direction   : column;
	overflow         : hidden;
}
.fastpay .list .item .gold{
	flex            : auto;
	display         : flex;
	padding         : 2vw;
	font-size       : 10pt;
	justify-content : center;
	align-items     : center;
}
.fastpay .list .item .gold .img-style {
	width               : 15vw;
	height              : 9vw;
	background-repeat   : no-repeat;
	background-size     : contain;
	background-position : center;
}
.fastpay .list .item .gold .info {
	flex            : auto;
	display         : flex;
	justify-content : center;
	align-items     : flex-end;
	flex-direction  : column;
	color           : #8e562a;
	font-weight     : 800;
}
.fastpay .list .item .gold .info .tip{
	font-size   : 9pt;
	font-weight : 400;
	color       : #da551f;
}
.fastpay .list .item .money {
	height           : 20%;
	color            : #fff;
	font-weight      : 600;
	background-color : #ff553a;
}

.fastpay-enter-active {
	transition: all 0.5s ease;
}
.fastpay-leave-active {
	transition: all 0.5s;
}
.fastpay-enter, .fastpay-leave-to{
	transform : translateY(200px);
	opacity   : 0;
}
</style>

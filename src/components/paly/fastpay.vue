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
					<div v-if="firstpay.paykey" class="item" @click="() => onPayment(firstpay.paykey)" style="width: 100vw;">
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

		    		<div class="item-card">
						<div class="inner" style="background-image: url('./static/images/top-up/week.png')">
							<div class="gold">
								<div class="float-item">
									<div class="float-left" style="color: #FA7737">周卡</div>
									<div class="float-right">充380币</div>
								</div>
								<div class="tip">送120币+包邮卡*1+vip瞄准点</div>
							</div>
							<div class="money">¥ 38</div>
						</div>
					</div>
					<div class="item-card">
						<div class="inner" style="background-image: url('./static/images/top-up/month.png')">
							<div class="gold">
								<div class="float-item">
									<div class="float-left" style="color: #CF4BD5">月卡</div>
									<div class="float-right">充380币</div>
								</div>
								<div class="tip">送960币+包邮卡*1+vip瞄准点</div>
							</div>
							<div class="money">¥ 120</div>
						</div>
					</div>

		    		<div v-for="(item, index) in pay_list" class="item" @click="() => onPayment(item.paykey)" :style="onMargin(index)">
						<div class="gold">
							<!-- 标签 -->
							<div class="triangle">
								<div class="triangle-top"></div>
								<span class="top-text">送娃娃</span>
							</div>

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
.triangle{
	position: relative;	
}
.triangle .triangle-top{
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
    height: 0;
    border-top: 45px solid #F4DA7F;
    border-right: 45px solid transparent;
	margin-top: -8vw;
	margin-left: -2vw;
}
.triangle .top-text{
	position: absolute;
	top: -8vw;
	left: -2vw;
	display: inline-block;
	width: 45px;
    font-weight: bold;
    font-size: 10px;
    height: 45px;
    margin-top: 2px;
    transform: scale(0.9) rotate(-45deg);
    -webkit-transform: scale(0.9) rotate(-45deg);
    color: #8e562a;
}
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
	background-color : #fff;
}
.fastpay .header {
	padding          : 0 4vw;
	height           : 20px;
	font-size        : 9pt;
	justify-content  : flex-start;
	background-color : #fff;
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
	width            : 46vw;
	height           : 80px;
	margin           : 2vw;
	background-color : #fff;
	border-radius    : 5px;
	display          : flex;
	flex-direction   : column;
	overflow         : hidden;
	position: relative;
}
.fastpay .list .item .gold{
	flex            : auto;
	display         : flex;
	padding         : 2vw;
	font-size       : 10pt;
	justify-content : center;
	align-items     : center;
	background-color: #fef6e1;
	overflow        : hidden;
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
	height           : 30%;
	line-height      : 24px;
 	color            : #fff;
	font-weight      : 600;
	background-color : #da551f;
}
.fastpay .list .label-tip{
	background-color: #F4DA7F;
	color: #da551f;
	font-weight: bold;
	position: absolute;
	left: 0;
	top: 0;
	transform: scale(0.9) rotate(-45deg);
	font-weight: 10px;
	height: 30px;
    line-height: 30px;
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

.fastpay .item-card{
	color: #fff;
	float: left;
    width: 46vw;
    height: 80px;
    margin: 2vw;
	font-size: 12px;
}
.fastpay .item-card .gold{
	height           : 10vh;
	padding          : 0 1vw;
}
.fastpay .item-card .inner{
	border-radius       : 3px;
	overflow            : hidden;
	background-repeat   : no-repeat;
	background-size     : cover;
	background-position : center;
}
.fastpay .item-card .float-item{
	content: '';
	display: block;
	clear: both;
	overflow: hidden;
}
.fastpay .item-card .float-left{
	float: left;
	font-weight: bold;
	font-size: 10px;
	height: 30px;
	line-height: 30px;
	margin-left: -1px;
	transform: scale(0.9) rotate(-45deg);
}
.fastpay .item-card .float-right{
	float: right;
	font-weight: bold;
	font-size: 14px;
	line-height: 30px;
}
.fastpay .item-card .tip{
	font-size: 11px;
	line-height: 10vw;
	overflow: hidden;
	white-space: nowrap;
	display: block;
}
.fastpay .item-card .money{
	background-color: transparent;
	font-weight: 500;
}

-webkit-text-size-adjust:none;
</style>

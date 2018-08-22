<template>
	<div class="recharge">
		<v-nav>充值王国币</v-nav>
		<div
		v-if="wawaplayer.recharge == 0"
		class="banner"
		style="background-image: url('./static/images/activity/firstpay/wawwjpayad.png')"
		@click="payintro"></div>
		<div class="balance" v-else>
			<div class="price">{{room_card}}</div>
			<div class="massage">账户余额(王国币)</div>
		</div>
		
		<div class="gold-box">

			<div v-for="(item, index) in pay_list" class="item" @click="() => onPayment(item.paykey)">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" :style="toIndex(index)"></div>
						</div>
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
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	import payment from '@/utils/payment';
	export default{
		name : 'recharge',
		data() {
			return {
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
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				wawaplayer   : state => state.User.wawaplayer,
				user         : state => state.User.user || {room_card : 0},
				pay_list     : state => state.Hall.pay_list,
				platformData : state => state.User.platformData
			}),
			room_card() {
				const re=/(?=(?!(\b))(\d{3})+$)/g;
				if(this.user.room_card)
					return this.user.room_card.toString().replace(re,",");
				else return 0;
			},
		},
		methods : {
			payintro() {
				this.$router.push({ path: '/payintro'})
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
					this.isShowComfilm = true
				})
			},
		},
		mounted() {
			if(!this.pomelo_login) {
				this.$router.replace('profile')
			}
		}
	}
</script>

<style>
	.recharge{
		top              : 0;
		left             : 0;
		right            : 0;
		height           : 100%;
		padding          : 0 8px;
		position         : absolute;
		background-color : #f2d56e;
	}
	.recharge .banner{
		width               : 100%;
		height              : 0;
		margin              : 10px 0;
		border-radius       : 12px;
		padding-bottom      : 25%;
		background-size     : contain;
		background-repeat   : no-repeat;
		background-position : top center;
	}
	.recharge .balance {
		color : #8e562a;
	}
	.recharge .gold-box{
		border-radius    : 20px;
		padding-bottom   : 20vh;
		background-color : #fff;
	}
	.recharge .gold-box:after{
		height   : 0;
		clear    : both;
		content  : '';
		display  : block;
		overflow : hidden;
	}
	.recharge .item{
		float     : left;
		width     : 50%;
		padding   : 10px 0;
		font-size : 14px;
		color     : #8e562a;
	}
	.recharge .item .gold{
		height           : 16vw;
		padding          : 0 1vw;
		background-color : #fef6e1;
	}
	.recharge .item .inner{
		margin        : 0 10px;
		border-radius : 10px;
		overflow      : hidden;
	}
	.recharge .item .inline{
		float : left;
	}
	.recharge .gold .info{
		width          : 22vw;
		height         : 16vw;
		display        : table-cell;
		text-align     : right;
		vertical-align : middle;
	}
	.recharge .item .gold-num{
		font-weight : bold;
	}
	.recharge .item .tip{
		color     : #da551f;
		font-size : 12px;
	}
	.recharge .img-style{
		width               : 16vw;
		height              : 16vw;
		background-size     : contain;
		background-repeat   : no-repeat;
		background-position : center;
	}	
	.recharge .money{
		color            : #fff;
		font-size        : 16px;
		line-height      : 30px;
		font-weight      : bold;
		background-color : #da551f;
	}
</style>
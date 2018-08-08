<template>
	<div class="recharge">
		<div class="banner" style="background-image: url('./static/images/activity/firstpay/wawwjpayad.png')" @click="payintro"></div>
		<div class="gold-box">

			<div  v-for="(item, index) in pay_list" class="item" @click="() => onPayment(item.paykey)">
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
				user         : state => state.User.user || {},
				pay_list     : state => state.Hall.pay_list,
				platformData : state => state.User.platformData
			}),
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
					alert('微信支付调用失败！');
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
		padding: 0 8px;
		background-color: #f2d56e;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.recharge .banner{
		width: 100%;
		height: 0;
		padding-bottom: 25%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: top center;
		border-radius: 12px;
		margin-top: 30px;
		margin-bottom: 10px;
	}
	.recharge .gold-box{
		background-color: #fff;
		border-radius: 20px;
		height: 140vw;
	}
	.recharge .gold-box:after{
		content : '';
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
	}
	.recharge .item{
		float     : left;
		width     : 50%;
		padding   : 10px 0;
		font-size : 14px;
		color     : #8e562a;
	}
	.recharge .item .gold{
		background-color : #fef6e1;
		height           : 16vw;
		padding          : 0 10px;
	}
	.recharge .item .inner{
		margin: 0 10px;
		border-radius: 10px;
		overflow: hidden;
	}
	.recharge .item .inline{
		float: left;
	}
	.recharge .gold .info{
		height : 16vw;
		width: 20vw;
		text-align: right;
		display: table-cell;
		vertical-align: middle;
	}
	.recharge .item .gold-num{
		font-weight: bold;
	}
	.recharge .item .tip{
		font-size : 12px;
		color     : #da551f;
	}
	.recharge .img-style{
		width: 16vw;
		height: 16vw;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}	
	.recharge .money{
		line-height      : 30px;
		font-size        : 16px;
		color            : #fff;
		font-weight      : bold;
		background-color : #da551f;
	}
</style>
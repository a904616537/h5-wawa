<template>
	<div class="recharge">
		<v-nav>充值王国币</v-nav>
		<!-- <div
		v-if="wawaplayer.recharge == 0"
		class="banner"
		style="background-image: url('./static/images/activity/firstpay/wawwjpayad.png')"
		@click="payintro"></div>
		<div class="balance" v-else>
			<div class="price">{{room_card}}</div>
			<div class="massage">账户余额(王国币)</div>
		</div> -->
		<div class="balance">
			<div class="price">{{room_card}}</div>
			<div class="massage">账户余额(王国币)</div>
		</div>
		
		<!-- vip -->
		<div class="gold-box vip-box">
			<div class="level" :style="'background-image: url('+vip_bg+')'">2</div>
			<div class="bar">
				<div class="text-style">充值<span class="light-style">51</span>元, 可升为<span class="light-style">VIP3</span></div>
				<div class="bar-bg">
					<div class="pb-wrapper">
						<div class="pb-container">
			                <div class="pb-text">50/100</div>
			                <div class="pb-value" style="width: 50%;"></div>
    			            <div class="next-level" :style="'background-image: url('+vip2_bg+')'">3</div>
			            </div>
					</div>
				</div>	

			</div>
			<div class="privilege" :style="'background-image: url('+vip_btn+')'">VIP特权</div>
		</div>





		<div class="gold-box">
			<!-- 月卡 和 周卡 -->
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

			<!-- 充值金额 循环 -->
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

		<!-- card 弹框 -->
		<v-card v-if="show" class="card-style" :onPress="onClose">
			<img :src="gold_bg" class="gold-img" />
			<div class="gold-style"><img :src="coin" class="img-style" /><span>+{{golds}}</span></div>
			<div class="tips">亲，今日周卡福利已送达</div>
			<div class="tip-text">你还可以领取6天哦~</div>
			<div class="btn">续卡</div>
		</v-card>
	</div>
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	import payment from '@/utils/payment'
	import Card from '@/components/card'
	export default{
		name : 'recharge',
		data() {
			return {
				show    : true,
				golds   : '270币',
				gold_bg : './static/images/hall/pay/gold_3.png',
				coin    : './static/images/hall/dailyBonus/coin.png',
				vip_bg  : './static/images/user/vip1.png',
				vip2_bg : './static/images/user/vip2.png',
				vip_btn : './static/images/user/button02.png',
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
		components: {
			'v-card' : Card
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
			onClose() {
				this.show = false;
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
		background-color : #f2d56e;
		position         : absolute;
		top              : 0;
		left             : 0;
		right            : 0;
		padding          : 0 8px;
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
	.recharge .balance .price{
		font-size: 42px;
		font-weight: bold;
	}
	.recharge .gold-box{
		border-radius    : 20px;
		padding-bottom   : 10vh;
		background-color : #fff;
		margin           : 3vw 0;
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
		padding   : 10px 0 5px;
		font-size : 14px;
		color     : #8e562a;
	}
	.recharge .item-card{
		color: #fff;
		float: left;
		width: 50%;
		padding: 10px 0 5px;
		font-size: 12px;
	}
	.recharge .item-card .gold{
		height           : 10vh;
		padding          : 0 1vw;
	}
	.recharge .item .gold{
		height           : 10vh;
		padding          : 0 1vw;
		background-color : #fef6e1;
	}
	.recharge .item-card .inner{
		margin        : 0 10px;
		border-radius : 10px;
		overflow      : hidden;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.recharge .item-card .float-item{
		content: '';
		display: block;
		clear: both;
		overflow: hidden;
	}
	.recharge .item-card .float-left{
		float: left;
		font-weight: bold;
		font-size: 14px;
		line-height: 30px;
	}
	.recharge .item-card .float-right{
		float: right;
		font-weight: bold;
		font-size: 16px;
		line-height: 30px;
	}
	.recharge .item-card .tip{
		font-size: 10px;
		line-height: 50px;
	}
	.recharge .item-card .money{
		background-color: transparent;
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
		line-height      : 24px;
		font-weight      : bold;
		background-color : #da551f;
	}
	/* card 弹框 */
	.card-style{
		font-weight: bold;
	}
	.card-style .gold-img{
		position: absolute;
		top: -24px;
		left: 50%;
		width: 100px;
		margin-left: -50px;
	}
	.card-style .img-style{
		width: 20px;
		height: 20px;
	}
	.card-style .gold-style{
		padding-top: 40px;
		line-height: 50px;
	}
	.card-style span{
		color: rgb(241,103,93);
		font-weight: bold;
		font-size: 32px;
		margin-left: 10px;
	}
	.card-style .title{
		text-align: left;
		padding: 0 40px;
		margin-bottom: 10px;
		line-height: 50px;
		border-bottom: 1px solid #eee;
	}
	.card-style .tip-text{
		color: #F1675C;
		font-size: 14px;
		margin-top: 10px;
	}
	.card-style li{
		padding     : 0 40px;
		text-align  : left;
		color       : #666;
		line-height : 28px;
		font-weight : normal;
	}
	.card-style li.active{
		color: #f2d56e;
	}
	.card-style li i{ 
		float : right;
	}
	.card-style .btn{
		background-color: rgb(252,133,78);
		width: 30vw;
		color: #fff;
		line-height: 30px;
		border-radius: 5px;
		margin: 10px auto;
	}

	/* vip */
	.recharge .vip-box{
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0;
		padding: 15px 10px;
		border-radius: 15px;
	}
	.vip-box .level{
		background-size: cover;
		background-repeat: no-repeat;
		text-align: center;
		color: #fff;
		font-weight: bold;
		width: 18%;
		line-height: 32px;
	}
	.vip-box .bar{
		flex-grow: 1;
		text-align: left;
		padding: 0 5px;
	}
	.vip-box .bar .text-style{
		font-size: 12px;
		margin-left: 10px;
	}
	.vip-box .bar .light-style{
		color: red;
		font-weight: 500;
	}
	.vip-box .next-level{
		background-size: cover;
		background-repeat: no-repeat;
		text-align: center;
		color: #fff;
		font-weight: bold;
		width: 16%;
		line-height: 18px;
		position: absolute;
		right: 2px;
		top: 0;
	}
	.vip-box .privilege{
		color: #fff;
		background-position: center;
		font-size: 12px;
		padding: 0 10px;
		line-height: 24px;
		border-radius: 15px;
		font-weight: bold;
	}
	-webkit-text-size-adjust:none;
	.vip-box .bar-bg{
		width:100px;
    	display:inline-block;
    	zoom:1;
	}
	.vip-box .pb-wrapper{
	    position : relative;
	    background : #eee;
	    border-radius : 15px;
	}
	.vip-box .pb-container{
	    height : 18px;
	    position : relative;
	    left : -1px;
	    margin-right : -2px;
	    font : 1px/0 arial;
	}
	.vip-box .pb-text{
	    width:100%;
	    position:absolute;
	    left:0;
	    top:0;
	    text-align:center;
	    color: #fff;
	    font:10px/18px arial;
	}
	.vip-box .pb-value{
		border-radius: 15px;
		background: #FEEA34;
		height: 100%;
	}
</style>
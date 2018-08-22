<template>
	<div class="sign">
		<v-nav>今日签到</v-nav>
		<div class="month">
			<div class="head">
				<div class="left">
					<span @click="showRule"><img :src="ticket_icon" class="icon-img" />签到规则</span>
					<span @click="toCovert"><img :src="prize_icon" class="icon-img" />我的奖品</span>
				</div>
				<div class="right">
					<img :src="voucher_icon" class="icon-img" />王国券：{{ticket}}
				</div>
			</div>
			<div class="title">
				<p>{{is_signin?'今日已签到':'签到'}}</p>
				本期连续签到：{{days}}天
			</div>
			<div class="content">
				<div class="top">
					<img src="static/images/monthtosign/cup.png" class="img-sty" />
					<div class="challenge">本期挑战</div>
				</div>
				<div class="inner">
					<v-prize-item v-for="(item, index) in award_day" :key="index" :number="item" :onPress="(data) => showPriz(data)"/>
				</div>
			</div>
			<div class="hook">
				<div class="item l-hook">
					<div class="round"></div>
					<div class="long"></div>
				</div>
				<div class="item r-hook">
					<div class="round"></div>
					<div class="long"></div>
				</div>
			</div>
			<div class="content bottom-content">
				<v-calendar :onAddDraw="(count) => _onDraw(count)"/>
			</div>
		</div>

		
		<v-rule v-if="show" :close="showRule"></v-rule>	
		<v-prize v-if="isShow" :list="prize" :day="prize_day" :close="showPriz"></v-prize>	
		<v-award v-if="show_award" :count="days" :lucky_draw_count="lucky_draw_count" :onPress="_onPress"/>
		<v-lucky v-if="show_lucky" :data="lucky" :onClose="() => show_lucky = false"/>
		<v-recommend :data="products"></v-recommend>

	</div>
</template>

 

<script>
	import Vue       from 'vue';
	import axios     from 'axios';
	import moment    from 'moment';
	import rule      from '@/components/month/rule'
	import prize     from '@/components/month/prize'
	import recommend from '@/components/month/recommend'
	import calendar  from '@/components/month/calendar'
	import award     from '@/components/month/award'
	import lucky     from '@/components/month/luckyDraw'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'

	var VPrize = {
        template: `
		    <div class="item" :class="{selected:receive}" @click="onClick">
				<div class="img-box">
					<img :src="icon" class="prize-img">
					<p class="prize-text">40王国券</p>
				</div>
				<p>连续{{number}}天</p>
			</div>
		`,
		data() {
			return {
				receive : false	
			}
		},
		watch : {
			continuous : function(val, old) {
				this.receive = this.continuous.has(this.number)
			}
		},
        props : {
        	onPress : {
        		type : Function,
        		default : () => {}
        	},
        	number : {
				type    : Number,
				default : 6
        	},
        	prizes : {
				type    : Array,
				default : () => []
        	}
        },
        computed : {
			...mapState({
				continuous : state => state.MonthtoSign.continuous
			}),
			is_signin() {
				return this.day_list.find(val => moment().isSame(moment(val), 'days'));
			},
			icon() {
        		return this.receive? './static/images/monthtosign/gift.png' : './static/images/monthtosign/gift_gray.png';
        	}
		},
		methods : {
			onClick() {
				this.onPress(this.number);
			}
		}
    };

	export default{
		name : 'sign',
		data() {
			return {
				count        : 0,
				draw_count   : 0,
				voucher_icon : './static/images/monthtosign/voucher.png',
				ticket_icon  : './static/images/monthtosign/rule.png',
				prize_icon   : './static/images/monthtosign/prize.png',
				prize        : [],		// 礼物列表
				prize_day    : 6,		// 礼物查看
				lucky        : {
					bonus_type : 0
				},
				show       : false,
				isShow     : false,
				show_award : false,
				show_lucky : false
			}
		},
		components : {
			'v-rule'       : rule,
			'v-recommend'  : recommend,
			'v-prize'      : prize,
			'v-prize-item' : VPrize,
			'v-calendar'   : calendar,
			'v-award'      : award,
			'v-lucky'      : lucky
		},
		computed : {
			...mapState({
				pomelo           : state => state.Pomelo.pomelo,
				pomelo_login     : state => state.Pomelo.login,
				token            : state => state.User.token,
				user             : state => state.User.user,
				products         : state => state.Shop.products.slice(0, 3),
				init             : state => state.Shop.init,
				ticket           : state => state.Vouchers.ticket,
				lucky_draw_count : state => state.LuckyDraw.lucky_draw_count,
				award_day        : state => {
					let arr = [];
					state.MonthtoSign.award_day.forEach(val => {
						arr.push(val);
					})
					return arr;
				},
				days     : state => state.MonthtoSign.count,
				day_list : state => state.MonthtoSign.day_list,
				bonus    : state => state.MonthtoSign.bonus
			}),
			is_signin() {
				return this.day_list.find(val => moment().isSame(moment(val), 'days'));
			}
		},
		methods : {
			...mapActions([
				'initShop',
				'setTicket',
				'initMonth',
				'onVouchersInit',
				'onLuckyInit',
				'onAddDraw',
				'onPlay'
			]),
			_onPress() {
				console.log('开始抽奖操作', this.count)
				// 开始抽奖操作
				axios.get(Vue.setting.api + '/day_bonus',{
					params : {
						token : this.token,
						day   : this.count
					}
				})
				.then(result => result.data)
				.then(result => {
					// 请求结果，弹出成功页面
					console.log('抽奖获得', result)
					this.lucky = result.bonus;
					this.show_award = false;
					this.show_lucky = true;

					this.onPlay(result => {
						axios.get(Vue.setting.api + '/exchange_log',{
							params : {token : this.token}
						})
						.then(result => result.data)
						.then(result => {
							if(result.ret === 0) {
		                        onVouchersInit(result)
		                    }
						});
					})
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			_onDraw(count) {
				console.log('有抽奖，弹出抽奖页面');
				// 有抽奖，弹出抽奖页面
				this.onAddDraw({next : draw_count => {
					this.count = count;
					this.show_award = true;
				}})
			},
			onInitShop() {
				axios.get(Vue.setting.api + '/exchange_list',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret == 0) {
						this.initShop(result)
						this.setTicket(result.ticket)
					}
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			onInitExchange() {
				axios.get(Vue.setting.api + '/month_data',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('month_data', result);
					this.initMonth(result.data);
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			showRule() {
				this.show = !this.show
			},
			showPriz(day) {
				this.prize_day = day;
				this.prize     = this.bonus.get(day);
				this.isShow    = !this.isShow
			},
			toCovert() {
				this.$router.push('covert');
			}
		},
		created() {
			// 初始化商城
			this.onInitShop();
			// 初始化签到
			this.onInitExchange();
			// 初始化抽奖
			this.onLuckyInit({});
		}

	}
</script>

<style>
	.sign{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;       /*需要更改背景颜色*/
		height: 100%;
		font-size: 12px;
	}
	.sign .month{
		background-color: rgb(250,102,87);
		padding-bottom: 20px;
		color: #fff;
	}
	.sign .left{
		float: left;
	}
	.sign .right{
		float: right;
	}
	.sign .head:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .head{
		font-size : 10pt;
		padding   : 1vw;
	}
	.sign .head .icon-img{
		height: 15px;
		margin: 0px 5px 0 10px;
		vertical-align: middle;
	}
	.sign .title p{
		font-size: 18px;
		margin-bottom: 0;
		font-weight: bold;
	}
	.sign .content{
		background-color : #f3f0e3;
		margin           : 10vh 5vw 0;
		color            : #ccc;              /* 需要更改字体颜色 */
		border-radius    : 10px;
		box-shadow       : 3px 3px 20px rgba(0,0,0,.2);
	}
	.sign .content .top{
		position: relative;
		top: -34px;
	}
	.sign .content .challenge{
		background-color: #fff;
		width: 80px;
		margin: 0 auto;
		border-radius: 11px;
		border: 1px solid #ccc;
		line-height: 24px;
		margin-top: -4px;
	}
	.sign .content .img-sty{
		width: 13%;
	}
	.sign .content .inner{
		padding: 0 10px;
		margin-top: -20px;
		font-size: 12px;
	}
	.sign .content .inner:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .content .inner .item{
		float: left;
		width: 25%;
	}
	.sign .content .inner .item.selected {
	}
	.sign .inner p{
		margin    : 5px 0 30px;
		font-size : 9pt;
	}
	.sign .inner .img-box{
		border-radius    : 50%;
		width            : 65px;
		height           : 65px;
		margin           : 0 auto;
		border           : 1px solid #ccc;
		background-color : #fff;
	}
	.sign .inner .prize-img{
		width      : 50%;
		margin-top : 5px;
	}
	.sign .inner .prize-text {
		font-size : 9pt;
		margin    : 0;
		padding   : 0;
	}
	.sign .bottom-content{
		margin-top: -35px;
	}
	.sign .bottom-content .inner{
		padding : 20px;
	}

	.sign .hook{
		position: relative;
		top: -20px;
	}
	.sign .hook:after{
		content : '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .hook .item{
		display: inline-block;
	}
	.sign .hook .l-hook{
		float: left;
		margin-left: 70px;
	}
	.sign .hook .r-hook{
		float: right;
		margin-right: 70px;
	}
	.sign .hook .round{
		background-color: rgb(250,102,87);
		width: 12px;
		height: 12px;
		border-radius: 10px;
	}
	.sign .hook .long{
		background-color: #d6d6d6;
		width: 10px;
		height: 40px;
		border-radius: 10px;
		margin-top: -6px;
		margin-left: 1px;
	}
</style>
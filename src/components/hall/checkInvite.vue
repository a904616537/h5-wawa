<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-09 14:39:20
* @Description
* @Flow 
-->

<template>

<transition name="fade" >
<div class="hall-share-view">
	<div class="hall-check">
		<img class="hall-header" :src="sharebg"/>
		<div class="pople">
			<img :src="avatar"/>
			<p>{{decodeURI(user.nickname)}}</p>
		</div>
		<div class="details">
			<div class="left-view">已获得</div>
			<div class="msg">
				<div>
					您已成功邀请{{invite_num}}人<span>【详情查询】</span>
				</div>				
			</div>
			<div class="table">
				<div class="segmen">
					<div class="segmen-title">我的余额</div>
					<div class="segmen-price">¥ {{bonus_money}}</div>
					<div class="segmen-btn">
						<div class="btn" @click="getBonusMoney">提现</div>
					</div>
				</div>
				<div class="vline"></div>
				<div class="segmen">
					<div class="segmen-title">王国币奖励</div>
					<div class="segmen-price">{{bonus_gold}}</div>
					<div class="segmen-btn">
						<div class="btn bouns" @click="getBonusGolds">领取</div>
					</div>
				</div>
			</div>
			<div class="instructions">详细规则说明</div>
		</div>
		<div class="check-btn" @click="onPress()">
			立即邀请赚更多
		</div>
	</div>
	<v-dialog width="80%"/>
</div>
</transition>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		name : 'hall_share',
		data() {
			return {
				sharebg : './static/images/hall/share/bonusBg.png',
				total_money : 0, 	// 累计领取钱，
				bonus_money : 0,	// 可以领的钱
				bonus_gold  : 0,	// 累计领取王国币
				money_state : 0,	// 红包是否可以领取
				invite_gold : 0,	// 红包是否可以领取
				page_fan    : 0,	// 是否是公众号粉丝
				invite_num  : 0,	// 已经邀请多少人
			}
		},
		props: {
			onPress : {
				type    : Function,
				default : () => { console.log('0000000')}
			}
		},
		computed : {
			...mapState({
				user  : state => state.User.user || {},
				token : state => state.User.token,
			}),
			avatar() {
				if(this.user && this.user.avatar != '') {
					return this.user.avatar;
				} else return './static/images/detail/avatar_default.png'
			},
		},
		methods: {
			...mapActions([
			]),
			showDialog(text) {
				this.$modal.show('dialog', {
					title   : '哟～～',
					text    : text,
					buttons : [{
						title   : '晓得啦',
						handler : () => { this.$modal.hide('dialog'); }
					}]
				})
			},
			viewDetails() {
				this.showDialog('请先关注微信公众号『王国服务』，进入推销员后台查看');
			},
			getBonusMoney() {
		        if (this.page_fan == 0) {
		        	this.showDialog('请先关注微信公众号『王国服务』，激活您的推销员账号');
		            return;
		        }
		        if (this.money_state == 0) {
		        	this.showDialog('至少要100元才能提现，请进入公众号王国推销员后台，查看更多收益渠道');
		            return;
		        }
		        if (this.bonus_money == 0) return;

		        axios.get(Vue.setting.api + '/getInviteBonus',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					this.bonus_money = 0;
					this.money_state = 0;
					this.showDialog('提现成功，请查看您的微信零钱核对收益!');
				});
		    },
		    getBonusGolds() {
		        if (this.bonus_gold == 0)return;

		        axios.get(Vue.setting.api + '/getInviteGold',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if (result.ret == 0) {
						this.bonus_gold = 0;
						this.showDialog('领取成功，您的王国币已经加满！');
					}
				});
		    },
			getData() {
				axios.get(Vue.setting.api + '/bonusList',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('bonusList ----->', result)
					if(result.ret == 0) {
						this.bonus_gold  = result.data.bonus_gold;
						this.bonus_money = result.data.bonus_money;
						this.page_fan    = result.data.page_fan;
						this.money_state = result.data.money_state;
						this.bonus_money = result.data.bonus_money;
						this.invite_num  = result.data.invite_num;
					}
				})
				.catch(err => {
					console.log('error', err)
				})
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>
.hall-share-view {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	z-index          : 99;
	position         : fixed;
	background-color : rgba(0,0,0,0.6);
	display          : flex;
	justify-content  : center;
	align-items      : center;
}
.hall-check{
	width            : 90vw;
	padding-top      : 10vh;
	border-radius    : 5vw;
	display          : flex;
	flex-direction   : column;
	justify-content  : flex-start;
	align-items      : center;
	background-color : #fff;
	position         : relative;
}
.hall-check .hall-header {
	position : absolute;
	top      : -7.5vh;
	width    : 90vw;
}
.hall-check .check-btn {
	color            : #fff;
	margin           : 2vh 0;
	width            : 50vw;
	height           : 8vh;
	z-index          : 99;
	line-height      : 8vh;
	border-radius    : 4vh;
	font-weight      : 800;
	background-color : #b40edf;
}
.hall-check .pople img{
	width         : 20vw;
	height        : 20vw;
	border-radius : 50%;
	overflow      : hidden;
}
.hall-check .pople p {
	margin      : 0;
	color       : #000;
	font-size   : 10pt;
	font-weight : 900;
}
.hall-check .details {
	width            : 86vw;
	border           : 2px #bfbfbf solid;
	margin-top       : 2vh;
	border-radius    : 3vw;
	position         : relative;
	background-color : #fffff0;
}
.hall-check .details .left-view {
	color                      : #fff;
	top                        : 3vw;
	left                       : 0;
	height                     : 3vh;
	line-height                : 3vh;
	font-size                  : 9pt;
	padding                    : 0 1vw;
	background-color           : #f9504a;
	border-top-right-radius    : 1.5vh;
	border-bottom-right-radius : 1.5vh;
	position                   : absolute;
}
.hall-check .details .msg {
	top             : -1.5vh;
	width           : 100%;
	position        : absolute;
	display         : flex;
	justify-content : center;
}
.hall-check .details .msg div {
	width            : 60vw;
	height           : 3vh;
	line-height      : 3vh;
	font-size        : 9pt;
	font-weight      : 900;
	background-color : #fff20a;
}
.hall-check .details .msg span {
	color: #8c2f36;
}
.hall-check .details .table{
	padding-top: 4vh;
	display         : flex;
	align-items     : center;
	flex-direction  : row;
	justify-content : center;
}

.hall-check .details .table .segmen {
	flex      : auto;
	color     : #bfbfbf;
	font-size : 11pt;
}
.segmen-price {
	font-size   : 14pt;
	font-weight : 900;
	color       : #000;
	margin      : 1vh 0;
}
.segmen-btn .btn{
	padding       : 0 10px;
	color         : #6da6e9;
	border        : 1px #6da6e9 solid;
	font-size     : 9pt;
	border-radius : 10px;
	display       : inline-block;
}
.segmen-btn .btn.bouns {
	color        : #EEAA00;
	border-color : #EEAA00;
}
.hall-check .details .table .vline {
	width            : 1px;
	height           : 10vh;
	background-color : #ddd;
}
.hall-check .details .instructions {
	color       : #BFBFBF;
	font-size   : 11pt;
	font-weight : 700;
	margin-top  : 2vh;
	border-top  : 1px #ddd solid;
	padding     : 5px 0;
}

</style>
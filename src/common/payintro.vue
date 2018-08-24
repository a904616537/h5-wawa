<template>
	<div class="payintro" @click="onPayment">
		<div class="pay-infor">{{logNow}}</div>
		<div class="bag-number">{{thousand}}<span></span>{{hundred}}<span></span>{{tens}}<span></span>{{single}}</div>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	import payment from '@/utils/payment';

	export default{
		name : 'payintro',
		data() {
			return {
				payInfro : {
					user : 'xxx',
					time : '21'
				},
				sti      : null,
				logNow   : '',
				log      : [],
				single   : '2',
				tens     : '2',
				hundred  : '2',
				thousand : '0'
			}
		},

		computed : {
			...mapState({
				pomelo        : state => state.Pomelo.pomelo,
				pomelo_login  : state => state.Pomelo.login,
				user          : state => state.User.user || {},
				token         : state => state.User.token,
				platformData  : state => state.User.platformData
			}),
		},
		methods : {
			processData(data){
				let lasts = data.limit;
				lasts = ("0000"+lasts).substr(-4,4).split("");
				this.thousand = lasts[0];
				this.hundred = lasts[1];
				this.tens = lasts[2];
				this.single = lasts[3];
				this.log  = data.pay_list;
				if(this.log.length>0){
					this.sti = setInterval(() => this.randomLog(),2990);
					this.randomLog()
				}
			},
			randomLog(){
		        let i = this.log.indexOf(this.logNow);
		        let n = i;
		        while(n == i){
		            n = Math.floor(Math.random() * this.log.length);
		        }
		        this.logNow = this.log[n]
		    },
			getData() {
				axios.get(Vue.setting.api + '/red_limit',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret == 0) {
						this.processData(result.data)
					}
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			onPayment() {
				const {openid, unionid} = this.platformData;
				payment.onPayment(openid, unionid, 'firstpay')
				.then(res => {
					console.log('支付结果！', res)
					this.$router.back();
				})
				.catch(err => {
					console.log('微信支付调用失败', err)
				})
			}
		},
		destroyed() {
			clearInterval(this.sti)
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';

	.payintro{
		background-image: url($apiurl + '/static/images/activity/firstpay/payintro.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: top center;
		background-color: rgb(196,63,54);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.payintro .pay-infor{
		color      : #f27048;
		margin-top : 50vw;
		font-size  : 12px;
	}
	.payintro .bag-number{
		margin-top  : 10vh;
		font-size   : 3.5rem;
		font-weight : 800;
		color       : #f27048;
	}
	.payintro .bag-number span{
		display: inline-block;
		width: 2.15rem;
	}
	@media screen and (max-width: 320px) {
		.payintro .bag-number{
			margin-top: 10vh;
			font-size: 2.8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 1.95rem;
		}
	}
	@media screen and (min-width: 360px) and (max-width: 370px) {
		.payintro .bag-number{
			margin-top: 19.5vw;
			font-size: 3.4rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 2rem;
		}
	}
	@media screen and (min-width: 411px) {
		.payintro .bag-number{
			margin-top: 20.5vw;
			font-size: 3.8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 2.4rem;
		}
	}
	@media screen and (min-width: 768px) {
		.payintro .pay-infor{
			margin-top: 44.5vw;
			font-size: 18px;
		}
		.payintro .bag-number{
			margin-top: 16.5vw;
			font-size: 6rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 3.55rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.payintro .pay-infor{
			margin-top: 44.5vw;
			font-size: 24px;
		}
		.payintro .bag-number{
			margin-top: 16.5vw;
			font-size: 8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 4.8rem;
		}
	}
</style>
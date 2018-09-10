<template>
	<div class="payintro">
		<img :src="top_btn" class="top-btn" @click="show=true">
		<img :src="title_img" class="title">
		<img :src="title2_img" class="title2">
		<p class="titlefont">--今日剩余名额--</p>
		<div class="firstbg">
			<div class="bag-number">
				<span>{{thousand}}</span>
				<span>{{hundred}}</span>
				<span>{{tens}}</span>
				<span>{{single}}</span>
			</div>
			<img :src="pay_btn" class="pay-btn" @click="onPayment">
			<img :src="photo1" class="photo">
			<img :src="photo2" class="photo">
			<img :src="photo3" class="photo">
			<img :src="photo4" class="photo">
		</div>
		<div v-show="show" class="rules">
			<div class="view">
				<img :src="close_btn" class="close" @click="show = false">
				<div class="header">
					<p>活动规则</p>
				</div>
				<ul>
					<li v-for="(item, index) in relus" :key="index">
						<div class="icon">
							<div>{{index+1}}</div>
						</div>
						<div class="text">
							<span>{{item.title}}</span>
							{{item.desc}}
						</div>
					</li>
				</ul>
			</div>
			
		</div>
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
				show       : false,
				relus      : [
					{title : '首次充值16元即可得：', desc : '160王国币、精美挂饰1个、vip瞄准器、红包福利4个（价值449币，可在“我的红包”查看红包详情）'},
					{title : '福利红包包括：', desc : '9币礼包（可立即开启），22币礼包（充13元开启），58币礼包（充21元开启），价值360币的娃娃（累计充值28元且未抓中娃娃可开启）'},
					{title : '本活动每个用户限领一次，', desc : '如发现任何形式作弊，《抓娃娃王国》有权取消礼包资格'},
					{title : '《抓娃娃王国》', desc : '有权根据产品策略调整活动内容和活动时间及奖励时效，且无需对用户或第三方承担任何责任'},
				],
				top_btn    : './static/images/activity/firstpay/top_button.png',
				title_img  : './static/images/activity/firstpay/title1.png',
				title2_img : './static/images/activity/firstpay/title2.png',
				close_btn : './static/images/activity/firstpay/close.png',
				pay_btn    : './static/images/activity/firstpay/pay_btn.png',
				photo1     : './static/images/activity/firstpay/photo1.png',
				photo2     : './static/images/activity/firstpay/photo2.png',
				photo3     : './static/images/activity/firstpay/photo3.png',
				photo4     : './static/images/activity/firstpay/photo4.png',
				payInfro   : {
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
			if(!this.pomelo_login) {
				this.$router.replace('/')
			}
			this.getData();
		}
	}
</script>
<!-- $apiurl: 'http://c.waguo.net/h5/wawa'; -->
<style lang="scss">
$apiurl: 'http://localhost:8080';

	.payintro{
		width               : 100vw;
		height              : 100vh;
		background-image    : url($apiurl + '/static/images/activity/firstpay/firstbg.jpg');
		background-size     : contain;
		background-repeat   : repeat;
		background-position : top center;
		background-color    : rgb(196,63,54);
		position            : relative;
		display             : flex;
		flex-direction      : column;
	}
	.payintro .top-btn{
		width      : 15vw;
		align-self : flex-end;
	}
	.payintro .title{
		width  : 80vw;
		margin : 1vh auto;
	}
	.payintro .title2{
		width  : 60vw;
		margin : 0 auto;
	}
	.payintro .titlefont {
		font-size   : 12pt;
		font-weight : 900;
		color       : #b94839;
		margin      : 0;
	}
	.payintro .firstbg {
		width               : 90vw;
		height              : 74vh;
		margin              : 0 auto;
		background-image    : url($apiurl + '/static/images/activity/firstpay/firstbg2.png');
		background-size     : contain;
		background-repeat   : no-repeat;
		background-position : center;
	}
	.payintro .pay-infor{
		color      : #f27048;
		margin-top : 50vw;
		font-size  : 12px;
	}
	.payintro .bag-number{
		width            : 50vw;
		height           : 5vh;
		font-size        : 20pt;
		font-weight      : 800;
		color            : #f27048;
		padding          : 1.5vh 1vw;
		border-radius    : 2vw;
		background-color : #EC7353;
		margin           : 7.5vh auto 4vh;
	}
	.payintro .bag-number span{
		display             : inline-block;
		width               : 10vw;
		height              : 5vh;
		background-image    : url($apiurl + '/static/images/activity/firstpay/num_bg.png');
		background-size     : contain;
		background-repeat   : no-repeat;
		background-position : center;
	}
	.payintro .pay-btn{
		width : 60vw;
	}
	.payintro .photo {
		width : 70vw;
	}
	.payintro .rules {
		position         : fixed;
		top              : 0;
		right            : 0;
		width            : 100vw;
		height           : 100vh;
		background-color : rgba(0,0,0,0.4);
		display          : flex;
		justify-content  : center;
		align-items      : center;
	}
	.payintro .rules .view {
		width            : 90vw;
		min-height       : 10vh;
		border-radius    : 10px;
		background-color : #fff;
		position         : relative;
	}
	.payintro .rules .view .close{
		position         : absolute;
		right            : -2vw;
		top              : -2vw;
		width            : 5vw;
		background-color : #eee;
		padding          : 1vw;
		border-radius    : 50%;
	}
	.payintro .rules .view .header {
		height           : 6vh;
		display          : flex;
		align-items      : center;
		justify-content  : center;
		background-color : #f2d56e;
		border-radius    : 10px 10px 0 0;
	}
	.payintro .rules .view .header p{
		margin           : 0;
		display          : inline-block;
		padding          : 5px 20px;
		font-size        : 12pt;
		color            : #fff;
		font-weight      : 900;
		border-radius    : 5px;
		letter-spacing   : 2px;
		background-color : #fb1e3f;

	}
	.payintro .rules .view ul{
		margin        : 3vw;
		padding       : 3vw;
		border        : 2px solid #f2d56e;
		border-radius : 10px;
		border-style  : dashed;
	}
	.payintro .rules .view ul li{
		font-size       : 10pt;
		text-align      : left;
		color           : #333;
		font-weight     : 600;
		display         : flex;
		align-items     : flex-start;
		justify-content : flex-start;
		flex-direction  : row;
		margin-bottom   : 2vh;
	}
	.payintro .rules .view ul li span{
		color : #fb1e3f;
	}
	.payintro .rules .view ul li .icon{
		width : 6%;
	}
	.payintro .rules .view ul li .icon div{
		width            : 3vw;
		height           : 3vw;
		line-height      : 3vw;
		font-size        : 9pt;
		margin-top       : 1vw;
		border-radius    : 50%;
		background-color : #fb1e3f;
		color            : #fff;
		text-align       : center;
	}
	.payintro .rules .view ul li .text {
		width : 94%;
	}
</style>
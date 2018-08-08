<template>
	<div>
	<div class="firstPayBag">
		<vue-tabs :activeTextColor="activeTextColor">
			<v-tab title="未开启">
				<div class="content">
					<v-item v-for="(item, index) in notData" :key="index" :data="item" :onShowRules="onShowRules" :onPress="(item) => clickItem(item)"/>
				</div>
			</v-tab>

			<v-tab title="已开启">
				<div class="content">
					<v-item v-for="(item, index) in openData" :key="index" :data="item" :onShowRules="onShowRules" :disabled="true"/>
				</div>
			</v-tab>

			<v-tab title="已失效">
				<div class="content">
					<v-item v-for="(item, index) in failureData" :key="index" :data="item" :onShowRules="onShowRules" :disabled="true"/>
				</div>
			</v-tab>
		</vue-tabs>

	</div>
	<v-alert v-if="showAlert" :data="alertData" :onPress="onCloseRules"/>
	<v-menu :index="1"></v-menu>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	import VItem  from '@/components/paybag/item';
	import VAlert from '@/components/paybag/popAlert';
	import payment from '@/utils/payment';

	export default{
		name : 'firstPayBag',
		data() {
			return {
				data            : [],
				activeTextColor : '#fff',
				showAlert       : false
			}
		},
		computed : {
			...mapState({
				pomelo        : state => state.Pomelo.pomelo,
				pomelo_login  : state => state.Pomelo.login,
				user          : state => state.User.user || {},
				token         : state => state.User.token,
				pay_list      : state => state.Hall.pay_list,
				task_pay_list : state => state.Hall.task_pay_list,
				platformData  : state => state.User.platformData
			}),
			notData() {
				return this.data.filter(val => val.state == 0 || val.state == 1);
			},
			openData() {
				return this.data.filter(val => val.state == 2);
			},
			failureData() {
				return this.data.filter(val => val.state == 3);
			},
			alertData(){
				const desc = `<p>1 充值28元立得280王国币，且激活“100%必得娃娃”礼包；</p><p>2 激活后，礼包页面实时显示用户已消耗的王国币；</p><p>3 当用户消耗完280王国币还没抓到娃娃，可拆开100%必得娃娃礼包，获得价值360币的娃娃；</p><p>4 当用户未消耗完280王国币就抓到娃娃，则该礼包失效。</p>`
				return {
					title   : '使用规则',
					body    : desc,
					btnText : '知道了'
				}
			}
		},
		watch: {
			token : function(val, old) {
				console.log('token val', val)
			}
		},
		components : {
			'v-item'  : VItem,
			'v-alert' : VAlert
		},
		methods : {
			onShowRules() {
				this.showAlert = true;
			},
			onCloseRules() {
				this.showAlert = false;
			},
			clickItem(item){
				console.log('click item', item)
		        if(item.state==1){
		        	axios.get(Vue.setting.api + '/task_bonus',{
						params : {
							token : this.token,
							id    : item.id
						}
					})
					.then(result => result.data)
					.then(result => {
						if(result.ret == 0) {
							console.log('请求红包', result);
		                    item.state = 2;
		                    this.getData();
						}
					})
					.catch(err => {
						console.log('error', err)
					})
		        }else if(item.state==0){
		        	// 未支付调用支付 item.pay
					const {openid, unionid} = this.platformData;
		        	console.log('item', item)
		        	// 先找到支付商品
		        	const paylist = this.pay_list.concat(this.task_pay_list);
		        	const shopitem = paylist.find(shopitem => parseInt(shopitem.money) == item.pay);
		        	payment.onPayment(openid, unionid, shopitem.paykey)
					.then(res => {
						console.log('支付结果！', res)
					})
					.catch(err => {
						console.log('微信支付调用失败', err)
						alert('微信支付调用失败！')
					})
		        }
		    },
			getData() {
				axios.get(Vue.setting.api + '/new_task',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret == 0) {
						console.log('请求红包', result)
						this.data = result.data;
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


<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	.firstPayBag{
		font-size : 12px;
	}
	.firstPayBag .vue-tabs {
		margin-bottom: 10vh;
	}
	.firstPayBag ul{
		background-color: #f2d56e;
		color: #BF6A0B;
		width: 100%;
		font-weight: bold;
	}
	.firstPayBag ul:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.firstPayBag li{
		float: left;
		width: 33.3333%;
		line-height: 50px;
		font-size: 14px;
	}
	.vue-tabs .nav-tabs > li > a {
		border: none;
		border-radius: 0;
		color: #8e562a;
	}
	.vue-tabs .nav-tabs > li.active > a, .vue-tabs .nav-tabs > li.active > a:hover, .vue-tabs .nav-tabs > li.active > a:focus{
		border : none;
		background-color: transparent;
		border-bottom: 4px solid rgb(254,232,95);
	}
	.firstPayBag li.checked{
		border-bottom: 4px solid rgb(254,232,95);   /*需要更换border-bottom的颜色 */
		color: #fff;
	}
	.firstPayBag .content{
		display        : flex;
		flex-direction : row;
		flex-wrap      : wrap;
	}
	.firstPayBag .content .item{
		width: 42vw;
		height: 30vh;
		margin: 4vw;
	}
	.firstPayBag .content .inner{
		background-image    : url($apiurl + "/static/images/activity/firstpay/bg.png");
		background-size     : contain;
		background-repeat   : no-repeat;
		background-position : center;
		width               : 100%;
		height              : 100%;
	}
	.firstPayBag .content .inner .title{
		height          : 17vh;
		color           : #fcea6d;
		font-weight     : bold;
		display         : flex;
		flex-direction  : column;
		justify-content : center;
	}
	.firstPayBag .content .inner .coins{
		font-size: 1rem;
		margin-bottom: 5px;
	}
	.firstPayBag .content .inner .time{
		color: #ffc39e;
	}
	.firstPayBag .content .inner .icon{
		font-size   : 1rem;
		font-weight : bold;
		color       : red;
		width       : 100%;
		height      : 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.firstPayBag .content .coins span{
		font-size: 1.6rem;
	}
</style>
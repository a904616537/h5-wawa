<!-- 我的娃娃及包邮卡 -->
<template>
	<div class="goods">
		<v-nav class="goods-head"><span>我的娃娃（{{wawa_num}}）</span><span class="head-right" @click="postage">包邮卡（{{delivery_card_num}}）</span></v-nav>

		<div v-for="(item,index) in wawas" :key="index" class="item">
			<img :src="item.gift_pic" class="goods-img" @click="goodsInfor(item)"/>
			<div class="goods-infor" @click="goodsInfor(item)">
				{{item.gift_name}}
				<div class="time">{{fromDate(item.ltime)}}</div>
			</div>
			<div class="goods-carriage">
				<div v-if="item.is_delivery == 0 && item.isExchange == 0" class="status-off">
					<span v-if="!is_out(item)">寄存剩{{outtime(item)}}天</span>
					<span v-else style="color: #999;">已过期</span>
					<div class="goods-btn" @click="onPress(item, index)">
						{{`兑换${is_vip?item.gift_expire_price_pay : item.gift_expire_price}币`}}
					</div>
				</div>
				<div v-else class="status-on">
					{{item.isExchange == 0?'已处理':`已兑换`}}
				</div>
			</div>
		</div>
		
		<v-card v-if="show" class="card-style" :onPress="onClose">
			<img :src="gold_bg" class="gold-img" />
			<div class="gold-style"><img :src="coin" class="img-style" /><span>+ {{golds}}</span></div>
			兑换成功
		</v-card>

		<v-dialog width="80%"/>

	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';
	import Card                               from '@/components/card'
	import pomelo_key                         from '@/utils/pomelo_key';
	export default{
		name : "goods",
		data() {
			return {
				show    : false,
				golds   : 0,
				gold_bg : './static/images/hall/pay/gold_3.png',
				coin    : './static/images/hall/dailyBonus/coin.png'
			}
		},
		components: {
			'v-card' : Card
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				wawaplayer   : state => state.User.wawaplayer,
				wawas        : state => state.User.wawas,
				postcard     : state => state.User.postcard,
			}),
			is_vip() {
				return this.wawaplayer.recharge > 0
			},
			wawa_num() {
				return this.wawas.length;
			},
			delivery_card_num() {
		        const delivery_card_num = this.postcard.length;
		        return delivery_card_num;
			}
		},
		methods : {
			...mapActions([
				'onRoomCardsChange',
				'setWawas'
			]),
			fromDate(time) {
				return moment(time).format("YYYY.MM.DD HH:mm")
			},
			postage() {
				this.$router.push({ path : '/postage' })
			},
			goodsInfor(data) {
				if(data.is_delivery == 0 && data.isExchange == 0) this.$router.push({ path : '/goodsDeliver', query : data })
			},
			outtime(data) {
				const outTime = data.expire_time == 0? 14 : moment(data.expire_time*1000).diff(moment(), 'days');
				return outTime;
			},
			is_out(data) {
				const disabled = moment(data.expire_time*1000).isBefore(moment());// 是否过期
				return disabled;
			},
			onClose() {
				this.show = false;
			},
			onPress(item, index) {
				const {onRoomCardsChange, setWawas, wawas, is_vip} = this;

				this.$modal.show('dialog', {
					title   : `确定要将${item.gift_name}兑换为${is_vip?item.gift_expire_price_pay : item.gift_expire_price}王国币吗？`,
					buttons : [{
						title   : '确定',
						handler : () => {
							this.$modal.hide('dialog');

							this.pomelo.request(pomelo_key.hall.user.modifyMyInfo, {exchange : 1, lid : item.lid, uid : this.user.uid}, (msg) => {
								if(msg.code == 200) {
			                        onRoomCardsChange({room_card : msg.msg.golds});
			                        item.isExchange = 1;
			                        setWawas({index, wawa : item});

			                        this.golds = is_vip?item.gift_expire_price_pay : item.gift_expire_price;
			                        this.show = true;
			                    } else {
			                    	this.$modal.show('dialog', {
										title   : `兑换失败！`,
										buttons : [{
											title   : '知道了！',
										}]
									})
			                    }
							});
							
						}
					},{
						title   : '取消',
						handler : () => { 
							this.$modal.hide('dialog');
						}
					}]
				})
			}
		},
		mounted() {
			if(!this.pomelo_login) {
				this.$router.replace('profile')
			}
		}
	}
</script>

<style>
	.goods{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.goods .goods-head{
		text-align: right;
	}
	.goods .head-right{
		position: relative;
		right: -10vw;
	}
	.goods .item{
		background-color: #fff;
		margin: 5px 0;
		display: flex;
	}
	.goods .item .goods-img{
		width: 22vw;
		height: 22vw;
	}
	.goods .item .goods-infor{
		flex: auto;
		text-align: left;
		padding-left: 5vw;
		font-size: 14px;
		margin: auto;
	}
	.goods .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 7px;
	}
	.goods .item .goods-carriage{
		width: 20vw;
		margin: auto;
		padding-right: 10px;
	}
	.goods .item .goods-btn{
		color: #333;
		border: 1px solid #333;
		border-radius: 15px;
		margin-top: 7px;
	}
	.goods .item .status-off{
		color: #D5443D;
	}
	.goods .item .status-on{
		color: #1AAD19;
	}
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
		margin-bottom: 10px;
		line-height: 50px;
	}
	.card-style span{
		color: rgb(241,103,93);
		font-weight: bold;
		font-size: 24px;
		margin-left: 10px;
	}
	.card-style .title{
		text-align: left;
		padding: 0 40px;
		margin-bottom: 10px;
		line-height: 50px;
		border-bottom: 1px solid #eee;
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
</style>
<template>
	<div class="goodsDeliver">
		<v-nav>娃娃详情</v-nav>
		<div class="head">
			<div class="title">
				<div v-if="disabled" class="status">已过期</div>
				<div v-else class="status">寄存剩{{day}}天</div>
				过期后不能发货
			</div>
			<img src="static/images/192.png" class="img-style" />
		</div>
		<div class="card">
			<div class="item">
				<img :src="data.gift_pic" class="img-style" />
				<div class="infor">
					{{data.gift_name}}
					<div class="time">{{fromDate(data.ltime)}}</div>
				</div>
				<div class="count">
					x 1
				</div>
			</div>
			<div class="item-bottom">
				<div class="convert">
					兑换王国币
					<span @click="convert = true">
						{{`兑换${is_vip?data.gift_expire_price_pay : data.gift_expire_price}币`}}
					</span>
				</div>
				<div @click="share">
					炫耀一下
					<div class="float-right">></div>
				</div>
			</div>
		</div>
		<div class="rule">
			<div class="title">发货规则:</div>
			<div class="text-style">
				1. 申请发货成功后3个工作日内发货，节假日不算工作日
			</div>
		</div>
		<div v-if="!disabled" class="address">
			<div class="title" @click="toAddress">选择发货地址<span>新增地址</span></div>
			<div v-for="(item, index) in address" :key="index" @click="toInfo(index)">
				<span class="name">{{item.name}}</span>{{item.tel}}<br/>
				{{`${item.province}${item.city}${item.area}${item.address}`}}
			</div>
		</div>


		<div class="popout" v-show="convert">
			<div class="box">
				<div class="title">
					{{`确定将物品兑换为${is_vip?data.gift_expire_price_pay : data.gift_expire_price}王国币吗？`}}
				</div>
				<div class="bottom">
					<div class="puplic-btn cancel" @click="convert = false">取消</div>
					<div class="puplic-btn enter" @click="onPress">确认</div>
				</div>
			</div>
		</div>

		<v-card v-if="false" class="card-style">
			<img src="static/images/hall/pay/gold_3.png" class="gold-img" />
			<div class="gold-style"><img src="static/images/hall/dailyBonus/coin.png" class="img-style" /><span>+ 7777</span></div>
			兑换成功
		</v-card>
		<v-card v-show="showwawalist" class="card-style">
			<div class="title">请选择您一同运送的物品</div>
			<ul>
				<li v-for="(item, index) in wawaslist"
				:key="index"
				:class="{active : isSelect(item)}"
				@click="onSelect(item)">
					{{item.gift_name}}
				<i class="fa" :class="[isSelect(item)?'fa-check-circle-o':'fa-circle-o']"></i></li>
			</ul>
			<div class="btn" @click="onSubmit">提交</div>
		</v-card>
		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';

	import Card from '@/components/card'
	export default{
		name : 'goodsDeliver',
		data() {
			return {
				data         : this.$route.query,
				select_address : {},
				select       : [{...this.$route.query}],
				convert      : false,
				showwawalist : false
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
				address      : state => state.User.address || [],
				wawaplayer   : state => state.User.wawaplayer,
				wawas        : state => state.User.wawas
			}),
			is_vip() {
				return this.wawaplayer.recharge > 0
			},
			wawaslist() {
				return this.wawas.filter(val => {
					const expireTime = moment(val.expire_time*1000);
		            const disabled   = expireTime.isBefore(moment());
		            return val.is_delivery == 0 && val.isExchange == 0 && !disabled;
				});
			},
			disabled() {
				return moment(this.data.expire_time*1000).isBefore(moment());
			},
			day() {
				const outTime = this.data.expire_time == 0? 14 : moment(this.data.expire_time*1000).diff(moment(), 'days');
				return outTime;
			},
		},
		methods : {
			fromDate(time) {
				return moment(time).format("YYYY.MM.DD HH:mm")
			},
			onPress() {
				this.convert = false
			},
			toAddress() {
				this.$router.push('address');
			},
			toInfo(index) {
				this.select_address = this.address[index];
				this.showwawalist = true;
			},
			isSelect(val) {
				return this.select.find(item => val.lid == item.lid)?true:false;
			},
			onSelect(val) {
				const index = this.select.findIndex(v => v.lid == val.lid)
				if(index > -1) this.select.splice(index, 1);
				else this.select.push(val);
			},
			share() {
				this.$router.push({ path : '/share' })
			},
			onSubmit() {
				this.showwawalist = false;
				if(this.select.length < 2 && this.wawaplayer.delivery_card_num < 1) {

		            this.$modal.show('dialog', {
						title   : `您没有包邮卡`,
						text    : '必须拥有2件以上物品可以包邮,充值可获赠包邮卡（1个包邮）',
						buttons : [{
							title   : '获取包邮卡',
							handler : () => {
								this.$modal.hide('dialog');
								this.$router.push('recharge')
							}
						},{
							title   : '取消',
							handler : () => { 
								this.$modal.hide('dialog');
							}
						}]
					})
		            return;
		        } else {
		        	this.$router.push({path : '/goodsInfor', query : {select : this.select, address : this.select_address}})
		        }
			}
		},
		mounted() {
			if(!this.$route.query.lid || !this.pomelo_login) {
				this.$router.replace('profile')
			}
		}
	}
</script>

<style>
	.goodsDeliver{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.goodsDeliver .head{
		background-color: #fff;
		padding: 10px 20px;
		margin-top: 5px;
		text-align: left;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .head .status{
		color: red;
	}
	.goodsDeliver .head .title{
		flex: auto;
		margin: auto;
		color: #999;
		font-size: 14px;
		font-weight: 400;
		line-height: 24px;
	}
	.goodsDeliver .head .img-style{
		width: 15vw;
		height: 15vw;
	}
	.goodsDeliver .card{
		background-color: #fff;
		margin: 5px 0;
		text-align: left;
	}
	.goodsDeliver .item{
		display: flex;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}
	.goodsDeliver .item .img-style{
		width: 15vw;
		height: 15vw;
	}
	.goodsDeliver .item .infor{
		margin: auto 0;
		flex: auto;
		padding: 0 20px;
		font-size: 14px;
	}
	.goodsDeliver .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 10px;
	}
	.goodsDeliver .item .count{
		color: #999;
		flex: auto;
		margin: auto 0;
		text-align: end;
	}
	.goodsDeliver .item-bottom{
		font-size: 14px;
		padding: 0 20px;
		line-height: 30px;
		color: #999;
	}
	.goodsDeliver .item-bottom .convert{
		color: #333;
		padding: 20px 0 10px;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .item-bottom span{
		color: #fff;
		font-weight: 400;
		padding: 0 10px;
		border-radius: 5px;
		background-color: rgb(166,119,208);
	}
	.goodsDeliver .float-right{
		float: right;
	}
	.goodsDeliver .rule{
		text-align: left;
		padding: 20px;
	}
	.goodsDeliver .rule .title{
		font-size: 16px;
	}
	.goodsDeliver .rule .text-style{
		line-height: 40px;
	}
	.goodsDeliver .address{
		background-color: #fff;
		text-align: left;
		border: 1px solid #ddd;
		margin: 0 20px;
		border-radius: 10px;
	}
	.goodsDeliver .address>div{
		border-bottom: 1px solid #eee;
		padding: 10px 20px;
		line-height: 20px;
	}
	.goodsDeliver .address .title{
		line-height: 30px;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .address .title span{
		color: blue;
		text-decoration: underline;
		font-size: 14px;
	}
	.goodsDeliver .address .name{
		margin-right: 40px;
	}
	.goodsDeliver .popout{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background-color: rgba(0,0,0,.3);
	}
	.goodsDeliver .popout .box{
		margin: 50vw 10vw;
		padding: 10vw 4vw;
		border-radius: 14px;
		background-color: #fff;
		color: #666;
		font-size: 16px;
	}
	.goodsDeliver .popout .box .title{
		margin-bottom: 30px;
	}
	.goodsDeliver .popout .bottom{
		justify-content: space-between;
		display: flex;
		flex: 1;
		padding: 0 10px;
	}
	.goodsDeliver .popout .puplic-btn{
		width: 24vw;
		line-height: 30px;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		font-weight: bold;
	}
	.goodsDeliver .popout .cancel{
		background-color: #ccc;
	}
	.goodsDeliver .popout .enter{
		background-color: rgb(243,141,92);
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
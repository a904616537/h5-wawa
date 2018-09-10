<template>
	<div class="goodsInfor">
		<v-nav>娃娃详情</v-nav>
		<div class="card">
			<div class="status">
				待发货
				<img src="" />
			</div>
			<div class="address">
				<p>收货人: {{address.name}}<span style="float: right;">{{address.tel}}</span></p>
				<p>收货地址: {{`${address.province}${address.city}${address.area}${address.address}`}}</p>
			</div>
		</div>
		<div class="card">
			
			<div v-for="(item, index) in data" :key="index" class="item">
				<img :src="item.gift_pic" class="img-style" />
				<div class="infor">
					{{item.gift_name}}
					<div class="time">{{fromDate(item.ltime)}}</div>
				</div>
				<div class="count">
					x 1
				</div>
			</div>
			<div class="item-bottom" @click="share">
				炫耀一下
				<div class="float-right">></div>
			</div>
		</div>
		<div class="submit">
			<div class="button" @click="show = true">申请发货</div>
		</div>
		
		<v-card v-if="show" class="card-style">
			<div class="bottom">
				<div class="title">确定发货吗?</div>
				<div class="content">申请后无法取消订单，物品将在3-5个工作日内发货!</div>
				<div class="bottom-btn">
					<div class="cancel puplic-btn" @click="onCanel">取消</div>
					<div class="enter puplic-btn" @click="onSuccess">确定</div>
				</div>
			</div>
		</v-card>
		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';
	import pomelo_key from '@/utils/pomelo_key';
	import Card       from '@/components/card';

	export default{
		name : 'goodsInfor',
		data() {
			return {
				show    : false,
				data    : this.$route.query.select,
				address : this.$route.query.address
			}
		},
		components: {
			'v-card' : Card
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user,
			}),
		},
		methods : {
			...mapActions([
				'updateAddress',
				'updateUserInfo'
			]),
			fromDate(time) {
				return moment(time).format("YYYY.MM.DD HH:mm")
			},
			onCanel() {
				this.show = false;
			},
			onSuccess() {
				this.onCanel();
				const deliverys = this.data.map(val => Object.assign(val, this.address,{del : 0}))

				this.onSend(deliverys);
			},
			share() {
				this.$router.replace({ path : '/share' })
			},
			onSend(data) {
				this.pomelo.request(pomelo_key.hall.user.modifyMyInfo, {delivery : data, is_new : 1, uid : this.user.uid}, (msg) => {
		            if (msg.code == 200) {
		            	this.updateUserInfo(msg.msg)

						this.$modal.show('dialog', {
							title   : '已提交发货申请',
							text    : '我们将在3个工作日内发货，节假日不算工作日',
							buttons : [{
								title   : '确定',
								handler : () => { 
									this.$modal.hide('dialog');
									this.$router.go(-3)
								}
							}]
						})
		            } else alert('提交出错啦！')
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
	.goodsInfor{
		left             : 0;
		right            : 0;
		top              : 0;
		font-size        : 12px;
		height           : 100%;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
		text-align       : left;
	}
	.goodsInfor .card{
		background-color: #fff;
		margin: 5px 0;
	}
	.goodsInfor .status{
		font-size: 18px;
		padding: 0 20px;
		border-bottom: 1px solid #eee;
		line-height: 15vw;
	}
	.goodsInfor .address{
		padding: 10px 20px;
	}
	.goodsInfor .item{
		display: flex;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}
	.goodsInfor .item .img-style{
		width: 20vw;
		height: 20vw;
	}
	.goodsInfor .item .infor{
		margin: auto 0;
		flex: auto;
		padding: 0 20px;
		font-size: 14px;
	}
	.goodsInfor .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 10px;
	}
	.goodsInfor .item .count{
		color: #999;
		flex: auto;
		margin: auto 0;
		text-align: end;
	}
	.goodsInfor .item-bottom{
		font-size: 14px;
		padding: 0 20px;
		line-height: 30px;
	}
	.goodsInfor .float-right{
		float: right;
	}
	.goodsInfor .bottom{
		margin: 5vw;
		color: #999;
	}
	.goodsInfor .bottom .title{
		font-weight: bold;
		font-size: 18px;
		text-align: center;
		margin-bottom: 10px;
		color: #333;
	}
	.goodsInfor .bottom .bottom-btn{
		display: flex;
		text-align: center;
		margin-top: 15px;
	}
	.goodsInfor .bottom-btn .puplic-btn{
		width: 24vw;
		font-size: 16px;
		line-height: 34px;
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
	}
	.goodsInfor .bottom-btn .cancel{
		background-color: #ccc;
	}
	.goodsInfor .bottom-btn .enter{
		background-color : rgb(243,141,92);
		position         : absolute;
		right            : 15vw;
	}
	.goodsInfor .submit {
		width           : 100%;
		height          : 10vh;
		position        : fixed;
		bottom          : 0;
		margin          : 0 auto;
		display         : flex;
		justify-content : center;
		align-items     : center;
	}
	.goodsInfor .submit .button{
		font-size        : 12pt;
		display          : flex;
		justify-content  : center;
		align-items      : center;
		width            : 40vw;
		height           : 6vh;
		border-radius    : 3vh;
		background-color : #f2d56e;
		color            : #fff;
	}
</style>
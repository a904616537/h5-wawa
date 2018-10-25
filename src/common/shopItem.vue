<template>
	<div v-if="data" class="shopItem">
		<v-nav>{{data.name}}</v-nav>
		<div class="banner" :style="'background-image: url('+data.imgurl+')'"></div>
		<div class="product">
			<div class="info">
				<div class="product-name">{{data.name}}</div>
				<div class="product-ticket">
					<span class="price">{{data.voucher}}</span>王国券
					<span class="default">¥{{data.price}}</span>
				</div>
			</div>
			<div v-if="address" class="address" @click="toAddress">
				<div class="item">
					<span class="label">送至</span>
					<span class="user-name">{{address.name}}</span>
					<span class="phone">{{address.tel}}</span>
					<img src="static/images/shop/record/to.png" alt="" class="icon-style" />
				</div>
				<div class="detail-address item">
					<span class="label"><img :src="localicon" alt="" class="icon-style" />详细地址</span>
					<span class="area">{{address.city}} {{address.area}} {{address.address}}</span>
				</div>
				<div class="item">
					<span class="label">送至</span>
					<span>包邮</span>
				</div>
			</div>
			<div v-else class="address" @click="toAddress">
				<div class="item">
					<span class="phone label">你还没有收获地址</span>
					<img :src="toicon" alt="" class="icon-style" />
				</div>
			</div>
		</div>
		<div class="details">
			<div class="title">商品详情</div>
			<div class="product-img">
				<img v-for="(img, index) in data.pics" :key="index" :src="img" class="img-style"/>
			</div>
		</div>
		<div v-if="type === '2'" class="bottom">
			<div class="btn btn-default">VIP3 以上才可以兑换</div>
			<span class="vip-level" @click="toMember">我的等级 VIP0</span>
		</div>
		<div v-else class="bottom">
			<div v-if="ispay" class="btn" @click="onPress">王国券兑换</div>
			<div v-else class="btn btn-default">王国券不足</div>
		</div>
	</div>	
</template>

<script>
	import Vue from 'vue';
	import axios from 'axios'
	import {mapState, mapGetters, mapActions} from 'vuex'

	export default{
		name : 'shopItem',
		data() {
			return {
				toicon    : './static/images/shop/record/to.png',
				localicon : './static/images/shop/record/local.png',
				data      : null,
				type      : '2'
			}
		},
		computed : {
			...mapState({
				token    : state => state.User.token,
				products : state => state.Shop.products,
				init     : state => state.Shop.init,
				ticket   : state => state.Vouchers.ticket,
				address  : state => state.User.address_selected
			}),
			ispay() {
				return this.ticket > this.data.voucher
			}
		},
		methods : {
			...mapActions([
				'onVouchersInit'
			]),
			toAddress() {
				this.$router.push({ path : '/address' })
			},
			toMember() {
				this.$router.push({ path : '/level' })
			},
			initProduct(gift_no) {
				this.data = this.products.find(val => val.no == gift_no);
				if(!this.data) this.$router.go(-1);
			},
			onPress() {
		        if(this.address) {
		            const model = {
		                gift_id : this.data.no,
		                name    : this.address.name,
		                tel     : this.address.tel,
		                address : `${this.address.city} ${this.address.area} ${this.address.address}`
		            }
		            axios.get(Vue.setting.api + '/exchange',{
						params : {token : this.token, ...model}
					})
					.then(result => result.data)
					.then(result => {
						console.log('兑换', result)
						if(result.ret == 0) {
							alert('兑换成功');
		                    this._onResh();
						} else alert('兑换失败');
					})
					.catch(err => {
						alert('网络错误!');
					})
		        } else alert('你还没有收货地址');
			},
			_onResh() {
                                                   
		        axios.get(Vue.setting.api + '/exchange_log',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret === 0) {
		                this.onVouchersInit(result)
		            }
				})
				.catch(err => {
					console.log('更新王国券信息失败！', err);
				})
		    }
		},
		mounted() {
			if(this.init) {
				this.initProduct(this.$route.query.gift_no)
			} else this.$router.go(-1);
		}
	}
</script>

<style>
	.shopItem{
		background-color: #f4f4f4;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		font-size: 12px;
	}
	.shopItem .banner{
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		height: 30vh;
	}
	.shopItem .product{
		background-color: #fff;
		padding: 0 14px;
		text-align: left;
	}
	.shopItem .product .info{
		border-bottom: 1px solid #999;
		padding: 10px 0;
	}
	.shopItem .product .info .product-ticket{
		color: #d8a035;
	}
	.shopItem .product .product-name{
		font-size: 16px;
		margin-bottom: 10px;
	}
	.product .product-ticket .price{
		font-size: 22px;
		font-weight: 500;
	}
	.product .product-ticket .default{
		color: #ccc;
		text-decoration: line-through;
		margin-left: 10px;
	}
	.shopItem .product .address{
		padding: 14px 0;
		display: flex;
    	flex-direction: column;
	}
	.shopItem .product .item {
		display         : flex;
		align-items     : center;
		justify-content : flex-start;
		flex-direction  : row;
	}
	.shopItem .product .item .phone{
		flex: auto;
	}

	.product .address .label{
		color: #999;
		margin-right: 16px;
		display: inline-block;
	}
	.product .address .user-name{
		width: 85px;
		display: inline-block;
	}
	.product .address .icon-style{
		width: 10px;
		height: 15px;
		float: right;
		margin-right: 10px;
	}
	.product .address .detail-address{
		margin-left: 42px;
		padding: 10px 0;
		color: #999;
	}
	.product .address .detail-address .label{
		float: left;
		line-height: 30px;
	}
	.product .address .detail-address .area{
		width: 60%;
		display: inline-block;
	}
	.product .detail-address .icon-style{
		width: 15px;
		height: 20px;
		float: none;
		margin-right: 5px;
		vertical-align: middle;
	}
	.shopItem .details{
		background-color: #fff;
		margin-top: 10px;
		text-align: left;
		padding-bottom: 80px;
	}
	.shopItem .details .title{
		padding-left: 14px;
		line-height: 40px;
		font-size: 14px;
	}
	.shopItem .details .img-style{
		width  : 100%;
		height : auto;
		border-radius: 0px;
	}
	.shopItem .bottom{
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px 0;
		text-align: center;
	}
	.shopItem .bottom .btn{
		margin           : 0 24vw;
		background-color : #f2d56e;
		color            : #fff;
		line-height      : 40px;
		font-size        : 16px;
		border-radius    : 50px;
	}
	.shopItem .bottom .vip-level{
		position: absolute;
		bottom: 0;
		right: 10px;
		line-height: 80px;
		text-decoration: underline;
		color: #999;
	}
	.shopItem .bottom .btn-default{
		background-color: rgba(242,213,110,.6);
	}
	@media screen and (min-width: 414px) {
		.product .address .detail-address .label{
			line-height: 0px;
		}
	}
</style>
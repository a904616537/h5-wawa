<template>
	<div class="shopItem">
		<div class="banner" style="background-image: url('static/images/activity/firstpay/wawwjad.png')"></div>
		<div class="product">
			<div class="info">
				<div class="product-name">商品名称</div>
				<div class="product-ticket">
					<span class="price">6990</span>王国券
					<span class="default">¥69</span>
				</div>
			</div>
			<div class="address" @click="toAddress">
				<div class="item">
					<span class="label">送至</span>
					<span class="user-name">某某某</span>
					<span class="phone">13813838438</span>
					<img src="static/images/shop/record/to.png" alt="" class="icon-style" />
				</div>
				<div class="detail-address">
					<span class="label"><img src="static/images/shop/record/local.png" alt="" class="icon-style" />详细地址</span>
					<span class="area">{{city}} {{area}} {{address}}</span>
				</div>
				<div class="item">
					<span class="label">送至</span>
					<span>包邮</span>
				</div>
			</div>
		</div>
		<div class="details">
			<div class="title">商品详情</div>
			<div class="product-img">
				<img src="static/images/activity/firstpay/wawwjad.png" class="img-style"/>
			</div>
		</div>
		<div class="bottom">
			<!-- <div class="btn btn-default">王国券不足</div> -->
			<div class="btn">王国券兑换</div>
		</div>
	</div>	
</template>

<script>
	export default{
		name : 'shopItem',
		data() {
			return {
				city : '上海',
				area : '浦东新区',
				address : '民生路1403号2903室'
			}
		},
		methods : {
			toAddress() {
				this.$router.push({ path : '/address' })
			}
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
		height: 120px;
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
		color: rgb(195,166,82);     /*需要更换字体颜色*/
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
		width: 100%;
	}
	.shopItem .bottom{
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px 0;
	}
	.shopItem .bottom .btn{
		width: 70%;
		margin: 0 auto;
		background-color: #f2d56e;   /*需要更换背景颜色*/
		color: #fff;
		line-height: 40px;
		font-size: 16px;
		border-radius: 50px;
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
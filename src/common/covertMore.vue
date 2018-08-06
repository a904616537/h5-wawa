<template>
	<div class="covertMore">
		<v-nav>兑换记录</v-nav>
		<div class="item head">
			<img src="static/images/monthtosign/selected.png" class="img-style" />
			恭喜兑换成功
			<p>恭喜您兑换成功</p>
		</div>
		<div class="item">
			订单状态：{{status}}
		</div>
		<div class="item">
			<div class="product">
				<div class="left">
				<img src="static/images/shop/record/currency.png" class="product-img" />
				<div class="name">礼物</div>
			</div>
			<div class="user">某某某</div>
			</div>
			<div class="info">
				<div>支付金额：<span>{{price}}</span></div>
				<div>下单时间：{{time}}</div>
			</div>
		</div>
		<div class="item">
			<div class="title">商品详情</div>
			<img src="static/images/ad1.png" class="info-img" />
		</div>
	</div>
</template>

<script>
	export default{
		name : 'covertMore',
		data() {
			return {
				status : '兑换成功',
				price  : '1',
				time   : '2018-08-01'
			}
		}
	}
</script>

<style>
	.covertMore{
		background-color: #f4f4f4;      /* 需要更换背景色 */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		text-align: left;
		font-size: 12px;
	}
	.covertMore .item{
		background-color: #fff;
		padding: 20px 14px; 
		margin-bottom: 14px;
	}
	.covertMore .item:last-child{
		padding: 0;
		margin: 0;
	}
	.covertMore .head{
		text-align: center;
		font-size: 16px;
	}
	.covertMore .head p{
		font-size: 12px;
		color: #999;
		background-color: rgb(254,250,229);      /* 需要更换背景颜色 */
		border: 1px solid #F2D56E;				/* 需要更换线条颜色 */
		line-height: 40px;
		text-align: left;
		padding: 0 14px;
		margin: 20px 0 0;
	}
	.covertMore .head .img-style{
		width: 16px;
		height: 16px;
	}
	.covertMore .item .info{
		border-top: 1px solid #ccc;
		color: #999;
	}
	.covertMore .item .product-img{
		width: 20px;
		height: 20px;
	}
	.covertMore .product:after{
		content : '';
		display : block;
		clear   : both;
		height  : 0;
		overflow: hidden;
	}
	.covertMore .item .left{
		float: left;
		margin: 0 20px 10px;
	}
	.covertMore .item .user{
		float: left;
		line-height: 40px;
	}
	.covertMore .item .name{
		color: orange;                 /*需要更换字体颜色*/
	}
	.covertMore .item .info>div{
		line-height: 24px;
	}
	.covertMore .item .info span{
		color: orange;                      /* 需要更换字体颜色 */
	}
	.covertMore .item .title{
		margin-left: 14px;
		line-height: 40px;
		font-size: 14px;
	}
	.covertMore .item  .info-img{
		width: 100%;
	}
</style>
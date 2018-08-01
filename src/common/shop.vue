<template>
	<div class="shop">
		<div class="tab">
			<div class="tab-list">
				<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
				我的王国券：<span>{{tickets}}</span>	
			</div>
			<div class="tab-list" @click="toCovert">
				<img src="static/images/shop/icon_record.png" class="icon-style" />
				兑换记录
			</div>
		</div>
		<div class="banner" @click="toTicket"></div>
		<div class="title">精选推荐</div>
		<div class="content">
			<div class="item" @click="toItem">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-bottom">
						<div class="productName">商品名称</div>
						<div class="tickets">
							<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
							{{productTicket}}王国券
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-bottom">
						<div class="productName">商品名称</div>
						<div class="tickets">
							<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
							{{productTicket}}王国券
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-bottom">
						<div class="productName">商品名称</div>
						<div class="tickets">
							<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
							{{productTicket}}王国券
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-bottom">
						<div class="productName">商品名称</div>
						<div class="tickets">
							<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
							{{productTicket}}王国券
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-bottom">
						<div class="productName">商品名称</div>
						<div class="tickets">
							<img src="static/images/shop/icon_vouchers.png" class="icon-style" />
							{{productTicket}}王国券
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-menu></v-menu>
	</div>
</template>

<script>
	export default{
		name : 'shop',
		data() {
			return {
				tickets : '145',
				productTicket : '9999999'
			}
		},
		methods : {
			toTicket() {   // 跳转到兑换王国券
				this.$router.push({ path : '/ticket' })
			},
			toItem() {   // 跳转到商品详情
				this.$router.push({ path : '/shopItem' })
			},
			toCovert() {   // 跳转到兑换记录
				this.$router.push({ path : '/covert' })
			}
		}
	}
</script>

<style>
	.shop{
		background-color: #f4f4f4;      /* 需要更换背景色 */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.shop .tab{
		font-size: 12px;
		color: #afafaf;
		padding: 8px 0;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;       /* 需要更换背景色 */
	}
	.shop .tab{
		content: '';
		display: block;
		clear: both;
		overflow: hidden;
	}
	.shop .tab-list{
		float: left;
		width: 49.8%;
	}
	.shop .tab-list:first-child{
		border-right: 1px solid #999;
	}
	.shop .icon-style{
		height: 10px;
		margin-right: 4px;
	}
	.shop .tab span{
		color: #ff5854;
	}
	.shop .banner{
		background-image: url('/static/images/shop/adv.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top center;
		height: 0;
		padding-bottom: 28%;
		margin-top: 33px;
	}
	.shop .title{
		text-align: left;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		padding-left: 20px;
		line-height: 30px;
		background-color: #fff;
		color: #7e7e7e;  
		font-weight: bold;
		font-weight: 18px;      
	}
	.shop .content{
		padding: 5px 10px;
		margin-bottom: 70px;
	}
	.shop .content:after{
		content : '';
		display : block;
		clear   : both;
		overflow: hidden;
		height  : 0;
	}
	.shop .content .item{
		float: left;
		width: 50%;
	}
	.shop .content .inner{
		background-color: #fff;
		margin: 5px;
		border-radius: 10px;
		overflow: hidden;
	}
	.shop .item .img-style{
		background-image: url('/static/images/hall/cardback.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		height: 150px;
	}
	.shop .item .item-bottom{
		color: #b0b0b0;
		text-align: left;
		padding: 5px 10px;
		line-height: 20px;
		font-size: 14px;
	}
	.shop .item .item-bottom .tickets{
		color: #ff5854;
		font-size: 12px;
	}
</style>
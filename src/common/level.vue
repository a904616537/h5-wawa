<template>
	<div class="members">
		<v-nav>会员说明</v-nav>
		<div class="banner">
			<div class="banner-level">
				我的等级 
				<div class="level">LV2</div>
			</div>
			<img src="static/images/user/icon.png" class="img-style">
		</div>
		<div class="item-box">
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV0</span> &#10056</div>
				<div class="text-style">未充值不能获得VIP专属特权</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV1</span> &#10056</div>
				<div class="text-style">累计充值<span>25</span>元可升级至<span>VIP1</span><br />不能参加王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV2</span> &#10056</div>
				<div class="text-style">累计充值<span>100</span>元可升级至<span>VIP2</span><br />不能参加王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV3</span> &#10056</div>
				<div class="text-style">累计充值<span>200</span>元可升级至<span>VIP3</span><br />不能参加王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV4</span> &#10056</div>
				<div class="text-style">累计充值<span>388</span>元可升级至<span>VIP4</span><br />不能参加王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV5</span> &#10056</div>
				<div class="text-style">累计充值<span>688</span>元可升级至<span>VIP5</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV6</span> &#10056</div>
				<div class="text-style">累计充值<span>1288</span>元可升级至<span>VIP6</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV7</span> &#10056</div>
				<div class="text-style">累计充值<span>2088</span>元可升级至<span>VIP7</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV8</span> &#10056</div>
				<div class="text-style">累计充值<span>3888</span>元可升级至<span>VIP8</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>		
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV9</span> &#10056</div>
				<div class="text-style">累计充值<span>6888</span>元可升级至<span>VIP9</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV10</span> &#10056</div>
				<div class="text-style">累计充值<span>10888</span>元可升级至<span>VIP10</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>	
			<div class="item">
				<div class="title">&#10056 <span class="title-text">LV11</span> &#10056</div>
				<div class="text-style">累计充值<span>15888</span>元可升级至<span>VIP11</span><br />可获得王国券商城专属vip商品兑换</div>
			</div>	
		</div>
	</div>
</template>

<script>
	export default{
		name : 'members',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.members{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}
	.members .banner{
		background-image: url('/static/images/user/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		height: 60px;
		display: flex;
		flex: 1;
		align-items: center;
		padding: 0 10px;
	}
	.members .banner-level{
		display: block;
		text-align: left;
		color: #fff;
		font-size: 12px;
	}
	.members .banner .level{
		font-weight: bold;
		font-size: 16px;
	}
	.members .banner .img-style{
		width: 50px;
		height: 50px;
		position: absolute;
		right: 20px;
	}
	.members .item-box{
		text-align: left;
		margin-bottom: 40px;
	}
	.members .item-box .item{
		padding: 0 10px;
		font-size: 14px;
	}
	.members .item .title{
		text-align: center;
		line-height: 40px;
		font-weight: bold;
		color: #FD7435;
	}
	.members .item .title-text{
		color: #505050;
	}
	.members .item .text-style{
		margin-bottom: 10px;
		color: #929291;
		font-size: 12px;
	}
	.members .item span{
		font-weight: bold;
	}
	.members .item:not(:last-child){
		border-bottom: 1px solid #eee;
	}
</style>
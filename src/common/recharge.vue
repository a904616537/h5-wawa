<template>
	<div class="recharge">
		<div class="banner" style="background-image: url('/static/images/activity/firstpay/wawwjpayad.png')"></div>
		<div class="gold-box">
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_1.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">120币</div>
						</div>
					</div>
					<div class="money">¥ 12</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_2.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">200币</div>
							<div class="tip">送1张包邮卡</div>
						</div>
					</div>
					<div class="money">¥ 20</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_3.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">500币</div>
							<div class="tip">送2张包邮卡</div>
						</div>
					</div>
					<div class="money">¥ 50</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_4.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">1000币</div>
							<div class="tip">送50币</div>
							<div class="tip">送3张包邮卡</div>
						</div>
					</div>
					<div class="money">¥ 100</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_5.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">3000币</div>
							<div class="tip">送300币</div>
							<div class="tip">送10张包邮卡</div>
						</div>
					</div>
					<div class="money">¥ 300</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="gold">
						<div class="inline">
							<div class="img-style" style="background-image: url('/static/images/hall/pay/gold_6.png')"></div>
						</div>
						<div class="info">
							<div class="gold-num">5880币</div>
							<div class="tip">送1008币</div>
							<div class="tip">送20张包邮卡</div>
						</div>
					</div>
					<div class="money">¥ 588</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'recharge',
		data() {
			return {

			}
		}
	}
</script>

<style>
	body{
		background-color: #f2d56e;	
	}
	.recharge{
		padding: 0 8px;
	}
	.recharge .banner{
		width: 100%;
		height: 0;
		padding-bottom: 25%;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: top center;
		border-radius: 12px;
		margin-top: 30px;
		margin-bottom: 10px;
	}
	.recharge .gold-box{
		background-color: #fff;
		border-radius: 20px;
		height: 140vw;
	}
	.recharge .gold-box:after{
		content : '';
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
	}
	.recharge .item{
		float: left;
		width: 50%;
		padding: 10px 0;
		font-size: 14px;
		color: #BF6A0B;      /*需要更换字体颜色*/
	}
	.recharge .item .gold{
		background-color: yellow;    /*需要更换颜色*/
		height : 16vw;
		padding: 0 10px;
	}
	.recharge .item .inner{
		margin: 0 10px;
		border-radius: 10px;
		overflow: hidden;
	}
	.recharge .item .inline{
		float: left;
	}
	.recharge .gold .info{
		height : 16vw;
		width: 20vw;
		text-align: right;
		display: table-cell;
		vertical-align:middle;
	}
	.recharge .item .gold-num{
		font-weight: bold;
	}
	.recharge .item .tip{
		font-size: 12px;
		color: red;            /*需要更换字体颜色*/
	}
	.recharge .img-style{
		width: 16vw;
		height: 16vw;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
	}	
	.recharge .money{
		line-height: 30px;
		font-size: 16px;
		color: #fff;
		font-weight: bold;
		background-color: brown;   /*需要更换颜色*/
	}
</style>
<template>
	<div class="bag">
		<div class="banner" style="background-image: url('./static/images/activity/firstpay/wawwjpayad.png')" @click="payintro"></div>
		<label>您还没有任何红包哦，活动规则:</label>
		<p>
			1 充值后可获得599王国币大礼包，用户可在“我的娃娃“中查看收到的礼包。其中15元可立即获得150王国币+1可爱娃娃+1包邮卡，499币作为赠送部分，以礼包形式派发。
		</p>
		<p>
			2 礼包共4个：9币礼包（可立即开启），22币礼包（充13元开启），58币礼包（充21元开启），价值360币的娃娃（累计充值28元且未抓中娃娃可开启）
		</p>
		<p>
			3 本活动每个用户限领1次，如发现任何形式的作弊，《抓娃娃王国》有权取消礼包资格。
		</p>
		<p>
			4 《抓娃娃王国》有权根据产品策略调整活动内容和活动时间以及奖励时效，且不需要对用户或第三方承担任何责任。
		</p>
	</div>
</template>

<script>
	export default{
		name : 'bag',
		data () {
			return {
				
			}
		},
		methods : {
			payintro() {
				this.$router.push({ path : '/payintro' })
			}
		}
	}
</script>

<style>
	.bag{
		padding: 0 14px;
		background-color: #f2d56e;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		text-align: left;
		font-size: 14px;
		color: brown;    /*需要更改字体颜色*/
	}
	.bag .banner{
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
	.bag label{
		line-height: 50px;
	}
	.bag p{
		margin: 0 0 20px;
	}
</style>
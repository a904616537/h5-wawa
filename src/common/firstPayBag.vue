<template>
	<div class="firstPayBag">
		<ul>
			<li class="checked">未开启</li>
			<li>已开启</li>
			<li>已失效</li>
		</ul>
		<div class="content">
			<div class="item">
				<div class="inner">
					<div class="title">
						<div class="coins">送<span>{{coin}}</span>王国币</div>
						<div class="recharge">充{{recharge}}元立即开启</div>
					</div>
					<div class="icon">充值</div>
					<div class="time">{{time}} 过期</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="title">
						<div class="coins">送<span>{{coin}}</span>王国币</div>
						<div class="recharge">充{{recharge}}元立即开启</div>
					</div>
					<div class="icon">充值</div>
					<div class="time">{{time}} 过期</div>
				</div>
			</div>
			<div class="item">
				<div class="inner">
					<div class="title">
						<div class="coins">送<span>{{coin}}</span>王国币</div>
						<div class="recharge">充{{recharge}}元立即开启</div>
					</div>
					<div class="icon">充值</div>
					<div class="time">{{time}} 过期</div>
				</div>
			</div>
			<div class="item">
				<div class="inner" style="background-image: url('/static/images/activity/firstpay/bg2.png')">  <!-- 需要更改背景内字体颜色 -->
					<div class="title">
						<div class="coins">100%必得娃娃</div>
						<div class="recharge">充{{recharge}}元立即激活</div>
					</div>
					<div class="time">{{time}} 过期</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'firstPayBag',
		data() {
			return {
				coin : 333,
				recharge : 25,
				time : '2018-07-31'
			}
		}
	}
</script>

<style>
	.firstPayBag{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : #f3f0e3;
	}
	.firstPayBag ul{
		background-color: #f2d56e;
		color: #BF6A0B;
		width: 100%;
		font-weight: bold;
	}
	.firstPayBag ul:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.firstPayBag li{
		float: left;
		width: 33.3333%;
		line-height: 50px;
		font-size: 14px;
	}
	.firstPayBag li.checked{
		border-bottom: 4px solid rgb(254,232,95);   /*需要更换border-bottom的颜色*/
		color: #fff;
	}
	.firstPayBag .content .item{
		width: 50%;
		float: left;
	}
	.firstPayBag .content .inner{
		background-image: url('/static/images/activity/firstpay/bg.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		padding-bottom: 110%;
		margin: 20px 10px 5px;
		position: relative;
	}
	.firstPayBag .content .inner .title{
		position: absolute;
		top: 18%;
		left: 0;
		right: 0;
		color: rgb(254,232,95);       /*需要更换字体颜色*/
		font-weight: bold;
	}
	.firstPayBag .content .inner .coins{
		font-size: 1rem;
		margin-bottom: 5px;
	}
	.firstPayBag .content .inner .time{
		color: rgb(254,232,95);      /*需要更换字体颜色*/
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
	}
	.firstPayBag .content .inner .icon{
		position: absolute;
		bottom: 23%;
		left: 0;
		right: 0;
		font-size: 1rem;
		font-weight: bold;
		color: red;         /*需要更换字体颜色*/
	}
	.firstPayBag .content .coins span{
		font-size: 1.6rem;
	}
</style>
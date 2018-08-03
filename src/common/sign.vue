<template>
	<div class="sign">
		<div class="month">
			<div class="head">
				<div class="left">
					<span @click="showRule"><img src="static/images/monthtosign/rule.png" class="icon-img" />签到规则</span>
					<span><img src="static/images/monthtosign/prize.png" class="icon-img" />我的奖品</span>
				</div>
				<div class="right">
					<img src="static/images/monthtosign/voucher.png" class="icon-img" />王国券：{{tickets}}
				</div>
			</div>
			<div class="title">
				<p>签到</p>
				本期连续签到：{{day}}天
			</div>
			<div class="content">
				<div class="top">
					<img src="static/images/monthtosign/cup.png" class="img-style" />
					<div class="challenge">本期挑战</div>
				</div>
				<div class="inner">
					<div class="item">
						<div class="img-box"><img src="static/images/monthtosign/礼盒灰.png" class="prize-img"></div>
						<p>连续6天</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="static/images/monthtosign/礼盒灰.png" class="prize-img"></div>
						<p>连续14天</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="static/images/monthtosign/礼盒灰.png" class="prize-img"></div>
						<p>连续21天</p>
					</div>
					<div class="item">
						<div class="img-box"><img src="static/images/monthtosign/礼盒灰.png" class="prize-img"></div>
						<p>连续30天</p>
					</div>
				</div>
			</div>
			<div class="hook">
				<div class="item l-hook">
					<div class="round"></div>
					<div class="long"></div>
				</div>
				<div class="item r-hook">
					<div class="round"></div>
					<div class="long"></div>
				</div>
			</div>
			<div class="content bottom-content">
				<div class="inner">
					一二三四五六七
				</div>
			</div>
		</div>


		<v-rule v-if="show" :close="showRule"></v-rule>	
		<v-prize v-if="isShow"></v-prize>	
		<v-recommend></v-recommend>

	</div>
</template>

<script>
	import rule from '@/components/month/rule'
	import prize from '@/components/month/prize'
	import recommend from '@/components/month/recommend'

	export default{
		name : 'sign',
		data() {
			return {
				tickets : '145',
				day     : '2',
				show    : false,
				isShow  : true
			}
		},
		components : {
			'v-rule' : rule,
			'v-recommend' : recommend,
			'v-prize' : prize
		},
		methods : {
			showRule() {
				this.show = !this.show
			}
		}
	}
</script>

<style>
	.sign{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;       /*需要更改背景颜色*/
		height: 100%;
		font-size: 12px;
	}
	.sign .month{
		background-color: rgb(250,102,87);
		padding-bottom: 20px;
		color: #fff;
	}
	.sign .left{
		float: left;
	}
	.sign .right{
		float: right;
	}
	.sign .head:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .head{
		font-size: 14px;
		padding: 14px 14px 14px 4px;
	}
	.sign .head .icon-img{
		height: 15px;
		margin: 0px 5px 0 10px;
		vertical-align: middle;
	}
	.sign .title p{
		font-size: 18px;
		margin-bottom: 0;
		font-weight: bold;
	}
	.sign .content{
		background-color: #f3f0e3;
		margin-top: 70px;
		margin: 70px 30px 0;
		color: #ccc;              /* 需要更改字体颜色 */
		border-radius: 10px;
		box-shadow: 3px 3px 20px rgba(0,0,0,.2);
	}
	.sign .content .top{
		position: relative;
		top: -34px;
	}
	.sign .content .challenge{
		background-color: #fff;
		width: 80px;
		margin: 0 auto;
		border-radius: 11px;
		border: 1px solid #ccc;
		line-height: 24px;
		margin-top: -4px;
	}
	.sign .content .img-style{
		width: 13%;
	}
	.sign .content .inner{
		padding: 0 20px;
		margin-top: -20px;
		font-size: 12px;
	}
	.sign .content .inner:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .content .inner .item{
		float: left;
		width: 25%;
	}
	.sign .inner p{
		margin: 5px 0 30px;
	}
	.sign .inner .img-box{
		background-color: #fff;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		border: 1px solid #ccc;
		margin: 0 auto;
	}
	.sign .inner .prize-img{
		width: 70%;
		margin-top: 5px;
	}
	.sign .bottom-content{
		margin-top: -35px;
	}
	.sign .bottom-content .inner{
		padding: 30px 20px;
	}

	.sign .hook{
		position: relative;
		top: -20px;
	}
	.sign .hook:after{
		content : '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.sign .hook .item{
		display: inline-block;
	}
	.sign .hook .l-hook{
		float: left;
		margin-left: 70px;
	}
	.sign .hook .r-hook{
		float: right;
		margin-right: 70px;
	}
	.sign .hook .round{
		background-color: rgb(250,102,87);
		width: 12px;
		height: 12px;
		border-radius: 10px;
	}
	.sign .hook .long{
		background-color: #d6d6d6;
		width: 10px;
		height: 40px;
		border-radius: 10px;
		margin-top: -6px;
		margin-left: 1px;
	}
</style>
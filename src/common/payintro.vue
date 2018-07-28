<template>
	<div class="payintro">
		<div class="pay-infor">{{payInfro.user}}在{{payInfro.time}}分钟前充值成功</div>
		<div class="bag-number">{{thousand}}<span></span>{{hundred}}<span></span>{{tens}}<span></span>{{single}}</div>
	</div>
</template>

<script>
	export default{
		name : 'payintro',
		data() {
			return {
				payInfro : {
					user : 'xxx',
					time : '21'
				},
				single : '2',
				tens : '2',
				hundred : '2',
				thousand : '0'
			}
		}
	}
</script>

<style>
	.payintro{
		background-image: url('/static/images/activity/firstpay/payintro.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: top center;
		background-color: rgb(196,63,54);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.payintro .pay-infor{
		color: red;      /*需要更换字体颜色*/
		margin-top: 53vw;
		font-size: 12px;
	}
	.payintro .bag-number{
		margin-top: 19.5vw;
		font-size: 3.5rem;
		font-weight: 800;
		color: red;     /*需要更换字体颜色*/
	}
	.payintro .bag-number span{
		display: inline-block;
		width: 2.15rem;
	}
	@media screen and (max-width: 320px) {
		.payintro .bag-number{
			margin-top: 19.5vw;
			font-size: 2.8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 1.95rem;
		}
	}
	@media screen and (min-width: 360px) and (max-width: 370px) {
		.payintro .bag-number{
			margin-top: 19.5vw;
			font-size: 3.4rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 2rem;
		}
	}
	@media screen and (min-width: 411px) {
		.payintro .bag-number{
			margin-top: 20.5vw;
			font-size: 3.8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 2.4rem;
		}
	}
	@media screen and (min-width: 768px) {
		.payintro .pay-infor{
			margin-top: 44.5vw;
			font-size: 18px;
		}
		.payintro .bag-number{
			margin-top: 16.5vw;
			font-size: 6rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 3.55rem;
		}
	}
	@media screen and (min-width: 1024px) {
		.payintro .pay-infor{
			margin-top: 44.5vw;
			font-size: 24px;
		}
		.payintro .bag-number{
			margin-top: 16.5vw;
			font-size: 8rem;
		}
		.payintro .bag-number span{
			display: inline-block;
			width: 4.8rem;
		}
	}
</style>
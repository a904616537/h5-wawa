<template>
	<div class="prize" @click="close">
		<div class="inner">
			<div class="title">连续{{day}}天签到抽奖奖品预览</div>
			<p>除了有一次抽奖机会，当天王国券翻倍哦！</p>
			<div class="list-box">
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
				<div class="item">
					<div class="img-style"></div>
					{{name}}
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	export default{
		name : 'prize',
		data() {
			return {
				day : '6',
				name : '50券'
			}
		},
		props : {
			close : {
				type : Function,
				default : () => {console.log('close')}
			}
		}
	}
</script>

<style>
	.prize{
		background-color: rgba(0,0,0,.2);
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 100%;
		color: #999;
	}
	.prize .inner{
		background-color: #fff;
		padding: 20px 20px 10px;
		border-radius: 10px;
		margin: 184px 40px;
		color: rgb(250,102,87);
	}
	.prize .inner .title{
		font-size: 14px;
		color: #333;
	}
	.prize .inner .list-box{
		display: flex;
		flex-wrap: wrap;
	}
	.prize .list-box .item{
		width: 33%;
		margin-bottom: 10px;
		line-height: 30px;
	}
	.prize .list-box .img-style{
		background-color: #eee;
		width: 40px;
		height: 40px;
		margin: 0 auto;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
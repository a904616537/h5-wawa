<template>
	<div class="ticket">
		<div class="banner">
			<div class="img-style"></div>
			<p>王国券可在王国商城中兑换大量奖品哦<br/>王国券、拍立得、精美娃娃等着你哦～</p>
		</div>
		<div class="content">
			<div class="card">
				<div class="inner">
					<div class="title">王国券签到</div>
					参与王国券签到可获取一定量的积分
				</div>
				<div class="btn" @click="toSign">立即...</div>
			</div>
			<div class="card">
				<div class="inner">
					<div class="title">抓娃娃</div>
					每局游戏结束后可获得一定王国券
				</div>
				<div class="btn" @click="toIndex">立即...</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'ticket',
		data() {
			return {

			}
		},
		methods : {
			toIndex() {
				this.$router.push({ path : '/' })
			},
			toSign() {
				this.$router.push({ path : '/sign' })
			}
		}
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	.ticket{
		background-color: #f4f4f4;      /* 需要更换背景色 */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		font-size: 12px;
		color: #7e7e7e; 
	}
	.ticket .banner{
		padding: 40px 0;
	}
	.ticket .img-style{
		width : 150px;
		height: 93px;
		background-image: url($apiurl + '/static/images/vouchers/pic.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top center;
		margin: 0 auto;
	}
	.ticket .content{
		padding: 0 14px;
	}
	.ticket .content .card{
		background-color: #fff;
		border-radius: 5px;
		margin-bottom: 20px;
		text-align: left;
		padding: 14px;
		font-size: 12px;
	}
	.ticket .card:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.ticket .card .inner{
		float: left;
		color: #c6c6c6;
	}
	.ticket .card .title{
		font-size: 14px;
		margin-bottom: 10px;
		color: #7e7e7e; 
	}
	.ticket .card .btn{
		float: right;
		font-size: 16px;
		background-color: rgb(254,204,58);
		color: #333;
		padding: 0 16px;
		border-radius: 3px;
		line-height: 26px;
		margin-top: 8px;
	}
</style>
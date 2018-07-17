<template>
	<div class="playhead">
		<div class="float-left">
			<div class="product-img" @click="click"></div>
			<div class="info">
				<div>{{user}}人</div>
				<div class="font-style">在{{number}}号机</div>
			</div>
		</div>
		<div class="float-right">
			<div class="user-img"></div>
			<div class="user-img"></div>
			<div class="user-img"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'playhead',
		data() {
			return {
				user: 1,
				number : 67
			}
		},
		props: {
			click: {
				type: Function,
				default : () => {console.log('click')}
			}
		}
	}
</script>

<style>
	.playhead{
		margin-bottom: 10px;
	}
	.playhead:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.playhead .product-img{
		background-color: #f4f4f4;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center center;
		background-image: url('/static/images/hall/cardback.png');
		width: 58px;
		height: 40px;
		display: inline-block;
	}
	.playhead .info{
		display: inline-block;
		font-size: 12px;
		padding: 2px 10px;
		font-weight: bold;
	}
	.playhead .font-style{
		font-weight: 200;
	}
	.playhead .float-left{
		float: left;
		display: flex;
		overflow: hidden;
		justify-content: center;
		align-content: center;
		border-radius: 10px;
		background-color: yellow;   /*需要更改背景颜色*/
		/*color: # ;*/
	}
	.playhead .float-right{
		float: left;
		margin-left: 5px;
	}
	.playhead .user-img{
		width: 36px;
		height: 36px;
		display: inline-block;
		background-color: #f4f4f4;
		border-radius: 50%;
		margin: 0 5px;
		border: 2px solid yellow;   /*需要更改颜色*/
	}
</style>
<template>
	<div class="delivery">
		<div class="card">
			<div class="left">
				<div class="img-style"></div>
				<div class="status">状态: {{status}}</div>
			</div>
			<div class="delivery-info">
				<div class="product">
					<span class="pro-name">商品名称</span>
					<span class="num right">数量: {{num}}</span>
				</div>
				<div class="user-info">
					<div class="user">
						<span class="user-name">用户姓名</span>
						<span class="phone right">15900496504</span>
					</div>
					<div class="address">上海上海市浦东新区民生路1403号</div>
				</div>
				<div class="cancel">取消配送</div>	
			</div>
		</div>
		<div class="card">
			<div class="left">
				<div class="img-style"></div>
				<div class="status">状态: {{status}}</div>
			</div>
			<div class="delivery-info">
				<div class="product">
					<span class="pro-name">商品名称</span>
					<span class="num right">数量: {{num}}</span>
				</div>
				<div class="user-info">
					<div class="user">
						<span class="user-name">用户姓名</span>
						<span class="phone right">15900496504</span>
					</div>
					<div class="address">上海上海市浦东新区民生路1403号</div>
				</div>
				<div class="cancel">取消配送</div>	
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'delivery',
		data() {
			return {
				status : '等待配送',
				num : 1
			}
		}
	}
</script>

<style>
	.delivery{
		padding: 8px;
		background-color: #f4f4f4;
		font-size: 12px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 100%;
		text-align: left;
	}
	.delivery .card{
		background-color: #fff;
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 15px;
	}
	.delivery .card:after{
		content: '';
		display: block;
		clear: both;
		overflow: hidden;
		height: 0;
	}
	.delivery .left{
		float: left;
		margin-right: 7px;
	}
	.delivery .img-style{
		background-color: #f4f4f4;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 10px;
		width: 27vw;
		height: 27vw;
	}
	.delivery .delivery-info .right,.delivery .cancel{
		float: right;
	}
	.delivery .user-info .user{
		line-height: 17vw;
	}
	.delivery .status{
		line-height: 30px;
		margin-left: 5px;
	}
</style>
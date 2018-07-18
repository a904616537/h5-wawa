<template>
	<div class="items">
		<div class="head">
			<img class="user-head" src="/static/images/hall/1.png"/>
			<div>user name</div>
			<div>剩余包邮卡: 0</div>
		</div>
		<div class="item-box">
			<div class="inner">
				<div class="card" style="background-image: url('/static/images/hall/cardback.png')">
					<div class="info">
						<div class="product">商品名称</div>
						<div class="moment">2018.07.18 10:00</div>
						<div class="send-btn">开始配送</div>
					</div>
				</div>
			</div>
			<div class="inner">
				<div class="card" style="background-image: url('/static/images/hall/cardback.png')">
					<div class="info">
						<div class="product">商品名称</div>
						<div class="moment">2018.07.18 10:00</div>
						<div class="send-btn">开始配送</div>
					</div>
				</div>
			</div>	
			<div class="inner">
				<div class="card" style="background-image: url('/static/images/hall/cardback.png')">
					<div class="info">
						<div class="product">商品名称</div>
						<div class="moment">2018.07.18 10:00</div>
						<div class="send-btn">开始配送</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default{
		name : 'items',
		data() {
			return {

			}
		}
	}
</script>

<style>
	body{
		background-color: #fff;	
	}
	.items .head{
		padding: 30px 0 20px;
		color: #BF6A0B;
		background-color: #f2d56e;
	}
	.items .user-head{
		width: 80px;
		height: 80px;
		border-radius: 80px;
	}
	.items .item-box{
		padding: 5px;
	}
	.items .item-box:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.items .inner{
		width: 50%;
		float: left;
	}
	.items .card{
		margin: 5px;
		height: 0;
		padding-bottom: 94.53%;
		border-radius: 20px;
		border: 1px solid #f2d56e;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
	}
	.items .card .info{
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: left;
		margin-left: 10px;
		margin-bottom: 10px;
		text-shadow: 1px 1px 1px #000;
	}
	.items .card .send-btn{
		background-color: rgb(253,131,78);     /*需要更改颜色*/
		line-height: 30px;
		text-align: center;
		text-shadow: none;
		border-radius: 8px;
		width: 100px;
	}
</style>
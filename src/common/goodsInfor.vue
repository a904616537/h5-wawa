<template>
	<div class="goodsInfor">
		<v-nav>娃娃详情</v-nav>
		<div class="card">
			<div class="status">
				待发货
				<img src="" />
			</div>
			<div class="address">
				收货人: 收货人姓名<br>
				收货地址: 上海市浦东新区民生路1403号信息大厦29楼2903
			</div>
		</div>
		<div class="card">
			<div class="item">
				<img src="static/images/hall/1.png" class="img-style" />
				<div class="infor">
					商品名称
					<div class="time">08/01 11:11:11</div>
				</div>
				<div class="count">
					x 1
				</div>
			</div>
			<div class="item">
				<img src="static/images/hall/1.png" class="img-style" />
				<div class="infor">
					商品名称
					<div class="time">08/01 11:11:11</div>
				</div>
				<div class="count">
					x 1
				</div>
			</div>
			<div class="item-bottom">
				炫耀一下
				<div class="float-right">></div>
			</div>
		</div>
		<div class="bottom">
			<div class="title">确定发货吗?</div>
			<div class="content">申请后无法取消订单，物品将在3-5个工作日内发货!</div>
			<div class="bottom-btn">
				<div class="cancel puplic-btn">取消</div>
				<div class="enter puplic-btn">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'goodsInfor',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.goodsInfor{
		left             : 0;
		right            : 0;
		top              : 0;
		font-size        : 12px;
		height           : 100%;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
		text-align       : left;
	}
	.goodsInfor .card{
		background-color: #fff;
		margin: 5px 0;
	}
	.goodsInfor .status{
		font-size: 18px;
		padding: 0 20px;
		border-bottom: 1px solid #eee;
		line-height: 15vw;
	}
	.goodsInfor .address{
		padding: 10px 20px;
	}
	.goodsInfor .item{
		display: flex;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}
	.goodsInfor .item .img-style{
		width: 20vw;
		height: 20vw;
	}
	.goodsInfor .item .infor{
		margin: auto 0;
		flex: auto;
		padding: 0 20px;
		font-size: 14px;
	}
	.goodsInfor .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 10px;
	}
	.goodsInfor .item .count{
		color: #999;
		flex: auto;
		margin: auto 0;
		text-align: end;
	}
	.goodsInfor .item-bottom{
		font-size: 14px;
		padding: 0 20px;
		line-height: 30px;
	}
	.goodsInfor .float-right{
		float: right;
	}
	.goodsInfor .bottom{
		background-color: #fff;
		padding: 5vw 10vw;
		margin: 5vw;
		border-radius: 10px;
		color: #999;
	}
	.goodsInfor .bottom .title{
		font-weight: bold;
		font-size: 18px;
		text-align: center;
		margin-bottom: 10px;
		color: #333;
	}
	.goodsInfor .bottom .bottom-btn{
		display: flex;
		text-align: center;
		margin-top: 15px;
	}
	.goodsInfor .bottom-btn .puplic-btn{
		width: 24vw;
		font-size: 16px;
		line-height: 34px;
		border-radius: 5px;
		color: #fff;
		font-weight: bold;
	}
	.goodsInfor .bottom-btn .cancel{
		background-color: #ccc;
	}
	.goodsInfor .bottom-btn .enter{
		background-color: rgb(243,141,92);
		position: absolute;
		right: 15vw;
	}
</style>
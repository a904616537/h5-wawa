<template>
	<div class="goodsDeliver">
		<v-nav>娃娃详情</v-nav>
		<div class="head">
			<div class="title">
				<div class="status">寄存剩{{day}}天</div>
				过期后不能发货
			</div>
			<img src="static/images/192.png" class="img-style" />
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
			<div class="item-bottom">
				<div class="convert">
					兑换王国币
					<span @click="exchange">兑换999币</span>
				</div>
				炫耀一下
				<div class="float-right">></div>
			</div>
		</div>
		<div class="rule">
			<div class="title">发货规则:</div>
			<div class="text-style">
				1. 申请发货成功后3个工作日内发货，节假日不算工作日
			</div>
		</div>
		<div class="address">
			<div class="title">选择发货地址<span>新增地址</span></div>
			<div>
				<span class="name">啦啦啦啦啦啦啦啦</span>13917223443<br/>
				上海市上海市浦东新区民生路1403号信息大厦2903室	
			</div>
		</div>
		<div class="popout" v-show="convert">
			<div class="box">
				<div class="title">确定将物品兑换为999王国币吗?</div>
				<div class="bottom">
					<div class="puplic-btn cancel" @click="exchange">取消</div>
					<div class="puplic-btn enter">确认</div>
				</div>
			</div>
		</div>
		<v-card class="card-style">
			<img src="static/images/hall/pay/gold_3.png" class="gold-img" />
			<div class="gold-style"><img src="static/images/hall/dailyBonus/coin.png" class="img-style" /><span>+ 7777</span></div>
			兑换成功
		</v-card>
		<!-- <v-card class="card-style">
			<div class="title">请选择您一同运送的物品</div>
			<ul>
				<li>娃娃1</li>
				<li>娃娃2</li>
				<li>娃娃3</li>
				<li>娃娃4</li>
			</ul>
			<div class="btn">提交</div>
		</v-card> -->
	</div>
</template>

<script>
	import Card from '@/components/card'
	export default{
		name : 'goodsDeliver',
		data() {
			return {
				day : '14',
				convert : false
			}
		},
		components: {
			'v-card' : Card
		},
		methods : {
			exchange() {
				this.convert = !this.convert
			}
		}
	}
</script>

<style>
	.goodsDeliver{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.goodsDeliver .head{
		background-color: #fff;
		padding: 10px 20px;
		margin-top: 5px;
		text-align: left;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .head .status{
		color: red;
	}
	.goodsDeliver .head .title{
		flex: auto;
		margin: auto;
		color: #999;
		font-size: 14px;
		font-weight: 400;
		line-height: 24px;
	}
	.goodsDeliver .head .img-style{
		width: 15vw;
		height: 15vw;
	}
	.goodsDeliver .card{
		background-color: #fff;
		margin: 5px 0;
		text-align: left;
	}
	.goodsDeliver .item{
		display: flex;
		padding: 10px 20px;
		border-bottom: 1px solid #eee;
	}
	.goodsDeliver .item .img-style{
		width: 15vw;
		height: 15vw;
	}
	.goodsDeliver .item .infor{
		margin: auto 0;
		flex: auto;
		padding: 0 20px;
		font-size: 14px;
	}
	.goodsDeliver .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 10px;
	}
	.goodsDeliver .item .count{
		color: #999;
		flex: auto;
		margin: auto 0;
		text-align: end;
	}
	.goodsDeliver .item-bottom{
		font-size: 14px;
		padding: 0 20px;
		line-height: 30px;
		color: #999;
	}
	.goodsDeliver .item-bottom .convert{
		color: #333;
		padding: 20px 0 10px;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .item-bottom span{
		color: #fff;
		font-weight: 400;
		padding: 0 10px;
		border-radius: 5px;
		background-color: rgb(166,119,208);
	}
	.goodsDeliver .float-right{
		float: right;
	}
	.goodsDeliver .rule{
		text-align: left;
		padding: 20px;
	}
	.goodsDeliver .rule .title{
		font-size: 16px;
	}
	.goodsDeliver .rule .text-style{
		line-height: 40px;
	}
	.goodsDeliver .address{
		background-color: #fff;
		text-align: left;
		border: 1px solid #ddd;
		margin: 0 20px;
		border-radius: 10px;
	}
	.goodsDeliver .address>div{
		border-bottom: 1px solid #eee;
		padding: 10px 20px;
		line-height: 20px;
	}
	.goodsDeliver .address .title{
		line-height: 30px;
		font-size: 16px;
		display: flex;
		justify-content: space-between;
	}
	.goodsDeliver .address .title span{
		color: blue;
		text-decoration: underline;
		font-size: 14px;
	}
	.goodsDeliver .address .name{
		margin-right: 40px;
	}
	.goodsDeliver .popout{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background-color: rgba(0,0,0,.3);
	}
	.goodsDeliver .popout .box{
		margin: 50vw 10vw;
		padding: 10vw 4vw;
		border-radius: 14px;
		background-color: #fff;
		color: #666;
		font-size: 16px;
	}
	.goodsDeliver .popout .box .title{
		margin-bottom: 30px;
	}
	.goodsDeliver .popout .bottom{
		justify-content: space-between;
		display: flex;
		flex: 1;
		padding: 0 10px;
	}
	.goodsDeliver .popout .puplic-btn{
		width: 24vw;
		line-height: 30px;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		font-weight: bold;
	}
	.goodsDeliver .popout .cancel{
		background-color: #ccc;
	}
	.goodsDeliver .popout .enter{
		background-color: rgb(243,141,92);
	}
	.card-style{
		font-weight: bold;
	}
	.card-style .gold-img{
		position: absolute;
		top: -24px;
		left: 50%;
		width: 100px;
		margin-left: -50px;
	}
	.card-style .img-style{
		width: 20px;
		height: 20px;
	}
	.card-style .gold-style{
		padding-top: 40px;
		margin-bottom: 10px;
		line-height: 50px;
	}
	.card-style span{
		color: rgb(241,103,93);
		font-weight: bold;
		font-size: 24px;
		margin-left: 10px;
	}
	.card-style .title{
		text-align: left;
		padding: 0 40px;
		margin-bottom: 10px;
		line-height: 50px;
		border-bottom: 1px solid #eee;
	}
	.card-style li{
		padding: 0 40px;
		text-align: left;
		color: rgb(118,119,120);
		line-height: 28px;
		font-weight: normal;
	}
	.card-style .btn{
		background-color: rgb(252,133,78);
		width: 30vw;
		color: #fff;
		line-height: 30px;
		border-radius: 5px;
		margin: 10px auto;
	}
</style>
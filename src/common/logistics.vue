<template>
	<div class="logistics">
		<v-nav>物流详情</v-nav>
		<div class="card">
			<div class="img">
				<img src="static/images/hall/1.png" class="img-style" />
				<div class="img-title"><span class="font-style">共{{count}}件商品</span></div>
			</div>
			<div class="infor">
				物流公司: 百世快递<br>
				物流单号: 71136264418351
			</div>
			<div class="btn">复制</div>
		</div>
		<div class="content">
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'logistics',
		data() {
			return {
				count : '11'
			}
		}
	}
</script>

<style>
	.logistics{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.logistics .card{
		margin: 5px 0;
		background-color: #fff;
		display: flex;
		text-align: left;
		padding: 4vw;
		font-size: 14px;
	}
	.logistics .img{
		position: relative;
	}
	.logistics .img-style{
		width: 64px;
		height: 64px;
	}
	.logistics .img-title{
		position: absolute;
		bottom: 1vw;
		left: 0;
		right: 0;
		color: #fff;
		background-color: rgba(0,0,0,.6);
	}
	.logistics .font-style{
		display: block;
		font-size: 10px;
		transform: scale(0.8);
		text-align: center;
	}
	.logistics .infor{
		flex: auto;
		margin: auto 0;
		padding-left: 3vw;
		line-height: 20px;
	}
	.logistics .card .btn{
		font-size: 12px;
		flex: auto;
		margin: auto;
		text-align: center;
		border: 1px solid #333;
		border-radius: 15px;
		position: relative;
		top: 10px;
	}
	.logistics .content{
		padding: 10px 0;
		text-align: left;
		font-size: 14px;
	}
	.logistics .content .point{
		display: flex;
		padding-right: 10px;
	}
	.logistics .content .date{
		width: 110px;
		text-align: center;
		border-right: 2px solid #ccc;
		margin-right: 18px;
		padding-bottom: 30px;
		position: relative;
	}
	.logistics .point:last-child .date{
		border: none;
	}
	.logistics .content .date span{
		font-size: 12px;
		color: #999;
	}
	.logistics .content .icon{
		width: 22px;
		height: 22px;
		border-radius: 50px;
		position: absolute;
		right: -11px;
		top: 0;
		background-color: #ccc;
	}
</style>
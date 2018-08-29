<!-- 我的娃娃及包邮卡 -->
<template>
	<div class="goods">
		<v-nav class="goods-head"><span>我的娃娃（{{quantity}}）</span><span class="head-right" @click="postage">包邮卡（{{num}}）</span></v-nav>
		<div class="item">
			<img src="static/images/hall/1.png" class="goods-img" />
			<div class="goods-infor">
				商品名称
				<div class="time">07/20<span>11:11:11</span></div>
			</div>
			<div class="goods-carriage">
				<div class="status-off">
					寄存剩14天
					<div class="goods-btn" @click="goodsInfor">
						免费获取
					</div>
				</div>
				<!-- <div class="status-on">
					已签收
				</div> -->
			</div>
		</div>
		<div class="item">
			<img src="static/images/hall/1.png" class="goods-img" />
			<div class="goods-infor">
				商品名称
				<div class="time">07/20<span>11:11:11</span></div>
			</div>
			<div class="goods-carriage">
				<div class="status-on">
					已签收
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : "goods",
		data() {
			return {
				quantity : '7',
				num      : '2'
			}
		},
		methods : {
			postage() {
				this.$router.push({ path : '/postage' })
			},
			goodsInfor() {
				this.$router.push({ path : '/goodsInfor' })
			}
		}
	}
</script>

<style>
	.goods{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.goods .goods-head{
		text-align: right;
	}
	.goods .head-right{
		position: relative;
		right: -10vw;
	}
	.goods .item{
		background-color: #fff;
		margin: 5px 0;
		display: flex;
	}
	.goods .item .goods-img{
		width: 22vw;
		height: 22vw;
	}
	.goods .item .goods-infor{
		flex: auto;
		text-align: left;
		padding-left: 5vw;
		font-size: 14px;
		margin: auto;
	}
	.goods .item .time{
		color: #999;
		font-size: 12px;
		margin-top: 7px;
	}
	.goods .item .goods-carriage{
		width: 20vw;
		margin: auto;
		padding-right: 10px;
	}
	.goods .item .goods-btn{
		color: #333;
		border: 1px solid #333;
		border-radius: 15px;
		margin-top: 7px;
	}
	.goods .item .status-off{
		color: #D5443D;
	}
	.goods .item .status-on{
		color: #1AAD19;
	}
</style>
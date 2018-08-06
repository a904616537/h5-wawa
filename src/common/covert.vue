<template>
	<div class="convert">
		<v-nav>兑换记录</v-nav>
		<div class="item" @click="showMore">
			<div class="left">
				<img src="static/images/shop/record/currency.png" class="img-style" />
				<div >礼物</div>
			</div>
			<div class="content">
				<div class="product">10王国币（每天可领）</div>
				<div class="status">成功</div>
			</div>
			<img src="static/images/shop/record/to.png" class="icon-style" />
		</div>
		<div class="item">
			<div class="left">
				<img src="static/images/shop/record/currency.png" class="img-style" />
				<div >礼物</div>
			</div>
			<div class="content">
				<div class="product">10王国币（每天可领）</div>
				<div class="status">成功</div>
			</div>
			<img src="static/images/shop/record/to.png" class="icon-style" />
		</div>
		<p>已经没有更多了！</p>
	</div>
</template>

<script>
	export default{
		name : 'convert',
		data() {
			return {

			}
		},
		methods : {
			showMore() {
				this.$router.push({ path : '/covertMore' })
			}
		}
	}
</script>

<style>
	.convert{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		height: 100%;
		font-size: 14px;
		background-color: #f4f4f4;     /*需要更换背景颜色*/
	}
	.convert .item{
		background-color: #fff;
		padding: 20px; 
		border-bottom: 1px solid #eee;
		text-align: left;
	}
	.convert .item:after{
		content : '';
		display : block;
		height  : 0;
		clear   : both;
		overflow: hidden;
	}
	.convert .item .left{
		float: left;
		font-size: 12px;
		margin-right: 20px;
		color: orange;       /*需要更改字体颜色*/
	}
	.convert .item .img-style{
		width: 20px;
		height: 20px;
		margin-bottom: 5px;
	}
	.convert .item .content{
		float: left;
		width: 83%;
	}
	.convert .content .status{
		color: #ccc;
		font-size: 12px;
		margin-top: 10px;
	}
	.convert .item .icon-style{
		width: 10px;
		height: 20px;
		float: left;
		margin-top: 10px;
	}
	.convert p{
		font-size: 12px;
		color: #ccc;
	}
</style>
<template>
	<div class="recommend">
		<div class="title">
			精品推荐
			<div class="more" @click="more">查看更多 ></div>
		</div>
		<div class="item-box">
			<div class="item">
				<div class="img-style" style="background-image: url('static/images/ad1.png');"></div>
				{{product}}
			</div>
			<div class="item">
				<div class="img-style" style="background-image: url('static/images/192.png');"></div>
				{{product}}
			</div>
			<div class="item">
				<div class="img-style"></div>
				{{product}}
			</div>
		</div>
	</div>
</template> 

<script>
	export default{
		name : 'recommend',
		data() {
			return {
				product : '商品名称'
			}
		},
		methods: {
			more() {
				this.$router.push({ path : '/shop' })
			}
		}
	}
</script>

<style>
	.recommend{
		background-color: #fff;
		text-align: left;
	}
	.recommend .title{
		line-height: 30px;
		padding: 0 14px;
	}
	.recommend .title .more{
		float: right;
	}
	.recommend .item-box{
		display: flex;
	}
	.recommend .item{
		width: 100%;
		border: 1px solid #ddd;
		text-align: center;
		line-height: 30px;
	}
	.recommend .item .img-style{
		background-image: url('/static/images/hall/cardback.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 0;
		padding-bottom: 50%;

	}
</style>
<template>
	<div class="recommend">
		<div class="title">
			精品推荐
			<div class="more" @click="more">查看更多 ></div>
		</div>
		<div class="item-box">
			<div v-for="(item, index) in data" :key="index" class="item" @click="() => toItem(item.no)">
				<div class="img-style" :style="bgimage(item.imgurl)"></div>
				{{item.name}}
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
		props : {
			data : {
				type : Array,
				default : () => []
			}
		},
		methods: {
			bgimage(imgurl) {
				if(imgurl && imgurl != '') return `background-image: url('${imgurl}');`;
				else return `background-image: url('./static/images/hall/cardback.png');`;
			},
			more() {
				this.$router.push({ path : '/shop' })
			},
			toItem(gift_no) {   // 跳转到商品详情
				this.$router.push({
					path  : '/shopItem',
					query : {gift_no}
				})
			},
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
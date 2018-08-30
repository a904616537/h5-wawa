<template>
	<div class="goodsDeliver">
		<v-nav>娃娃详情</v-nav>
		<div class="head">
			<div class="title">
				<div class="status">寄存剩{{day}}天</div>
				过期后不能发货
			</div>
			<img src="static/images/hall/1.png" class="img-style" />
		</div>
	</div>
</template>

<script>
	export default{
		name : 'goodsDeliver',
		data() {
			return {
				day : '14'
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
</style>
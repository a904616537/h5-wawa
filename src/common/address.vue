<template>
	<div class="addressList">
		<div class="bottom-btn">添加收货地址</div>
	</div>
</template>

<script>
	export default{
		name : 'addressList',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.addressList .bottom-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f2d56e;	
		color: #BF6A0B;            /*需要更改字体颜色*/
		font-weight: bold;
		line-height: 50px;
	}
</style>
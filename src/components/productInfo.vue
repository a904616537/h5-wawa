<template>
	<div class="productInfo" @click="click">
		<div class="inner">
			<div class="card">
				<div class="img-style"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'productInfo',
		data() {
			return {

			}
		},
		props: {
			click : {
				type : Function,
				default : () => {console.log('close the mask')}
			}
		}
	}
</script>

<style>
	.productInfo{
		background-color: rgba(0,0,0,.3);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.productInfo .inner{
		margin: 8vh 10px;
		background-color: #fff;
		border-radius: 10px;
		height: 62vh;
		overflow: scroll;
	}
	.productInfo .inner .img-style{
		width: 100%;
		padding-bottom: 20%;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
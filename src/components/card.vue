<template>
	<div class="puplic-card">
		<div class="inner">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'card',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.puplic-card{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.3);
		height: 100%;
	}
	.puplic-card .inner{
		margin: 30vw 10vw;
		padding-bottom: 5vw;
		border-radius: 14px;
		font-size: 16px;
		background-color: #fff;
		color: #666;
		position: relative;
	}
	
</style>
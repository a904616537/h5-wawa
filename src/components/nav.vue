<template>
	<div class="navbar">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		data() {
			return {

			}
		}
	}
</script>

<style>
	.navbar{
		background-color : #f2d56e;
		color: #BF6A0B;
		font-weight: bold;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
	}
</style>
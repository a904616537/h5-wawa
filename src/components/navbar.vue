<template>
	<div class="navbar">
		<div class="float-left">
			<img class="product-img" />
			<div class="info">
				{{user}}人
				在{{number}}号机
			</div>
		</div>
		<div class="float-right">
			<img class="user-img" />
		</div>
	</div>
</template>

<script>
	export default{
		name : 'navbar',
		data() {
			return {
				user: 1,
				number : 67
			}
		}
	}
</script>

<style>
	
</style>
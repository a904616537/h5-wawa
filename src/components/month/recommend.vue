<template>
	<div class="recommend">
		<div class="title">
			精品推荐
			<div class="more" @click="more">查看更多 ></div>
		</div>
		<div class="content">
			<div class="item">
				
			</div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
	</div>
</template> 

<script>
	export default{
		name : 'recommend',
		data() {
			return {

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
	
</style>
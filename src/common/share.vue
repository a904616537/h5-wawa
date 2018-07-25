<template>
	<div class="share">
		<div class="change_bg">
			<div class="btn boy">
				男生版
			</div>
			<div class="btn girl">
				女生版
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'share',
		data() {
			return {

			}
		}
	}
</script>

<style>
	.share{
		background-image: url('/static/images/hall/sharebg0.jpg');
		background-size: cover;
		background-repeat: no-repeat;
		background-position: top center;
		height: 0;
		padding-bottom: 100vh;
	}
	.share .change_bg{
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -25vw;
	}
</style>
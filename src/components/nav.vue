<template>
	<div class="navbar">
		<div class="lrbtn">
			<div v-if="!hidden" @click="toBack">
				<icon name="back" :w="30" :h="30"></icon>
			</div>
		</div>
		<div class="slot">
			<slot></slot>
		</div>
		<div class="lrbtn"></div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
			}
		},
		props : {
			hidden : {
				type    : Boolean,
				default : false
			}
		},
		methods : {
			toBack() {
				this.$router.back();
			},
		}
	}
</script>

<style>
	.navbar{
		height           : 50px;
		color            : #8e562a;
		font-size        : 16px;
		font-weight      : 900;
		line-height      : 50px;
		text-align       : center;
		background-color : #f2d56e;
		display: flex;
		flex-direction: row;

	}
	.navbar .slot {
		flex : auto;
	}
	.navbar .lrbtn {
		width : 10vw;
	}
</style>
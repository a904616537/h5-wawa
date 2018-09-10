<template>
	<div class="puplic-card" @click="onPress">
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
		},
		props : {
			onPress : {
				type    : Function,
				default : () => {}
			}
		}
	}
</script>

<style>
	.puplic-card{
		position         : fixed;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : rgba(0,0,0,.3);
		align-items      : center;
		justify-content  : center;
		display          : flex;
	}
	.puplic-card .inner{
		width            : 80vw;
		padding-bottom   : 5vw;
		border-radius    : 14px;
		font-size        : 16px;
		background-color : #fff;
		color            : #666;
		position         : relative;
	}
	
</style>
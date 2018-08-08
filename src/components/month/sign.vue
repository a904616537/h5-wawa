<template>
<div v-show="is_show" class="award" @click="onClose">
	<transition name="slide-fade" >
		<div v-show="show" class="sign-view" :style="signin">
			<div class="signin_title">签到成功</div>
			<div class="signin_desc">王国券+20</div>
		</div>
	</transition>
</div>
</template>

<script>
	export default{
		name : 'sign',
		data() {
			return {
				is_show : this.is_show,
				signin  : 'background-image:url(./static/images/vouchers/signin.png)'
			}
		},
		watch : {
			show: function(val, old) {
				if(val) this.is_show = true;
				else {
					setTimeout(() => {
						this.is_show = false;	
					}, 500);
				}
			}
		},
		props : {
			show : {
				type    : Boolean,
				default : false
			},
			onClose : {
				type    : Function,
				default : () => {}
			}
		},
		
	}
</script>

<style>
.award {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	position         : fixed;
	display          : flex;
	justify-content  : center;
	align-items      : center;
	background-color : rgba(0,0,0,0.5);
}
.sign-view{
	width               : 88vw;
	height              : 40vh;
	border-radius       : 3vw;
	display             : flex;
	align-items         : center;
	justify-content     : flex-end;
	flex-direction      : column;
	background-position : bottom;
	background-repeat   : no-repeat;
	background-size     : contain;
}
.signin_title {
	font-size     : 20px;
	margin-bottom : 1vh;
	color         : #000;
	font-weight   : bold;
}
.signin_desc {
	font-size     : 14px;
	font-weight   : bold;
	color         : #000;
	margin-bottom : 8vh;
}
</style>
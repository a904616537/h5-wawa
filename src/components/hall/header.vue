<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-08 11:20:41
* @Description
* @Flow 
-->


<template>
	<div class="header">
		<div class="header-icons">
			<div class="header-icon" :style="bonusbg" @click="onShowShare"></div>
			<v-bonus-box />
		</div>
		<div class="header-title">
			抓娃娃王国
		</div>
		<div class="header-price" @click="toPay">
			<div class="text" :style="pricebg">
				{{user.room_card}}
			</div>
		</div>
	</div>
</template>

<script>
	import Bonusbox from './bonusbox.vue';
    import {mapState, mapActions} from 'vuex';
	export default{
		name: 'hall-header',
		data() {
			return {
				pricebg    : 'background-image:url(./static/images/hall/golds_bg.png)',
				bonusbg    : 'background-image:url(./static/images/hall/share/bonusBtn.png)',
			}
		},
		props : {
			onShowShare : {
				type    : Function,
				default : () => {}
			}
		},
		components : {
			'v-bonus-box' : Bonusbox
		},
		computed : {
			...mapState({
				user : state => state.User.user || {},
			}),
		},
		methods : {
			...mapActions([
            ]),
            toPay() {
            	this.$router.push({ path : '/recharge' })
            }
        }
	}
</script>

<style>
.header {
	height           : 50px;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	flex-direction   : row;
	background-color : #f2d56e;
}
.header-icons {
	width           : 35%;
	display         : flex;
	align-items     : flex-end;
	justify-content : flex-start;
	flex-direction  : row;
	padding-left    : 8px;
}
.header-icon {
	width             : 35px;
	height            : 35px;
	background-size   : 100% 100%;
	background-repeat : no-repeat;
}
.header-title {
	width       : 30%;
	color       : #8e562a;
	font-size   : 16px;
	font-weight : 900;
}
.header-price {
	width               : 35%;
	display             : flex;
	justify-content     : flex-end;
}

.header-price .text {
	width               : 25vw;
	height              : 30px;
	color               : #fff;
	font-size           : 12px;
	line-height         : 30px;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
</style>
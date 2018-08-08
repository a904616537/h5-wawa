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
			<div>消息</div>
			<div class="header-icon" ></div>
			<div>消息</div>
		</div>
		<div class="header-title">
			抓娃娃王国
		</div>
		<div class="header-price">
			<div class="text" :style="pricebg">
				8268
			</div>
		</div>
	</div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	export default{
		name: 'hall-header',
		data() {
			return {
				pricebg : 'background-image:url(./static/images/hall/golds_bg.png)'
			}
		},
		props : {
		},
		methods : {
			...mapActions([
            ]),
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
	width : 35%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
}
.header-title {
	width : 30%;
	color : #8e562a;
	font-size: 16px;
	font-weight: 900;
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
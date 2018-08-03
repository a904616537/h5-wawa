<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-02 13:41:31
* @Description
* @Flow 
-->

<template>
<div class="popalert">
	<div class="alert">
		<div class="title">{{data.title}}</div>
		<div class="desc" v-html="data.body"></div>
		<div class="btnview">
			<div class="btn" @click="onPress">{{data.btnText}}</div>
		</div>
	</div>
</div>
</template>

<script>
	
	export default{
		name : 'first-pop-alert',
		data() {
			return {
			}
		},
		props : {
			data : {
				type    : Object,
				default : () => ({
					title   : "title",
					body    : "body",
					btnText : "btn"
				})
			},
			// 点击事件
			onPress : {
				type    : Function,
				default : () => {console.log('onPress')}
			}
		},
		computed : {

		},
		components : {
		},
		methods: {

		}
	}
</script>

<style>
.popalert {
	width           : 100vw;
	height          : 100vh;
	display         : flex;
	align-items     : center;
	justify-content : center;
	flex-direction  : column;
	background-color: rgba(0,0,0,0.4);
	position: fixed;
	top: 0;
	left: 0;
}
.popalert .alert {
	width            : 70vw;
	min-height       : 40vh;
	background-color : #fff;
	border           : 5px solid #c5a67a;
	border-radius    : 10vw;
	box-shadow       : 0 0 0 #826453, 0 3px 0 #826453, 0 -3px 0 #826453, 0 0 0 #826453;
	position         : relative;
}
.popalert .alert .title {
	font-size  : 18px;
	color      : #333;
	margin-top : 2vh;
}
.popalert .alert .desc {
	color      : #848484;
	margin-top : 2vh;
	text-align : left;
	padding    : 0 3vh 3vh;
	font-size  : 14px;
}
.popalert .alert .btnview {
	width           : 100%;
	bottom          : -30px;
	z-index         : 9999;
	position        : absolute;
	display         : flex;
	justify-content : center;
}
.popalert .alert .btn {
	height           : 30px;
	line-height      : 30px;
	padding          : 0 2em;
	border-radius    : 25px;
	border           : 2px solid #ffcb78;
	color            : #cb8c6a;
	font-weight      : bold;
	background-color : #fff;
}

</style>
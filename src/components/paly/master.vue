<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div v-show="show" class="master">
		<img :src="avatar">
		<div class="master_text">
			<div class="name">{{name}}</div>
			<div class="status">召唤宝宝中...</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key from '@/utils/pomelo_key';
	export default{
		name : 'control',
		data() {
			return {
			}
		},
		computed : {
			...mapState({
				pomelo : state => state.Pomelo.pomelo,
				master : state => state.Room.master
			}),
			name() {
				if(this.master) return decodeURI(this.master.nn);
				else return '';
			},
			avatar() {
				if(this.master)return this.master.pic == ""?'./static/images/detail/avatar_default.png' : this.master.pic;
				else return './static/images/detail/avatar_default.png';
			},
			show(){
				return this.master != null;
			}
		}
	}
</script>

<style>
.master {
	top              : 2vh;
	left             : 1vh;
	width            : 44vw;
	height           : 6vh;
	border-radius    : 3vh;
	position         : absolute;
	display          : flex;
	justify-content  : flex-start;
	align-items      : center;
	flex-direction   : row;
	background-color : rgba(0,0,0,0.6);
}
.master img{
	width         : 6vh;
	border-radius : 3vh;
	margin-right  : 1vh;
}
.master .master_text {
	font-size       : 14px;
	color           : #fff;
	display         : flex;
	align-items     : flex-start;
	justify-content : center;
	flex-direction  : column;
}
.master .master_text .status {
	font-size        : 10px;
	border-radius    : 10px;
	background-color : #FFCC0040;
	padding : 0 5px;
}
</style>
<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-09 14:39:20
* @Description
* @Flow 
-->

<template>

<transition name="fade" >
<div class="hall-share-view">
		<div class="hall-share" :style="sharebg">
			<div class="msg">已有{{invite_count}}名国民领取</div>
			<div class="desc">您已成功邀请{{httpData.length}}人，{{is_check?'获得50元红包啦!':'加油哦'}}</div>
			<div class="pople-list">

				<div v-for="(item, index) in arr" :key="index" class="pople-item" :class="{selected : item.uid}">
					<img border="0" :src="item.avatar">
					<p>{{item.nickname}}</p>
				</div>

			</div>
			<div v-if="is_check" class="share-btn check" @click="onPress('check')">领取红包</div>
			<div v-else class="share-btn" @click="onPress('share')">立即去邀请</div>
		</div>
</div>
</transition>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		name : 'hall_share',
		data() {
			return {
				default_img  : './static/images/detail/avatar_default.png',
				sharebg      : 'background-image: url(./static/images/hall/share/bg2.png);',
				httpData     : [],
				invite_count : 0,
				arr : [{
						uid : 1000,
						avatar   : './static/images/detail/avatar_default.png',
						nickname : '未邀请'
					},{
						avatar   : './static/images/detail/avatar_default.png',
						nickname : '未邀请'
					},{
						avatar   : './static/images/detail/avatar_default.png',
						nickname : '未邀请'
					},{
						avatar   : './static/images/detail/avatar_default.png',
						nickname : '未邀请'
					},{
						avatar   : './static/images/detail/avatar_default.png',
						nickname : '未邀请'
					}]
			}
		},
		props: {
			onPress : {
				type    : Function,
				default : (type) => { console.log(type)}
			}
		},
		computed : {
			...mapState({
				token : state => state.User.token,
			}),
			is_check() {
				return this.httpData.length >= 5;
			}
		},
		methods: {
			...mapActions([
			]),
			getData() {
				axios.get(Vue.setting.api + '/inviteList',{
					params : {
						token : this.token
					}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret == 0) {
						this.invite_count = result.invite_count;
						this.httpData = Array.of(result.data);
						this.arr = this.arr.map((val, index) => {
							const data = result.data.pop();
							if(data) return data;
							else return val;
						})
					}
				})
				.catch(err => {
					console.log('error', err)
				})
			}
		},
		mounted() {
			this.getData();
		}
	}
</script>

<style>
.hall-share-view {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	z-index          : 99;
	position         : fixed;
	background-color : rgba(0,0,0,0.6);
	display          : flex;
	justify-content  : center;
	align-items      : center;
}
.hall-share{
	width             : 90vw;
	height            : 40vh;
	padding-top       : 20vh;
	display           : flex;
	background-size   : contain;
	background-repeat : no-repeat;
	flex-direction    : column;
	justify-content   : flex-start;
	align-items       : center;
}
.hall-share .msg {
	color         : #999;
	font-size     : 11pt;
	margin-bottom : 4vh;
}
.hall-share .desc {
	color       : #000;
	font-size   : 9pt;
	font-weight : 900;
	margin-bottom: 2vh;
}
.hall-share .pople-list {
	display         : flex;
	flex-direction  : row;
	align-items     : center;
	justify-content : center;
}
.hall-share .pople-list .pople-item {
	
	flex            : auto;
	padding         : 0 1vw;
	display         : flex;
	margin-bottom   : 3vh;
	align-items     : center;
	justify-content : center;
	flex-direction  : column;
}
.hall-share .pople-list .pople-item img{
	width         : 15vw;
	height        : 15vw;
	border-radius : 50%;
	overflow      : hidden;
}
.hall-share .pople-list .pople-item p {
	color       : #bfbfbf;
	margin      : 0;
	font-size   : 9pt;
	font-weight : 900;
}
.hall-share .pople-list .pople-item p.selected {
	color     : #000;
}
.hall-share .share-btn {
	width            : 45vw;
	height           : 8vh;
	color            : #fff;
	font-size        : 12pt;
	font-weight      : 900;
	border-radius    : 4vh;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	background-color : #80cef4;
}
.hall-share .share-btn.check {
	background-color: #f9504a;
}
</style>
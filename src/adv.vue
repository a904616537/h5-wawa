<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-27 12:59:15
* @Description
* @Flow 
-->

<template>
	<div v-if="show" class="adv" :style="advbg">
		<div class="time" @click="onEnd">跳过 {{seconds}}</div>
	</div>
</template>

<script>
	import Vue    from 'vue';
	import axios  from 'axios';
	export default{
		name : 'addAddress',
		data() {
			return {
				timer   : null,
				show    : true,
				seconds : 2,
				img     : ''
			}
		},
		computed : {
			advbg() {
				return `background-image: url(${this.img});`
			}
		},
		methods: {
			onEnd() {
				if(this.timer) clearInterval(this.timer);
				this.show = false;
			},
			onInit() {
				this.getImageUrl(() => {
					this.timer = setInterval(() => {
						if(this.seconds > 0) this.seconds--;
						else this.onEnd();
					}, 1000)
				});
			},
			getImageUrl(next) {

				axios.get(`${Vue.setting.api}/shareImg/`, {})
				.then((response) => {
					console.log(response);
					const data = response.data;
					if(data.ret === 0 && typeof data.list === 'object') {
						this.img = data.list.img;
						if(next) next();
		            } else {
		            	if(this.timer) {
		            		clearInterval(this.timer);
		            		this.show = false;
		            	}
		            };
				})
				.catch((error) => {
					
					console.log('error', error);
				});
		    }
		},
		mounted() {
			this.onInit();
		}
	}
</script>

<style>
	.adv {
		top              : 0;
		left             : 0;
		width            : 100vw;
		height           : 100vh;
		z-index          : 999;
		position         : fixed;
		background-color : #fff;
		background-size  : cover;
	}
	.adv .time{
		top              : 8vw;
		right            : 4vw;
		width            : 65px;
		font-size        : 12px;
		line-height      : 24px;
		border-radius    : 15px;
		color            : #fff;
		text-align       : center;
		position         : absolute;
		background-color : rgba(0,0,0,0.4);
	}
</style>
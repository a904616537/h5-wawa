<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 13:24:18
* @Description
* @Flow 
-->

<template>
	<swiper
	ref="mySwiper"
	class="swiper"
	:options="swiperOption"
	@someSwiperEvent="callback">
		<swiper-slide class="slide" v-for="(item, key) in data" :key="key" :style="'background-image:url('+item.pic+')'">
		</swiper-slide>
		<!-- Optional controls -->
		<div class="swiper-pagination"  slot="pagination"></div>
	</swiper>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		name : 'v-swiper',
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOption : {
					autoplay : {
						delay                : 3000,
						stopOnLastSlide      : false,
						disableOnInteraction : true,
					},
					pagination: {
						el                : '.swiper-pagination',
						// bulletActiveClass : 'bullet-active',
					},
				},
			}
		},
		props: {
			data : {
				type    : Array,
				default : () => []
			}
		},
		methods : {
			callback(row) {
				console.log('callback', row)
			}
		},
		updated() {
			console.log('this.props.data', this.data)
		}
	}
</script>

<style>
.swiper{
	height           : 200px;
	background-color : #f4f4f4;
	border-radius    : 10px;
}
.swiper .slide {
	background-size : cover;
	width           : 100%;
	height          : 100%;
}
</style>
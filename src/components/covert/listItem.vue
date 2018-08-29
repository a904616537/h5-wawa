<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
<div class="item" @click="showMore">
	<div class="left">
		<img :src="data.gift_pic" class="img-style" />
		<div >礼物</div>
	</div>
	<div class="content">
		<div class="product">{{data.gift_name}}</div>
		<div class="status">成功</div>
	</div>
	<img :src="icon_image" class="icon-style" />
</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		name : 'shop_list_item',
		data() {
			return {
				icon_image : './static/images/shop/record/to.png',
			}
		},
		props: {
			data : {
				type    : Object,
				default : () => ({})
			}
		},
		computed : {
			...mapState({
			})
		},
		methods: {
			...mapActions([
			]),
			showMore() {
				this.$router.push({ path : '/covertMore', query : this.data })
			}
		}
	}
</script>

<style>

</style>
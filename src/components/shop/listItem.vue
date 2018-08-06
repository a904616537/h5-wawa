<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
<div class="item" @click="toItem">
	<div class="inner">
		<div class="img-style" :style="bgimage"></div>
		<div class="item-bottom">
			<div class="productName">{{data.name}}</div>
			<div class="tickets">
				<img :src="icon_image" class="icon-style" />
				{{data.voucher}}王国券
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key from '@/utils/pomelo_key';
	export default{
		name : 'shop_list_item',
		data() {
			return {
				icon_image : './static/images/shop/icon_vouchers.png',
			}
		},
		props: {
			data : {
				type    : Object,
				default : () => ({})
			},
			onPress : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
			}),
			bgimage() {
				if(this.data.imgurl && this.data.imgurl != '') return `background-image: url('${this.data.imgurl}');`;
				else return `background-image: url('./static/images/hall/cardback.png');`;
			}
		},
		methods: {
			...mapActions([
			]),

			toItem() {   // 跳转到商品详情
				this.$router.push({
					path  : '/shopItem',
					query : {gift_no : this.data.no}
				})
			},
		}
	}
</script>

<style>

</style>
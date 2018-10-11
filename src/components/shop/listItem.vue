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
				<div v-if="type === '2'" class="vip-tips">
					<div class="vip-level" :style="'background-image: url('+vip_bg+')'">VIP 10</div>
					<span style="tips-style">可兑换</span>
				</div>
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
				vip_bg     : './static/images/user/vip_bg.png',
				type       : '2'
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
	.item .tickets{
		position: relative;
	}
	.item .tickets .vip-tips{
		float: right;
		color: #b0b0b0;
		text-align: center;
		font-size: 10px;
		transform: scale(0.65);
		position: absolute;
		right: -10px;
		top: -10px;
	}
	.item .vip-tips .vip-level{
		color: #fff;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		padding: 0 10px;
		font-weight: bold;
	}
</style>
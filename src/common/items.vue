<template>
	<div class="items">
		<div class="head">
			<img class="user-head" :src="avatar"/>
			<div>{{ decodeURI(user.nickname)}}</div>
			<div>剩余包邮卡: {{wawaplayer.delivery_card_num}}</div>
		</div>
		<div class="item-box">

			<div v-for="(item, index) in wawas" class="inner" :key="index">
				<div class="card" :style="'background-image: url('+item.gift_pic+')'">
					<div class="info">
						<div class="product">{{item.gift_name}}</div>
						<div class="moment">{{fromDate(item.ltime)}}</div>
						<div v-if="item.is_delivery == 0" @click="() => onPress(index)" class="send-btn">开始配送</div>
					</div>
				</div>
			</div>

		</div>
		<v-select-address v-if="show_selected" :onPress="onSelected" :onCanel="onCanelSelected"/>
		<v-select-delivery v-if="show_delivery" :select="select" :onCanel="onCanelSelected"/>
	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';
	import vAddress  from '@/components/profile/address';
	import vDelivery from '@/components/profile/delivery';
	export default{
		name : 'wawa_items',
		data() {
			return {
				show_selected : false,
				show_delivery : false,
				select        : -1,		// 配送的礼物
			}
		},
		components : {
			'v-select-address' : vAddress,
			'v-select-delivery': vDelivery
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				wawaplayer   : state => state.User.wawaplayer,
				wawas        : state => state.User.wawas
			}),
			avatar() {
				if(this.user && this.user.avatar != '') {
					return this.user.avatar;
				} else return 'static/images/detail/avatar_default.png'
			},
		},
		methods : {
			fromDate(time) {
				return moment(time).format("YYYY.MM.DD HH:mm")
			},
			onPress(index) {
				this.select = index;
				this.show_selected = true;
			},
			onCanelSelected() {
				console.log('onCanelSelected')
				this.show_selected = false;
				this.show_delivery = false;
			},
			onSelected() {
				console.log('onSelected')
				this.show_selected = false;
				this.show_delivery = true;
			}
		},
		mounted() {
			if(!this.pomelo_login) {
				this.$router.replace('profile')
			}
		}
	}
</script>

<style>
	body{
		background-color: #fff;	
	}
	.items .head{
		padding: 30px 0 20px;
		color: #BF6A0B;
		background-color: #f2d56e;
	}
	.items .user-head{
		width: 80px;
		height: 80px;
		border-radius: 80px;
	}
	.items .item-box{
		padding: 5px;
	}
	.items .item-box:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.items .inner{
		width: 50%;
		float: left;
	}
	.items .card{
		margin: 5px;
		height: 0;
		padding-bottom: 94.53%;
		border-radius: 20px;
		border: 1px solid #f2d56e;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
	}
	.items .card .info{
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: left;
		margin-left: 10px;
		margin-bottom: 10px;
		text-shadow: 1px 1px 1px #000;
	}
	.items .card .send-btn{
		background-color: rgb(253,131,78);     /*需要更改颜色*/
		line-height: 30px;
		text-align: center;
		text-shadow: none;
		border-radius: 8px;
		width: 100px;
	}
</style>
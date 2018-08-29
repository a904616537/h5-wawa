<template>
	<div class="items">
		<v-nav>详细资料</v-nav>
		<div class="head">
			<img class="user-head" :src="detail.avatar"/>
			<div>{{detail.name}}</div>
			<div v-if="detail.is_master">剩余包邮卡: {{detail.wawaplayer.delivery_card_num}}</div>
		</div>
		<div v-if="detail.wawas.length > 0" class="item-box">
			<div v-for="(item, index) in detail.wawas" class="inner" :key="index">
				<div class="card" :style="'background-image: url('+item.gift_pic+')'">
					<div class="info">
						<div class="product">{{item.gift_name}}</div>
						<div class="moment">{{fromDate(item.ltime)}}</div>
						<div v-if="item.is_delivery == 0 && detail.is_master" @click="() => onPress(index)" class="send-btn">开始配送</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="notlist">
			<img :src="notlistbg1">
			<img :src="notlistbg2">
		</div>
		<v-select-address v-if="show_selected && detail.is_master" :onPress="onSelected" :onCanel="onCanelSelected"/>
		<v-select-delivery v-if="show_delivery && detail.is_master" :select="select" :onCanel="onCanelSelected"/>
	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';
	import vAddress   from '@/components/profile/address';
	import vDelivery  from '@/components/profile/delivery';
	import pomelo_key from '@/utils/pomelo_key';

	export default{
		name : 'wawa_items',
		data() {
			return {
				wawauser      : {},		// 查看用户
				wawalist      : [],		// 娃娃列表
				notlistbg1     : './static/images/hall/jiayou.png',
				notlistbg2     : './static/images/hall/4.png',
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
			detail() {
				if(this.wawauser.uid) {
					const avatar = this.wawauser && this.wawauser.pic != ''?this.wawauser.pic:'./static/images/detail/avatar_default.png'
					return {
						avatar,
						name       : decodeURI(this.wawauser.nn),
						user       : this.wawauser,
						wawaplayer : this.wawaplayer,
						wawas      : this.wawalist,
						is_master  : false
					}
				} else {
					const avatar = this.user && this.user.avatar != ''?this.user.avatar:'./static/images/detail/avatar_default.png'
					return {
						avatar,
						name       : decodeURI(this.user.nickname),
						user       : this.user,
						wawaplayer : this.wawaplayer,
						wawas      : this.wawas,
						is_master  : true
					}
				}	
			}
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
				this.show_selected = false;
				this.show_delivery = false;
			},
			onSelected() {
				this.show_selected = false;
				this.show_delivery = true;
			}
		},
		mounted() {
			this.wawauser = this.$route.query;
			if(this.wawauser.uid) {
				this.pomelo.request(pomelo_key.hall.user.wawalist, {uid : this.wawauser.uid}, (data) => {
					this.wawalist = data.wawas;
				})
			}
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
		padding: 20px 0;
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
		margin              : 5px;
		height              : 0;
		font-size           : 14px;
		padding-bottom      : 94.53%;
		border-radius       : 20px;
		border              : 1px solid #f2d56e;
		background-size     : cover;
		background-position : center;
		background-repeat   : no-repeat;
		position            : relative;
		color               : #fff;
		font-weight         : bold;
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
	.items .notlist{
		width           : 100%;
		height          : 70vh;
		padding-top     : 5vh;
		display         : flex;
		flex-direction  : column;
		justify-content : flex-start;
		align-items     : center;
	}
	.items .notlist img {
		width : 30%;
	}
</style>
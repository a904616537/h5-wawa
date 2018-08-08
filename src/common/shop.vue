<template>
	<div class="shop">
		<div class="tab">
			<div class="tab-list">
				<img :src="ticketsbg" class="icon-style" />
				我的王国券：<span>{{ticket}}</span>	
			</div>
			<div class="tab-list" @click="toCovert">
				<img :src="recordbg" class="icon-style" />
				兑换记录
			</div>
		</div>
		<div class="banner" @click="toTicket"></div>
		<div class="title">精选推荐</div>
		<div class="content">
			<v-item v-for="(item, index) in products" :key="index" :data="item"/>
		</div>
		<v-menu :index="2"></v-menu>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	import axios      from 'axios';
	import PubSub     from 'pubsub-js';
	import pomelo_key from '@/utils/pomelo_key';
	import VItem      from '@/components/shop/listItem';

	export default{
		name : 'shop',
		data() {
			return {
				ticketsbg : './static/images/shop/icon_vouchers.png',
				recordbg  : './static/images/shop/icon_record.png',
				task_list : []
			}
		},
		components : {
			'v-item' : VItem
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				token        : state => state.User.token,
				user         : state => state.User.user,
				products     : state => state.Shop.products,
				init         : state => state.Shop.init,
				ticket       : state => state.Vouchers.ticket
			}),
		},
		watch: {
	    	pomelo_login : function(val, oldVal) {
	    		if(val && this.pomelo) {
	    			while(this.task_list.length > 0) {
	    				const task = this.task_list.pop();
	    				this.pomelo.request(task.key, {uid : this.user.uid}, task.next);
	    			}
	    			if(!this.init) this.onInitShop();
	    		}
	    	}
	    },
		methods : {
			...mapActions([
				'initShop',
				'setTicket'
			]),
			/**
			 * [onInitShop 初始化商城数据]
			 */
			onInitShop() {
				axios.get(Vue.setting.api + '/exchange_list',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret == 0) {
						this.initShop(result)
						this.setTicket(result.ticket)
					}
				})
				.catch(err => {
					console.log('error', err)
				})
			
			},
			toTicket() {   // 跳转到兑换王国券
				this.$router.push({ path : '/ticket' })
			},
			toCovert() {   // 跳转到兑换记录
				this.$router.push({ path : '/covert' })
			}
		},
		created() {
			this.onInitShop();
			const event = {key : pomelo_key.user.get, next : (result) => {
	            if (result.code == 200) {
	            	console.log(pomelo_key.user.get, result)
	                //  执行
	                PubSub.publish(pomelo_key.user.info, result)
	            }
			}};
			if(this.pomelo) this.pomelo.request(event.key, {uid : this.user.uid}, event.next);
			else this.task_list.unshift(event);
		}
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	.shop{
		background-color: #f4f4f4;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.shop .tab{
		font-size: 12px;
		color: #afafaf;
		padding: 8px 0;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #f4f4f4;
	}
	.shop .tab{
		content: '';
		display: block;
		clear: both;
		overflow: hidden;
	}
	.shop .tab-list{
		float : left;
		width : 49.8%;
		color : #afafaf;
	}
	.shop .tab-list:first-child{
		border-right: 1px solid #999;
	}
	.shop .icon-style{
		height: 10px;
		margin-right: 4px;
	}
	.shop .tab span{
		color: #ff5854;
	}
	.shop .banner{
		background-image: url($apiurl + '/static/images/shop/adv.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top center;
		height: 0;
		padding-bottom: 28%;
		margin-top: 33px;
	}
	.shop .title{
		text-align: left;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		padding-left: 20px;
		line-height: 30px;
		background-color: #fff;
		color: #7e7e7e;  
		font-weight: bold;
		font-weight: 18px;      
	}
	.shop .content{
		padding: 5px 10px;
		margin-bottom: 70px;
	}
	.shop .content:after{
		content : '';
		display : block;
		clear   : both;
		overflow: hidden;
		height  : 0;
	}
	.shop .content .item{
		float: left;
		width: 50%;
	}
	.shop .content .inner{
		background-color: #fff;
		margin: 5px;
		border-radius: 10px;
		overflow: hidden;
	}
	.shop .item .img-style{
		background-repeat   : no-repeat;
		background-size     : cover;
		background-position : center;
		height              : 150px;
		border-radius       : 0;
	}
	.shop .item .item-bottom{
		color: #b0b0b0;
		text-align: left;
		padding: 5px 10px;
		line-height: 20px;
		font-size: 14px;
	}
	.shop .item .item-bottom .tickets{
		color: #ff5854;
		font-size: 12px;
	}
</style>
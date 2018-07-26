<template>
	<div class="profile">
		<div class="head">
			<img class="user-head" :src="avatar"/>
			<div>{{ decodeURI(user.nickname)}}</div>
			<div>{{user.uid}}</div>
		</div>
		<div class="inner">
			<div class="card">
				<div class="item">
					<label class="title">王国金币</label>
					<div class="right">
						<label class="info" style="margin-right: 70px;">{{room_card}}</label>
						<label class="info" @click="recharge">充值 ></label>
					</div>
				</div>
				<div class="item">
					<label class="title">我的物品(娃娃)</label>
					<div class="right" @click="items">
						<label class="info">数量: {{wawa_number}}</label>
						<label class="info">包邮卡: {{wawaplayer.delivery_card_num}}</label>
						<label class="info">></label>
					</div>
				</div>
				<div class="item">
					<label class="title">王国配送信息</label>
					<div class="right">
						<label class="info">等待中: {{delivery_0}}</label>
						<label class="info">运送中: {{delivery_1}}</label>
						<label class="info" @click="delivery">查看 ></label>
					</div>
				</div>
				<div class="item">
					<label class="title">收货地址</label>
					<div class="right">
						<label class="info" @click="address">管理 ></label>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="item">
					<label class="title">邀请好友</label>
					<div class="right">
						<label class="info" @click="share">添加公众号"王国服务"成为王国推...></label>
					</div>
				</div>
				<div class="item">
					<label class="title">消息</label>
					<div class="right">
						<label class="info">{{post}} ></label>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="item">
					<label class="title">音乐</label>
					<div class="right">
						<v-switch v-model="value1"></v-switch>
					</div>
				</div>
				<div class="item">
					<label class="title">客服</label>
					<div class="right">
						<label class="info">></label>
					</div>
				</div>
				<div class="item">
					<label class="title">版本号</label>
					<div class="right">
						<label class="info">1.2.5.23</label>
					</div>
				</div>
			</div>
		</div>
		<v-menu></v-menu>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import menu                               from '@/components/menu'
	import vueSwitch                          from '@/components/switch'
	import pomelo_key                         from '@/utils/pomelo_key';
	import PubSub                             from 'pubsub-js';

	export default{
		name : 'profile',
		data() {
			return {
				value1    : true,
				task_list : []		// pomelo 未链接上的时候处理队列
			}
		},

		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				wawas        : state => state.User.wawas,
				delivery     : state => state.User.delivery,
				post         : state => state.User.post.length,
				wawaplayer   : state => state.User.wawaplayer
			}),
			avatar() {
				if(this.user && this.user.avatar != '') {
					return this.user.avatar;
				} else return 'static/images/detail/avatar_default.png'
			},
			room_card() {
				const re=/(?=(?!(\b))(\d{3})+$)/g;
				if(this.user.room_card)
					return this.user.room_card.toString().replace(re,",");
				else return 0;
			},
			wawa_number() {
				return this.wawas.length;
			},
			delivery_0() {
				return this.delivery.filter(val => val.state == 0).length;
			},
			delivery_1() {
				return this.delivery.filter(val => val.state == 1).length;
			}
		},
		components : {
			'v-menu'   : menu,
			'v-switch' : vueSwitch
		},
		watch: {
	    	pomelo_login : function(val, oldVal) {
	    		if(val && this.pomelo) {
	    			while(this.task_list.length > 0) {
	    				const task = this.task_list.pop();
	    				this.pomelo.request(task.key, {uid : this.user.uid}, task.next);
	    			}
	    		}
	    	}
	    },
		methods : {
			recharge() {
				this.$router.push({ path : '/recharge' })
			},
			items() {
				this.$router.push({ path : '/items' })
			},
			address() {
				this.$router.push({ path : '/address' })
			},
			share() {
				this.$router.push({ path : '/share' })
			},
			delivery() {
				this.$router.push({ path : '/delivery' })
			}
		},
		mounted() {
			const event = {key : pomelo_key.user.get, next : (result) => {
	            if (result.code == 200) {
	            	console.log(pomelo_key.user.get, result)
	                //  执行
	                PubSub.publish(pomelo_key.user.info, result)
	            }
			}};

			if(this.pomelo) this.pomelo.request(event.key, event.next);
			else this.task_list.unshift(event);
		}
	}
</script>

<style>
	.profile{
		background-color: #f2d56e;	
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.profile .head{
		margin: 20px 0;
		color: #BF6A0B;
	}
	.profile .user-head{
		width: 80px;
		height: 80px;
		border-radius: 80px;
	}
	.profile .inner{
		margin-bottom : 80px;
	}
	.profile .card{
		background-color: #fff;
		margin: 10px 8px;
		text-align: left;
		border-radius: 20px;
		padding: 10px 20px;
		line-height: 36px;
	}
	.profile .card .item:not(:last-child){
		border-bottom: 1px solid #eee;
	}
	.profile .card .right{
		float: right;
	}
	.profile .card .info{
		color: #999;
		font-size: 12px;
		margin-left: 10px;
	}
</style>
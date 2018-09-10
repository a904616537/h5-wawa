<template>
	<div class="profile">
		<div class="head">
			<img class="user-head" :src="avatar"/>
			<div>{{ decodeURI(user.nickname)}}</div>
			<div>{{user.uid}}</div>
		</div>
		<div class="inner">
			<div class="card">
				<a  target="_blank" :href="downloadurl"  class="item" style="color: #8e562a;">
					<label class="title"><i class="iconfont icon-download"></i>下载APP</label>
					<div class="right">
						<label class="info" style="margin-right: 70px;color: #8e562a;"></label>
						<label class="info"  style="color: #8e562a;">免费领娃娃 ></label>
					</div>
				</a>
				<div class="item"  @click="recharge">
					
					<label class="title"><i class="iconfont icon-coin"></i>王国金币</label>
					<div class="right">
						<label class="info" style="margin-right: 70px;">{{room_card}}</label>
						<label class="info">充值 ></label>
					</div>
				</div>
				<div class="item" @click="items">
					<label class="title"><i class="iconfont icon-liwu"></i>我的物品(娃娃)</label>
					<div class="right">
						<label class="info">数量: {{wawa_number}}</label>
						<label class="info">包邮卡: {{delivery_card_num}}</label>
						<label class="info">></label>
					</div>
				</div>
				<div class="item"  @click="toDelivery">
					
					<label class="title"><i class="iconfont icon-wuliuqiache2"></i>王国配送信息</label>
					<div class="right">
						<label class="info">等待中: {{delivery_0}}</label>
						<label class="info">运送中: {{delivery_1}}</label>
						<label class="info">查看 ></label>
					</div>
				</div>
				<div class="item" @click="address">

					<label class="title"><i class="iconfont icon-12"></i>收货地址</label>
					<div class="right">
						<label class="info">管理 ></label>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="item" @click="share">
					<label class="title"><i class="iconfont icon-share"></i>邀请好友</label>
					<div class="right">
						<div class="info">添加公众号"王国服务"成为王国推送员</div>
					</div>
					<label class="right info">></label>
				</div>
				<div class="item">
					<label class="title"><i class="iconfont icon-xiaoxi"></i>消息</label>
					<div class="right">
						<label class="info">{{post}} ></label>
					</div>
				</div>
			</div>
			<div class="card">
				<div class="item">
					<label class="title"><i class="iconfont icon-yinle"></i>音乐</label>
					<div class="right">
						<v-switch v-model="offPlayer" :onPress="controlPlater"></v-switch>
					</div>
				</div>
				<div class="item" @click="service">
					<label class="title"><i class="iconfont icon-wenti"></i>客服</label>
					<div class="right">
						<label class="info">></label>
					</div>
				</div>
				<div class="item">
					<label class="title"><i class="iconfont icon-gengduomore12"></i>版本号</label>
					<div class="right">
						<label class="info">1.2.5.23</label>
					</div>
				</div>
			</div>
		</div>
		<v-menu :index="3"></v-menu>
		<div class="service" v-show="isShow" @click="service">
			<div class="service-inner">
				请添加微信客服zhuawawa1314
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import moment                             from 'moment';
	import PubSub                             from 'pubsub-js';
	import menu                               from '@/components/menu'
	import vueSwitch                          from '@/components/switch'
	import pomelo_key                         from '@/utils/pomelo_key';

	export default{
		name : 'profile',
		data() {
			return {
				value1    : true,
				task_list : [],		// pomelo 未链接上的时候处理队列
				isShow    : false
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
				postcard     : state => state.User.postcard,
				wawaplayer   : state => state.User.wawaplayer,
				offPlayer    : state => {
					let is_off = state.User.offPlayer;
					return is_off.toString() == 'true'
				}
			}),
			avatar() {
				if(this.user && this.user.avatar != '') {
					return this.user.avatar;
				} else return './static/images/detail/avatar_default.png'
			},
			room_card() {
				const re=/(?=(?!(\b))(\d{3})+$)/g;
				if(this.user.room_card)
					return this.user.room_card.toString().replace(re,",");
				else return 0;
			},
			delivery_card_num() {
		        // const delivery_card_num = this.postcard.filter(card => {
		        //     const endTime    = moment(card.expire_time)
		        //     const outtime    = moment().isBefore(endTime);
		        //     return card.is_used == 0 && outtime;
		        // }).length;
		        const delivery_card_num = this.postcard.length;
		        return delivery_card_num;
			},
			wawa_number() {
				// return this.wawas.filter(val => val.is_delivery == 0 && val.isExchange == 0).length;
				return this.wawas.length;
			},
			delivery_0() {
				return this.delivery.filter(val => val.state == 0).length;
			},
			delivery_1() {
				return this.delivery.filter(val => val.state == 1).length;
			},
			downloadurl() {
				const u = navigator.userAgent;
				const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				return isiOS?'https://itunes.apple.com/app/id1344635762':'http://c.waguo.net/apps/wawa-1.2.1-wawa.apk';
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
			...mapActions([
                'controlPlater',
            ]),
			recharge() {
				this.$router.push({ path : '/recharge' })
			},
			items() {
				this.$router.push({ path : '/goods' })
			},
			address() {
				this.$router.push({ path : '/address' })
			},
			share() {
				this.$router.push({ path : '/share' })
			},
			toDelivery() {
				this.$router.push({ path : '/delivery' })
			},
			service() {
				this.isShow = !this.isShow
			}
		},
		mounted() {
			if(!this.pomelo_login) this.$router.replace('/')
			const event = {key : pomelo_key.user.get, next : (result) => {
	            if (result.code == 200) {
	                //  执行
	                PubSub.publish(pomelo_key.user.info, result)
	            }
			}};
			if(this.pomelo) this.pomelo.request(event.key, {uid : this.user.uid}, event.next);
			else this.task_list.unshift(event);
		}
	}
</script>

<style>
	.profile{
		top              : 0;
		left             : 0;
		right            : 0;
		margin-bottom    : 8vh;
		position         : absolute;
		background-color : #f2d56e;	
	}
	.profile .head{
		margin : 20px 0;
		color  : #BF6A0B;
	}
	.profile .user-head{
		width         : 80px;
		height        : 80px;
		border-radius : 80px;
	}
	.profile .inner{
		margin-bottom : 80px;
	}
	.profile .card{
		margin           : 10px 8px;
		text-align       : left;
		border-radius    : 20px;
		padding          : 10px 20px;
		line-height      : 36px;
		background-color : #fff;
	}
	.profile .card .item .title {
		flex      : auto;
		font-size : 10pt;
		min-width : 25vw;
	}
	.profile .card .item .title i{
		color: #8e562a;
		margin-right: 1vw;
	}
	.profile .card .item:not(:last-child){
		border-bottom : 1px solid #eee;
		display       : flex;
		align-items   : center;
	}
	.profile .card .right{
		float: right;
	}
	.profile .card .info{
		color         : #999;
		font-size     : 12px;
		margin-left   : 2vw;
		overflow      : hidden;
		text-overflow : ellipsis;
		white-space   : nowrap;
		max-width     : 50vw;
	}
	.service{
		top              : 0;
		left             : 0;
		right            : 0;
		height           : 100%;
		display          : flex;
		position         : fixed;
		align-items      : center;
		justify-content  : center;
		background-color : rgba(0,0,0,.2);
		
	}
	.service .service-inner{
		width            : 300px;
		padding          : 50px 10px;
		margin           : 70% auto;
		border-radius    : 14px;
		background-color : #fff;
	}
</style>
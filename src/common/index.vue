<template>
	<div class="index">
		<v-barrage ref="barrage"/>
		<v-header :onShowShare="() => show_share = true"/>
		<div class="main">
			<v-swiper :data="banners" :onPress="onClickBanner"/>
			<v-tabs :data="category" :onScroll="onScroll"/>
			
			<div v-if="pomelo_login" class="list-box" :style="{ marginTop: marginTop }">

				<div v-for="(item, index) in hallRooms" class="list-item" @click="play(item)">
					<div class="inner">
						<div class="img-style" :style="'background-image : url('+item.gift_pic+');'"></div>
						<div class="item-content">
							<h4>{{item.gift_name}}</h4>
							<div class="item-bottom">
								<div class="price bottom-style">{{item.gold_price}} 币/次</div>
								<div class="status bottom-style" v-if="item.status == 1"><div class="radius"></div>空闲中</div>
								<div class="status-nofree" v-else><div class="radius-nofree"></div>召唤中</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-else class="list-box">
				<div class="refresh">
					<img :src="refresh">
					<div>断线重连中，请稍后...</div>
				</div>
			</div>
			<v-daily-bonus />
			<v-menu :index="0"></v-menu>
			<div class="float-icon" @click="sign">
				<img src="static/images/monthtosign/sign_icon.png" alt="" class="icon-style">
			</div>
		</div>
		<!-- 邀请分享 -->
		<v-share v-if="show_share" :onPress="onShare" :onClose="() => {show_share=false}"/>
		<!-- 领取分享奖励 -->
		<v-check-invite v-if="show_check" :onPress="onShare"/>
		<!-- 领取宝箱奖励 -->
		<v-bonusbox v-if="open_box" />
		<v-new-user-bonus/>
	</div>	
</template>

<script>
	import Pubsub     from 'pubsub-js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	import Swiper       from '@/components/swiper'
	import Barrage      from '@/components/barrage'
	import Tabs         from '@/components/hall/tabs'
	import DailyBonus   from '@/components/hall/dailyBonus'
	import NewUserBonus from '@/components/hall/newUserBonus'
	import Header       from '@/components/hall/header'
	import Share        from '@/components/hall/share'
	import CheckInvite  from '@/components/hall/checkInvite'
	import BonusboxView from '@/components/hall/bonusboxView'
	
	export default{
		name: 'index',
		data() {
			return {
				refresh    : './static/images/connection.png',
				free       : false,
				show_share : false,
				show_check : false,
				isFixed    : false
			}
		},
		components : {
			'v-swiper'         : Swiper,
			'v-tabs'           : Tabs,
			'v-daily-bonus'    : DailyBonus,
			'v-header'         : Header,
			'v-share'          : Share,
			'v-check-invite'   : CheckInvite,
			'v-barrage'        : Barrage,
			'v-bonusbox'       : BonusboxView,
			'v-new-user-bonus' : NewUserBonus,
			
		},
		computed : {
			...mapState({
				banner       : state => state.Hall.banners,
				wawaplayer   : state => state.User.wawaplayer,
				open_box     : state => state.Hall.open_box,
				category     : state => state.Hall.category,
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
			}),
			...mapGetters([
				'hallRooms',
			]),
			marginTop() {
				if(this.isFixed) {
					return '6vh'
				} else return 0;
			},
			banners() {
				let banners = this.banner.map(val => {
					val.onPress = () => {};
					return val;
				});
				if(this.wawaplayer.recharge == 0) {
					console.log('没有首充，应该加入首充广告', banners)
					banners.unshift({
						name    : '首充',
						pic     : './static/images/activity/firstpay/wawwjad.png',
						onPress : () => {
							this.$router.push({path : '/payintro'})
						}
					});
				}
				return banners;
			}
		},
		methods : {
			...mapActions([
				'setStatus',
			]),
			onScroll(isFixed) {
				this.isFixed = isFixed;
			},
			play(room) {
				if(room.status === 0) {
					alert('系统升级中，请等待。。。')
					return;
				}
				this.$router.push({path : '/play', query : room})
			},
			sign() {
				this.$router.push({path : '/sign'})
			},
			onShare(type) {
				this.show_share = false;
				this.show_check = false;
				setTimeout(() => {
					if(!type || type == 'share') this.$router.push({path : '/share'});
					else this.show_check = true;
				}, 300);
			},
			sendBarrage(key, msg) {
				if ( msg.giftNum > 0){
					const room = this.hallRooms.find(val => val.gsid);
					if(room && room != undefined ) {
						let nRoomID = ( msg.gsid.split( '_' ) )[ 2 ];
	                    let strMsg = `${decodeURIComponent( msg.master.nn )}:在${nRoomID}号房间抓到了个${room.gift_name}恭喜恭喜！`;
	                    Pubsub.publish('barrage', {text : strMsg, color : 0, type : 'HALL'});
					}
	            }
			},
			onClickBanner(index) {
				const banner = this.banners[index];
				if(banner.onPress) banner.onPress();
			}
		},
		mounted() {
			Pubsub.subscribe('hall.room.update', this.setStatus);
			// 监听抓到娃娃, 发送大厅弹幕
			PubSub.subscribe('hall.room.success', this.sendBarrage);
		}
	}
</script>


<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	
	.index{
		color            : #2c3e50;
		overflow         : hidden;
		background-color : #f3f0e3;
	}
	.index .main {
		padding: 8px;
	}
	.index .refresh {
		margin-top: 20vh;
	}
	.index .refresh img{
    	width: 10vw;
	}
	.list-box{
		margin: 0px -5px;
		margin-bottom: 80px;
		color: #BF6A0B;
		font-size: 14px;
	}
	.list-item{
		width         : 50%;
		float         : left;
		overflow      : hidden;
		font-size     : 14px;
		margin-bottom : 10px;
		text-align    : left;
	}
	.list-box:after,.item-bottom:after{
		clear    : both;
		height   : 0;
		content  : '.';
		display  : block;
		overflow : hidden;
	}
	.list-item .inner{
		margin           : 0 5px;
		border-radius    : 5px;
		background-color : #fff;
	}
	.img-style{
		height              : 24vh;
		border-radius       : 5px;
		background-repeat   : no-repeat;
		background-size     : cover;
		background-position : top center;
	}
	.item-content{
		padding: 5px 7px;
		color: #BF6A0B;
		h4 {
			white-space   : nowrap;
			text-overflow : ellipsis;
			overflow      : hidden;
		}
	}
	.list-item .item-bottom{
		font-size: 12px;
		margin-bottom: 10px;
	}
	.item-bottom .price{
		float: left;
	}
	.item-bottom .status{
		float: right;
		color: #B7E549;
	}
	.item-bottom .radius{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #B7E549;
		display: inline-block;
	}
	.item-bottom .status-nofree{
		float: right;
		color: #D5443D;
	}
	.item-bottom .radius-nofree{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #D5443D;
		display: inline-block;
	}
	.index .float-icon{
		position: fixed;
		right: 0;
		top: 65%;
		background-color: #fff;
		width: 40px;
		height: 40px;
		border-radius: 50px;
		border: 1px solid #ccc;
	}
	.index .float-icon .icon-style{
		width: 30px;
		height: 30px;
		margin-top: 3px;
	}
</style>
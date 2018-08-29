<template>
	<div class="index">
		<v-header />
		<div class="main">
			<v-swiper :data="banner"/>
			<v-tabs :data="category" />
			
			<div v-if="pomelo_login" class="list-box">

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
	</div>	
</template>

<script>
	import Pubsub     from 'pubsub-js'
	import {mapState, mapGetters, mapActions} from 'vuex'
	import Swiper     from '@/components/swiper'
	import Tabs       from '@/components/hall/tabs'
	import DailyBonus from '@/components/hall/dailyBonus'
	import Header     from '@/components/hall/header'
	
	export default{
		name: 'index',
		data() {
			return {
				refresh : './static/images/connection.png',
				free    : false
			}
		},
		components : {
			'v-swiper'      : Swiper,
			'v-tabs'        : Tabs,
			'v-daily-bonus' : DailyBonus,
			'v-header'      : Header
		},
		computed : {
			...mapState({
				banner       : state => state.Hall.banners,
				category     : state => state.Hall.category,
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
			}),
			...mapGetters([
				'hallRooms',
			])
		},
		methods : {
			...mapActions([
				'setStatus',
			]),
			play(room) {
				if(room.status === 0) {
					alert('系统升级中，请等待。。。')
					return;
				}
				this.$router.push({path : '/play', query : room})
			},
			sign() {
				this.$router.push({path : '/sign'})
			}
		},
		mounted() {
			Pubsub.subscribe('hall.room.update', this.setStatus)
		}
	}
</script>


<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	
	.index{
	    color: #2c3e50;
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
		background-image    : url($apiurl + '/static/images/hall/cardback.png');
	}
	.item-content{
		padding: 5px 7px;
		color: #BF6A0B;
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
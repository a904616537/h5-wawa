<template>
	<div class="index">
		<div>
			<v-swiper :data="banner"/>
			<v-tabs :data="category" />
			
			<div class="list-box">

				<div v-for="(item, index) in hallRooms" class="list-item" @click="play">
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
			<v-menu></v-menu>
		</div>
	</div>	
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import Menu   from '@/components/menu'
	import Swiper from '@/components/swiper'
	import Tabs   from '@/components/hall/tabs'
	
	export default{
		name: 'index',
		data() {
			return {
				free: false
			}
		},
		components : {
			'v-menu'   : Menu,
			'v-swiper' : Swiper,
			'v-tabs'   : Tabs
		},
		computed : {
			...mapState({
				banner   : state => state.Hall.banners,
				category : state => state.Hall.category
			}),
			...mapGetters([
				'hallRooms'
			])
		},
		methods : {
			play() {
				this.$router.push({path : '/play'})
			}
		},
		created() {
		}
	}
</script>

<style>
	body{
	  	background-color : #f3f0e3;
	}
	.index{
		padding: 8px;
	    color: #2c3e50;
      	background-color : #f3f0e3;
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
		background-image    : url('/static/images/hall/cardback.png');
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

</style>
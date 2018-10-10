<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div class="playhead">
		<div class="toback" @click="toBack">
			<icon name="back" :w="20" :h="20"></icon>
		</div>
		
		<div class="float-left">
			<div class="product-img" @click="click" :style="'background-image:url('+(room.gift_pic?room.gift_pic:default_img)+')'"></div>
			<div class="info">
				<div>{{count}}人</div>
				<div class="font-style">在<span>{{gsid}}</span>号机</div>
			</div>
		</div>
		<div class="float-right" style="flex: auto;">
			<div
			v-for="(item, index) in player_user"
			:key="index"
			class="user-img"
			:style="'background-image:url('+(item.pic?item.pic:default_img)+')'"
			@click="toInfo(item)">
				<div v-if="type === '2'" class="vip-icon" :style="'background-image:url('+vip_icon+')'">{{level}}</div>
			</div>
		</div>
		<div class="float-right" @click="onFeedback">
			<img :src="feedback" class="feedback">
		</div>
	</div>
</template>

<script>
	export default{
		name : 'playhead',
		data() {
			return {
				default_img : './static/images/detail/avatar_default.png',
				feedback    : './static/images/detail/reportBtnn.png',
				vip_icon    : './static/images/user/vip1.png',
				level       : '2',
				type        : '2'
			}
		},
		props: {
			count   : 0,
			players : {
				type    : Array,
				default : () => []
			},
			room : {
				type    : Object,
				default : () => ({})
			},
			click: {
				type: Function,
				default : () => {console.log('click')}
			},
			toBack : {
				type : Function,
				default : () => {console.log('toback')}
			}
		},
		computed : {
			player_user() {
				return this.players.slice(0, 3);
			},
			gsid() {
				if(this.room && this.room.gsid) return this.room.gsid.split('_')[2];
				else return '';
			}
		},
		methods : {
			toInfo(player) {
				this.$router.push({path : '/items', query : player});
			},
			onFeedback() {
				this.$router.push({path : '/playlog', query : {gsid : this.room.gsid}});
			}
		}	
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	.playhead{
		margin-bottom   : 10px;
		display         : flex;
		flex-direction  : row;
		justify-content : flex-start;
		align-items     : center;
	}
	.playhead .toback{
		margin-right: 10px;
	}
	.playhead:after{
		content  : '';
		display  : block;
		clear    : both;
		height   : 0;
		overflow : hidden;
	}
	.playhead .product-img{
		width               : 50px;
		background-color    : #f4f4f4;
		background-size     : cover;
		background-repeat   : no-repeat;
		background-position : center center;
		background-image    : url($apiurl + '/static/images/hall/cardback.png');
		display             : inline-block;
	}
	.playhead .info{
		display     : inline-block;
		font-size   : 12px;
		padding     : 2px 1vw;
		font-weight : bold;
	}
	.playhead .font-style{
		font-weight: 200;
		span {
			font-weight : bold;
		}
	}
	.playhead .float-left{
		display: flex;
		overflow: hidden;
		justify-content: center;
		align-content: center;
		border-radius: 10px;
		background-color: #FFFFAE66;
	}
	.playhead .float-right{
		margin-left: 5px;
		display: flex;
	}
	.playhead .user-img{
		width: 30px;
		height: 30px;
		display: inline-block;
		background-color: #f4f4f4;
		border-radius: 50%;
		margin: 0 5px;
		border: 2px solid #FFFFAE66;
		background-size: cover;
		position: relative;
	}
	.playhead .feedback {
		width : 25px;
		height : 30px;
	}
	// vip 
	.playhead .vip-icon{
		background-size: contain;
		background-repeat: no-repeat;
		background-position: bottom;
		position: absolute;
		bottom: -3px;
		left: 0;
		right: 0;
	}
</style>
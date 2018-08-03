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
			<icon name="back" :w="30" :h="30"></icon>
		</div>
		
		<div class="float-left">
			<div class="product-img" @click="click" :style="'background-image:url('+(room.gift_pic?room.gift_pic:default_img)+')'"></div>
			<div class="info">
				<div>{{count}}人</div>
				<div class="font-style">在{{gsid}}号机</div>
			</div>
		</div>
		<div class="float-right">
			<div v-for="(item, index) in player_user" :key="index" class="user-img" :style="'background-image:url('+(item.pic?item.pic:default_img)+')'">
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name : 'playhead',
		data() {
			return {
				default_img : './static/images/detail/avatar_default.png'
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
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
	.playhead{
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.playhead .toback{
		margin-right: 10px;
	}
	.playhead:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.playhead .product-img{
		width               : 58px;
		background-color    : #f4f4f4;
		background-size     : cover;
		background-repeat   : no-repeat;
		background-position : center center;
		background-image    : url($apiurl + '/static/images/hall/cardback.png');
		display             : inline-block;
	}
	.playhead .info{
		display: inline-block;
		font-size: 12px;
		padding: 2px 15px;
		font-weight: bold;
	}
	.playhead .font-style{
		font-weight: 200;
	}
	.playhead .float-left{
		/*float: left;*/
		display: flex;
		overflow: hidden;
		justify-content: center;
		align-content: center;
		border-radius: 10px;
		background-color: #FFFFAE66;   /*需要更改背景颜色*/
		/*color: # ;*/
	}
	.playhead .float-right{
		/*float: left;*/
		margin-left: 5px;
		display: flex;
	}
	.playhead .user-img{
		width: 36px;
		height: 36px;
		display: inline-block;
		background-color: #f4f4f4;
		border-radius: 50%;
		margin: 0 5px;
		border: 2px solid #FFFFAE66;   /*需要更改颜色*/
		background-size: cover;
	}
</style>
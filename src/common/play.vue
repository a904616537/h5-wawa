<template>
	<div class="play">
		<v-headbar :click="productInfo"></v-headbar>
		<div class="video">
			<div class="view-user">
				
			</div>
			<div class="view-top">
				<div class="top-bg" @click="productInfo">
					<icon name="icon_wawa_detail" :w="40" :h="40"></icon>
				</div>
				<div class="top-bg" @click="recordInfo">
					<icon name="icon_rank_list" :w="40" :h="40"></icon>
				</div>
			</div>
			<div class="view-bottom">
				<div class="shot">
					<icon name="changeCamera" :w="30" :h="30"></icon>
				</div>
			</div>
			<img src="/static/images/hall/2.png" class="default-img"/>
		</div>
		<div class="bottom">
			<div class="coins item-btn">
				<div class="text">本次{{count}}币</div>
				<div class="text">余额{{all}}币</div>
				<div class="recharge-btn">+去充币</div>
			</div>
			<div class="item-btn">
				<icon name="play_start_btn" :w="180" :h="70"></icon>
			</div>
			<div class="item-btn">
				<icon name="change_machine" :w="70" :h="70"></icon>
			</div>
		</div>
		<v-info v-if="show" :click="closeProductInfo"></v-info>	
		<v-record v-if="isShow" :click="closeRecord"></v-record>	
	</div>
</template>

<script>
	import Vue from 'vue'
	import headbar from '@/components/playhead'
	import productInfo from '@/components/productInfo'
	import record from '@/components/record'

	export default{
		name: 'play',
		data() {
			return {
				count  : 25,
				all    : 1000,
				show   : false,
				isShow : false
			}
		},
		components : {
			'v-headbar' : headbar,
			'v-info'    : productInfo,
			'v-record'  : record
		},
		methods: {
			productInfo() {
				this.show = !this.show
			},
			closeProductInfo() {
				this.show = false
			},
			recordInfo() {
				this.isShow = !this.isShow
			},
			closeRecord() {
				this.isShow = false
			}

		}
	}
</script>

<style>
	body{
		background-color: #f2d56e;
	}
	.play{
		padding: 8px;
		background-color: #f2d56e;
		font-size: 12px;
	}
	.play .video{
		width: 100%;
		height: 65vh;
		border-radius: 10px;
		background-color: #f4f4f4;
		background-position: top center;
		background-size: cover;
		background-image: url('/static/images/hall/videoback.jpg');
	}
	.play .video .default-img{
		width: 150px;
		margin: 0 auto;
		position: absolute;
		top: 30%;
		left: 30%;
	}
	.play .view-top{
		position: absolute;
		right: 0;
		margin-right: 10px;
	}
	.play .view-top .top-bg{
		margin: 10px;
	}
	.play .view-bottom{
		background-color: #f2d56e;
		margin-top: 35vh;
		padding: 5px;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		float: right;
	}
	.play .bottom{
		margin-top: 20px;
		padding: 0 10px;
	}
	.play .bottom .item-btn{
		display: inline-block;
	}
	.play .bottom .coins{
		text-align: left;
		float: left;
		line-height: 20px;
	}
	.play .bottom .recharge-btn{
		background-color: brown;   /*需要更换颜色*/
		color: #fff;
		font-weight: bold;
		text-align: center;
		border-radius: 10px;
		padding: 0 14px;
	}
	.play .bottom .item-btn:last-child{
		float: right;
	}
</style>
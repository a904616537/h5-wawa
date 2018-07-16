<template>
	<div class="play">
		<v-headbar></v-headbar>
		<div class="video"></div>
		<div class="float-view">
			<div class="view-top">
				<div class="info top-bg">
					<icon name="icon_wawa_detail" :w="25" :h="25"></icon>
				</div>
				<div class="record top-bg">
					<icon name="icon_rank_list" :w="25" :h="25"></icon>
				</div>
			</div>
			<div class="view-bottom">
				<div class="shot">
					<icon name="changeCamera" :w="25" :h="25"></icon>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="item item-s">
				<div class="text">本次{{count}}币</div>
				<div class="text">余额{{all}}币</div>
				<div class="recharge-btn">+去充币</div>
			</div>
			<div class="item item-m">
				<icon name="play_start_btn" :w="200" :h="50"></icon>
			</div>
			<div class="item">
				<icon name="change_machine" :w="50" :h="50"></icon>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import headbar from '@/components/navbar'

	export default{
		name: 'play',
		data() {
			return {
				count : 25,
				all : 1000
			}
		},
		components : {
			'v-headbar' : headbar
		}
	}
</script>

<style>
	.play{
		padding: 8px;
		background-color: #f2d56e;
	}
	.play .video{
		width: 100%;
		height: 80vh;
		border-radius: 10px;
		background-color: #f4f4f4;
	}
	.play .float-view{
		position: absolute;
		right: 0;
		top: 0;
		font-size: 12px;
	}
	.play .float-view .view-bottom{
		background-color: #f2d56e;
		position: relative;
		top: 50%;
	}
	.play .bottom{
		width: 100%;
		margin-top: 20px;
	}
	.play .bottom:after{
		content: '';
		display: table;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.play .bottom .item{
		float: left;
		font-size: 12px;
	}
	.play .bottom .item-s{
		width: 25%;
		text-align: left;
		background-color: red;
	}
	.play .bottom .item-m{
		width: 60%;

	}
</style>
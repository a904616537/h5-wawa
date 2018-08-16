<template>
	<div class="playlog">
		<v-nav>您的近期记录</v-nav>
		<div class="playlogs">

			<div class="item">
				<img :src="item.gift_pic">
				<div class="info">
					<p class="title">{{item.gift_name}}</p>
					<span>{{moment(item.ltime)}}</span>
				</div>
				<div class="status" :class="{select : !item.gift_num == 0}">{{onStatus(item)}}</div>
			</div>
			<div class="item">
				<div class="info text">召唤记录ID</div>
				<div class="text">{{item.lid}}</div>
			</div>
			<div class="item line" @click="toReport">
				<div class="info text">如上机过程中遇到问题请点击申诉按钮进行反馈</div>
				<div class="btn">我要申诉</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue    from 'vue';
	import moment from 'moment';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	import axios from 'axios';

	export default{
		name : 'playlog',
		data() {
			return {
				item : {}
			}
		},
		computed : {
			...mapState({

			}),
		},
		components : {
		},
		methods : {
			...mapActions([
			]),
		    onStatus(item) {
		    	return item.gift_num == 0?'抓取失败':`抓到${item.gift_num}个`;
		    },
		    moment(date) {
		    	return moment(date).format('YYYY-MM-DD HH:mm:ss');
		    },
		    toReport() {
		    	this.$router.push({path : '/playlogreport', query : {...this.item}});
		    }
		},
		mounted() {
			if(this.$route.query.hasOwnProperty('lid')) {
				this.item = this.$route.query;
			} else this.$router.back();
		}
	}
</script>

<style>
.playlogs .item .text {
	font-size   : 9pt;
	color       : #666;
	font-weight : 600;
}
.playlogs .item.line {
	margin-top: 2vh;
}
.playlogs .item .btn {
	color            : #fff;
	width            : 18vw;
	height           : 4vh;
	font-size        : 10pt;
	line-height      : 4vh;
	border-radius    : 2vh;
	background-color : #EE9900;
}
</style>
<template>
	<div class="playlog">
		<v-nav>您的近期记录</v-nav>
		<div class="playlogs">

			<div v-for="(item, index) in list" :key="index" class="item" @click="toInfo(item)">
				<img :src="item.gift_pic">
				<div class="info">
					<p class="title">{{item.gift_name}}</p>
					<span>{{moment(item.ltime)}}</span>
				</div>
				<div class="status" :class="{select : !item.gift_num == 0}">{{onStatus(item)}}<span class="fa fa-angle-right"></span></div>
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

	export default{
		name : 'playlog',
		data() {
			return {
				list : []
			}
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				token        : state => state.User.token,
				user         : state => state.User.user
			}),
		},
		components : {
		},
		methods : {
			...mapActions([
				'onVouchersInit'
			]),
			getMyPlaylog() {
				this.pomelo.request("hall.g.getMyPlayLog", {uid : this.user.uid, gsid : this.$route.query.gsid}, (data) => {
					console.log('获取游戏日志', data)
					if(data.code == 200) {
						this.list = data.msg;
					}
				});
		    },
		    onStatus(item) {
		    	return item.gift_num == 0?'抓取失败':`抓到${item.gift_num}个`;
		    },
		    moment(date) {
		    	return moment(date).format('YYYY-MM-DD HH:mm:ss');
		    },
		    toInfo(item) {
		    	this.$router.push({path : '/playloginfo', query : {...item}});
		    }
		},
		mounted() {
			if(this.pomelo_login && this.$route.query.gsid) this.getMyPlaylog();
			else this.$router.back();
		}
	}
</script>

<style>

.playlogs .item {
	padding          : 3vw;
	background-color : #fff;
	display          : flex;
	align-items      : center;
	flex-direction   : row;
	justify-content  : flex-start;
	border-bottom    : 0.5px solid #ddd;
}
.playlogs .item img {
	width  : 12vw;
	height : 12vw;
}
.playlogs .item .info {
	flex       : auto;
	text-align : left;
	margin-left: 2vw;
}
.playlogs .item .info p {
	margin      : 0;
	color       : #000;
	font-weight : bold;
	font-size   : 12pt;
}
.playlogs .item .info span{
	font-size : 10pt;
	color     : #aaa;
}
.playlogs .item .status {
	display     : flex;
	align-items : center;
	font-size   : 10pt;
	font-weight : 900;
	color       : #FF3333;
}
.playlogs .item .status.select {
	color       : #339933;
}
.playlogs .item .status span{
	margin-left: 2vw;
	font-size : 16pt;
	color     : #aaa;
}
</style>
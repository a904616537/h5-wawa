<template>
	<div class="play">
		<v-headbar :players="players" :count="players.length" :room="current_room" :click="productInfo" :toBack="toBack"></v-headbar>
		<div class="video">
			<div class="view-user">
				
			</div>
			<div class="view-top">
				<div class="top-bg"  @click="productInfo">
					<div class="icon detail"></div>
				</div>
				<div class="top-bg" @click="recordInfo">
					<div class="icon rank"></div>
				</div>
			</div>
			<div class="view-bottom">
				<div class="shot">
					<icon name="changeCamera" :w="30" :h="30"></icon>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="coins item-btn">
				<div class="text">本次{{current_room.gold_price}}币</div>
				<div class="text">余额{{user.room_card}}币</div>
				<div class="recharge-btn">+去充币</div>
			</div>
			<div class="item-btn">
				<div class="ibutton playstart"></div>
			</div>
			<div class="item-btn">
				<div class="ibutton change_machine"></div>
			</div>
		</div>
		<v-info v-if="show" :click="closeProductInfo"></v-info>	
		<v-record v-if="isShow" :click="closeRecord"></v-record>	
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapState, mapGetters, mapActions} from 'vuex'
	import headbar     from '@/components/paly/playhead'
	import productInfo from '@/components/paly/productInfo'
	import record      from '@/components/record'

	export default{
		name: 'play',
		data() {
			return {
				playerOptions : {
					muted         : true,
					language: 'zh-CN',
					sources       : [{
						type            : "rtmp/mp4",
						src             : 'rtmp://21509.liveplay.myqcloud.com/live/21509_1_63a',
						withCredentials : false
					}],
					live: true,
					autoplay: true,
					height: 150,
					poster        : "/static/images/hall/2.png",
				},
				players      : [],		// 房间游戏参与者
				top_rank     : [],		// 房间游戏排名
				drop_rank    : [],		// 排名下降？？？？
				chats        : [],		// 历史聊天消息
				master_queue : [], 		// 排队抓娃娃
				duration     : 0,		// 持续时间
				roundtime    : 0,		// 倒计时
				show         : false,
				isShow       : false,
				task_list    : []		// pomelo 未链接上的时候处理队列
			}
		},
		props : {
			data : {
				type    : Object,
				default : () => ({})
			}
		},
		components : {
			'v-headbar' : headbar,
			'v-info'    : productInfo,
			'v-record'  : record
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				rooms        : state => state.Hall.rooms,
				current_room : state => state.Room.current_room
			})
		},
		watch: {
			rooms : function(val, oldVal) {
				// 房间被加载后处理
				if(oldVal.length == 0) {
					this.setRoom({gsid : this.data.gsid});
				}
			},
	    	pomelo_login : function(val, oldVal) {
	    		if(val && this.pomelo) {
	    			while(this.task_list.length > 0) {
	    				const task = this.task_list.pop();
	    				console.log('消息处理', task);
	    				this.pomelo.request(task.key, {gsid : task.value}, task.next);
	    			}
	    		}
	    	}
	    },
		methods: {
			...mapActions([
				'setRoom'
			]),
			toBack() {
				this.$router.back();
			},
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
		},
		mounted() {
			if(this.rooms.length > 0) this.setRoom({gsid : this.data.gsid});
			// 向服务器发送加入房间消息
			const event = {key : 'hall.user.joinRoom', value : this.data.gsid, next : (result) => {
				if(result.code == 500) {
					this.$router.back();
					return;
				}
				let {master, players, status, masterQueue, dropRank, topRank, chats, duration,roundtime} = result;
				this.master       = master;
				this.players      = players;
				this.status       = status;
				this.master_queue = masterQueue;
				this.drop_rank    = dropRank;
				this.top_rank     = topRank;
				this.chats        = chats;
				this.duration     = duration;
				this.roundtime    = roundtime;
			}};
			if(this.pomelo) this.pomelo.request(event.key, {gsid : event.value}, event.next);
			else this.task_list.unshift(event);
		}
	}
</script>

<style>
	.play{
		padding: 8px;
		background-color: #f2d56e;
		font-size: 12px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 100%;
	}
	.play .video{
		width: 100%;
		height: 65vh;
		border-radius: 10px;
		background-color: #f4f4f4;
		background-position: center;
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
	.play .icon {
		width           : 10vw;
		height          : 10vw;
		background-size : 100% 100%;
	}
	.play .icon.rank {
		background-image: url(/static/images/hall/videoplay/icon_rank_list.png);
	}
	.play .icon.detail {
		background-image: url(/static/images/hall/videoplay/icon_wawa_detail.png);
	}
	/*游戏按钮*/
	.play .ibutton {
		width           : 45vw;
		height          : 18vw;
		background-size : 100% 100%;
	}
	/*开始*/
	.play .ibutton.playstart{
		background-image: url(/static/images/hall/videoplay/play_start_btn.png);
	}
	/*预约*/
	.play .ibutton .play_start_queue_btn{
		background-image: url(/static/images/hall/videoplay/play_start_queue_btn.png);
	}
	/*取消预约*/
	.play .ibutton .play_cancel_queue_btn{
		background-image: url(/static/images/hall/videoplay/play_cancel_queue_btn.png);
	}
	/*稍等*/
	.play .ibutton .play_state_waiting_btn{
		background-image: url(/static/images/hall/videoplay/play_state_waiting_btn.png);
	}
	.play .ibutton.change_machine{
		background-image: url(/static/images/hall/videoplay/change_machine.png);
		width: 18vw;
		height: 18vw;
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
		margin-top  : 20px;
		display     : flex;
		align-items : center;
		justify-content: center;
	}
	.play .bottom .item-btn{
		display: inline-block;
	}
	.play .bottom .coins{
		margin      : 0 5px;
		line-height : 20px;
		color       : #8e562a;
		text-align  : left;
	}
	.play .bottom .recharge-btn{
		background-color : #8e562a;   /*需要更换颜色*/
		color            : #fff;
		font-weight      : bold;
		text-align       : center;
		border-radius    : 10px;
		padding          : 0 14px;
	}
	.play .bottom .item-btn:last-child{
		margin : 0 5px;
	}
</style>
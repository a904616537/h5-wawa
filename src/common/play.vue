<template>
	<div class="play">
		<v-headbar :players="players" :count="players.length" :room="current_room" :click="productInfo" :toBack="toBack"></v-headbar>
		
		<div class="video">
			<div  v-if="!show_video" class="videoload"></div>
			<!-- <v-video v-show="show_video && !show_top" :src="video_left" :onReloadEnd="onReloadEnd"/>
			<v-video v-show="show_video && show_top" :src="video_top"/> -->
			<v-gpack :show="show_video && !show_top" :index="0" :src="video_left" :onReloadEnd="onReloadEnd"/>
			<v-gpack :show="show_video && show_top" :index="1" :src="video_top"/>

			<v-master />
			<v-seconds ref="seconds" :show="start_paly" :maxSec="roundtime" :duration="duration" :onEnd="onClaw"/>

			<div class="view-top">
				<div class="top-bg"  @click="productInfo">
					<div class="icon detail"></div>
				</div>
				<div class="top-bg" @click="recordInfo">
					<div class="icon rank"></div>
				</div>
			</div>
			<div class="view-bottom">
				<div class="shot" @click="onSwitch">
					<icon name="changeCamera" :w="30" :h="30"></icon>
				</div>
			</div>
			<div class="view-bottom chatsbtn">
				<div class="shot" @click="onChats">
					<icon name="chat" :w="30" :h="30"></icon>
				</div>
			</div>

			<!-- 玩家聊天 -->
			<div class="chats">
				<div v-for="(item, index) in chats_list" :key="index" class="chats-item">
					<div class="chat">{{decodeURIComponent(item.nn)}}:<span>{{decodeURIComponent(item.msg)}}</span></div>
				</div>
			</div>
		</div>
		<div v-if="!start_paly" class="bottom">
			<div class="coins item-btn">
				<div class="text">本次{{current_room.gold_price}}币</div>
				<div class="text">余额{{user.room_card}}币</div>
				<div class="recharge-btn" @click="onToPay">+去充币</div>
			</div>
			<div class="item-btn">
				<v-button :onPress="onPress" :btn="btn_status"/>
			</div>
			<div class="item-btn">
				<div class="ibutton change_machine" :class="machine_class" @click="changeMachine"></div>
			</div>
		</div>
		<div class="bottom" v-if="start_paly">
			<v-control :onOver="onOver"/>
		</div>
		
		<v-barrage ref="barrage" type="PLAY"/>
		<v-info v-if="show" :click="closeProductInfo"></v-info>
		<v-record v-if="isShow" :data="topRank" :click="closeRecord"></v-record>
		<v-success v-show="show_success" :data="gift_data" :onPress="onPlay" :onCancel="onCancel"/>
		<v-failure v-show="show_fail" :data="gift_data" :onCancel="onCancel" :onToPay="onToPay" :onPress="onPlay"/>
		
		<input style="opacity: 0;" id="chats" maxlength="20" type="text" v-model.trim="chat" @change="onSubmitChat"/>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import {mapState, mapGetters, mapActions} from 'vuex'
	import Pubsub from 'pubsub-js';
	import Barrage     from '@/components/barrage'
	import headbar     from '@/components/paly/playhead'
	import productInfo from '@/components/paly/productInfo'
	import seconds     from '@/components/paly/seconds'
	import vMaster     from '@/components/paly/master'
	import video       from '@/components/paly/video'
	import vGpack      from '@/components/paly/gpack'
	import vButton     from '@/components/paly/playButton'
	import vControl    from '@/components/paly/control'
	import vSuccess    from '@/components/paly/success'
	import vFailure    from '@/components/paly/failure'
	import record      from '@/components/record'

	import pomelo_key, {RoomEnterState, ControlBtnStatus, RoomStatus} from '@/utils/pomelo_key';

	export default{
		name: 'play',
		data() {
			return {
				show_input   : false,
				chat         : '',		// 玩家聊天输入内容
				top_rank     : [],		// 房间游戏排名
				drop_rank    : [],		// 排名下降？？？？
				chats        : [],		// 历史聊天消息
				master_queue : [], 		// 排队抓娃娃
				duration     : 0,		// 持续时间
				roundtime    : 0,		// 倒计时
				play_fail    : PubSub.subscribe('hall.room.failure', this.onFail),
				play_success : PubSub.subscribe('hall.room.success', this.onSuccess),
				onPress      : () => {},
				gift_data     : {},
				show_fail    : false,	// 抓取失败界面
				show_success : false,	// 抓取成功
				show         : false,
				start_paly   : false,
				isShow       : false,
				show_video   : true,	// 显示视频
				show_top     : false,	// 显示顶部视频
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
			'v-record'  : record,
			'v-seconds' : seconds,
			'v-video'   : video,
			'v-gpack'   : vGpack,
			'v-button'  : vButton,
			'v-control' : vControl,
			'v-master'  : vMaster,
			'v-success' : vSuccess,
			'v-failure' : vFailure,
			'v-barrage' : Barrage
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				rooms        : state => state.Hall.rooms,
				current_room : state => state.Room.current_room,
				queue        : state => state.Room.queue,
				master       : state => state.Room.master,
				players      : state => state.Room.players,
				topRank      : state => state.Room.top_rank,
				// chats        : state => state.Room.chats	// 聊天内容
			}),
			chats_list() {
				return this.chats.slice(0, 3);
			},
			machine_class() {
				return {
					machine: this.btn_status == 'play_state_waiting_btn' || this.btn_status == 'play_cancel_queue_btn'
				}
			},
			video_left() {
				if(this.current_room.videos) {
					return this.current_room.videos[0];
				} else return '';
			},
			video_top() {
				if(this.current_room.videos) {
					return this.current_room.videos[1];
				} else return '';
			},
			// 控制按钮状态
			btn_status() {
				let now_btn="play_start_btn";
				this.onPress = this.onPlay;

				if(this.pomelo_login) {
					// 检查队列, 和房间状态
					if(this.current_room.status == RoomStatus.STATUS_IDLE && this.master && this.master.uid == this.user.uid) {
						now_btn = "play_state_waiting_btn";
						this.onPress = () => {}
					} else if ( this.queue.length > 0 ){
					    now_btn = "play_start_queue_btn";
					    this.onPress = this.onQueueGame;
					    if ( this.queue.includes( this.user.uid ) ){
					        now_btn = "play_cancel_queue_btn";
					        this.onPress = this.onCancleQueue;
					    }
					} else if ( this.master && this.master.uid != this.user.uid ){
						this.onPress = this.onQueueGame;
					    now_btn = "play_start_queue_btn";
					}
				}
				
				return now_btn;
			}
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
	    	},
	    	data : function(val, oldVal) {
	    		if(val != oldVal) {
	    			this.show_video = false;
	    			console.log('房间切换了', val)
	    			this.onInit();
	    		}
	    	}
	    },
		methods: {
			...mapActions([
				'setRoom',
				'setMaster'
			]),
			// 取消
			onCancel() {
				this.show_fail    = false;
				this.show_success = false;
				this.onCancleQueue();
			},
			onToPay() {
				// 前往充值页
				this.$router.push('recharge')
			},
			// 没有抓到娃娃
			onFail(msg, data) {
				// const text = `${decodeURIComponent(data.master.nn)}:未抓到娃娃，继续努力哦！`;
	   //          Pubsub.publish('barrage', {text, color : 0});
				if(data.master.uid == this.user.uid) {
					this.gift_data = data;
					this.show_fail = true;
				}
			},
			// 抓到娃娃
			onSuccess(msg, data) {
				// const text = `${decodeURIComponent(data.master.nn)}:抓到了娃娃，恭喜恭喜！`;
	   //          Pubsub.publish('barrage', {text, color : 0});

				// 判断是不是自己
				if(data.master.uid == this.user.uid) {
					this.gift_data = data;
					this.show_success = true;
				}
			},
			// 抓取结束了
			onOver() {
				this.start_paly = false;
				this.$refs.seconds.stop();
			},
			// 切换摄像头
			onSwitch() {
				console.log('切换摄像头')
				this.show_top = !this.show_top;
			},
			// 换一台
			changeMachine(){
				let gsid = this.current_room.gsid;
				let len  = this.rooms.length;
				let i    = 0;
		        if ( len > 2 ){
		            while ( gsid == this.current_room.gsid ) {
		                i = Math.floor( Math.random() * len );
		                gsid = this.rooms[ i ].gsid;
		            }
		        }
		        if ( gsid != this.current_room.gsid ){
		        	this.$router.replace({path : '/play', query : this.rooms[i]})
		        }
		    },
			/**
			 * [onPlay 立即开始按钮事件处理]
			 */
			onPlay() {
				console.log('立即开始按钮')
				this.show_fail    = false;
				this.show_success = false;

				const obj={
					gsid    : this.current_room.gsid,
					is_new  : 1,
					is_new2 : 1
				};
				this.pomelo.request(pomelo_key.room.play.start, obj, this.startResult)
			},
			// 排队抓娃娃
			onQueueGame() {
				const obj={cmd:"queuegame",gsid: this.current_room.gsid,is_new:1,is_new2:1};
		        console.log('发送我要排队抓', obj)
		        this.pomelo.request(pomelo_key.room.play.custom, obj, this.startResult);
			},
			// 取消排队
			onCancleQueue() {
				const obj={cmd:"cancelnow",gsid: this.current_room.gsid,is_new:1,is_new2:1};
		        console.log('发送取消队列', obj)
		        this.pomelo.request(pomelo_key.room.play.custom, obj);
			},
			// 开始游戏前验证
			startResult(data) {
				console.log('开始游戏前验证', data)
		        if (data.code != 200) {

		            if (data.hasOwnProperty("rel")) {
		            	switch (data.rel) {
			                case RoomEnterState.ENTER_WRONG_ALREADY_IN_QUEUE:
			                	alert('已经在队列');
			                	console.log('data', data)
			                    //已经在队列
			                    // let {masterQueue}=data;
			                    // pc.views.control.setState({masterQueue});
			                    break;
			                case RoomEnterState.ENTER_WRONG_SERVER_NOT_FOUNDL:
			                    alert("尚未进入房间");
			                    break;
			                case RoomEnterState.ENTER_WRONG_GOLDS_LITTLE:
			                    alert("金币不足哦");
			                    break;
			                case RoomEnterState.ENTER_WRONG_OTHER_PLAYING:
			                    alert("有其他国民正在活动中，请稍候");
			                    break;

			                case RoomEnterState.ENTER_WRONG_OTHER_MAY_PLAY:
			                    alert("小李飞刀么，这么快，没抢到位置:(");
			                    break;

			                case RoomEnterState.ENTER_WRONG_GSID:
			                    alert("房间信息错误");
			                    //重载房间信息?断线重连？
			                    break;
			            }
			            return;
			        }
		        }
		        // 验证通过， 加载玩家信息，启动计时器
		        if(data.master&&data.hasOwnProperty("duration")){
					this.start_paly = true;
					this.roundtime  = data.roundtime*1000;
					this.duration   = data.duration;
		        }
			},
			/**
			 * [onClaw 游戏结束]
			 */
			onClaw() {
				this.start_paly = false;
				this.pomelo.request(pomelo_key.room.play.s, {c: "claw"});
			},
			// 视频加载结束
			onReloadEnd() {
				this.show_video = true;
			},
			toBack() {
				this.onClaw();
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
			},
			onChats() {
				this.show_input = true;
				document.getElementById('chats').focus();
			},
			onSubmitChat(e) {
				if(this.chat=="")return;
				this.chat = this.chat.replace(/\d{4,14}|wx|w.*x|微.*信|坑|松|欺|骗|邀请|卡/ig,"*");
				const msg = encodeURIComponent(this.chat);
				const model = {msg, bubble:-1};

				this.chats.unshift({
					msg : msg,
					nn  : this.user.nickname,
					uid : this.user.uid
				});
				this.chat = '';
				this.pomelo.request('hall.user.chat', model);

			},
			onInit() {
				if(this.rooms.length > 0) this.setRoom({gsid : this.data.gsid});
				// 向服务器发送加入房间消息
				const event = {key : pomelo_key.hall.user.joinRoom, value : this.data.gsid, next : (result) => {
					if(result.code == 500) {
						this.$router.back();
						return;
					}
					this.setMaster(result)
					this.chats = result.chats.reverse();
				}};
				if(this.pomelo) this.pomelo.request(event.key, {gsid : event.value}, event.next);
				else this.task_list.unshift(event);
			}

		},
		mounted() {
            wx.hideAllNonBaseMenuItem();
			this.onInit();
		}
	}
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';

	.play{
		padding          : 8px;
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : #f2d56e;
	}
	.play .video{
		width               : 100%;
		height              : 70vh;
		border-radius       : 10px;
		background-color    : #f4f4f4;
		background-position : center;
		background-size     : cover;
		display             : flex;
		align-items         : center;
		justify-content     : center;
		overflow            : hidden;
		background-image    : url($apiurl + '/static/images/hall/videoback.jpg');
		position: relative;

		.chats{
			position   : absolute;
			left       : 0;
			bottom     : 0;
			text-align : left;

			.chats-item {
				font-size        : 9pt;
				color            : #f9da39;
				width            : 35vw;
				line-height      : 3.5vh;
				margin           : 1vh;
				border-radius    : 2vh;
				background-color : #00000022;
				span {
					color       : #fff;
					margin-left : 1vw;
				}
			}
		}
	}
	.play .video .videoload {
		width            : 30vw;
		height           : 30vw;
		background-size  : 100% 100%;
		background-image : url($apiurl + '/static/images/hall/1.png');
	}
	.play .video .view-user {
		
	}
	.play .video .default-img{
		width    : 150px;
		top      : 30%;
		left     : 30%;
		margin   : 0 auto;
		position : absolute;
	}
	.play .icon {
		width           : 10vw;
		height          : 10vw;
		background-size : 100% 100%;
	}
	.play .icon.rank {
		background-image: url($apiurl + '/static/images/hall/videoplay/icon_rank_list.png');
	}
	.play .icon.detail {
		background-image: url($apiurl + '/static/images/hall/videoplay/icon_wawa_detail.png');
	}
	.play .machine {
		opacity: 0;
	}

	.play .view-top{
		top      : 0;
		right    : 0;
		position : absolute;
	}
	.play .view-top .top-bg{
		margin: 10px;
	}
	.play .view-bottom{
		position                  : absolute;
		top                       : 30vh;
		right                     : 0;
		padding                   : 5px;
		border-top-left-radius    : 50%;
		border-bottom-left-radius : 50%;
		background-color          : #f2d56e;
		
	}
	.play .view-bottom.chatsbtn {
		top : 36vh;
	}
	.play .bottom{
		margin-top      : 2vh;
		display         : flex;
		align-items     : center;
		justify-content : center;
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
<template>
<div class="inner">
	<div class="board-view">
		<div v-for="(item, index) in week" :key="index" class="board">
			<div class="board_icon" :style="'background-image : url('+item+')'"></div>
		</div>
		
		<div v-for="(item, index) in _keyboard" :key="`keyboard_${index}`" class="board">
			<div v-if="item && isToday(item) && item.is_filter" :style="'background-image : url('+today+')'" class="board_img"></div>
			<div v-else-if="item && item.is_filter" :style="'background-image : url('+hook+')'" class="board_img"></div>
			<div v-else-if="!item || item.disabled">{{moment(item)}}</div>
			<div v-else :style="'background-image : url('+mend+')'" class="board_img" @click="() => onPress(item)"></div>
		</div>
	</div>
	<div class="board-more" v-if="hideAll" @click="hideAll=false">
		<div class="board-more-icon" :style="'background-image : url('+more_icon+')'"></div>
	</div>

	<v-sign :show="show_sign" :onClose="() => show_sign = false" />
	<v-dialog width="80%" class="dialog"/>
</div>
</template>

<script>
	import Vue    from 'vue';
	import axios  from 'axios';
	import moment from 'moment';
	import sign   from '@/components/month/sign'
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'

	export default{
		name : 'calendar',
		data() {
			return {
				hideAll   : true,
				show_sign : false,
				is_sign   : true,
				today: './static/images/monthtosign/selected.png',
				hook : './static/images/monthtosign/hook.png',
				mend : './static/images/monthtosign/mend.png',
				more_icon : './static/images/monthtosign/arrow-down.png',
				week : [
					'./static/images/monthtosign/sun.png',		//sun
					'./static/images/monthtosign/one.png',		//one
					'./static/images/monthtosign/two.png',		//two
					'./static/images/monthtosign/three.png',	//three
					'./static/images/monthtosign/four.png',		//four
					'./static/images/monthtosign/five.png',		//five
					'./static/images/monthtosign/six.png',		//six
				]
			}
		},
		components : {
			'v-sign' : sign
		},
		computed : {
			...mapState({
				keyboard : state => state.MonthtoSign.keyboard,
				token    : state => state.User.token,
				lucky_draw_count : state => state.LuckyDraw.lucky_draw_count,
			}),
			_keyboard() {
				const today      = Number(moment().format('D'));
		        const weektoyear = moment().week();
		        
		        // 筛选最近两周的日期显示
		        const arr = this.hideAll?this.keyboard.filter(val => {
		            const date   = val?val.date:moment().startOf('month');
		            const toweek = date.week();
		            if(today < 14) return toweek === weektoyear || toweek === (weektoyear - 1);
		            else return toweek === weektoyear || toweek === (weektoyear + 1);
		        }) : this.keyboard;

		        return arr;
			}
		},
		props : {
			onAddDraw : {
				type    : Function,
				default : () => {console.log('有抽奖')}
			}
		},
		methods : {
			...mapActions([
				'signMonth',
				'onObtain',
				'onSupplement'
			]),
			isToday(data) {
				const today = moment(data.date).isSame(moment(), 'days');

				// 今日没有签到，自动签到
				if(this.is_sign && today && !data.is_filter) {
					this.is_sign = false;
					this._onDateChange(data.date);
				}
				return today;
			},
			moment(data) {
				if(data) return data.date.format('D');
				else return '';
			},
			momentFormat(date) {
		        if(typeof date === 'string') date = moment(date);
		        return date.clone().format('YYYY-MM-DD');
		    },
		    onPress(date) {
		    	this.$modal.show('dialog', {
					title   : '确认补签',
					text    : '补签需花费80王国券',
					buttons : [
						{
							title   : '确定',
							handler : () => {
								this._onSupplement(date)
								this.$modal.hide('dialog');
							}
						}, { title: '取消' }
					]
				})
		    },
		    onRequest(time, next) {

		        axios.get(Vue.setting.api + '/month_bonus',{
					params : {
						token : this.token,
						day   : moment(time).format('YYYYMMDD')
					}
				})
				.then(result => result.data)
				.then(result => {
					console.log('签到反馈', result)
					if(result.ret === 1) {
						//  王国券不足
                		this.$modal.show('dialog', {
							title   : result.msg,
							text    : '可通过签到或抓娃娃来获得哦！',
							buttons : [
								{ title: '我不去' },
								{
									title   : '前往抓娃娃',
									handler : () => {
										this.$router.push({ path : '/' })
										this.$modal.hide('dialog');
									}
								}
							]
						})
						return;
					} else {
						if(next) next();
					}
				})
				.catch(err => {
					console.log('签到反馈 error', err)
				})
		    },
		    _onAnim() {
		    	
		    },
		    // 签到处理
		    _onDateChange(time) {
		    	console.log('签到处理', time)

		    	const model = {
		    		type        : '签到',
					time        : time,
					text        : '日常签到',
					running     : 'income',
					signin_type : 'general'
			    }
			    // 执行网络请求
			    this.onRequest(time, async () => {
			    	this.show_sign = true;
			    	// 新增王国券
			    	await this.onObtain(model);
			    	// 前端签到
			    	await this.signMonth({time, next : (result) => {
			    		// 有抽奖
			    		if(result.status) {
			    			this.onAddDraw(result.count);
			    		}
			    	}});
			    });
		    },
		    // 补签
		    _onSupplement(data) {
				const time = this.momentFormat(data.date);
				this.onRequest(time, () => {
					// 补签
                    this.onSupplement({vouchers_number : 80, next : async (result) => {
                    	if(result && result.status) {
                    		// 签到
                    		let _sign_result = null;
                    		await this.signMonth({time, next : (result) => _sign_result = result});
            				if(_sign_result && _sign_result.status) {
            					console.log('触发奖励事件')
                                // 连签奖励
                                const data = {
                                    type        : '连签奖励',
                                    time        : time,
                                    text        : '连签奖励',
                                    running     : 'income',
                                    signin_type : 'award'
                                }
                                this.onObtain(data);
                                this.onAddDraw(_sign_result.count);
            				} else {
            					const data = {
                                    type        : '签到',
                                    time        : time,
                                    text        : '日常签到',
                                    running     : 'income',
                                    signin_type : 'general'
                                }
                                this.onObtain(data);
            				}

	                    } else {
                    		//  王国券不足
                    		this.$modal.show('dialog', {
								title   : '王国券不足',
								text    : '可通过签到或抓娃娃来获得哦！',
								buttons : [
									{ title: '我不去' },
									{
										title   : '前往抓娃娃',
										handler : () => {
											this.$router.push({ path : '/' })
											this.$modal.hide('dialog');
										}
									}
								]
							})
                    	}
	                }})
				});
		    }
		}
	}
</script>

<style>
.board-view {
	width           : 100%;
	display         : flex;
	flex-direction  : row;
	flex-wrap       : wrap;
	align-items     : center;
	justify-content : flex-start;
}
.board {
	width           : 8vw;
	height          : 5vw;
	margin          : 1vw;
	display         : flex;
	align-items     : center;
	justify-content : center;
}
.board_icon {
	width               : 3.5vw;
	height              : 3.5vw;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
.board_img {
	width               : 4vw;
	height              : 4vw;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
.board-more {
	width           : 100%;
	margin          : 1vw 0;
	display         : flex;
	align-items     : center;
	justify-content : center;
}
.board-more-icon {
	width               : 4vw;
	height              : 4vw;
	background-size     : contain;
	background-position : center;
	background-repeat   : no-repeat;
}
.dialog {
	color : #333;
}
</style>
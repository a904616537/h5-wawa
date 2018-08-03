<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 14:21:13
* @Description
* @Flow 
-->

<template>
	<div v-show="show" class="bonus-list">
		<div class="bonus">
			<div class="bonus_view">
				<div class="bonus_list">
					<div v-for="(item, index) in items" :key="index" class="bonus_item" :class="{select : item.bonus_state == 1}">
						<div class="day">第<span>{{index + 1}}</span>天</div>
						<img :src="coin(item, index)">
						<div class="bonu">{{item.bonus}}币</div>
						<img v-if="item.bonus_state == 1" class="hook" :src="hook">
					</div>
				</div>
				<div class="firstday">您已经连续签到{{firstBonusDay}}天</div>
			</div>
			<div class="bonus_btn_view">
				<div class="bonus_btn" :class="{select : got}" @click="onClick">{{got?'领取奖励' : '关闭'}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
    import {mapState, mapActions} from 'vuex';
	export default{
		name: 'daily-bonus',
		data() {
			return {
				httpData      : null,
				show          : false,
				hook          : './static/images/hall/dailyBonus/ok.png'
			}
		},
		computed : {
			...mapState({
				pomelo        : state => state.Pomelo.pomelo,
				pomelo_login  : state => state.Pomelo.login,
				user          : state => state.User.user || {},
				token         : state => state.User.token,
			}),
			items() {
				return this.httpData?this.httpData.config : [];
			},
			got() {
				if(this.httpData) return this.httpData.has_got == 0
				else return false;
			},
			firstBonusDay() {
				return this.items.filter(val => val.bonus_state == 1).length
			}
		},
		methods : {
			...mapActions([
            ]),
            coin(item, index) {
            	if(item.bonus_state == 0) return './static/images/hall/dailyBonus/coin_b.png';
            	else return './static/images/hall/dailyBonus/coin.png'
            },
			onClick() {
				if(this.got) {
					this.getBonus();
				} else {
					this.show = false;
				}
			},
			getBonus() {
				axios.get(Vue.setting.api + '/daily_bonus',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('result', result)
	                if(result.ret == 0){
						let bonus             = this.httpData.config[this.firstBonusDay];
						bonus.bonus           = result.bonus;
						bonus.bonus_state     = 1;
						this.httpData.has_got = 1;
	                }
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			getData() {
				axios.get(Vue.setting.api + '/daily_config',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret==0) {
	                    this.httpData = result.data;
	                }
	                
	                if(this.httpData!=null
	                    &&this.httpData.has_got==0
	                    // &&this.httpData.has_got==1
	                    &&this.overlayHandler==null) {console.log('show', this.httpData.has_got)
	                	this.show = true;
	                }
				})
				.catch(err => {
					console.log('error', err)
				})
		    }
        },
        mounted() {
        	this.getData();
        }
	}
</script>

<style lang="scss">
$apiurl: 'http://waguo.vip/h5/wawa';
.bonus-list {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	position         : fixed;
	background-color : rgba(0,0,0,0.4);
	display          : flex;
	align-items      : center;
	justify-content  : center;
	z-index          : 100;
}

.bonus-list .bonus {
	width           : 90vw;
	border-radius   : 10px;
	display         : flex;
	overflow        : hidden;
	justify-content : center;
	align-items     : center;
	flex-direction  : column;
}
.bonus-list .bonus_view {
	display           : flex;
	justify-content   : center;
	align-items       : center;
	flex-direction    : column;
	background-size   : 100%;
	background-repeat : no-repeat;
	background-image  : url($apiurl + '/static/images/hall/dailyBonus/bg.png');
}
.bonus-list .bonus_list {
	margin-top      : 12vh;
	display         : flex;
	flex-direction  : row;
	flex-wrap       : wrap;
	justify-content : center;
}
.bonus-list .bonus_item {
	border          : 1px solid #d7d7d7;
	padding         : 5px;
	width           : 15%;
	height          : 10vh;
	margin          : 8px;
	border-radius   : 5px;
	display         : flex;
	color           : #9e9e9e;
	justify-content : center;
	align-items     : center;
	flex-direction  : column;
	position        : relative;
}
.bonus-list .bonus_item .day{
	font-size : 12px;
}
.bonus-list .bonus_item .day span{
	font-size   : 18px;
	font-weight : 500;
}
.bonus-list .bonus_item img{
	width  : 30px;
}
.bonus-list .bonus_item .hook {
	bottom   : 0;
	right    : -3vw;
	width    : 7vw;
	height   : 7vw;
	position : absolute;
}
.bonus-list .bonus_item .bonu {
	font-size : 12px;
	font-weight : 700;
}
.bonus-list .bonus_item.select {
	color : #efb948;
	border-color : #efb948;
	.bonu {
		color : #d99152
	}
}
.bonus-list .firstday {
	width            : 50vw;
	height           : 25px;
	margin           : 10px 0;
	font-weight      : 900;
	font-size        : 14px;
	line-height      : 25px;
	background-color : #ffe820;
}
.bonus-list .bonus_btn_view {
	width            : 100%;
	display          : flex;
	justify-content  : center;
	background-color : #fff;
}
.bonus-list .bonus_btn {
	width            : 50%;
	height           : 50px;
	font-size        : 18px;
	font-weight      : 800;
	margin-bottom    : 20px;
	border-radius    : 25px;
	color            : #fff;
	background-color : #aaa;
	display          : flex;
	justify-content  : center;
	align-items      : center;
}
.bonus-list .bonus_btn.select {
	background-color : #f9504a
}
</style>
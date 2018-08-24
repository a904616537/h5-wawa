<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 14:21:13
* @Description
* @Flow 
-->

<template>
	<div v-show="show" class="newuser-view">
		<div class="cover"></div>
		<div v-if="show_result" class="result">
			<div class="np-result">
				<img :src="np_title">
				<div class="bonus-bg" style="width: 60vw;">
					<div class="bonus-view">
						<div class="content">
							<p>获得新人大礼包<span>{{result.bonus}}</span>王国币</p>
							<p class="desc">获取礼包</p>
							<div class="btn" @click="show_result = false">知道了</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="show_gift && !show_result" class="newuser-gift">
			<div class="gift-view">
				<div class="giftbg active" :style="gift_light"></div>
				<img :src="gift_img" style="width : 60%;">
			</div>
			<div class="giftbtn" :style="btn_bg" @click="onShow"></div>
			
		</div>
		<div v-else-if="!show_result" class="bonusnew">
			<img :src="title_img" class="bonus-title">
			<div class="bonus-bg">
				<div class="bonus-view">
					<div class="content">
						<div class="msg">
							<p class="text">{{logNow}}</p>
						</div>


						<div class="list">
							<div v-for="(item, index) in data.config" :key="index" class="item active">
								<div class="coin" :style="bonus_img.get(item.bonus_state)">
									<span style="color: #ffe84b;">{{item.bonus}}币</span>
									<span :style="onStateColor(item.bonus_state)">第{{days.get(item.num)}}天</span>
								</div>
							</div>
						</div>

						<img class="bonus-btn" :src="btn_img.get(data.has_got)" @click="getBonus">
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
    import {mapState, mapActions} from 'vuex';


	export default{
		name: 'daily-new-user-bonus',
		data() {
			return {
				data : {
					has_got : 1,
					config  : []
				},
				msglist : [
					'hahduiwehiwuid',
					'ryiegf ygyusdc ervhiure',
					'epofhegfygefhuwgyfg',
				],
				days : new Map([
					[1, '一'],
					[2, '二'],
					[3, '三'],
					[4, '四'],
					[5, '五'],
				]),
				bonus_img : new Map([
					[0, 'background-image:url(./static/images/hall/dailyBonus/st_0.png)'],
					[1, 'background-image:url(./static/images/hall/dailyBonus/st_1.png)'],
					[2, 'background-image:url(./static/images/hall/dailyBonus/st_2.png)']
				]),
				btn_img : new Map([
					[0, './static/images/hall/dailyBonus/btn1.png'],
					[1, './static/images/hall/dailyBonus/btn2.png']
				]),
				show        : false,
				result      : {},
				show_result : false,
				show_gift   : true,
				logNow      : '',
				log         : [],
				sti         : null,
				np_title    : './static/images/hall/dailyBonus/np_title.png',
				title_img   : './static/images/hall/dailyBonus/np_bonus_title.png',
				gift_img    : './static/images/hall/dailyBonus/np_gift_gift.png',
				gift_light  : 'background-image:url(./static/images/hall/dailyBonus/np_gift_light_bg.png);',
				btn_bg      : 'background-image:url(./static/images/hall/dailyBonus/np_btn.png);'
			}
		},
		computed : {
			...mapState({
				pomelo        : state => state.Pomelo.pomelo,
				pomelo_login  : state => state.Pomelo.login,
				user          : state => state.User.user || {},
				token         : state => state.User.token,
			}),
			firstBonusDay(){
				const index = this.data.config.findIndex(val => val.bonus_state == 0);
				console.log('当前新人签到的天数下标', index)
				return index;
			}
		},
		methods : {
			...mapActions([
				'setShowNewState'
            ]),
            onStateColor(state) {
            	return state == 0?'color : #fff;' : 'color : #d29a6d';
            },
            onShow() {
            	this.show_gift = false;
            },
            onLogs() {
				if(this.log.length>0){
					this.sti = setInterval(() => this.randomLog(),2990);
					this.randomLog()
				}
            },
            randomLog(){
		        let i = this.log.indexOf(this.logNow);
		        let n = i;
		        while(n == i){
		            n = Math.floor(Math.random() * this.log.length);
		        }
		        this.logNow = this.log[n]
		    },
		    getBonus() {
		    	if(this.data.has_got == 1) {
		    		this.show = false;
		    		return;
		    	}
		    	axios.get(Vue.setting.api + '/new_daily_bonus',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('result 查找新手帐户', result)
					if(result.ret == 0) {
						this.data.has_got = 1;
						let daily = this.data.config[this.firstBonusDay];
						daily.bonus = result.bonus;
						daily.bonus_state = 1;

						this.data = {...this.data};
						this.result      = {
							bonus : result.bonus,
							desc  : result.desc
						};
						this.show_result = true;
					}
				})
				.catch(err => {
					console.log('error', err)
				})
		    },
		    getData() {
		    	axios.get(Vue.setting.api + '/new_daily_config',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('检查新手帐户 ====》', result)
					if(result.ret == 0) {
						this.log  = result.log;
						this.data = result.data;
						this.onLogs();
						if(result.data.new_state == 1) {
							if(result.data.has_got == 0) this.show = true;
						} else this.setShowNewState(true);
					} else this.setShowNewState(true);
				})
				.catch(err => {
					console.log('error', err)
				})
		    }
        },
        destroyed() {
			clearInterval(this.sti)
		},
        mounted() {
        	this.getData();
        }
	}
</script>

<style>
.bonus-title {
	width: 80%;
}
.bonusnew {
	display         : flex;
	align-items     : center;
	justify-content : center;
	flex-direction  : column;
	z-index         : 1;
}
.bonus-bg {
	width            : 80vw;
	border-radius    : 5vw;
	background-color : #826453;
}
.bonus-view {
	width            : 100%;
	margin-bottom    : 5px;
	border-radius    : 5vw;
	background-color : #c5a67a;
	display          : inline-block;
}
.bonus-view .msg {
	margin-top       : 1vh;
	width            : 70%;
	border-radius    : 1vh;
	background-color : #f3e4cf;
}
.bonus-view .msg p {
	color         : #b27c47;
	margin        : 0;
	font-size     : 9pt;
	line-height   : 3vh;
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow      : hidden;
}
.bonus-view .list {
	margin-top      : 2vh;
	display         : flex;
	flex-wrap       : wrap;
	flex-direction  : row;
	align-items     : center;
	justify-content : center;
}
.bonus-view .list .item{
	color           : #fff;
	margin          : 1vw 2vw;
	display         : flex;
	flex-direction  : column;
	align-items     : center;
	justify-content : center;
}

.bonus-view .list .item.active {
	color : #d29a6d;
}
.bonus-view .list .item .coin{
	width               : 20vw;
	height              : 21vw;
	display             : flex;
	justify-content     : flex-end;
	align-items         : center;
	flex-direction      : column;
	background-size     : contain;
	background-position : center;
	background-repeat   : no-repeat;
}
.bonus-view .list .item .coin span {
	font-weight   : 700;
	font-size     : 9pt;
	line-height   : 2vh;
	margin-bottom : 1vh;
}

.bonus-view .content {
	margin           : 5px 5px 10px;
	border-radius    : 5vw;
	background-color : #fff;
	display          : flex;
	flex-direction   : column;
	align-items      : center;
	justify-content  : center;
}

.bonus-view .bonus-btn {
	width: 35vw;
    margin: 2vh 0;
}

.newuser-view {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	position         : fixed;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	flex-direction   : column;
	z-index          : 99;
}
.newuser-view .cover {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	position         : absolute;
	background-color : rgba(0,0,0,0.4);
}
.newuser-gift {
	z-index         : 1;
	display         : flex;
	flex-direction  : column;
	justify-content : center;
	align-items     : center;
}
.newuser-gift .gift-view {
	width           : 70vw;
	height          : 70vw;
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
}
.newuser-gift .giftbg {
	top                 : 0;
	left                : 0;
	width               : 100%;
	height              : 100%;
	z-index             : -1;
	display             : inline-block;
	position            : absolute;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
.newuser-gift .giftbtn {
	width               : 60vw;
	height              : 6vh;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}

.newuser-gift .giftbg.active{
	-webkit-transition-property: -webkit-transform;
	-webkit-transition-duration: 1s;
	-moz-transition-property: -moz-transform;
	-moz-transition-duration: 1s;
	-webkit-animation: rotate 3s linear infinite;
	-moz-animation: rotate 3s linear infinite;
	-o-animation: rotate 3s linear infinite;
	animation: rotate 3s linear infinite;}
	@-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
		to{-webkit-transform: rotate(360deg)}
	}
	@-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
		to{-moz-transform: rotate(359deg)}
	}
	@-o-keyframes rotate{from{-o-transform: rotate(0deg)}
		to{-o-transform: rotate(359deg)}
	}
	@keyframes rotate{from{transform: rotate(0deg)}
	to{transform: rotate(359deg)}
}



.newuser-view .result {
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	position        : fixed;
	display         : flex;
	align-items     : center;
	justify-content : center;
	z-index         : 999;

}

.newuser-view .result .np-result{
	position: relative;
	display         : flex;
	flex-direction  : column;
	align-items     : center;
	justify-content : center;
}
.newuser-view .result .np-result img {
	position : absolute;
	top      : -3vh;
	width    : 40vw;
}

.newuser-view .result .np-result .content{
	padding-top : 4vh;
	font-size   : 10pt;
	color       : #333;
}
.newuser-view .result .np-result .content p{
	margin      : 0;
	font-weight : 600;
}
.newuser-view .result .np-result .content p.desc{
	font-weight : 400;
	font-size   : 9pt;
	color       : #848484;
	margin      : 2vh 0;
}
.newuser-view .result .np-result .content .btn {
	border        : 2px #ffcb78 solid;
	padding       : 1vw 10vw;
	border-radius : 3vh;
	color         : #cb8c6a;
	font-weight   : 800;
	margin-bottom : 2vh;
}
</style>
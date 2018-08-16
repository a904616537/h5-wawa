<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-08 11:20:41
* @Description
* @Flow 
-->


<template>
	<div class="bonusview">
		<div class="bonus-box" :style="bonusboxbg">
			<div class="close-btn" :style="close" @click="onClose"></div>
			<div v-if="!selected" class="text">请选择一个红包打开</div>
			<div class="redbonus-list">
				<div
				class="redbonus"
				v-for="(item, index) in items"
				:key="index"
				:style="onBg(item)"
				@click="onSelect(index)">
					<div v-if="selected" class="text">{{item.text}}</div>
				</div>
			</div>
			<img class="background" :class="{active : selected}" :src="background_light">
		</div>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
    import {mapState, mapActions} from 'vuex';

	export default{
		name: 'bonus-view',
		data() {
			return {
				selected         : false,
				bonusboxbg       : 'background-image:url(./static/images/bonus/boxbg.png)',
				close            : 'background-image:url(./static/images/bonus/CloseBTN.png)',
				redbonus         : 'background-image:url(./static/images/bonus/RedPacket_n.png)',
				open_redbonus    : 'background-image:url(./static/images/bonus/RedPacket_o.png)',
				select_redbonus  : 'background-image:url(./static/images/bonus/RedPacket_s.png)',
				background_light : './static/images/bonus/BackgroundLight.png',
				items            : [{
					selected : false,
					text     : 20,
				},{
					selected : false,
					text     : 50,
				},{
					selected : false,
					text     : 100,
				}]
			}
		},
		computed : {
			...mapState({
				token : state => state.User.token,
			}),
		},
		methods : {
			...mapActions([
				'openBox'
            ]),
            onBonusOpen(next) {
            	// 通知服务端已开红包
            	axios.get(Vue.setting.api + '/time_bonus',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('抽奖结果', result)
					if(result.ret == 0) {
						if(next) next();
					} else alert(`奖励有误，请联系客服人员 : ${result.msg}`)
				})
				.catch(err => {
					console.log('error', err)
				})
            },
            onSelect(index) {
            	if(this.selected) return;
            	this.onBonusOpen(() => {
            		let item = this.items[index];
	            	item.selected = true;
	            	this.selected = true;
	            	this.items.splice(index, 1, item)	
            	});

            },
            onClose() {
            	this.openBox(false);
            },
            onBg(item) {
            	if(this.selected) {
            		if(item.selected) return this.select_redbonus;
            		else return this.open_redbonus;
            	} else return this.redbonus;
            }
        },
        mounted() {
        }
	}
</script>

<style>
.bonusview {
	top              : 0;
	left             : 0;
	width            : 100vw;
	height           : 100vh;
	z-index          : 1000;
	display          : flex;
	position         : fixed;
	align-items      : center;
	justify-content  : center;
	background-color : rgba(0,0,0,0.6);

}
.close-btn {
	top                 : 5vw;
	right               : 0;
	width               : 10vw;
	height              : 10vh;
	position            : absolute;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
.bonus-box {
	width               : 90vw;
	height              : 90vh;
	position            : relative;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
	display             : flex;
	align-items         : center;
	justify-content     : center;
	flex-direction      : column;
}
.bonus-box .text {
	color : #FFDF00
}
.redbonus-list {
	display         : flex;
	align-items     : center;
	flex-direction  : row;
	justify-content : center;
	padding-bottom  : 10vh;
}
.redbonus {
	width: 30vw;
	height: 20vh;
	background-size     : contain;
	background-repeat   : no-repeat;
	background-position : center;
}
.redbonus .text {
	margin-top: 6vh;
	color: #b12e28;
}
.bonus-box .background{
	width    : 80vw;
	height   : 80vw;
	bottom   : 3vh;
	z-index  : -1;
	position : absolute;
}
.bonus-box .background.active{
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
</style>
<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-02 13:41:31
* @Description
* @Flow 
-->

<template>
<div v-if="will" class="item">
	<div class="inner" style="background-image: url('./static/images/activity/firstpay/bg2.png')" :class="{disabled : disabled}">
		<div class="title" style="color: #de3b28" @click="onShowRules">
			<div>100%必得娃娃</div>
			<div>{{`充${data.pay}元立即激活`}}</div>
		</div>
		<div class="itembtn" @click="onClick"></div>
		<div class="time">{{time}} 过期</div>
	</div>
</div>
<div v-else class="item">
	<div class="inner"  :class="{disabled : disabled}">
		<div class="title">
			<div>送<span>{{data.bonus}}</span>王国币</div>
			<div>
				{{data.state==1?`已成功累计充值${data.pay}元`:`充${data.pay}元立即开启`}}
			</div>
		</div>
		<div class="icon" @click="onClick">{{btnText}}</div>
		<div class="time">{{time}} 过期</div>
	</div>
</div>
</template>

<script>
	import Vue    from 'vue';
	import moment from 'moment';
	const btn_status = new Map([
		[0, "充值"],
		[1, "领取"],
		[2, "已用"],
		[3, "过期"],
	]);
	export default{
		name : 'first-pay-bag',
		data() {
			return {
			}
		},
		props : {
			data : {
				type    : Object,
				default : () => ({
					type     : 1,
					state    : 0,
					end_time : '2018-07-31'
				})
			},
			disabled : {
				type    : Boolean,
				default : false
			},
			// 显示规则
			onShowRules : {
				type    : Function,
				default : () => {console.log('onShowRules')}
			},
			// 点击事件
			onPress : {
				type    : Function,
				default : () => {console.log('onPress')}
			}
		},
		computed : {
			will() {
				return this.data.bonus_type == 1?false : true;
			},
			btnText() {
				return btn_status.get(this.data.state);
			},
			time() {
				return moment(this.data.end_time *1000).format('YYYY-MM-DD')
			}
		},
		methods: {
			onClick() {
				if(!this.disabled) {
					this.onPress(this.data);
				}
			}
		}
	}
</script>

<style>
.itembtn {
	height: 10vh;
}
.disabled {
	opacity: 0.5;
}
</style>
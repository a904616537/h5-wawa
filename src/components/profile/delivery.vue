<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div class="profile_delivery">
		<div class="deliverys">
			<div class="title">选择一同运送的物品</div>
			
			<div class="deliverys_list">
				<div v-for="(item, index) in wawas" :key="index" v-if="item.is_delivery == 0" class="item" :class="{selected : forSelect(index)}" @click="onClick(index)">
					<span class="fa fa-check-circle-o"></span>
					<label>{{item.gift_name}}</label>
				</div>
			</div>
			<div class="deliverys_button" @click="onSubmit">
				<div class="btn">提交</div>
			</div>

		</div>
		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key from '@/utils/pomelo_key';

	export default{
		name : 'profile_delivery',
		data() {
			return {
				checked : [this.select]
			}
		},
		props: {
			select : {
				type    : Number,
				default : -1
			},
			onCanel : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user,
				wawas        : state => state.User.wawas,
				address      : state => state.User.address_selected,
				wawaplayer   : state => state.User.wawaplayer
			}),
		},
		methods: {
			...mapActions([
				'updateAddress',
				'updateUserInfo'
			]),
			forSelect(index) {
				return this.checked.includes(index)
			},
			onClick(index) {
				if(this.checked.includes(index)) {
					const i = this.checked.findIndex(val => val == index);
					this.checked.splice(i, 1);
				} else this.checked.push(index)
			},
			onSubmit() {
				if(this.checked.length < 1) {
					this.$modal.show('dialog', {
						title   : '至少选择一个娃娃！',
						buttons : [{
							title   : '知道啦！',
							handler : () => { 
								this.$modal.hide('dialog');
							}
						}]
					})
					return;
				}

				if(this.checked.length < 2 && this.wawaplayer.delivery_card_num < 1) {
					this.$modal.show('dialog', {
						title   : '您没有包邮卡',
						text    : '必须拥有2件以上物品可以包邮，充值可获赠包邮卡（1个包邮）',
						buttons : [{
							title   : '重新选择',
							handler : () => { 
								this.$modal.hide('dialog');
							}
						},{
							title   : '前往充值',
							handler : () => { 
								this.$modal.hide('dialog');
								this.$router.push({ path : '/recharge' })
							}
						}]
					});
					return;
				}

				this.$modal.show('dialog', {
					title   : '确认发货吗？',
					text    : '申请后无法取消订单，物品将在3-5个工作日内发货！',
					buttons : [{
						title   : '容我三思',
						handler : () => { 
							this.$modal.hide('dialog');
						}
					}, {
						title   : '我要发货',
						handler : () => { 
							this.$modal.hide('dialog');
							const deliverys = this.checked.map(val => {
								let wawa = this.wawas[val]
								let item = Object.assign(wawa, this.address,{del : 0});
								return item;
							})

							this.onSend(deliverys);
							this.onCanel();
						}
					}]
				})
				
			},
			onSend(data) {
				if(this.wawaplayer.delivery_card_num > 0 || data.length > 1) {
					this.pomelo.request(pomelo_key.hall.user.modifyMyInfo, {delivery : data, is_new : 1, uid : this.user.uid}, (msg) => {
			            if (msg.code == 200) {
			            	this.updateUserInfo(msg.msg)
			            } else alert('提交出错啦！')
			        })
				} else {
					alert('您没有包邮卡，必须拥有2件以上物品可以包邮，充值可获赠包邮卡（1个包邮）')
				}
			}
		}
	}
</script>

<style>
.profile_delivery{
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	display          : flex;
	position         : fixed;
	align-items      : center;
	justify-content  : center;
	flex-direction   : column;
	background-color : rgba(0,0,0,0.4);
}

.deliverys{
	color            : #666;
	font-size        : 14px;
	width            : 60vw;
	height           : 60vh;
	border-radius    : 5vw;
	background-color : #fff;
	padding          : 10vw;
}
.deliverys .title {
	line-height   : 30px;
	font-weight   : bold;
	text-align    : left;
	border-bottom : 1px #F0F0F0 solid;
}
.deliverys_list {
	height          : 85%;
	display         : flex;
	overflow-y      : auto;
	align-items     : flex-start;
	justify-content : flex-start;
	flex-direction  : column;
}
.deliverys_list .item{
	margin : 10px 0;
}
.deliverys_list .item.selected {
	color: #EE9900;
}
.deliverys_button {
	display         : flex;
	justify-content : center;
	align-items     : center;
}
.deliverys_button .btn { 
	color            : #fff;
	width            : 140px;
	height           : 40px;
	border-radius    : 15px;
	line-height      : 40px;
	align-self       : center;
	background-color : #EE9900;
}
</style>
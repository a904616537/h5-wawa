<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 12:32:23
* @Description
* @Flow 
-->

<template>
	<div class="profile_address">
		<div  @click="onCanel" class="all"></div>
		<div class="addresss">
			<div class="title">选择地址</div>

			<div v-if="showAdd" v-for="(item, index) in address" :key="index" class="item" @click="() => onClick(item)">
				<div class="info">
					<div class="userinfo">
						<div class="name">{{item.name}}</div>
						<div class="phone">{{item.tel}}</div>
					</div>
					<div class="distribution">
						{{spellAddress(item)}}
					</div>
				</div>
				<div v-if="item.default == 1" class="fa fa-check select"></div>
			</div>
			<div v-if="!showAdd" class="item gray" @click="toAddress">
				<div class="info">
					<div class="userinfo">
						你还没有配送地址
					</div>
					<div class="distribution">
						前往地址管理
					</div>
				</div>
				<div class="fa fa-angle-right"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key from '@/utils/pomelo_key';
	export default{
		name : 'profile_address',
		data() {
			return {
			}
		},
		props: {
			onCanel : {
				type    : Function,
				default : () => {}
			},
			onPress : {
				type    : Function,
				default : () => {}
			}
		},
		computed : {
			...mapState({
				address : state => state.User.address,
			}),
			showAdd() {
				return this.address.length > 0;
			}
		},
		methods: {
			...mapActions([
				'updateAddress'
			]),
			spellAddress(data) {
				return data.province + data.city + data.area + data.address
			},
			onClick(data) {
				this.updateAddress(data);
				this.onPress();
			},
			toAddress() {
				this.$router.push({path : '/address'})
			}
		}
	}
</script>

<style>
.profile_address{
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	display          : flex;
	position         : fixed;
	justify-content  : flex-end;
	flex-direction   : column;
}
.profile_address .all {
	width    : 100%;
	height   : 100%;
	position : absolute;
	background-color : rgba(0,0,0,0.4);
}
.addresss {
	background-color : #e8e8e8;
	width            : 100%;
	z-index          : 999;
}
.addresss .title {
	color            : #000;
	font-size        : 14px;
	font-weight      : bold;
	padding          : 10px;
	text-align       : left;
	background-color : #fff;
	margin-bottom: 5px;
}
.addresss .item {
	padding          : 0 5px;
	font-size        : 12px;
	background-color : #fff;
	border-bottom    : 1px #ccc ;
	display          : flex;
	flex-direction   : row;
	align-items      : center;
}
.addresss .item.gray {
	color: #666;
}
.addresss .item .info {
	width          : 90vw;
	display        : flex;
	flex-direction : column;
	align-items    : flex-start;
	text-align     : left;
	padding: 10px;
}
.addresss .item .userinfo {
	display: flex;
	flex-direction: row;
}
.addresss .item .userinfo .name {
	margin-right: 30px
}
.addresss .item .select {
	color: #3385ff;
}
</style>
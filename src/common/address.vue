<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-26 16:01:15
* @Description
* @Flow 
-->

<template>
	<div class="addressList">

		<div v-for="(item, index) in address" class="address-item">
			<span>{{item.name}}</span>
			<span class="float-right">{{item.tel}}</span>
			<div class="detaile">{{item.province + item.city + item.area + item.address}}</div>
			<div class="float">
				<div class="left"  @click="() => onDef(index)">
					<span v-if="item.default == 1" class="fa fa-check-circle-o selected"/>
					<span v-else class="fa fa-circle-o"/>
					设为默认
				</div>
				<div class="right">
					<div @click="() => onEdit(index)"><span class="fa fa-edit selected"></span>编辑</div>
					<div @click="() => onDel(index)"><span class="fa fa-trash-o selected"></span>删除</div>
				</div>
			</div>
			
		</div>

		<div class="bottom-btn" @click="add">添加收货地址</div>
		<v-add ref="editAddress" :close="(data) => close(data)" v-show="add_show"></v-add>
	</div>                    
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import addAddress                         from '@/components/addAddress'
	import pomelo_key                         from '@/utils/pomelo_key';

	export default{
		name : 'addressList',
		data() {
			return {
				add_show : false
			}
		},
		components : {
			'v-add' : addAddress
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				address      : state => state.User.address
			}),
		},
		methods: {
			...mapActions([
				'editAddress'
			]),
			onEdit(index) {
				const address = this.address[index];
				this.$refs.editAddress.onEdit(address);
				this.add_show = true
			},
			onDel(index) {
				let address = this.address[index];
				address.del = 1;
				this.address.splice(index, 1, address);
				this.editAddress(this.address);
				this.onSubmit(() => {
					this.address.splice(index, 1);
				});
			},
			onDef(index) {
				let arr = [...this.address];
				let address = {...arr[index]};
				address.default = address.default == 0?1 : 0;
				if(address.default == 1) {
					arr = arr.map(val => {
						val.default = 0;
						return val;
					});
				}
				arr.splice(index, 1, address);
				this.editAddress(arr);
				this.onSubmit();	
			},
			onSubmit(next) {
				const request_data = {uid : this.user.uid, address: this.address};
				this.pomelo.request('hall.user.modifyMyInfo', request_data, (result) => {
					if(next) next();
				})
			},
			add() {
				this.$refs.editAddress.onEdit({
					id       : 0,
					uid      : 0,
					name     : '',
					tel      : '',
					address  : '',
					default  : 0,
					province : '',
					country  : '中国',
					city     : '',
					area     : ''
				});
				this.add_show = true
			},
			close(data) {
				this.add_show = false;
				if(data) {
					delete data.is_default;
					if(data.id != 0) {
						const index = this.address.findIndex(val => val.id == data.id);
						this.address.splice(index, 1, data);
					} else {
						delete data.id;
						data.uid = this.user.uid;
						this.address.push(data);
					}
					this.editAddress([...this.address]);
					this.onSubmit();
				}
			}
		},
		mounted() {
			if(!this.pomelo_login) {
				this.$router.replace('profile')
			}
		}
	}
</script>

<style>
	.addressList{
		background-color: #f4f4f4;
		height: 100%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
	}
	.float{
		display         : flex;
		justify-content : center;
		align-items     : center;
		line-height     : 30px;
	}
	.float span {
		font-size    : 18px;
		margin-right : 0.5em;
	}
	.float .selected {
		color : #f2d56e;
	}
	.float .left {
		flex        : auto;
		display     : flex;
		align-items : center;
	}
	.float .right {
		display         : flex;
		justify-content : center;
		align-items     : center;
		flex-direction  : row;
	}
	.float .right div{
		margin-left: 20px;
	}
	.float-right{
		float           : right;
		display         : flex;
		justify-content : center;
		align-items     : center;
		flex-direction  : row;
	}
	
	.addressList .address-item{
		margin           : 10px;
		padding          : 10px;
		font-size        : 14px;
		border-radius    : 10px;
		text-align       : left;
		background-color : #fff;
	}
	.addressList .address-item:after{
		content  : '';
		display  : inline-block;
		clear    : both;
		height   : 0;
		overflow : hidden;
	}
	.addressList .bottom-btn{
		position         : fixed;
		bottom           : 0;
		left             : 0;
		right            : 0;
		background-color : #f2d56e;	
		color            : #BF6A0B;            /*需要更改字体颜色*/
		font-weight      : bold;
		line-height      : 50px;
	}
</style>
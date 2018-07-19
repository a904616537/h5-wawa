<template>
	<div class="addressList">
		<div class="address-item">
			<span>User Name</span>
			<span class="float-right">13813838438</span>
			<div class="detaile">上海市浦东新区民生路1403号信息大厦楼上</div>
			<div class="float-left">设为默认</div>
			<div class="float-right">
				<span>编辑</span>
				<span>删除</span>
			</div>
		</div>
		<div class="bottom-btn" @click="add">添加收货地址</div>
		<v-add :close="close" v-show="add_show"></v-add>
	</div>
</template>

<script>
	import addAddress from '@/components/addAddress'

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
		methods: {
			add() {
				this.add_show = true
			},
			close() {
				this.add_show = !this.add_show
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
	.float-left{
		float: left;
	}
	.float-right{
		float: right;
	}
	.addressList .float-right span{
		margin-left: 20px;
	}
	.addressList .address-item{
		background-color: #fff;
		text-align: left;
		margin: 10px;
		padding: 10px;
		border-radius: 10px;
		font-size: 14px;
	}
	.addressList .address-item:after{
		content: '';
		display: inline-block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.addressList .bottom-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #f2d56e;	
		color: #BF6A0B;            /*需要更改字体颜色*/
		font-weight: bold;
		line-height: 50px;
	}
</style>
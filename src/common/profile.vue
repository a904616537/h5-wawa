<template>
	<div class="profile">
		<div class="head">
			<img class="user-head" src="/static/images/hall/1.png"/>
			<div>user name</div>
			<div>1193022</div>
		</div>
		<div class="card">
			<div class="item">
				<label class="title">王国金币</label>
				<div class="right">
					<label class="info" style="margin-right: 70px;">1,484</label>
					<label class="info" @click="recharge">充值 ></label>
				</div>
			</div>
			<div class="item">
				<label class="title">我的物品(娃娃)</label>
				<div class="right">
					<label class="info">数量: 3</label>
					<label class="info">包邮卡: 0 ></label>
				</div>
			</div>
			<div class="item">
				<label class="title">王国配送信息</label>
				<div class="right">
					<label class="info">等待中: 0</label>
					<label class="info">运送中: 0</label>
					<label class="info">查看 ></label>
				</div>
			</div>
			<div class="item">
				<label class="title">收货地址</label>
				<div class="right">
					<label class="info">管理 ></label>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="item">
				<label class="title">邀请好友</label>
				<div class="right">
					<label class="info">添加公众号"王国服务"成为王国推...></label>
				</div>
			</div>
			<div class="item">
				<label class="title">消息</label>
				<div class="right">
					<label class="info">0 ></label>
				</div>
			</div>
		</div>
		<div class="card">
			<div class="item">
				<label class="title">客服</label>
				<div class="right">
					<label class="info">></label>
				</div>
			</div>
			<div class="item">
				<label class="title">版本号</label>
				<div class="right">
					<label class="info">1.2.5.23</label>
				</div>
			</div>
		</div>
		<v-menu></v-menu>
	</div>
</template>

<script>
	import menu from '@/components/menu'

	export default{
		name : 'profile',
		data() {
			return {
				
			}
		},
		components : {
			'v-menu' : menu
		},
		methods : {
			recharge() {
				this.$router.push({ path : '/recharge' })
			}
		}
	}
</script>

<style>
	body{
		background-color: #f2d56e;	
	}
	.profile .head{
		margin: 30px 0 20px;
		color: #BF6A0B;
	}
	.profile .user-head{
		width: 80px;
		height: 80px;
		border-radius: 80px;
	}
	.profile .card{
		background-color: #fff;
		margin: 10px 8px;
		text-align: left;
		border-radius: 20px;
		padding: 10px 20px;
		line-height: 40px;
	}
	.profile .card .item:not(:last-child){
		border-bottom: 1px solid #eee;
	}
	.profile .card .right{
		float: right;
	}
	.profile .card .info{
		color: #999;
		font-size: 14px;
		margin-left: 10px;
	}
</style>
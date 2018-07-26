<template>
	<div class="record" @click="click">
		<div class="inner">
			<div class="card">
				<div v-for="(item, index) in data" class="item" >
					<img class="user-icon item-style" :src="item.pic"/>
					<div class="user item-style">{{decodeURI(item.nn)}}</div>
					<div class="number">{{item.num}}次</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'record',
		data() {
			return {
				user : '用户名',
				number : 2
			}
		},
		props : {
			data : {
				type    : Array,
				default : () => []
			},
			click : {
				type : Function,
				default : () => {(console.log('close'))}
			}
		},
		mounted() {
			console.log('--------------------X', this.data)
		}
	}
</script>

<style>
	.record{
		background-color: rgba(0,0,0,.3);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.record .inner{
		margin: 8vh 10px;
		background-color: #fff;
		border-radius: 10px;
		height: 62vh;
		overflow: scroll;
		padding: 10px 20px;	
	}
	.record .item{
		text-align: left;
		line-height: 50px;
		padding: 10px 0;
		border-bottom: 1px solid #eee;
	}
	.record .item:after{
		content : '';
		display: table;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.record .item-style{
		float: left;
	}
	.record .user-icon{
		width: 50px;
		height: 50px;
		border-radius: 50px;
		margin-right: 20px;
	}
	.record .number{
		float: right;
		color: #999;
	}
</style>
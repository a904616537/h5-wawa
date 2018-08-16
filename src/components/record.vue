<template>
	<div class="record" @click="click">
		<div class="inner">
			<div class="card">
				<div v-for="(item, index) in data" class="item" >
					<img class="user-icon" :src="item.pic"/>
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
		text-align    : left;
		padding       : 10px 0;
		line-height   : 50px;
		border-bottom : 1px solid #eee;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: row;
	}
	.record .item:after{
		content : '';
		display: table;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.record .item-style{
		flex:auto;
	}
	.record .user-icon{
		width         : 40px;
		height        : 40px;
		border-radius : 50%;
		margin-right  : 20px;
		border        : none;
	}
	.record .number{
		float: right;
		color: #999;
	}
</style>
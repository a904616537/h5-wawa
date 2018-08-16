<template>
	<div class="convert">
		<v-nav>兑换记录</v-nav>
		<v-item v-for="(item, index) in list" :key="index" :data="item" />
		<p>已经没有更多了！</p>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	import axios from 'axios';
	import VItem from '@/components/covert/listItem';

	export default{
		name : 'convert',
		data() {
			return {

			}
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				token        : state => state.User.token,
				init         : state => state.Shop.init,
				list         : state => state.Vouchers.list
			}),
		},
		components : {
			'v-item' : VItem
		},
		methods : {
			...mapActions([
				'onVouchersInit'
			]),
			showMore() {
				this.$router.push({ path : '/covertMore' })
			},
			_onResh() {
		        axios.get(Vue.setting.api + '/exchange_log',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					if(result.ret === 0) {
		                this.onVouchersInit(result)
		            }
				})
				.catch(err => {
					console.log('更新王国券信息失败！', err);
				})
		    }
		},
		mounted() {
			if(this.init) {
				this._onResh();
			} else this.$router.go(-1);
		}
	}
</script>

<style>
	.convert{
		height           : 100%;
		font-size        : 14px;
		background-color : #f4f4f4;     /*需要更换背景颜色*/
	}
	.convert .item{
		background-color : #fff;
		padding          : 20px;
		border-bottom    : 1px solid #eee;
		text-align       : left;
		display          : flex;
		flex-direction   : row;
		align-items      : center;
		justify-content  : center;
	}
	.convert .item:after{
		content : '';
		display : block;
		height  : 0;
		clear   : both;
		overflow: hidden;
	}
	.convert .item .left{
		font-size    : 12px;
		margin-right : 20px;
		color        : #ff9f51;
		text-align   : center;
	}
	.convert .item .img-style{
		width         : 30px;
		height        : 30px;
		border-radius : 15px;
	}
	.convert .item .content{
		width: 83%;
	}
	.convert .content .status{
		color: #ccc;
		font-size: 12px;
		margin-top: 10px;
	}
	.convert .item .icon-style{
		width: 10px;
		height: 20px;
	}
	.convert p{
		font-size: 12px;
		color: #ccc;
	}
</style>
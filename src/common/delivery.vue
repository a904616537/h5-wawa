<template>
	<div class="delivery">
		<v-nav>王国配送管理</v-nav>
		<div v-for="(item, index) in delivery" class="card">
			<div class="info">
				<div class="left">
					<div class="img-style" :style="'background-image: url('+item.pic+');'" ></div>
				</div>
				<div class="delivery-info">
					<div class="product">
						<span class="pro-name">{{item.gift_name}}</span>
						<span class="num right">数量: {{item.gift_num}}</span>
					</div>
					<div class="user-info">
						<div class="user">
							<span class="user-name">{{item.name}}</span>
							<span class="phone right">{{item.tel}}</span>
						</div>
						<div class="address">{{item.province + item.city + item.area + item.address}}</div>
					</div>
				</div>
			</div>
			
			<div class="state">
				<div class="status">状态: {{status(item.state)}}</div>
				<div class="cancel" @click="() => onDel(item)"><span class="fa fa-minus-square icon"></span>取消配送</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import pomelo_key, {deliveryState}        from '@/utils/pomelo_key';

	export default{
		name : 'delivery',
		data() {
			return {
			}
		},
		computed : {
			...mapState({
				pomelo       : state => state.Pomelo.pomelo,
				pomelo_login : state => state.Pomelo.login,
				user         : state => state.User.user || {},
				delivery     : state => state.User.delivery
			}),
		},
		methods : {
			...mapActions([
				'updateUserInfo'
			]),
			status(state) {
				return deliveryState.get(state);
			},
			onDel(item) {
				const obj = {
					uid      : this.user.uid,
					delivery : [{
						timeid : item.timeid,
						del    : 1
					}]
				};
				this.pomelo.request(pomelo_key.hall.user.modifyMyInfo, obj, (result) => {
					this.pomelo.request(pomelo_key.user.get, {uid: this.user.uid}, data => {
						this.updateUserInfo(data)
					});
				})
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
	.delivery{
		padding: 8px;
		background-color: #f4f4f4;
		font-size: 12px;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 100%;
		text-align: left;
	}
	.delivery .card{
		background-color: #fff;
		padding: 10px;
		border-radius: 10px;
		margin-bottom: 15px;
	}
	.delivery .card:after{
		content: '';
		display: block;
		clear: both;
		overflow: hidden;
		height: 0;
	}
	.delivery .left{
		float: left;
		margin-right: 7px;
	}
	.delivery .img-style{
		background-color: #f4f4f4;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		border-radius: 10px;
		width: 27vw;
		height: 27vw;
	}
	.delivery .delivery-info .right,.delivery .cancel{
		float: right;
	}
	.delivery .user-info .user{
		line-height: 17vw;
	}
	.delivery .info {
		width  : 100%;
		height : 28vw;
	}
	.delivery .status{
		margin-left : 5px;
		flex        : auto;
	}
	.delivery .state {
		line-height     : 30px;
		display         : flex;
		justify-content : center;
		align-items     : center;
		flex-direction  : row;
	}
	.delivery .cancel{
		width      : 20vw;
		text-align : right;
	}
	.delivery .cancel .icon {
		color: #f2d56e;
		font-size: 14px;
		margin-right: 10px;
	}
</style>
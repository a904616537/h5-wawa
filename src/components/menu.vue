<template>
	<div class="menu-box">
		<ul class="clear-float">
			<router-link to="/">
				<li :class="{selected : index == 0}">
					<div class="icon" :style="'background-image: url('+ (index == 0?(src + 'icon-home_select.png'):(src + 'icon-home.png')) +');'"></div>
					<div class="menu-title">首页</div>
				</li>
			</router-link>
			<li @click="goBag" :class="{selected : index == 1}">
				<div class="icon" :style="'background-image: url('+ (index == 1?(src + 'icon_bag_select.png'):(src + 'icon_bag.png')) +');'"></div>
				<div class="menu-title">红包</div>
			</li>
			<router-link to="/shop">
				<li :class="{selected : index == 2}">
					<div class="icon" :style="'background-image: url('+ (index == 2?(src + 'icon_shop_select.png'):(src + 'icon_shop.png')) +');'"></div>
					<div class="menu-title">商城</div>
				</li>
			</router-link>
			<router-link to="/profile">
				<li :class="{selected : index == 3}">
					<div class="icon" :style="'background-image: url('+ (index == 3?(src + 'icon_me_select.png'):(src + 'icon_me.png')) +');'"></div>
					<div class="menu-title">我的</div>
				</li>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'menu-box',
		data() {
			return {
				src : './static/images/hall/userinfo/'
			}
		},
		props : {
			index : {
				type    : Number,
				default : 0
			}
		},
		methods : {
			goBag() {
				// 如果没有红包,页面跳转至'/bag'
				// this.$router.push({ path : '/bag' })

				// 如果用户首充赠送了礼拜，页面跳转至'/firstPayBag'
				this.$router.push({ path : '/firstPayBag' })
			}
		}
	}
</script>

<style>
	.menu-box{
		left     : 0;
		right    : 0;
		bottom   : 0;
		position : fixed;
	}
	.clear-float{
		content  : '';
		height   : 0;
		clear    : both;
		display  : table;
		overflow : hidden;
	}
	.menu-box ul{
		margin           : 0;
		padding          : 0;
		width            : 100%;
		background-color : #fff;

	}
	.menu-box li{
		float           : left;
		width           : 25%;
		list-style      : none;
		font-size       : 12px;
		color           : #333;
		padding         : 10px 0;
		display         : flex;
		flex-direction  : column;
		justify-content : center;
		align-items     : center;
	}
	.menu-box li.selected{
		color : #f9da39;
	}
	.icon {
		width           : 2em;
		height          : 2em;
		background-size : 100% 100%;
		
	}
</style>
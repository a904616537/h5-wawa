<template>
	<div class="menu-box">
		<ul class="clear-float">
			<router-link to="/">
				<li>
					<icon name="icon_home" :w="20" :h="20"></icon>
					<div class="menu-title">首页</div>
				</li>
			</router-link>
			<router-link to="/bag">
				<li>
					<icon name="icon_bag" :w="20" :h="20"></icon>
					<div class="menu-title">红包</div>
				</li>
			</router-link>
			<router-link to="/shop">
				<li>
					<icon name="icon_shop" :w="20" :h="20"></icon>
					<div class="menu-title">商城</div>
				</li>
			</router-link>
			<router-link to="/profile">
				<li>
					<icon name="icon_me" :w="20" :h="20"></icon>
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

			}
		}
	}
</script>

<style>
	.menu-box{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.clear-float{
		content: '';
		height: 0;
		clear: both;
		display: table;
		overflow: hidden;
	}
	.menu-box ul{
		margin: 0;
		padding: 0;
		width: 100%;
		background-color: #fff;
	}
	.menu-box li{
		float: left;
		width: 25%;
		list-style: none;
		font-size: 12px;
		color: #333;
		padding: 10px 0;
	}
</style>
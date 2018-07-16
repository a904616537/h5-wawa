<template>
	<div class="index">
		<div>
			<div class="swiper"></div>
			<div class="bar-list">
				<ul>
			        <li class="checked">全部</li>
			        <li>新品上线</li>
				    <li>世界杯</li>
				    <li>实用</li>
				    <li>网红爆款</li>
				    <li>限时特价</li>
				    <li>其他</li>
				</ul>
			</div>
			<div class="list-box">
				<div class="list-item" @click="play">
					<div class="inner">
						<div class="img-style"></div>
						<div class="item-content">
							<h4>商品名称</h4>
							<div class="item-bottom">
								<div class="price bottom-style">99 币/次</div>
								<div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
								<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div>
							</div>
						</div>
					</div>
				</div>
				<div class="list-item">
					<div class="inner">
						<div class="img-style"></div>
						<div class="item-content">
							<h4>商品名称</h4>
							<div class="item-bottom">
								<div class="price bottom-style">99 币/次</div>
								<div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
								<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div>
							</div>
						</div>
					</div>
				</div>
				<div class="list-item">
					<div class="inner">
						<div class="img-style"></div>
						<div class="item-content">
							<h4>商品名称</h4>
							<div class="item-bottom">
								<div class="price bottom-style">99 币/次</div>
								<div class="status bottom-style"><div class="radius"></div>空闲中</div>
								<!-- <div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div> -->
							</div>
						</div>
					</div>
				</div>
				<div class="list-item">
					<div class="inner">
						<div class="img-style"></div>
						<div class="item-content">
							<h4>商品名称</h4>
							<div class="item-bottom">
								<div class="price bottom-style">99 币/次</div>
								<div class="status bottom-style"><div class="radius"></div>空闲中</div>
							</div>
						</div>
					</div>
				</div>
				<div class="list-item">
						<div class="inner">
							<div class="img-style"></div>
							<div class="item-content">
								<h4>商品名称</h4>
								<div class="item-bottom">
									<div class="price bottom-style">99 币/次</div>
									<div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
									<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<v-menu></v-menu>
		</div>
	</div>	
</template>

<script>
	import menu from '@/components/menu'
	export default{
		name: 'index',
		data() {
			return {
				free: false
			}
		},
		components : {
			'v-menu' : menu
		}, 
		methods : {
			play() {
				this.$router.push({path : '/play'})
			}
		}
	}
</script>

<style>
	.index{
		padding: 8px;
	    color: #2c3e50;

	}
	.swiper{
		height: 180px;
		background-color: #f4f4f4;
		border-radius: 10px;
	}
	.list-box{
		margin: 0px -5px;
		margin-bottom: 80px;
	}
	.list-item{
		width         : 50%;
		float         : left;
		overflow      : hidden;
		font-size     : 14px;
		margin-bottom : 10px;
		text-align    : left;
	}
	.list-box:after,.item-bottom:after{
		clear    : both;
		height   : 0;
		content  : '.';
		display  : block;
		overflow : hidden;
	}
	.list-item .inner{
		margin           : 0 5px;
		border-radius    : 5px;
		background-color : #fff;
	}
	.img-style{
		background-color: #d6d3d4;
		height: 24vh;
		border-radius: 5px;
		background-size: cover;
	}
	.item-content{
		padding: 5px 7px;
		color: #BF6A0B;
	}
	.list-item .item-bottom{
		font-size: 12px;
		margin-bottom: 10px;
	}
	.item-bottom .price{
		float: left;
	}
	.item-bottom .status{
		float: right;
		color: #B7E549;
	}
	.item-bottom .radius{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #B7E549;
		display: inline-block;
	}
	.item-bottom .status-nofree{
		float: right;
		color: #D5443D;
	}
	.item-bottom .radius-nofree{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #D5443D;
		display: inline-block;
	}
	.bar-list ul{
		width       : 100%;
		font-size   : 14px;
		margin      : 0 0 5px;
		padding     : 0;
		text-align  : left;
		float       : left;
		display     : inline;
		white-space : nowrap;
		overflow-x  : scroll;
		overflow-y  : hidden;
	}
	.bar-list li{
		display     : inline-block;
		padding     : 0 10px;
		line-height : 28px; 
		color       : #BF6A0B;		
	}
	.bar-list li.checked{
		border-bottom: 2px solid #BF6A0B;		
	}
</style>
<template>
	<div class="vip-privilege">
		<v-nav>VIP 特权</v-nav>
		
		<div class="gold-box vip-box">
			<div class="level" :style="'background-image: url('+vip_bg+')'">2</div>
			<div class="bar">
				<div class="text-style">充值<span class="light-style">51</span>元, 可升为<span class="light-style">VIP3</span></div>
				<div class="bar-bg">
					<div class="pb-wrapper">
						<div class="pb-container">
			                <div class="pb-text">50/100</div>
			                <div class="pb-value" style="width: 50%;"></div>
    			            <div class="next-level" :style="'background-image: url('+vip2_bg+')'">3</div>
			            </div>
					</div>
				</div>	

			</div>
			<div class="vip-recharge" :style="'background-image: url('+vip_btn+')'">充值</div>
		</div>
		
		<div class="gold-box">
			
		</div>
	</div>
</template>

<script>
	export default{
		name : 'vip-privilege',
		data() {
			return {
				vip_bg  : './static/images/user/vip1.png',
				vip2_bg : './static/images/user/vip2.png',
				vip_btn : './static/images/user/button01.png',
			}
		}
	}
</script>

<style>
	.vip-privilege{
		background: linear-gradient(#f2d56e, #f4f4f4);
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}
	.vip-privilege .gold-box{
		border-radius    : 12px;
		padding-bottom   : 10vh;
		background-color : #fff;
		margin           : 3vw 10px;
	}
	.vip-privilege .vip-box{
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0;
		padding: 15px 10px;
	}
	.vip-privilege .vip-box .level{
		background-size: cover;
		background-repeat: no-repeat;
		text-align: center;
		color: #fff;
		font-weight: bold;
		width: 19%;
		line-height: 9vw;
	}
	.vip-privilege .vip-box .bar{
		flex-grow: 1;
		text-align: left;
		padding: 0 5px;
	}
	.vip-privilege .vip-box .text-style{
		font-size: 12px;
		margin-left: 10px;
	}
	.vip-privilege .vip-box .light-style{
		color: red;
		font-weight: 500;
	}
	.vip-privilege .vip-box .next-level{
		background-size: cover;
		background-repeat: no-repeat;
		text-align: center;
		color: #fff;
		font-weight: bold;
		width: 16%;
		line-height: 18px;
		position: absolute;
		right: 4px;
		top: 0;
	}
	.vip-privilege .vip-box .vip-recharge{
		color: #fff;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		font-size: 12px;
		padding: 0 20px;
		line-height: 24px;
		border-radius: 15px;
		font-weight: bold;
	}
	-webkit-text-size-adjust:none;
	.vip-privilege .vip-box .bar-bg{
		width:100px;
    	display:inline-block;
    	zoom:1;
	}
	.vip-privilege .vip-box .pb-wrapper{
	    position : relative;
	    background : #eee;
	    border-radius : 15px;
	}
	.vip-privilege .vip-box .pb-container{
	    height : 18px;
	    position : relative;
	    left : -1px;
	    margin-right : -2px;
	    font : 1px/0 arial;
	}
	.vip-privilege .vip-box .pb-text{
	    width:100%;
	    position:absolute;
	    left:0;
	    top:0;
	    text-align:center;
	    color: #fff;
	    font:10px/18px arial;
	}
	.vip-privilege .vip-box .pb-value{
		border-radius: 15px;
		background: #FEEA34;
		height: 100%;
	}
	
</style>
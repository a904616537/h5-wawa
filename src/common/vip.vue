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
			<div class="inner">
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img1+')'"></div>
					VIP专属折扣
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img2+')'"></div>
					VIP专属折扣
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img3+')'"></div>
					游戏王国券奖励
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img4+')'"></div>
					娃娃兑币特权
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img5+')'"></div>
					申诉优先处理
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img6+')'"></div>
					专属商品兑换
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img7+')'"></div>
					客服优先处理
				</div>
				<div class="item">
					<div class="img-style" :style="'background-image: url('+item.img8+')'"></div>
					1对1专属微信客服
				</div>
				<div class="item">
					<div class="img-style" style="display: table; vertical-align: middle; line-height: 60px;">
						<img :src="item.img9" style="width: 50%;">
					</div>
					更多特权敬请期待
				</div>
			</div>

			<div class="receive">
				VIP 1 专属礼包
				<div class="receive-box">
					<div class="receive-item">
						<img :src="item.img3" class="receive-img" style="width: 60%"/>
						<div>王国券68</div>
					</div>
					<div class="receive-item">
						<img :src="item.img10" class="receive-img" style="width: 40%;padding: 10px 0;"/>
						<div>王国币18</div>
					</div>
				</div>
				<div class="receive-btn" :style="'background-image: url('+vip_btn2+')'">点击领取</div>
			</div>
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
				vip_btn2: './static/images/user/button02.png',
				item: {
					img1: './static/images/user/pic1_0.png',
					img2: './static/images/user/pic2_0.png',
					img3: './static/images/user/pic3_0.png',
					img4: './static/images/user/pic4_0.png',
					img5: './static/images/user/pic5_0.png',
					img6: './static/images/user/pic6_0.png',
					img7: './static/images/user/pic7_0.png',
					img8: './static/images/user/pic8_0.png',
					img9: './static/images/user/pic89.png',
					img10 : './static/images/hall/dailyBonus/coin.png',
				}
			}
		}
	}
</script>

<style>
	.vip-privilege{
		background : linear-gradient(#f2d56e, #f4f4f4);
		height     : 100%;
		position   : absolute;
		top        : 0;
		left       : 0;
		right      : 0;
	}
	.vip-privilege .gold-box{
		border-radius    : 12px;
		background-color : #fff;
		margin           : 3vw 10px;
	}
	.vip-privilege .vip-box{
		display         : flex;
		flex            : 1;
		justify-content : space-between;
		align-items     : center;
		padding-bottom  : 0;
		padding         : 15px 10px;
	}
	.vip-privilege .vip-box .level{
		background-size   : cover;
		background-repeat : no-repeat;
		text-align        : center;
		color             : #fff;
		font-weight       : bold;
		width             : 19%;
		line-height       : 9vw;
	}
	.vip-privilege .vip-box .bar{
		flex-grow  : 1;
		text-align : left;
		padding    : 0 5px;
	}
	.vip-privilege .vip-box .text-style{
		font-size   : 12px;
		margin-left : 10px;
	}
	.vip-privilege .vip-box .light-style{
		color       : red;
		font-weight : 500;
	}
	.vip-privilege .vip-box .next-level{
		background-size   : cover;
		background-repeat : no-repeat;
		text-align        : center;
		color             : #fff;
		font-weight       : bold;
		width             : 16%;
		line-height       : 18px;
		position          : absolute;
		right             : 4px;
		top               : 0;
	}
	.vip-privilege .vip-box .vip-recharge{
		color               : #fff;
		background-position : center;
		background-repeat   : no-repeat;
		background-size     : cover;
		font-size           : 12px;
		padding             : 0 20px;
		line-height         : 24px;
		border-radius       : 15px;
		font-weight         : bold;
	}
	-webkit-text-size-adjust:none;
	.vip-privilege .vip-box .bar-bg{
		width   : 100px;
    	display : inline-block;
    	zoom    : 1;
	}
	.vip-privilege .vip-box .pb-wrapper{
	    position      : relative;
	    background    : #eee;
	    border-radius : 15px;
	}
	.vip-privilege .vip-box .pb-container{
	    height       : 18px;
	    position     : relative;
	    left         : -1px;
	    margin-right : -2px;
	    font         : 1px/0 arial;
	}
	.vip-privilege .vip-box .pb-text{
	    width      : 100%;
	    position   : absolute;
	    left       : 0;
	    top        : 0;
	    text-align : center;
	    color      : #fff;
	    font       : 10px/18px arial;
	}
	.vip-privilege .vip-box .pb-value{
		border-radius : 15px;
		background    : #FEEA34;
		height        : 100%;
	}
	.vip-privilege .gold-box .inner{
		padding: 0 10px 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		flex-grow: auto;
	}
	.vip-privilege .gold-box .item{
		color: #929191;
		font-size: 12px;
		width: 33.33%;
		padding: 20px 0 0px;
	}
	.vip-privilege .gold-box .img-style{
		background-color: #eee;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		margin: 0 auto 5px;
	}
	.vip-privilege .receive{
		border-top: 1px solid #eee;
		padding: 20px;
		font-size: 12px;
		text-align: left;
	}
	.vip-privilege .receive-box{
		display: flex;
		margin-top: 10px;
	}
	.vip-privilege .receive-item{
		background-color: #eee;
		text-align: center;
		width: 100px;
		padding-bottom: 10px;
		margin-right: 10px;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	.vip-privilege .receive-btn{
		width: 120px;
		line-height: 27px;
		color: #fff;
		margin: 20px auto 0;
		font-weight: bold;
		text-align: center;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
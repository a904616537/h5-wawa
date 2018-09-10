<template>
	<div class="postage">
		<v-nav>包邮卡（{{delivery_card_num}}）</v-nav>

		<div v-for="(item, index) in postcard" :key="index" class="item">
			<div class="box">
				<div class="inner">免费</div>
				<div v-if="onState(item) == 1" class="superscript superscript-off">
					<div class="rect rect-off"></div>
					<div class="desc">过期</div>
				</div>
				<div v-else-if="onState(item) == 2" class="superscript">
					<div class="rect"></div>
					<div class="desc">已用</div>
				</div>
				
			</div>
			<div class="infor">
				<div>包邮卡</div>
				<div class="time">{{toformat(item.create_time)}}-{{toformat(item.expire_time)}}</div>
				<div class="tip">说明：一件物品申请发货时自动抵扣</div>
			</div>
		</div>

	</div>
</template>

<script>
	import moment                             from 'moment';
	import {mapState, mapGetters, mapActions} from 'vuex';
	
	export default{
		name : 'postage',
		data() {
			return {
				num : '3'
			}
		},
		computed : {
			...mapState({
				postcard : state => state.User.postcard,
			}),
			delivery_card_num() {
		        const delivery_card_num = this.postcard.length;
		        return delivery_card_num;
			}
		},
		methods : {
			toformat(time) {
	        	return moment(time).format('YYYY.MM.DD')
	    	},
	    	onState(data) {
				const endTime = moment(data.expire_time)
				const outtime = moment().isBefore(endTime);
				let label     = 0;

				if(!outtime) label = 1
				if(data.is_used != 0) label = 2;
				return label;
	    	}
		}
		
	}
</script>

<style>
	.postage{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.postage .item{
		padding: 5px;
		background-color: #fff;
		margin: 5px 0;
		display: flex;
		text-align: left;
	}
	.postage .item .inner{
		background-color: rgb(117,211,90);
		color: #fff;
		width: 25vw;
		height: 20vw;
		border-radius: 10px;
		line-height: 20vw;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		overflow: hidden;
	}
	.postage .box{
		position: relative;
		border-radius: 10px;
		overflow: hidden;
	}
	.postage .infor{
		padding-left: 10px;
		font-size: 14px;
		margin: auto 0;
	}
	.postage .time{
		color: #999;
		font-size: 12px;
	}
	.postage .tip{
		font-size: 12px;
		color: rgb(101,101,101);
		margin-top: 10px;
	}
	/* 角标 */
	.superscript {
    	position: absolute;
    	top: 0px;
    	left: 0px;
    	width: 70px;
    	height: 70px;
        overflow: hidden;
    }
    .superscript .gradual {
    	width: 100%;
    	height: 100%;
		background: linear-gradient(75deg, #31b968 50%, transparent 50%);
    }
    .superscript .triangle {
		width: 0;
	    height: 0;
	    border-top: 70px solid rgb(231,118,52);
	    border-right: 70px solid transparent;
    }
    .superscript-off .triangle{
    	border-top: 70px solid rgb(152,153,154);
    }
    .superscript .rect {
    	width: 108px;
	    height: 108px;
	    margin: -71px 0 0 -71px;
	    background: rgb(231,118,52);
	    transform: rotateZ(45deg);
    }
    .superscript-off .rect-off{
    	background: rgb(152,153,154);
    }
    .superscript .desc {
    	position: absolute;
    	top: 9%;
		left: 1%;
    	z-index: 1;
    	color: #fff;
    	transform: rotateZ(-45deg);
    	font-weight: bold;
    }
</style>
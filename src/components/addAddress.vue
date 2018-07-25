<template>
	<div class="addAddress">
		<div class="inner">
			<div class="item">
				<label>收货人</label>
				<input type="text" placeholder="姓名">
			</div>
			<div class="item">
				<label>联系电话</label>
				<input type="text" placeholder="手机">
			</div>
			<div class="item">
				<label>所在地区</label>
				<vue-area :propsShow="show" :propsResult="result" @result="areaResult"></vue-area>
			</div>
			<div class="item">
				<label class="row-style">详细地址</label>
				<textarea rows="2" placeholder="尽可能详细"></textarea>
			</div>
			<div class="item">
				<label>设为默认</label>
			</div>
			<div class="bottom">
				<div class="c-btn inner-btn" @click="close">取消</div>
				<div class="e-btn inner-btn">完成</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import vueArea from 'vue-area'

	export default{
		name : 'addAddress',
		data() {
			return {
				result: null,
    			show: false
			}
		},
		props : {
			close : {
				type : Function,
				default : () => {console.log('close')}
			}
		},
		components : {
			vueArea
		},
		methods: {
			areaResult(show,result) {
				this.show = show
		        this.result = result
			}
		}
	}
</script>

<style>
	.addAddress{
		background-color: rgba(0,0,0,.3);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.addAddress .inner{
		margin: 30vw 20px 0;
		background-color: #fff;
		border-radius: 15px;
		text-align: left;
		padding: 10px;
	}
	.addAddress .inner .item{
		border-bottom: 1px solid #eee;
		padding: 10px;
		font-size: 0.9rem;
	}
	.addAddress .inner label{
		display: inline-block;
		width: 33%;
	}
	.addAddress .inner input{
		outline: none;
		font-size: 0.9rem;
		width: 63%;
	}
	.addAddress .inner textarea{
		outline: none;
		font-size: 0.9rem;
		width: 63%;
		resize: none;
	}
	.addAddress .inner .row-style{
		float: left;
		line-height: 50px;
	}
	input::-webkit-input-placeholder{
		color: #999;
	}
	textarea::-webkit-input-placeholder{
		color: #999;
	}
	.addAddress .bottom:after{
		content: '';
		display: block;
		clear: both;
		height: 0;
		overflow: hidden;
	}
	.addAddress .bottom .inner-btn{
		display: inline-block;
		margin: 14px 14px 10px;
		border-style: solid;
		border-width: 1px;
		line-height: 30px;
		border-radius: 5px;
		padding: 0 10px;
	}
	.addAddress .bottom .c-btn{
		float: left;
	}
	.addAddress .bottom .e-btn{
		float: right;
	}
</style>
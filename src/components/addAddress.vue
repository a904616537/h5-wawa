<template>
	<div class="addAddress">
		<div class="inner">
			<div class="item">
				<label>收货人</label>
				<input type="text" v-model="data.name" placeholder="姓名">
			</div>
			<div class="item">
				<label>联系电话</label>
				<input type="text" v-model="data.tel" placeholder="手机">
			</div>
			<div class="item" @click="show = true">
				<label>所在地区</label>
				<div class="input">{{address}}<span class="fa fa-angle-right" /></div>
				<vue-area :propsShow="show" @result="areaResult"></vue-area>
			</div>
			<div class="item">
				<label class="row-style">详细地址</label>
				<textarea v-model="data.address" rows="2" placeholder="尽可能详细"></textarea>
			</div>
			<div class="item">
				<label>设为默认</label>
				<v-switch ref="switch" class="input" v-model="is_default"></v-switch>
			</div>
			<div class="bottom">
				<div class="c-btn inner-btn" @click="close">取消</div>
				<div class="e-btn inner-btn" @click="onSubmit">完成</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import Vue       from 'vue'
	import vueArea   from 'vue-area'
	import vueSwitch from '@/components/switch';

	export default{
		name : 'addAddress',
		data() {
			return {
				data : {
					id       : 0,
					uid      : 0,
					name     : '',
					tel      : '',
					address  : '',
					default  : 0,
					province : '',
					country  : '中国',
					city     : '',
					area     : ''
				},
				is_default : false,
				result     : null,
				show       : false
			}
		},
		props : {
			close : {
				type    : Function,
				default : () => {console.log('close')}
			},
			onPress : {
				type    : Function,
				default : () => {console.log('onPress')}
			}
		},
		computed : {
			address() {
				if(this.data.province != '' && this.data.city != '' && this.data.area != '') {
					return this.data.province + this.data.city + this.data.area;
				} else return '请选择你的地址'
			},
		},
		components : {
			vueArea,
			'v-switch' : vueSwitch
		},
		methods: {
			areaResult(show,result) {
		        this.show = show
		        if(this.data && result) {
		        	this.data.province = result.province.name;
		        	this.data.city = result.city.name;
		        	this.data.area = result.area.name;
		        }
			},
			onSubmit() {
				this.data.default = this.$refs.switch.me_checked?1:0;
				this.onPress(this.data);
			},
			onEdit(data) {
				this.data = data;
				this.is_default = data.default == 0?false : true;
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
		border-bottom : 1px solid #eee;
		padding       : 10px;
		font-size     : 0.9rem;
		display: flex;
		align-items: center;
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
	.addAddress .inner .input{
		outline    : none;
		font-size  : 0.9rem;
		width      : 63%;
		display    : inline-block;
		text-align : right;
		color      : #999;
	}
	.addAddress .inner .input span {
		font-size   : 18px;
		margin-left : 0.5em;
		display     : inline-block;
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
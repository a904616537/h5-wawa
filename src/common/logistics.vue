<template>
	<div class="logistics">
		<v-nav>物流详情</v-nav>
		<div class="card">
			<div class="img">
				<img :src="data.pic" class="img-style" />
				<div class="img-title"><span class="font-style">共1件商品</span></div>
			</div>
			<div class="infor">
				物流公司: 百世快递<br>
				物流单号: 71136264418351
			</div>
			<div class="btn" v-clipboard="danhao" @success="handleSuccess" @error="handleError">复制</div>
		</div>
		<div class="content">
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
			<div class="point">
				<div class="date">
					04-19<br/>
					<span>11:11</span>
					<div class="icon"></div>
				</div>
				<div class="details">
					已签收，上海市|上海市【BEX上海浦东世纪公园分布】，签收已签收
				</div>
			</div>
		</div>

		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import axios from 'axios';
	export default{
		name : 'logistics',
		data() {
			return {
				count  : '11',
				data   : {},
				danhao : 71136264418351
			}
		},
		methods : {
			handleSuccess() {
				this.$modal.show('dialog', {
					title   : '已经复制到剪切板了！',
					buttons : [{
						title   : '确定',
						handler : () => { 
							this.$modal.hide('dialog');
						}
					}]
				})
			},
			handleError() {
				this.$modal.show('dialog', {
					title   : '复制失败了！',
					text    : '你到浏览器不支持此操作！',
					buttons : [{
						title   : '确定',
						handler : () => { 
							this.$modal.hide('dialog');
						}
					}]
				})
			},
			_queryExpress(code) {
		    	let url = `http://www.kuaidi100.com/autonumber/autoComNum`
		    	const param = {
					resultv2 : 1,
					text     : code
		    	}
		    	axios.get(url,{
					params : param,
					responseType: 'jsonp'
				})
				.then(result => result.data)
				.then(data => {
		        	console.log('查询快递公司 结果', data)
		        	if(data.auto && data.auto.length > 0) {
		        		this._getExpressResult(data.auto[0].comCode, data.num);
		        	}
				})
				.catch(err => {
					console.log('error', err)
				})
		    },
		    _getExpressResult(type, code) {
		    	let url = 'http://www.kuaidi100.com/query'
		    	const param = {
					type,
					postid : code
		    	}

		    	axios.get(url,{
					params : param,
					responseType: 'jsonp'
				})
				.then(result => result.data)
				.then(data => {
					console.log('查询快递结果', data);
		        	if(data.ischeck == 1) {
		        		this.logs = data.data;
		        	}
				})
				.catch(err => {
					console.log('error', err)
				})
		    }
		},
		created() {
			console.log('this.$router', this.$route)
			this.data = this.$route.query;
		}
	}
</script>

<style>
	.logistics{
		left             : 0;
		right            : 0;
		top              : 0;
		height           : 100%;
		font-size        : 12px;
		position         : absolute;
		background-color : rgb(238,240,249);
		color            : #333;
	}
	.logistics .card{
		margin: 5px 0;
		background-color: #fff;
		display: flex;
		text-align: left;
		padding: 4vw;
		font-size: 14px;
	}
	.logistics .img{
		position: relative;
	}
	.logistics .img-style{
		width: 64px;
		height: 64px;
	}
	.logistics .img-title{
		position: absolute;
		bottom: 1vw;
		left: 0;
		right: 0;
		color: #fff;
		background-color: rgba(0,0,0,.6);
	}
	.logistics .font-style{
		display: block;
		font-size: 10px;
		transform: scale(0.8);
		text-align: center;
	}
	.logistics .infor{
		flex: auto;
		margin: auto 0;
		padding-left: 3vw;
		line-height: 20px;
	}
	.logistics .card .btn{
		font-size: 12px;
		flex: auto;
		margin: auto;
		text-align: center;
		border: 1px solid #333;
		border-radius: 15px;
		position: relative;
		top: 10px;
	}
	.logistics .content{
		padding: 10px 0;
		text-align: left;
		font-size: 14px;
	}
	.logistics .content .point{
		display: flex;
		padding-right: 10px;
	}
	.logistics .content .date{
		width: 110px;
		text-align: center;
		border-right: 2px solid #ccc;
		margin-right: 18px;
		padding-bottom: 30px;
		position: relative;
	}
	.logistics .point:last-child .date{
		border: none;
	}
	.logistics .content .date span{
		font-size: 12px;
		color: #999;
	}
	.logistics .content .icon{
		width: 22px;
		height: 22px;
		border-radius: 50px;
		position: absolute;
		right: -11px;
		top: 0;
		background-color: #ccc;
	}
</style>
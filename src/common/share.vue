<template>
	<div class="share" :style="share_bg">
		<div class="change_bg">
			<div class="btn boy" :class="{selectboy : !is_girlbg}" @click="is_girlbg = false">
				男生版
			</div>
			<div class="btn girl" :class="{selectgirl : is_girlbg}" @click="is_girlbg = true">
				女生版
			</div>
		</div>
		<img :src="share_link" class="qrcode" :class="{iphonex : proportion}">
		<div class="wechat-view">
			<div class="wechat-btns">
				<span>点击右上角分享噢！</span>
				<!-- <div class="wechat-item" @click="onMenuShareAppMessage">
					<img :src="wechat">
					<span>分享给好友</span>
				</div>
				<div class="wechat-item"  @click="onMenuShareTimeline">
					<img :src="wechatTimeline">
					<span>分享到朋友圈</span>
				</div> -->
			</div>
			<div class="cancel" @click="onBack">取消</div>
		</div>
		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex';

	export default{
		name : 'share',
		data() {
			return {
				is_girlbg      : false,
				wechat         : './static/images/hall/wechat.png',
				wechatTimeline : './static/images/hall/wechatTimeline.png',
				boybg          : 'background-image: url(./static/images/hall/sharebg0.jpg)',
				girlbg         : 'background-image: url(http://waguo.vip/h5/wawa/static/images/hall/sharebg1.jpg)',
			}
		},
		computed : {
			...mapState({
				url : state => state.Hall.share_link,
			}),
			share_link() {
				const url = `http://waguo.vip/mobile/qrCode?url=${this.url}`;
				return url;
			},
			share_bg() {
				return this.is_girlbg?this.girlbg : this.boybg
			},
			share_img() {
				return this.is_girlbg?'http://waguo.vip/h5/wawa/static/images/192.png':'http://waguo.vip/h5/wawa/static/images/192.png'
			},
			proportion() {
				const height = window.screen.height;
				const width = window.screen.width;
				return height/width > 2 ? true : false;
			}
		},
		methods : {
			onBack() {
				this.$router.back();
			},
			onMenuShareAppMessage() {
				console.log('分享给好友')
			},
			onMenuShareTimeline() {
				console.log('分享到朋友圈')
			},
		},
		mounted() {
			wx.onMenuShareAppMessage({
				title   : '抓娃娃王国', // 分享标题
				desc    : '手机随时随地抓娃娃，抓中包邮送到家！送你55币免费抓娃娃，已有92%玩家免费抓到娃娃！', // 分享描述
				link    : this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl  : this.share_img, // 分享图标
				type    : 'link', // 分享类型,music、video或link，不填默认为link
				success : () => {
			    	console.log('分享给朋友成功')
			    	this.$modal.show('dialog', {
						title   : '分享成功啦！',
						text    : '干的漂亮！',
						buttons : [{
							title   : '知道了，退下吧',
							handler : () => { 
								this.$modal.hide('dialog');
							}
						}]
					})
				},
				cancel(res) {
					// alert('取消分享'+JSON.stringify(res))
				},
				fail(res) {
					// alert('分享失败'+JSON.stringify(res))
				}
			});
			wx.onMenuShareTimeline({
				title   : '抓娃娃王国', // 分享标题
				desc    : '手机随时随地抓娃娃，抓中包邮送到家！送你55币免费抓娃娃，已有92%玩家免费抓到娃娃！', // 分享描述
				link    : this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl  : this.share_img, // 分享图标
				success : () => {
			    	this.$modal.show('dialog', {
						title   : '分享成功啦！',
						text    : '干的漂亮！',
						buttons : [{
							title   : '知道了，退下吧',
							handler : () => { 
								this.$modal.hide('dialog');
							}
						}]
					})
				},
				cancel(res) {
					// alert('取消分享'+JSON.stringify(res))
				},
				fail(res) {
					// alert('分享失败'+JSON.stringify(res))
				}
			})
		}
	}
</script>



<style>
	.share {
		width               : 100vw;
		height              : 100vh;
		background-size     : cover;
		background-repeat   : no-repeat;
		background-position : top center;
	}
	.share .change_bg{
		left       : 0;
		top        : 50%;
		margin-top : -25vw;
		position   : absolute;
	}
	.share .btn{
		width            : 80px;
		height           : 30px;
		border           : 2px #fff solid;
		font-size        : 12px;
		line-height      : 30px;
		border-radius    : 0 8px 8px 0;
		background-color : #fff;
	}
	.share .btn.selectboy {
		background-color: #efd76c;
	}
	.share .btn.selectgirl {
		background-color: #feb68d;
	}
	.share .qrcode {
		bottom   : 6.5vh;
		left     : 11vw;
		width    : 20vw;
		height   : 20vw;
		position : absolute;
	}
	.share .qrcode.iphonex {
		left   : 3vw;
		width  : 24vw;
		height : 24vw;
	}
	.wechat-view {
		font-size        : 10px;
		bottom           : 0;
		width            : 100vw;
		position         : fixed;
		background-color : #fff;
	}
	.wechat-view .wechat-btns {
		display         : flex;
		align-items     : center;
		flex-direction  : row;
		justify-content : center;
		padding: 10px 0;
	}
	.wechat-view .wechat-btns .wechat-item {
		flex           : auto;
		display        : flex;
		flex-direction : column;
		align-items    : center;
	}
	.wechat-view .wechat-btns .wechat-item img{
		width: 8vw;
		height: 8vw;
	}
	.wechat-view .cancel {
		padding    : 10px 0;
		border-top : 0.5px solid #ddd;
	}
</style>
<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-23 15:49:02
* @Description
* @Flow 
-->

<template>
	<canvas id="decoded"></canvas>
</template>

<script>

    // import '@/utils/od.js';
	// import '@/utils/gpack.js';

    export default{
        data() {
            return {
				player : null	
            }
        },
        props: {
			src         : {
				type    : String,
				default : ''
			},
			onReloadEnd : {
				type    : Function,
				default : () => {
					// console.log('视频已加载', this.src)
				}
        	}
        },
        watch: {
        },
		computed : {
		},
        methods : {
        	onInit() {
        		this.player = new GLPlayer({
					wsHost		:'ws://106.14.162.126:8080', 
				 	url			:'rtmp://21509.liveplay.myqcloud.com/live/21509_1_18b',
				 	canvas		: document.getElementById('decoded'),
				 	videoinfo	: {width:360,height:640}
				 });
        		this.onStart();
        	},
        	onStart() {
        		console.log('视频开始播放')
        		this.player.start();
        	},
        	onStop() {
        		console.log('视频结束播放')
        		this.player.stop();
        	},
        	onPause() {
        		console.log('视频暂停播放')
        		this.player.pause();
        	},
        },
        mounted() {
        	console.log('初始化视频插件')
			this.onInit();	
		}
    }
</script>

<style>

</style>

<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-23 15:49:02
* @Description
* @Flow 
-->

<template>
    <div v-if="validation" v-show="true">
        <video-player
			class="video-player-box"
			ref="videoPlayer"
			:options="playerOptions"
			:playsinline="true"
			customEventName="customstatechangedeventname"
			@play="onPlayerPlay($event)"
			@pause="onPlayerPause($event)"
			@ended="onPlayerEnded($event)"
			@waiting="onPlayerWaiting($event)"
			@playing="onPlayerPlaying($event)"
			@loadeddata="onPlayerLoadeddata($event)"
			@timeupdate="onPlayerTimeupdate($event)"
			@canplay="onPlayerCanplay($event)"
			@canplaythrough="onPlayerCanplaythrough($event)"

			@statechanged="playerStateChanged($event)"
			@ready="playerReadied"
			>
		</video-player>
    </div>
</template>

<script>
    export default{
        data() {
            return {
				
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
					console.log('视频已加载', this.src)
				}
        	}
        },
        watch: {
        },
		computed : {
			player() {
				return this.$refs.videoPlayer.player
			},
			validation() {
				console.log('validation', this.src)
				return this.src == ''?false : true;
			},
			playerOptions() {
				return {
					width    : '100%',
					muted    : true,
					preload  : 'auto',
					language : 'zh-CN',
					live     : true,
					autoplay : true,
					techCanOverridePoster : true,
					aspectRatio : '9:16',
					poster   : "/static/images/hall/2.png",
					html5    : {
						hls: { withCredentials: true }
					},
					sources   : [{
            			// type: "video/mp4",
						type            : "application/x-mpegURL",
						src             : this.src,
						withCredentials : false
					}],
					controlBar : false
				}
			},
		},
        methods : {
			onPlayerPlay(player) {
				// console.log('onPlayerPlay')
				// console.log('player play!', player)
			},
			onPlayerPause(player) {
				// console.log('onPlayerPause')
				// console.log('player pause!', player)
			},
			playerStateChanged(playerCurrentState) {
				// console.log('playerStateChanged')
				// console.log('player current update state', playerCurrentState)
			},
			playerReadied(player) {
				// console.log('the player is readied', player)
				// you can use it to do something...
				// player.[methods]
			},
			onPlayerEnded(player) {
				// console.log('onPlayerEnded')
			},
			onPlayerPlaying(player) {
				// console.log('onPlayerPlaying')
			},
			onPlayerLoadeddata(player) {
				// console.log('加载')
			},
			onPlayerWaiting(player) {
				// console.log('onPlayerWaiting')

			},
			onPlayerTimeupdate(player) {

			},
			onPlayerCanplay(player) {
				// console.log('onPlayerCanplay')
			},
			onPlayerCanplaythrough(player) {
				this.onReloadEnd();
				// console.log('onPlayerCanplaythrough')
			}
        }
    }
</script>

<style>
.video-player-box, .video-js {
	width: 100vw;
}
.vjs-default-skin.vjs-big-play-centered .vjs-big-play-button {
	/* Center it horizontally */
	left: 50%;
	margin-left: -2.1em;
	/* Center it vertically */
	top: 50%;
	margin-top: -1.4000000000000001em;
}
 video::-webkit-media-controls,
    video::-moz-media-controls,
    video::-webkit-media-controls-enclosure{
    display:none !important;
}

video::-webkit-media-controls-panel,
video::-webkit-media-controls-panel-container,
video::-webkit-media-controls-start-playback-button {
    display:none !important;
    -webkit-appearance: none;
}
</style>

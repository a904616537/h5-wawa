<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-23 15:49:02
* @Description
* @Flow 
-->

<template>
    <div v-show="show" class="canvas">
        <div v-if="isforesight" class="foresight">
            <img :src="foresight">
        </div>
        <canvas :id="v_id" :width="360" :height="height"></canvas>
    </div>
</template>

<script>

    export default{
        data() {
            return {
                player    : null,
                foresight : './static/images/hall/videoplay/foresight.png'
            }
        },
        props: {
            show : {
                type    : Boolean,
                default : false
            },
            isforesight : {
                type    : Boolean,
                default : false
            },
			src         : {
				type    : String,
				default : ''
			},
			onReloadEnd : {
				type    : Function,
				default : () => {
					// console.log('视频已加载', this.src)
				}
        	},
            index : {
                type    : Number,
                default : 0
            }
        },
        watch: {
            src : function(val, old) {
                console.log('初始化视频插件', this.player)
                if(this.player) {
                    console.log('update url', this.player)
                    this.player._url.tcUrl = this.src;
                    this.onStop();
                    this.onInit();
                } else this.onInit();
            }
        },
		computed : {
            validation() {
                console.log('validation', this.src)
                return this.src == ''?false : true;
            },
            v_id() {
                return `decoded${this.index}`
            },
            scrollWidth() {
                return document.body.scrollWidth
            },
            width() {
                return window.screen.width + 10;
            },
            height() {
                return window.screen.height - 80;
            }
		},
        methods : {
        	onInit() {
                 console.log('新的视频插件加载');
        		this.player = new GLPlayer({
                     wsHost        :'ws://106.14.162.126:8080', 
                     url           : this.src,
                     canvas        : document.getElementById(this.v_id),
                     videoinfo     : { width : 360, height : 640, scale : 100},
                     jspath        : "./static/js/",
                     startCallBack : this.onReloadEnd
				 });
                
        		this.onStart();
        	},
        	onStart() {
                this.player.start();
        	},
        	onStop() {
                 console.log('结束插件')
        		this.player.stop();
                this.player = null;
        	},
        	onPause() {
        		this.player.pause();
        	},
        },

        mounted() {
        	if(this.src != '') {
                this.onInit();
            }
		},
        destroyed() {
            this.onStop();
        }
    }
</script>

<style>
@keyframes foresightFade{
    from{
        opacity : 0.4;
    },
    to{
        opacity : 1;
    }
}
.canvas {
    position : relative;
    width    : 100%;
    height   : 100vh;
}
.foresight {
    top             : 0;
    left            : 0;
    width           : 100%;
    height          : 100%;
    display         : flex;
    position        : absolute;
}
.foresight img {
    width                     : 20vw;
    height                    : 20vw;
    top                       : 35vh;
    left                      : 12vw;
    position                  : absolute;
    animation-name            : foresightFade;
    animation-duration        : 1s;
    animation-timing-function : ease-out;
    animation-delay           : 1s;
    animation-iteration-count : infinite;  
    animation-direction       : alternate;
}


</style>

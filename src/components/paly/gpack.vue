<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-23 15:49:02
* @Description
* @Flow 
-->

<template>
    <div v-show="show" class="canvas">
        <canvas :id="v_id" :width="width" :height="height"></canvas>
    </div>
</template>

<script>

    export default{
        data() {
            return {
				player : null	
            }
        },
        props: {
            show : {
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
                    // this.onReloadEnd();
                } else {
                    this.onInit();
                }
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
        		this.player = new GLPlayer({
					wsHost		:'ws://106.14.162.126:8080', 
				 	url			: this.src,
				 	canvas		: document.getElementById(this.v_id),
				 	videoinfo	: { width : 360, height : 640, scale : 100},
                    jspath      : "./static/js/"
				 });

                // var context= this.player.dst_renderer._canvas.getContext('2d');
                // // this.player.dst_renderer._canvas.width  = 424;
                // // this.player.dst_renderer._canvas.height = 656;
                // context.fillRect(10, 20, 424, 656);
                // setTimeout(() => {
                //     console.log('start', this.player.dst_renderer)

                //     this.player.dst_renderer._context.scale(100, 100);
                // }, 1000);
                
        		this.onStart();
        	},
        	onStart() {
                this.player.start();
                setTimeout(() => {
                    this.onReloadEnd();
                }, 1000);
        	},
        	onStop() {
        		this.player.stop();
                this.player = null;
        	},
        	onPause() {
        		console.log('视频暂停播放')
        		this.player.pause();
        	},
        },

        mounted() {
        	if(this.src != '') {
                console.log('初始化视频插件')
                this.onInit();
            }
		},
        destroyed() {
            console.log('离开');
            this.onStop();
        }
    }
</script>

<style>
.canvas {
    width  : 100%;
    height : 80vh;
}
</style>

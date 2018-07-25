<template>
    <div class="circle_view">
        <progress-bar class="circle" type="circle" color="#FFc920" ref="line" v-show="show" :options="options">
            <!-- <p>{{lastsec}}s</p> -->
        </progress-bar>
    </div>
    
</template>

<script>
    export default{
        data() {
            return {
                timer   : null,    // 计时器
                lastsec : 30,
                options : {
                    trailColor : '#666',
                    strokeWidth : 4,
                    trailWidth  : 4,
                    easing      : 'easeInOut',
                    duration    : 30000,
                    text : {
                        autoStyleContainer : false
                    }
                }
            }
        },
        props: {
            show : false,
            onEnd : {
                type    : Function,
                default : () => {console.log('close the mask')}
            },
            onStart : {
                type    : Function,
                default : () => {}
            },
            maxSec : {
                type    : Number,
                default : 0
            },
            duration : {
                type    : Number,
                default : 0
            }
        },
        watch: {
            show : function(val) {
                if(val) this.setSeconds();
            }
        },
        mounted: function () {
            
        },
        methods : {
            end() {
                clearInterval(this.timer);
                this.timer   = null;
                this.lastsec = 30;
                this.onEnd();
            },
            stop() {
                clearInterval(this.timer);
                this.timer   = null;
                this.lastsec = 30;
            },
            setSeconds() {
                this.$refs.line.setText(`${this.lastsec}s`)
                this.$refs.line.animate(1.0)                
                let sec = this.maxSec - this.duration,
                sttime  = Date.now() + sec;

                this.timer = setInterval(() => {
                    this.lastsec = Math.floor((sttime - Date.now()) / 1000);
                    this.$refs.line.setText(`${this.lastsec}s`)
                    if(this.lastsec <= 0) {
                        this.end();
                    }
                }, 950);
            }
        }
    }
</script>

<style>
.circle_view {
    right    : 1vh;
    bottom   : 2vh;
    position : absolute;
}
.circle {
    width            : 80px;
    height           : 80px;
    border-radius    : 40px;
    position         : relative;
    display          : flex;
    justify-content  : center;
    align-items      : center;
    background-color : #fff;
}
.circle div{
    font-size : 18px;
    color     : #888;
    position  : absolute;

}
</style>
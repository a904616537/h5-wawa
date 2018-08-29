<template>
    <div class="play_success" @click="onCancel">
    	<div class="success_view">
    		<img :src="data.gift_pic"/>
    		<div class="buttons">
    		 	<div class="btn" @click="onShare">炫耀一下</div>
    		 	<div class="btn" @click="onPress">再抓一个</div>
    		 </div>
    	</div>
    </div>
    
</template>

<script>
    export default{
        data() {
            return {
            }
        },
        props: {
        	data : {
				type    : Object,
				default : () => {return {}}
        	},
        	onPress : {
				type    : Function,
				default : () => {}
        	},
        	onCancel : {
        		type    : Function,
				default : () => {}
        	}
        },
        mounted() {
        	console.log('success', this.data);  
        },
        methods : {
        	onShare() {
        		this.$router.push({ path : '/share' })
        	}
        }
    }
</script>

<style lang="scss">
	$apiurl: 'http://c.waguo.net/h5/wawa';
.play_success {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	display          : flex;
	position         : fixed;
	align-items      : center;
	justify-content  : center;
	background-color : rgba(0,0,0,0.4);
}
.play_success .success_view {
	width            : 80vw;
	height           : 60vh;
	background-size  : 100% 100%;
	display          : flex;
	flex-direction   : column;
	align-items      : center;
	justify-content  : flex-end;
	background-image : url($apiurl + '/static/images/hall/videoplay/bgSuccess.png');
}
.success_view img {
	width         : 150px;
	height        : 150px;
	border-radius : 85px;
	border        : 5px solid #fff;
	margin-bottom : 12vh;
}
.success_view .buttons {
	margin         : 3vh 0;
	display        : flex;
	flex-direction : row;
	align-items    : center;
}
.success_view .buttons .btn {
	width            : 30vw;
	height           : 6vh;
	margin           : 0 1vw;
	border-radius    : 3vh;
	color            : #fff;
	font-weight      : 800;
	font-size        : 16px;
	background-color : #e16d38;
	display          : flex;
	justify-content  : center;
	align-items      : center;
}
</style>
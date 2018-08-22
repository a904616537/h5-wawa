<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-08-08 11:20:41
* @Description
* @Flow 
-->


<template>
	<div v-if="bVisible" class="bonusbox" @click="onOpen">
		<span>{{bBonus?"开宝箱" : strCountDown }}</span>
		<div class="bonusbox-icon" :style="bonusboxbg"></div>
	</div>
</template>

<script>
	import Vue   from 'vue';
	import axios from 'axios';
    import {mapState, mapActions} from 'vuex';

	var g_arrPrizes  = [ 10, 20, 50 ];
	var g_nPrize     = 10;
	var g_nlid       = 0;
	var g_bCountDown = false;

	export default{
		name: 'hall-header-bonus',
		data() {
			return {
				bonusboxbg   : 'background-image:url(./static/images/hall/share/bonusbox.png)',
				bClose       : false,	// 玩家关闭宝箱
				bVisible     : false,	// 显示宝箱
				bBonus       : false,
				nSeconds     : 0,
				dtSync       : null,	// 与服务端同步倒计时间 时当前系统时间
				strCountDown : '00:00',
				bAnimated    : false,
				pCountDown   : null
			}
		},
		computed : {
			...mapState({
				token : state => state.User.token,
			}),
		},
		methods : {
			...mapActions([
				'openBox'
            ]),
			onUpdateTime(){
				// 获得倒计时间
				axios.get(Vue.setting.api + '/time_data',{
					params : {token : this.token}
				})
				.then(result => result.data)
				.then(result => {
					console.log('AppConfig.httpBonusTime', result)
					this.onSyncTime(result);
				})
				.catch(err => {
					console.log('error', err)
				})
			},
			onSyncTime( data ){
		        if ( data == undefined ){
		            console.log( "Can't get countdown time in bonus" );
		        }
		        try {
		            let arrParam = data;

		            let result = arrParam[ 'ret' ];
		            let nBonusState = arrParam['state'];
		            if ( result == 0 ){
		                g_nPrize = arrParam[ 'bonus' ];
		                g_arrPrizes = arrParam[ 'list' ];

		                if ( nBonusState == 1 ) {
		                    g_bCountDown = false;
		                    this.nSeconds = "00:00:00";
		                    this.bBonus = true;
		                }
		                else {
		                    this.onCountDown();
		                    this.nSeconds = arrParam[ 'countdown' ] < 0 ? 0 : arrParam[ 'countdown' ];
		                    this.dtSync = parseInt( Date.now() + 1000 );
		                    this.bBonus = false;
		                }
		                this.bVisible = true;
		            }
		            else if( result == 1 ) {

		                if( nBonusState == 2 || nBonusState == 3 ){
		                    // 2 = 宝箱奖品今天已全部领取，宝箱将不显示
		                    // 3 = 活动已结束
		                    g_bCountDown = false;
		                    this.bBonus = false;
		                    this.bVisible = false;
		                }
		                // console.log( "BonusBox server msg : " + arrParam[ 'msg' ] );
		            }
		            else {
		                // console.log( "BonusBox onSyncTime error : " + arrParam[ 'msg']);
		            }
		        }
		        catch ( e ) {
		            // console.log( "BonusView onSyncTime error : " + e.message );
		        }
		    },
		    onCountDown(){
		        try {
		            g_bCountDown = true;
		            this.pCountDown = setInterval(() => {

		                if ( g_bCountDown ) {
		                    let dtDiff = parseInt( ( Date.now() - this.dtSync ) / 1000 );

		                    let nDiffS = this.nSeconds - dtDiff;

		                    //console.log( "Calc time : " + dtDiff + ">>>>" + nDiffS );

		                    if ( nDiffS >= 0 ){

		                        let nTemp = this.onTransformTime( nDiffS );
		                        this.strCountDown = nTemp
		                        if(!this.bVisible){
		                        	this.bVisible = true;
		                        }
		                    }
		                    else {
		                    	this.strCountDown = "00:00:00";
		                    	this.bBonus = true;
		                        g_bCountDown = false;
		                        this.onUpdateTime();
		                    }
		                } else {
		                	console.log('清理计时器？？？')
		                    clearInterval( this.pCountDown );
		                }
		            }, 1000 );
		        }
		        catch ( e ) {
		            // console.log( "onCountDown " + e.message );
		        }
		    },
		    // 时间秒转换成小时：分钟：秒
		    onTransformTime( nSeconds ){

		        if ( nSeconds != null ){

		            var nHours =parseInt( nSeconds / 3600 )

		            var nMinutes = this.formatString( parseInt( ( nSeconds - nHours * 3600 ) / 60 ) );

		            var nSecondTemp = this.formatString( nSeconds % 60 );
		            if(nHours==0){
		                return  nMinutes + ":" + nSecondTemp;
		            }else{
		                return nHours + "小时";
		            }
		        }

		        return "00:00:00";
		    },
		    formatString( nValue ){
		        if ( nValue == undefined ){
		            return "00";
		        }
		        else {
		            if ( nValue < 10 ){
		                return "0" + nValue;
		            }
		        }
		        return nValue;
		    },
			onPop(){
				this.bClose = false;
				if ( this.bBonus && this.bVisible ){
					this.onClose();
				}
			},
			onClose( bClose ){
				// 关闭大厅时，并不是玩家操作关闭
				bClose = bClose == undefined ? false : bClose;

				g_bCountDown = false;
				if ( this.bVisible ){
					this.bClose = bClose;
					this.bVisible = false;
				}
			},
			// 开宝箱操作
			onOpen(){
				// 打开宝箱！
				if(this.bBonus) {
					this.openBox(true);
					this.bClose = false;
					this.bVisible = false;
				}
			}
        },
        mounted() {
        	this.onUpdateTime();
        }
	}
</script>

<style>
.bonusbox {
	width           : 50px;
	display         : flex;
	flex-direction  : column;
	align-items     : center;
	justify-content : center;
}
.bonusbox span{
	color            : #8e562a;
	width            : 40px;
	height           : 12px;
	border           : 0.5px #8e562a solid;
	font-size        : 9px;
	line-height      : 12px;
	margin-bottom    : 3px;
	border-radius    : 7px;
	background-color : #fff;
}
.bonusbox .bonusbox-icon {
	width               : 25px;
	height              : 20px;
	background-position : center;
	background-repeat   : no-repeat;
	background-size     : 100% 100%;
}
</style>
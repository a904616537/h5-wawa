<template>
  <div id="app">
    <router-view/>
    <v-adv />
    <aplayer v-if="offPlayer" v-show="false" :mini="true" :shuffle="true" repeat="repeat-all" autoplay :music="music" :list="music_list"/>
  </div>
</template>

<script>
    
    import Vue                    from 'vue';
    import {mapState, mapActions} from 'vuex';
    import PubSub                 from 'pubsub-js';
    import login_help             from '@/utils/login_help';
    import pomelo_key             from '@/utils/pomelo_key';
    import Adv                    from './adv';
    import axios from 'axios';

    export default {
        name: 'App',
        data() {
            return {
                music : {
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/01.mp3',
                    pic    : './static/images/192.png'
                },
                music_list : [{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/01.mp3',
                    pic    : './static/images/192.png'
                },{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/02.mp3',
                    pic    : './static/images/192.png'
                },{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/03.mp3',
                    pic    : './static/images/192.png'
                },{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/04.mp3',
                    pic    : './static/images/192.png'
                },{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/05.mp3',
                    pic    : './static/images/192.png'
                },{
                    title  : '抓娃娃王国',
                    artist : '抓娃娃王国',
                    src    : 'http://c.waguo.net/client/music/06.mp3',
                    pic    : './static/images/192.png'
                }],
                pubsub       : PubSub.subscribe('setRoom', this.onSub),
                userRoomCard : PubSub.subscribe(pomelo_key.room.user.update, this.onUpdateUserRoomCard),
                modifyMyInfo : PubSub.subscribe(pomelo_key.user.info, this.onUpdateUserInfo),
            }
        },
        components : {
            'v-adv' : Adv
        },
        computed : mapState({
            user         : state => state.User.user,
            token        : state => state.User.token,
            is_login     : state => state.User.isLogin,
            offPlayer    : state => {
                let is_off = state.User.offPlayer;
                return is_off.toString() == 'true'
            },
            platformData : state => {
                return state.User.platformData && state.User.platformData !='undefined'? true : false
            }
        }),
        methods : {
            ...mapActions([
                'setHallSetting',
                'onLogin',
                'setRoomInfo',
                'updateUserRoomCard',
                'updateUserInfo'
            ]),
            onSub(msg, data) {
                console.log('监听 ->', msg, data)
                this.setRoomInfo(data);
            },
            onUpdateUserRoomCard(msg, data) {
                console.log('监听 ->', msg, data)
                this.updateUserRoomCard(data);
            },
            onUpdateUserInfo(msg, data) {
                console.log('监听 ->', msg, data)
                this.updateUserInfo(data);
            },
            onRefresh(code) {
                console.log('微信登陆 code', code)
                const data = {
                    platform : "weixin",
                    token    : code,
                    device   : "",
                    // bundleid : 'com.wawakingdom.top',
                    bundleid : 'wawa.h5',
                    duid     : '',
                    ver      : '',
                    adid     : '',
                    lang     : "zh_CN",
                    ua       : "Wechat",
                    gss      : 666,
                    lang     : "zh_CN",
                    type     : 'google',
                    f        : '',
                    ac       : 1
                }
                login_help.onGetSetting(data)
                .then(result => {
                    if(result.data != 0) {
                        this.onLogin({
                            user         : result.data.user,
                            token        : result.data.login.token,
                            platformData : result.data.login.platformData
                        })
                        this.setHallSetting(result.data);
                    } else console.log('获取配置失败!');
                })
                .catch(err => {
                    console.log('onGetSetting error', err);
                });
            },
            onInitWechatSDK() {
                axios.get(`${Vue.setting.api}/getJssign`, {})
                .then(result => result.data.data)
                .then((result) => {
                    console.log('获取微信SDK', result);

                    wx.config({
                        debug     : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId     : result.appId, // 必填，公众号的唯一标识
                        timestamp : result.timestamp, // 必填，生成签名的时间戳
                        nonceStr  : result.nonceStr, // 必填，生成签名的随机串
                        signature : result.signature,// 必填，签名
                        jsApiList : [
                            'onMenuShareTimeline',      //分享到朋友圈
                            'onMenuShareAppMessage',    // 分享给朋友
                            'hideAllNonBaseMenuItem',   // 隐藏多余的微信按钮
                            'closeWindow'               // 离开微信浏览器
                        ]
                    });
                    wx.ready(() => {
                        console.log('初始化微信SDK成功');
                        wx.hideAllNonBaseMenuItem();
                    });

                    wx.error((res) => {
                        console.log('微信验证失败！', res)
                    });

                })
                .catch((error) => {
                    console.log('初始化微信SDK失败', error);
                });
            }
        },
        created() {
            this.onInitWechatSDK();
            //获取url中的参数
            function getUrlParam(name) {
                const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                const r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]); return null;
            }

            const code = getUrlParam('code');
            console.log('code', code)
            if(code) {
                console.log('code 登陆')
                this.onRefresh(code);
            }
            else if(this.is_login && this.platformData) {
                console.log('缓存登陆', this.user)
                const data = {
                    token  : this.token,
                    device : 'google',
                    ver    : '1.0.9.3',
                    rand   :  Date.now()
                };
                console.log('get setting', data)
                login_help.onGetSetting(data, 'config')
                .then(result => {
                    if(result.data != 0) {
                        this.onLogin({user : result.data.user})
                        this.setHallSetting(result.data);
                    } else console.log('获取配置失败!');
                })
                .catch(err => {
                    console.log('onGetSetting error', err);
                });
            }
            else {
                console.log('测试玩家登陆');
                const data = {
                    token  : "wXTx4NnbKL.ptlV-WZfzKDS6XNvDgaCq.-nNXlOuUDtyv-HLFRtG-Q-sM9hvxGe0dl6OTnWp7S5CipWEXZjUdtnv0W866RlsjO9VHaVNJ8Y!",
                    device : 'google',
                    ver    : '1.0.9.3',
                    rand   :  Date.now()
                };
                login_help.onGetSetting(data, 'config')
                .then(result => {
                    if(result.data != 0) {
                        console.log('result.data', result.data)
                        this.onLogin({user : result.data.user, token : data.token})
                        this.setHallSetting(result.data);
                    } else console.log('获取配置失败!');
                })
                .catch(err => {
                    console.log('onGetSetting error', err);
                });
            }
        }
    }
</script>

<style>
#app {
    overflow-x       : hidden;
    overflow-y       : auto;
    font-family             : 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing  : antialiased;
    -moz-osx-font-smoothing : grayscale;
    text-align              : center;
}
body{
  overflow-x       : hidden;
  overflow-y       : auto;
  margin           : 0;
  background-color : #f3f0e3;
}
h4{
    margin : 0;
}
ul{
    margin: 0;
    padding: 0;
}
li{
    list-style: none;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}

/*.bounce-fade-enter, .bounce-fade-leave-to
 .slide-fade-leave-active for below version 2.1.8  {
  transform: translateX(100vw);
  opacity: 0;
}*/

/* v-r-transition, default is {forward: 'forward', back: 'back'}*/
.forward-enter, .forward-leave {
  transform: translate3d(-100%, 0, 0);
}
.back-enter, .back-leave {
  transform: translate3d(100%, 0, 0);
}
</style>

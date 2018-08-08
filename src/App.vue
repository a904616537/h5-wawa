<template>
  <div id="app">
    <router-view/>
    <v-adv />
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
            }
        },
        created() {
            wx.hideAllNonBaseMenuItem();
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
  transform: translateY(-100px);
  opacity: 0;
}

</style>

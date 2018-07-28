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
            const code = this.$route.query.code;
            console.log('code', code)
            if(code) {
                this.onRefresh(code);
            } else {
                const data = {
                    token  : 'wXTx4NnbKL.ptlV-WZfzKOLPZja8oSm74CSWv3aAJMeAh.mgYNkam5QXFgPgOKMu55g9DfUKSLZ3XdxV-rYaXw6csT8kBDaZAhKwuPGjf1TjPKYPA3aULA!!',
                    device : 'google',
                    ver    : '1.0.9.3',
                    rand   :  Date.now()
                };
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
  overflow-x : hidden;
  overflow-y : auto;
  margin: 0;
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
</style>

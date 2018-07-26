<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    
    import Vue                    from 'vue';
    import {mapState, mapActions} from 'vuex';
    import PubSub                 from 'pubsub-js';
    import login_help             from '@/utils/login_help';
    import pomelo_key             from '@/utils/pomelo_key';

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
            onRefresh() {
                const data = {
                    device : 'iPhone%206%20Plus',
                    ver    : '1.2.5.23',
                    token  : 'WEykzXDbKiQBi9iGmLu218rSaKtHUCex4JLYVSqPS8-pcU6BJs3QnPgIf1pY2yrN3NwJDXRD215Wu9OUpo3oQKqAJH6LHM7B74Q914oSi6TqWk-guPd4Kg!!',
                    rand   : '1531796233482'
                }
                login_help.onGetSetting(data)
                .then(result => {
                    if(result.data != 0) {
                        this.onLogin(result.data.user)
                        this.setHallSetting(result.data);
                    } else console.log('获取配置失败!');
                })
                .catch(err => {
                    console.log('onGetSetting error', err);
                });
            }
        },
        created() {
            this.onRefresh();
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

</style>

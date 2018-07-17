<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    
    import Vue from 'vue';
    import {mapState, mapActions} from 'vuex';
    import login_help from './utils/login_help';


    export default {
        name: 'App',
        data() {
            return {

            }
        },
        computed : mapState({
        }),
        methods : {
            ...mapActions([
            ]),
        },
        created() {
            login_help.onGetSetting();
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
    background : #f3f0e3;
    overflow-x : hidden;
    overflow-y : auto;
    margin     : 0;
}
h4{
    margin : 0;
}
</style>

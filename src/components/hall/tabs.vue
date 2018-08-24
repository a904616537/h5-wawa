<!--
* Sample Vuejs 
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-07-17 14:21:13
* @Description
* @Flow 
-->

<template>
	<div id="fixedBar" class="bar-list" :class="{ fixedBar: isFixed }">
		<ul >
	        <li v-for="(item) in data" :key="item.key" v-if="item.list && item.list.length > 0" :class="[item.key == key ? 'checked' : '']" @click="() => onClick(item.key)">{{item.cateName}}</li>
		</ul>
	</div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
	export default{
		name: 'hall-tabs',
		data() {
			return {
				key       : 1,
				offsetTop : 0,
				isFixed   : false
			}
		},
		props : {
			data    : {
				type    : Array,
				default : () => [{cateName : '全部', key : 1}]
			},
			onScroll : {
				type    : Function,
				default : () => {}
			}
		},
		watch : {
			isFixed : function(val, old) {
				this.onScroll(val);
			}
		},
		methods : {
			...mapActions([
                'updateRoomCate'
            ]),
			onClick(index) {
				this.key = index;
				this.updateRoomCate(index)
			},
		    handleScroll () {
		        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		        if (scrollTop >= this.offsetTop)this.isFixed = true;
		        else this.isFixed = false;
		    }
        },
        mounted() {
        	this.offsetTop = document.querySelector('#fixedBar').offsetTop;
        	window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
			window.removeEventListener('scroll', this.handleScroll);
		}
	}
</script>

<style>
.fixedBar {
	top      : 0;
	left     : 0;
	width    : 100%;
	z-index  : 1;
	position : fixed;
}
.bar-list ul{
	width            : 100%;
	height           : 6vh;
	font-size        : 14px;
	margin           : 0 0 5px;
	padding          : 0;
	text-align       : left;
	float            : left;
	display          : inline;
	white-space      : nowrap;
	overflow-x       : scroll;
	overflow-y       : hidden;
	background-color : #f3f0e3;
}
.bar-list ul::-webkit-scrollbar {
    display: none;
}
.bar-list li{
	display     : inline-block;
	padding     : 0 10px;
	line-height : 30px; 
	color       : #BF6A0B;		
}
.bar-list li.checked{
	border-bottom: 2px solid #BF6A0B;
}
</style>
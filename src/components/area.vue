<template>
	<div class="area-box">
		<vue-area propsShow="show" propsResult="result" @result="areaResult"></vue-area>
	</div>
</template>

<script>
	import Vue from 'vue'
	import vueArea from 'vue-area'

	export default{
		name : 'area-box',
		data() {
			return {
 				result: null,
    			show: false
			}
		},
		components: {
		    vueArea
		},
		methods: {
			areaResult(show, result){
		        this.show = show
		        this.result = result
		    }
		}
	}
</script>
<template>
	<div class="area-box">
		<v-distpicker></v-distpicker>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Distpicker from 'v-distpicker'
	Vue.component('v-distpicker', Distpicker)

	export default{
		name : 'area-box',
		data() {
			return {

			}
		}
	}
</script>
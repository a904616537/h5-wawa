<template>
	<div class="productInfo" @click="click">
		<div class="inner">
			<div class="card">
				<div v-for="(item, index) in pics" class="img-style" :key="index" :style="'background-image: url('+ item +');'"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		name : 'productInfo',
		data() {
			return {

			}
		},

		computed : {
			...mapState({
				current_room : state => state.Room.current_room,
			}),
			pics() {
				if(this.current_room.pics && this.current_room.pics != '') {
					return JSON.parse(this.current_room.pics);
				} else return []
			}
		},
		props: {
			click : {
				type : Function,
				default : () => {console.log('close the mask')}
			}
		}
	}
</script>

<style>
	.productInfo{
		background-color: rgba(0,0,0,.3);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.productInfo .inner{
		margin: 8vh 10px;
		background-color: #fff;
		border-radius: 10px;
		height: 62vh;
		overflow: scroll;
	}
	.productInfo .inner .img-style{
		width: 100%;
		padding-bottom: 100%;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: top center;
	}
</style>
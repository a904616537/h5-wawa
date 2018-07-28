<template>
	<div class="vueSwitch">
		<span class="switch-icon" :class="{'switch-on' : me_checked}" :value="value" @click="toggle"></span>
	</div>
</template>

<script>
	export default{
		name : 'vueSwitch',
		data() {
			return {
				me_checked: this.value
			}
		},
		props : {
			value : {
				type : Boolean,
				default : true
			}
		},
		methods: {
	      	toggle() {
	        	this.me_checked = !this.me_checked;
	      	}
	    }
	}
</script>

<style>
	.vueSwitch{
	}
	.switch-icon {
	    display: block;
	    position: relative;
	    width: 42px;
	    height: 22px;
	    border: 1px solid #DFDFDF;
	    outline: 0;
	    border-radius: 16px;
	    box-sizing: border-box;
	    background-color: #DFDFDF;
	    transition: background-color 0.1s, border 0.1s;
	    cursor: pointer;
  	}
  	.switch-icon:before {
	    content: " ";
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 40px;
	    height: 20px;
	    border-radius: 15px;
	    background-color: #FDFDFD;
	    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  	}
	.switch-icon:after {
	    content: " ";
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 20px;
	    height: 20px;
	    border-radius: 15px;
	    background-color: #FFFFFF;
	    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
	}
	.switch-on {
	    border-color: #1AAD19;
	    background-color: #1AAD19;
	}
	.switch-on:before {
	    border-color: #1AAD19;
	    background-color: #1AAD19;
    }
    .switch-on:after {
    	transform: translateX(20px);
    }
</style>

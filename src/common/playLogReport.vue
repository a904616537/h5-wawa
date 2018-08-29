<template>
	<div class="reports">
		<v-nav>我要申诉</v-nav>
		<div class="report">
			<div class="title">申诉理由</div>
			<div v-for="(item, index) in questions" class="item" :class="{select : message.index == index}" @click="onSelect(index, item)">
				<div class="question">{{item}}</div>
				<i class="fa" :class="[{'fa-check-circle-o' : message.index == index}, {'fa-circle-o' : message.index != index}]"></i>
			</div>
			<textarea v-show="other" id="other" maxlength="100" v-model.trim="message.text" placeholder="请描述您的问题，最长不超过100个字" class="other"></textarea>
		</div>
		<div class="btns">
			<div v-if="submit" class="btn" @click="onSubmit">提交申诉</div>
		</div>
		<v-dialog width="80%"/>
	</div>
</template>

<script>
	import Vue    from 'vue';
	import moment from 'moment';
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'

	export default{
		name : 'playlog',
		data() {
			return {
				item      : {},
				message   : {
					index : -1,
					text  : ''
				},
				questions : [
					"抓取操作过程中系统切维护",
					"娃娃被抓住在洞口正上方",
					"娃娃掉进洞口却显示抓取失败",
					"画面卡住不动，卡顿不流畅",
					"进行过程中突然闪退，退出应用",
					"爪子没反应，没法移动",
					"画面黑屏/不显示",
					"没能成功上机就扣币",
					"我一次抓了两个，只计算了一个",
					"其他问题"
				]
			}
		},
		computed : {
			...mapState({
				pomelo : state => state.Pomelo.pomelo,
				user   : state => state.User.user || {},
			}),
			other() {
				return this.message.index == 9? true : false;
			},
			submit() {
				return this.message.index == -1 || this.message.text == ''?false : true;
			}
		},
		methods : {
			...mapActions([
			]),
			onSelect(index, val) {
				this.message.index = index;
				this.message.text  = val;
				if(this.message.index == 9) {
					this.message.text = "";
					document.getElementById('other').focus();
				}
			},
			onSubmit() {
				const model = Object.assign(this.item, {cmd : "report", reason : this.message.text, uid : this.user.uid});
				this.pomelo.request('hall.g.custom', model, (result) => {
					this.$modal.show('dialog', {
						title   : '申诉成功，我们将尽快处理!',
						buttons : [{
							title   : '晓得啦',
							handler : () => { 
								this.$modal.hide('dialog');
								this.$router.go(-2);
							}
						}]
					})
				});
			},
		    moment(date) {
		    	return moment(date).format('YYYY-MM-DD HH:mm:ss');
		    }
		},
		mounted() {
			if(this.$route.query.hasOwnProperty('lid')) {
				this.item = this.$route.query;
			} else this.$router.back();
		}
	}
</script>

<style>
.reports {
	width            : 100vw;
	height           : 100vh;
	background-color : #fff;
}
.report {
	padding          : 5vw;
	display          : flex;
	flex-direction   : column;
	align-items      : flex-start;
	color            : #666;
}
.report .title {
	color         : #000;
	font-size     : 12pt;
	font-weight   : 900;
	margin-bottom : 5vh;
}
.report .other {
	width      : 100%;
	height     : 10vh;
	margin-top : 2vh;
}
.report .item{
	width           : 100%;
	font-size       : 10pt;
	margin          : 10px;
	display         : flex;
	justify-content : center;
	flex-direction  : row;
}
.report .item.select{
	color: #f2d56e;
}

.report .item .question {
	flex       : auto;
	text-align : left;
}
.report .item i {
	font-size : 14pt;
}
.reports .btns {
	display: flex;
	justify-content: center;
	align-items: center;
}
.reports .btn {
	display          : flex;
	align-items      : center;
	justify-content  : center;
	color            : #fff;
	font-size        : 12pt;
	width            : 30vw;
	height           : 5vh;
	border-radius    : 2vh;
	background-color : #EE9900;
	transition       : ease 0.6s;
}


</style>
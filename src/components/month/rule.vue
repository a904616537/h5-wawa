<template>
	<div class="rule" @click="close">
		<div class="inner">
			<div class="title">签到规则</div>
			<p>
				1. 用户每天签到可获得20王国券，连续签到6天，14天，21天，30天即可获得40王国券。
			</p>
			<p>
				2. 签到期间避免断签，否则签到进度将重新开始。
			</p>
			<p>
				3. 用户可通过消耗王国券仅限补签，每次补签消耗80王国券。
			</p>
			<p>
				4. 用户连续签到6天，14天，21天，30天，除了常规领奖外还可额外抽奖机会，每个阶段抽奖机会仅仅使用一次，且抽奖次数当日有效。
			</p>
		</div>
	</div>
</template>

<script>
	export default{
		name : 'rule',
		data() {
			return {

			}
		},
		props : {
			close : {
				type : Function,
				default : () => {console.log('close')}
			}
		}
	}
</script>

<style>
	.rule{
		background-color: rgba(0,0,0,.2);
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 100%;
		color: #999;
		text-align: left;
	}
	.rule .inner{
		background-color: #fff;
		padding: 20px 30px 40px;
		border-radius: 10px;
		margin: 20px 70px;
	}
	.rule .inner .title{
		text-align: center;
		font-size: 16px;
		color: #333;
	}
	.rule .inner p{
		margin: 14px 0;
	}
</style>
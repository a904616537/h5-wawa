import Vue   from 'vue';
import axios from 'axios';
export default {
	onPayment(openid, unionid, pkey) {
		return new Promise((resolve, reject) => {
			let body = {
				openid,
				unionid,
				pkey
			};
			axios.get(Vue.setting.api + '/wx_app_pay', {
				params : body
			})
			.then((response) => {
				const {jssign, prepay_id, paySign} = response.data.data;
				const data = {
					appId     : jssign.appId,
					timeStamp : `${jssign.timestamp}`,
					nonceStr  : jssign.nonceStr,
					package   : prepay_id,
					signType  : 'MD5',
					paySign   : paySign
				}
				console.log('payment =======>>>>> ', data)
				WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
			        if(res.err_msg == "get_brand_wcpay_request:ok"){
			            console.log('支付成功！', res)
			            resolve(res)
			        }else{
			        	reject(res)
			        	console.log('支付失败！', res);
			        }
			    });
			})
			.catch((error) => reject(error));
		})
	}
}


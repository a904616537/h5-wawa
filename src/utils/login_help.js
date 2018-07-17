/**
* FileType js
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-17 11:02:46
* @Description
* @Flow 
*/


// http://waguo.vip/mobile/config?device=iPhone%206%20Plus&ver=1.2.5.23&token=WEykzXDbKiQBi9iGmLu218rSaKtHUCex4JLYVSqPS8-pcU6BJs3QnPgIf1pY2yrN3NwJDXRD215Wu9OUpo3oQKqAJH6LHM7B74Q914oSi6TqWk-guPd4Kg!!&rand=1531796233482

/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-02 10:52:43
* @Description
* @Flow 
*/

import Vue   from 'vue';
import vuex  from 'vuex';
import axios from 'axios';

export default {
	onGetSetting(user) {
		return new Promise((resolve, reject) => {
			const {api} = Vue.setting;
			console.log('vuex =======> ', vuex)
			const data = {
				device : 'iPhone%206%20Plus',
				ver    : '1.2.5.23',
				token  : 'WEykzXDbKiQBi9iGmLu218rSaKtHUCex4JLYVSqPS8-pcU6BJs3QnPgIf1pY2yrN3NwJDXRD215Wu9OUpo3oQKqAJH6LHM7B74Q914oSi6TqWk-guPd4Kg!!',
				rand   : '1531796233482'
			}
			axios.get(`${api}/config`, {
				params : data
			})
			.then((response) => {
				console.log('onGetSetting response', response);
			})
			.catch((error) => {
				console.log('onGetSetting error', error);
			});
	    });
	}
}
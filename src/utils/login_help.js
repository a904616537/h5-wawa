/**
* FileType js
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-02 10:52:43
* @Description
* @Flow 
*/

import Vue   from 'vue';
import axios from 'axios';

export default {
	onGetSetting(data, url = 'authorize') {
		return new Promise((resolve, reject) => {
			const {api} = Vue.setting;
			axios.get(`${api}/${url}`, {
				params : data
			})
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	    });
	}
}
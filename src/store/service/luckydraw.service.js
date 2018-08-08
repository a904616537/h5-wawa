/**
 * Sample React Redux
 * @Author: Kain·Shi <a904616537@outlook.com>
 * @describe
 * @flow
 */
import moment from 'moment';

export default {
    onInit(state, payload) {
    },
    // 记录
    setLogs(state, data) {
        let {lucky_draw_log} = state;
        lucky_draw_log.push(data);
    },
	// 抽奖操作
    onPlayLucky(state, payload) {
        let {cb} = payload;
        if(!cb) cb = () => {};
        if(state.lucky_draw_count < 1) return cb({status : false, msg : '抽奖次数不够！'});

        // 幸运值总数
        let total_luck = 0;
        // 幸运值列表
        const luck_list = state.prizes.map((val, index) => {
            const min = total_luck;
            total_luck += val.luck;
            return {
                index,
                max : total_luck,
                min : min
            }
        })
        // 获取随机数
        const random = Math.floor(Math.random()* total_luck);
        // 查找奖励
        const lucky_index = luck_list.findIndex(val => random < val.max && random >= val.min);
        const lucky = state.prizes[lucky_index];

        state.lucky_draw_count -= 1;    // 抽奖次数减1
        cb({status : true, data : lucky})
    },
}

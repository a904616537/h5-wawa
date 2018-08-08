/**
 * Sample React Redux
 * @Author: Kain·Shi <a904616537@outlook.com>
 * @describe
 * @flow
 */
import moment from 'moment';


const momentFormat = (date) => {
    if(typeof date === 'string') date = moment(date);
    return date.clone().format('YYYY-MM-DD');
}

export default {
	// 连续签到验证
    onContinuous(state, next) {
    	console.log('连续签到', state)
        if(!next) next = () => {}

    	state.count = 0;
        // 整理时间顺序
        let list = state.day_list.sort((a, b) => moment(b).isBefore(moment(a), 'days'));

        let day = null;
        let today = moment();

		day = today.clone().startOf('month');
        // 有签到才开始
        if(list.length > 0) {
            while(!day.isAfter(today, 'days')) {
                // 查找连续天
                const isday = list.find(val => moment(val).isSame(day))
                // 连签存在
                if(isday) {
                    state.count++;
                    // 判断是否有奖励
                    if(state.award_day.has(state.count)) {
                        // 验证是否已经领取奖励
                        if(state.continuous.has(state.count))
                            console.log(`连续签到${state.count}天奖励已经领取`)
                        else {
                            console.log(`连续签到${state.count}天奖励触发操作`)
                            state.continuous.add(state.count)
                            next({status : true, count : state.count});
                        }
                        state.continuous = new Set([...state.continuous])
                    }
                }
                else {
                    // 不存在，重新计算
                    // 如果是当天还未签到
                    if(!day.isSame(today, 'days')) {
                        state.count = 0;
                    }
                }
                day.add(1, 'day')
            }
        }
    },
    onInit(state, action) {
    	this.onContinuous(state, action.next);

        // 连续签到奖品录入
        if(action.bonus){
            state.bouns = action.bonus.map(val => state.bonus.set(val.key, val.value))
        }
        

    	state.keyboard = [];

        let today   = moment();  // 当前时间加了10天，方便测试
        let day     = today.clone().startOf('month');
        let weekday = day.weekday();    // 获取 1 号是周几

        let start_week = 0;
        while (start_week < weekday)
        {
            state.keyboard.push(null);
            start_week++;
        }
        
        // 迭代整个月
        while(day.isSame(today, 'month')) {
            let disabled = false;
            const filterDate = state.day_list.find(val => day.isSame(moment(val)))

            // 已经签到的日期，和不能签到的日期判定
            if(filterDate || day.isAfter(today, 'days')) disabled = true;
            let btn = {
				date      : day.clone(),
				is_filter : false,	// 是否处于签到期间
				is_click  : false,	// 是否开启事件
				disabled
            };
            

            if(filterDate) {
            	btn.is_filter = true;
            }
            else if(!day.isAfter(today, 'days') && day.isAfter(moment(state.startDate), 'days')) btn.disabled = false;

            state.keyboard.push(btn)
            day.add(1, 'day')
        }

    }
}
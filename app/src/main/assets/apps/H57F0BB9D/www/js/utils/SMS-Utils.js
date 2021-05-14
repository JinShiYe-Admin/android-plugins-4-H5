/**
 * 短信发送模块  
 * 依赖于 storageKeyName.js/publicProtocol.js/events.js,请放在他们之后
 */
var SMSUtils = (function(mod) {
	
	mod.INDEX_CODE;//引用页的index_code
	mod.PERSONAL;//登录人信息
	mod.MSG_TYPE;//短信类型
	mod.USER_TYPE;//目标用户类型
	mod.SMS_TYPE;//信息类型 (由短信中心定义分配)
	
	
	/**
	 * 1.38.6 获取短信配置
	 * @param {Object} callback 回调函数
	 * 
	 * callback   SMS 是否有短信配置，有配置就可以发送短信  CONFIG 当SMS为true时返回，返回短信配置对象
	 */
	mod.getConfig = function getConf(callback) {
		var _this=this;
		comData = {
			msg_type: this.MSG_TYPE,
			sch_code: this.PERSONAL.unit_code,
			index_code: this.INDEX_CODE
		}
		postDataEncry(window.storageKeyName.INTERFACE_HR_SUB + 'smsConf/getConf', {}, comData, 2, function(datas) {
			if (datas.code == 0) {
				if (datas.data) {
					if (datas.data.user_types) {
						let config_types=datas.data.user_types.split(",");
						let local_types=_this.USER_TYPE.split(",");
						let send=false;
						config_types.map(citem=>{
							local_types.map(litem=>{
								if(citem==litem){
									send=true
								}
							})
						})
						callback({SMS: send,CONFIG: datas.data});
					} else {
						callback({SMS: false});
					}
				} else {
					callback({SMS: false});
				}
			} else {
				events.closeWaiting();
				mui.toast(datas.msg);
			}
		});
	}

	/**
	 * 1.40.1 获取拒绝词/敏感词
	 * @param {Object} callback 回调函数
	 * @param {Object} TYPE 类型 1敏感词 2拒绝词
	 * 
	 * callback   WORDS 关键词列表
	 */
	mod.getSmsWords = function getSmsWords(callback,TYPE) {
		comData = {
			page_size: 100000,
			page_number: 1,
			status: 1,
			keyword: '',
			type: TYPE,
			index_code: this.INDEX_CODE
		}
		postDataEncry(window.storageKeyName.INTERFACE_HR_SUB + 'smsWords/page', {}, comData, 2, function(datas) {
			if (datas.code == 0) {
				callback({WORDS:datas.data.list})
			} else {
				events.closeWaiting();
				mui.toast(datas.msg);
			}
		});
	}
	
	
	/**
	 * 1.31 短信发送
	 * @param {Object} callback 回调函数
	 * 		@param {Object} is_delay 是否延迟短信
	 * 		@param {Object} delay_time 延迟时间
	 * 		@param {Object} msg_content 短信内容
	 * 		@param {Object} serviced 服务状态
	 * 		@param {Object} is_short 是否为短短信
	 * 		@param {Object} list 目标用户对象
	 * 
	 * callback   hr_id 记录ID
	 */
	mod.sendSMS=function sendSms(callback,is_delay,delay_time,msg_content,serviced,is_short,list,tempCode,tempUser){
		comData = {
			send_unit_code:this.PERSONAL.unit_code,
			send_user:tempCode?tempCode:this.PERSONAL.user_code,
			send_user_tname:tempUser?tempUser:this.PERSONAL.user_name,
			send_soure:'schapp#[APP]',
			send_time:moment().format('YYYY-MM-DD HH:mm:ss'),
			is_delay:is_delay,
			delay_time:delay_time,
			msg_content:msg_content,
			msg_type:this.MSG_TYPE,
			serviced:serviced,
			is_short:is_short,
			sms_msgtype_code:this.SMS_TYPE,
			sch_code:this.PERSONAL.unit_code,
			sch_name:this.PERSONAL.unit_name,
			list:list,
			index_code:this.INDEX_CODE
		}
		postDataEncry(window.storageKeyName.INTERFACE_HR_SUB + 'smsRecord/save', {}, comData, 2, function(datas) {
			if (datas.code == 0) {
				callback({hr_id:datas.data.id})
			} else {
				events.closeWaiting();
				mui.toast(datas.msg);
			}
		});
	}

	return mod;
})(SMSUtils || {})

//设置头像，如果有，用本身的，没有给默认值
var setImg = function(imgURL, imgFlag) {
	var tempUrl = '';
	if (imgURL == null || imgURL.length == 0) {
		if (imgFlag == 1) { //订购默认图
			tempUrl = '../../img/order.png';
		} else {
			tempUrl = 'http://www.108800.com/user.jpg';
		}
	} else if(imgURL.indexOf('suptosub') != -1){
		tempUrl = 'http://www.108800.com/user.jpg';
	} else {
		var myDate = new Date();
		tempUrl = imgURL + '?' + myDate.getTime();
	}
	//	console.log('tempUrl000:'+tempUrl);
	return tempUrl;
}

// 3.2:获取指定用户信息
var getUserInfo = function(dataList,indexCode,key,pic_key,callback) {
	var tempCode = [];
	for (var i = 0; i < dataList.length; i++) {
		var tempM = dataList[i];
		tempCode.push(tempM[key]);
	}
	var codes = tempCode.join(',');
	var comData = {
		user_codes: codes,
		index_code: indexCode //
	}
	//3.2:获取指定用户信息
	postDataEncry(window.storageKeyName.INTERFACE_SSO_SUB + 'user/getUserInfo', {}, comData, 2, function(data) {
		events.closeWaiting();
		if (data.code == 0) {
			for (var i = 0; i < dataList.length; i++) {
				var tempPeo = dataList[i];
				if(data.data){
					for (var a = 0; a < data.data.list.length; a++) {
						var tempUser = data.data.list[a];
						if (tempPeo[key] == tempUser.user_code) {
							tempPeo[pic_key] = tempUser.img_url+"?"+new Date().getTime();
						}
					}
				}
			}
			callback(dataList);
		} else {
			mui.toast(data.msg);
		}
	});
}

//将时间转换为显示的格式
var modifyTimeFormat = function(str) {
	var tempStr = '';
	var dt_now = new Date();
	var int_year = dt_now.getYear();
	var dt_item = new Date(str.replace(/-/g, '/'));
	if (int_year == dt_item.getYear()) {
		tempStr = events.format(dt_item, "MM-dd hh:mm")
	} else {
		tempStr = events.format(dt_item, "yyyy-MM-dd hh:mm")
	}
	return tempStr;
}


//判断当前选择时间是否小于是当前实际时间
var contrastTime = function(selctTime) {
	selctTime = selctTime.replace(/-/g, '');
	selctTime = selctTime.replace(/ /g, '');
	selctTime = selctTime.replace(/:/g, '');
	var d = new Date();
	var tempS = events.format(d, "yyyy-MM-dd hh:mm");
	tempS = tempS.replace(/-/g, '');
	tempS = tempS.replace(/ /g, '');
	tempS = tempS.replace(/:/g, '');
	if (parseFloat(tempS) < parseFloat(selctTime)) {
		return 0;
	}
	return 1;
}

//获取未读数
var getUnReadCut = function(access, url, callback) {
	var personal = store.get(window.storageKeyName.PERSONALINFO);
	//不需要加密的数据
	var comData2 = {
		platform_code: personal.platform_code, //平台代码
		app_code: personal.app_code, //应用系统代码
		index_code: access.split("#")[1], //页面码,页面对应的权限码:index结尾的页面码,必传,由前端从皮得到
		unit_code: personal.unit_code, //单位代码
		user_code: personal.user_code, //用户代码
		access_token: personal.access_token,
		numtp: 0,
	};
	//获取权限
	postDataEncry(url, {}, comData2, 0, function(
		data2) {
		console.log('获取未读数 ' + url + '：' + JSON.stringify(data2));
		callback(data2);
	});
}

//获取按钮权限,3.3:根据选择的年级班级科目查询权限符（前端调用，判断按钮是否显示，供子系统调用）
var getPermissionByPosition = function(op_code, access, callback) {
	var personal = store.get(window.storageKeyName.PERSONALINFO);
	//不需要加密的数据
	var comData2 = {
		platform_code: personal.platform_code, //平台代码
		app_code: personal.app_code, //应用系统代码
		unit_code: personal.unit_code, //单位代码
		index_code: access.split("#")[1], //页面码,页面对应的权限码:index结尾的页面码,必传,由前端从皮得到
		op_code: op_code, //操作码,操作码,如add,edit,delete等功能操作码
		grd_code: 0, //年级代码，全部年级则传-1,不需要判断年级则传0
		cls_code: 0, //班级代码，年级下全部班级则传-1，不需要判断班级则传0
		stu_code: 0, //学生代码，全部学生则传-1，不需要判断学生则传0
		sub_code: 0, //科目代码，全部科目则传“-1”，不需要判断年级则传“0”
		access_token: personal.access_token //用户令牌
	};
	//获取权限
	postDataEncry(window.storageKeyName.INTERFACE_SSO_SUB + 'acl/permissionByPosition', {}, comData2, 0, function(
		data2) {
		console.log('权限permissionByPosition:' + JSON.stringify(data2));
		callback(data2);
	});
}

//url,
//encryData,需要加密的字段
//commonData,不需要加密的对象
//flag,0表示不需要合并共用数据，1为添加platform_code、app_code、access_token，2为platform_code、app_code、unit_code、access_token
//callback,返回值
var postDataEncry = function(url, encryData, commonData, flag, callback) {
	checkNewWork(callback);
	//拼接登录需要的签名
	var signTemp = postDataEncry1(encryData, commonData, flag);
	console.log('signTemp000:' + signTemp);
	//生成签名，返回值sign则为签名
	signHmacSHA1.sign(signTemp, 'jsy309', function(sign) {
		//组装发送握手协议需要的data
		//合并对象
		var tempData = $.extend(encryData, commonData);
		//添加签名
		tempData.sign = sign;
		console.log('传递的参数' + url + ':', JSON.stringify(tempData));
		var tempStr = JSON.stringify(tempData).replace(/\\/g, "");
		console.log('tempStr:' + tempStr);
		jQAjaxPost(url, tempStr, callback);
	});
}



//修改数组，改变格式
var arrayToStr1 = function(array) {
	if (array == null) {
		return '[]'
	}
	var tempStr = '';
	tempStr = array.join(',');
	tempStr = '[' + tempStr + ']';
	return tempStr;
}

//拼接参数
var postDataEncry1 = function(encryData, commonData, flag) {
	//循环
	var tempStr = '';
	for (var tempData in encryData) {
		//对value进行加密
		var encryptStr = RSAEncrypt.enctype(encryData[tempData]);
		//修改值
		encryData[tempData] = encryptStr;
	}
	//判断是否需要添加共用数据
	if (flag == 1) {
		//获取个人信息
		var personal = store.get(window.storageKeyName.PERSONALINFO);
		var comData = {
			platform_code: personal.platform_code,
			app_code: personal.app_code,
			access_token: personal.access_token
		};
		commonData = $.extend(commonData, comData);
	} else if (flag == 2) {
		//获取个人信息
		var personal = store.get(window.storageKeyName.PERSONALINFO);
		var comData = {
			platform_code: personal.platform_code,
			app_code: personal.app_code,
			unit_code: personal.unit_code,
			access_token: personal.access_token
		};
		commonData = $.extend(commonData, comData);
	} else if (flag == 3) {

	}
	//将对象转为数组
	var arr0 = [];
	for (var item in encryData) {
		arr0.push(item + '=' + encryData[item]);
	};
	var arr1 = [];
	for (var item in commonData) {
		//		if (typeof commonData[item] == Object) {
		if (commonData[item] instanceof Array) {
			console.log('000');
			arr1.push(item + '=' + JSON.stringify(commonData[item]) + '');
		} else {
			arr1.push(item + '=' + commonData[item]);
		}
	};
	//合并数组
	var signArr = arr0.concat(arr1);
	console.log('signArr:' + signArr);
	//拼接登录需要的签名
	var signTemp = signArr.sort().join('&');
	return signTemp;
}

//修改数组，改变格式
var arrayToStr = function(array) {
	if (array == null) {
		return '[]'
	}
	var tempStr = '';
	tempStr = array.join('","');
	tempStr = '[' + '"' + tempStr + '"' + ']';
	return tempStr;
}

/**
 * 发送 XMLHttpRequest post 的请求
 * @param {Object} url 路径
 * @param {Object} data 数据
 * @param {Object} callback 回调
 */
var xhrPost = function(url, commonData, callback) {
	checkNewWork(callback);
	console.log('XHRP-Url:', url);
	//	console.log('XHRP-Data:', commonData);
	//拼接登录需要的签名
	var signTemp = postDataEncry1({}, commonData, 0);
	console.log('signTemp000:' + signTemp);
	//生成签名，返回值sign则为签名
	signHmacSHA1.sign(signTemp, 'jsy309', function(sign) {
		//组装发送握手协议需要的data
		//合并对象
		var tempData = $.extend({}, commonData);
		//添加签名
		tempData.sign = sign;
		// 等待的对话框
		var urlArr = url.split('/');
		console.log('传递的参数' + urlArr[urlArr.length - 1] + ':', tempData);

		var tempStr = JSON.stringify(tempData).replace(/\\/g, "");
		jQAjaxPost(url, tempStr, callback);
	});
}

var checkNewWork = function(callback) {
	if (plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
		//console.log('没有网络');
		var data = {
			RspCode: '404',
			RspData: '',
			RspTxt: '网络异常，请检查网络设置！'
		}

		callback(data);
		return;
	}
}

var jQAjaxPost = function(url, data, callback) {
	checkNewWork(callback);
	console.log('jQAP-Data:' + data);
	jQuery.ajax({
		url: url,
		type: "POST",
		data: data,
		timeout: 10000,
		dataType: "json",
		contentType: "application/json",
		async: true,
		success: function(success_data) { //请求成功的回调
			console.log('jQAP-Success11111111:' + url + ',' + JSON.stringify(success_data));
			if (success_data.code == 6 || success_data.code == 'sup6' || success_data.code == '0006' || success_data.code ==
				'sup_0006') { //令牌过期
				var publicPar = store.get(window.storageKeyName.PUBLICPARAMETER);
				var personal = store.get(window.storageKeyName.PERSONALINFO);
				var tempToken = {
					index_code: 'index',
					user_code: personal.user_code, //登录名
					uuid: publicPar.uuid, //设备唯一识别码,防同一应用在不同机器上登录互串,验证码校检用
					webid: publicPar.webid, //浏览器识别码,防不同浏览器登录同一应用互串,验证码校检用（web用浏览器类型加版本，app用操作系统+版本））
					device_type: '1' //登录设备类型，0：WEB、1：APP、2：客户端
				}
				console.log('qqq1111111111111111');
				//令牌续订
				postDataEncry(window.storageKeyName.INTERFACE_SSO_SKIN + 'token/refresh', {}, tempToken, 2, function(data1) {
					// console.log('data1:' + JSON.stringify(data1));
					console.log('qwertyuiop');
					if (data1.code == 0) {
						var tempInfo00 = store.get(window.storageKeyName.PERSONALINFO);
						tempInfo00.access_token = data1.data.access_token;
						store.set(window.storageKeyName.PERSONALINFO, tempInfo00);
						var urlArr = url.split('/');
						var tempData = JSON.parse(data);
						tempData.access_token = data1.data.access_token;
						delete tempData.sign;
						console.log('urlArr:' + urlArr[urlArr.length - 1]);
						console.log('data:' + JSON.stringify(tempData));
						postDataEncry(url, {}, tempData, 0, function(data2) {
							data2 = modifyParameter(url, data2);
							callback(data2);
						});
					} else {
						mui.toast(data1.msg);
					}
				});
			} else if (success_data.code == 'sup_0015') {
				mui.toast(success_data.msg);
				setTimeout(function() {
					//获取个人信息
					var personal = store.get(window.storageKeyName.PERSONALINFO);
					//设置app角标,flag=0直接设置角标数字，flag=1角标减1,falg=2角标加1
					utils.setBadgeNumber(0, 0);
					
					//获取所有已打开的webview 实例————重新打开login.html————循环关闭页面
					store.remove(window.storageKeyName.PERSONALINFO);
					plus.webview.open('../../html/login/loginIndex.html', '../../html/login/loginIndex.html', {
						statusbar: {
							background: "#3893D9"
						}
					});
					// utils.mOpenWithData("../../html/login/loginIndex.html", {});
					var curr = plus.webview.currentWebview();
					var wvs = plus.webview.all();
					try {
						for (var i = 0, len = wvs.length; i < len; i++) {
							//关闭除login页面外的其他页面
							if (wvs[i].getURL().indexOf('loginIndex.html') != -1) {
								continue;
							}
							plus.webview.close(wvs[i]);
						}
					} catch (e) {
						console.log(e)
					}
					curr.close();
					events.closeWaiting();
				}, 1000);
			} else {
				success_data = modifyParameter(url, success_data);
				callback(success_data);
			}
		},
		error: function(xhr, type, errorThrown) {
			console.log('jQAP-Error777:', url, xhr, type);
			events.closeWaiting();
			mui.toast('网络连接失败,请重新尝试一下');
			callback({
				code: 404,
				RspData: null,
				msg: "网络连接失败,请重新尝试一下"
			});
		}
	});
}


var modifyParameter = function(url, model) {
	return model;
}

//更换personal 对象的key 值
var repalceKey = function(obj, oldKey, newKey) {
	if (obj instanceof Array) {
		for (var i in obj) {
			obj[i][newKey] = obj[i][oldKey];
			delete obj[i][oldKey];
		}
	} else {
		obj[newKey] = obj[oldKey];
		delete obj[oldKey];
	}
}

//合并参数
var extendParameter = function(data0) {
	var personal = store.get(window.storageKeyName.PERSONALINFO);
	var publicPar = store.get(window.storageKeyName.PUBLICPARAMETER);
	var tempData = {
		uuid: publicPar.uuid,
		appid: publicPar.appid,
		token: personal.utoken
	}
	return $.extend(data0, tempData);
}

//1.绑定
var bindPro = function(data0, callback) {
	var url = 'http://jbyj.jiaobaowang.net/GeTuiPushServer/bind';
	postDataEncry(url,{}, data0,0, callback);
	//	var tempAttendUrl = window.storageKeyName.INTERFACEKONG + 'schoolNotice/';
	//	data0 = extendParameter(data0);
	//	xhrPost('http://jbyj.jiaobaowang.net/GeTuiPushServer/bind', data0, callback);

}

//1.解绑
var unbindPro = function(data0, callback) {
	//	var tempAttendUrl = window.storageKeyName.INTERFACEKONG + 'schoolNotice/';
	//	data0 = extendParameter(data0);
	//	xhrPost('http://jbyj.jiaobaowang.net/GeTuiPushServer/unbind', data0, callback);
	var url = 'http://jbyj.jiaobaowang.net/GeTuiPushServer/unbind';
	postDataEncry(url,{}, data0,0, callback);
}

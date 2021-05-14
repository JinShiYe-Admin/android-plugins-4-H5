//此js用于保存本地存储时，用到的key值

var storageKeyName = (function(mod) {
	mod.key =3; //1:山东开发 2:广西开发 3:联测 4:云测 5:正式 6性能测试
	switch(mod.key) {
		case 1: //山东开发
			mod.PLATFORMCODE = 'PT0002'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://develop309.jiaobaowang.net/ssotoskin/api/skin/'; //单点登录,供PC外皮及APP用户登录,管理
			mod.INTERFACE_SSO_HR = 'http://develop309.jiaobaowang.net/ssotohr/api/hr/'; //单点登录,供人事系统使用
			mod.INTERFACE_SUP_HR = 'http://cs1.108800.com/suptohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_SUB = 'http://develop309.jiaobaowang.net/ssotosub/api/sub/'; //单点登录,供各子系统用
			mod.INTERFACE_HR_SUB = 'http://develop309.jiaobaowang.net/hrtosub/api/sub/'; //人事接口,供子系统用
			mod.INTERFACE_HR_SKIN = 'http://develop309.jiaobaowang.net/hrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用
			mod.INTERFACE_OA = 'http://develop309.jiaobaowang.net:8081/oasubapi/sub/api/';//oa接口(孔)
			mod.INTERFACE_ITEM = 'http://develop309.jiaobaowang.net:8081/imsubapi/sub/api/';//物品管理接口(孔)
			mod.INTERFACE_BASESUB = 'http://develop309.jiaobaowang.net/baseapi/api/baseapi/';//统一信息接口:考务、家校互动用(顾)
			mod.INTERFACE_EXAMINATION = '? 需连广西开发环境';//考务系统接口(蒙)
			mod.INTERFACE_WORK = '? 需连广西开发环境';//学生考勤系统接口(阮)
			mod.INTERFACE_PROGRAMME = 'http://develop309.jiaobaowang.net:8081/tecrcsubapi/sub/api/';//日程（孔)
			mod.INTERFACE_ATTENDAND = 'http://develop309.jiaobaowang.net:8081/tecgpskqsubapi/sub/api/';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = '? 需连广西开发环境';//学生行为（阮)
			mod.INTERFACE_STUPYSUB = '? 需连广西开发环境';//学生评语（阮)
			mod.INTERFACE_DORM = '? 需连广西开发环境';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = '';//学生成绩（蒙)
			mod.INTERFACE_ZXKT = "https://gxcs.jiaobaowang.net/resstudysubapi/api";//智学课堂（廖）
			mod.INTERFACE_KYCP = "http://139.129.252.49:8080/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = '';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = '';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = '? 需连广西开发环境';//学生考勤家长端（阮)、行为与评语
			//七牛上传
			mod.QN_APPID = 15;//七牛appid
			mod.QN_APPKEY = "oakf1010";//七牛appkey
			break;
		case 2: //广西开发
			mod.PLATFORMCODE = 'PT0002'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://139.129.252.49/suptohrsso/api/skin/'; //单点登录,供PC外皮及APP用户登录,管理
			mod.INTERFACE_SSO_HR = 'http://139.129.252.49/suptohrsso/api/hr/'; //单点登录,供人事系统使用
			mod.INTERFACE_SUP_HR = 'http://139.129.252.49:8080/suptohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_SUB = 'http://139.129.252.49/suptosubsso/api/sub/'; //单点登录,供各子系统用
			mod.INTERFACE_HR_SUB = 'http://139.129.252.49:8080/hrtosub/api/sub/'; //人事接口,供子系统用
			mod.INTERFACE_HR_SKIN = 'http://139.129.252.49:8080/hrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用
			mod.INTERFACE_OA = '? 需连山东开发环境';//oa接口(孔)
			mod.INTERFACE_ITEM = '? 需连山东开发环境';//物品管理接口(孔)
			mod.INTERFACE_BASESUB = 'http://139.129.252.49:8080/testbaseapi/api/baseapi/';//统一信息接口:考务、家校互动用(顾)
			mod.INTERFACE_EXAMINATION = 'http://139.129.252.49:8080/stuzy/api/paper/';//考务系统接口(蒙)  貌似没菜单，疫情期间在家，都用的联测
			mod.INTERFACE_WORK = 'http://139.129.252.49:8080/stukqsubapi/attendance/';//学生考勤系统接口(阮) 貌似没菜单，疫情期间在家，都用的联测
			mod.INTERFACE_PROGRAMME = '? 需连山东开发环境';//日程（孔)
			mod.INTERFACE_ATTENDAND = '? 需连山东开发环境';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = 'http://139.129.252.49:8080/stuxwsubapi/behavior/';//学生行为（阮) 
			mod.INTERFACE_STUPYSUB = 'http://139.129.252.49:8080/stuxwsubapi/comment/';//学生评语（阮)
			mod.INTERFACE_DORM = 'http://139.129.252.49:8080/stusssubapi/api/app/';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = 'http://139.129.252.49:8080/stuzy/api/stuScore/';//学生成绩（蒙)
			mod.INTERFACE_KYCP = "http://139.129.252.49:8080/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = '';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = '';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = '';//学生考勤家长端（阮)、行为与评语
			mod.INTERFACE_ZXKT = 'http://192.168.0.114:6925/resstudysubapi/api';//智学课堂（廖）
			//七牛上传
			mod.QN_APPID = 15;//七牛appid
			mod.QN_APPKEY = "oakf1010";//七牛appkey
			break;
		case 3: //联测
			mod.PLATFORMCODE = 'PT0001'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://nwifapp.jiaobaowang.net/ssotoskin/api/skin/'; //单点登录,供PC外皮及APP用户登录,管理
			mod.INTERFACE_SSO_HR = 'http://nwifapp.jiaobaowang.net/ssotohr/api/hr/'; //单点登录,供人事系统使用
			mod.INTERFACE_SUP_HR = 'http://nwifapp.jiaobaowang.net/suptohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_SUB = 'http://nwifapp.jiaobaowang.net/ssotosub/api/sub/'; //单点登录,供各子系统用
			mod.INTERFACE_HR_SUB = 'http://nwifapp.jiaobaowang.net/testhrtosub/api/sub/'; //人事接口,供子系统用
			mod.INTERFACE_HR_SKIN = 'http://nwifapp.jiaobaowang.net/testhrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用
			mod.INTERFACE_OA = 'http://develop309.jiaobaowang.net/oasubapi/sub/api/';//oa接口(孔)
			mod.INTERFACE_ITEM = 'http://develop309.jiaobaowang.net/imsubapi/sub/api/';//物品管理接口(孔)  http://115.28.11.115:8080/imsubapi/sub/api/
			mod.INTERFACE_BASESUB = 'http://nwifapp.jiaobaowang.net/baseapi/api/baseapi/';//统一信息接口:考务、家校用(顾)
			mod.INTERFACE_EXAMINATION = 'http://139.129.252.49:8180/stuzy/api/paper/';//考务系统接口(蒙)
			mod.INTERFACE_WORK = 'http://139.129.252.49:8180/stukqsubapi/attendance/';//学生考勤系统接口(阮)
			mod.INTERFACE_PROGRAMME = 'http://develop309.jiaobaowang.net/tecrcsubapi/sub/api/';//日程（孔)
			mod.INTERFACE_ATTENDAND = 'http://develop309.jiaobaowang.net/tecgpskqsubapi/sub/api/';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = 'http://139.129.252.49:8180/stuxwsubapi/behavior/';//学生行为（阮) 
			mod.INTERFACE_STUPYSUB = 'http://139.129.252.49:8180/stuxwsubapi/comment/';//学生评语（阮)
			mod.INTERFACE_DORM = 'http://139.129.252.49:8180/stusssubapi/api/app/';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = 'http://139.129.252.49:8180/stuzy/api/stuScore/';//学生成绩（蒙)
			mod.INTERFACE_ZXKT = "http://139.129.252.49:8180/resstudysubapi/api";//智学课堂（廖）
			mod.INTERFACE_KYCP = "http://139.129.252.49:8180/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = 'http://nwifapp.jiaobaowang.net/testhsservsubapi/';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = 'http://nwifapp.jiaobaowang.net/testhsservsubapi/';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = 'http://139.129.252.49:8180/stukq/api/app/';//学生考勤家长端（阮)、行为与评语
			//七牛上传
			mod.QN_APPID = 16;//七牛appid
			mod.QN_APPKEY = "oatest1010";//七牛appkey
			break;
		case 4: //云测
			mod.PLATFORMCODE = 'PT0002'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://nwifapp.jiaobaowang.net/ssotoskin/api/skin/'; //单点登录,供PC外皮及APP用户登录,管理  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_HR = 'http://nwifapp.jiaobaowang.net/ssotohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SUP_HR = 'http://nwifapp.jiaobaowang.net/suptohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_SUB = 'http://nwifapp.jiaobaowang.net/ssotosub/api/sub/'; //单点登录,供各子系统用 			     单点对子系统接口
			mod.INTERFACE_HR_SUB = 'http://nwifapp.jiaobaowang.net/hrtosub/api/sub/'; //人事接口,供子系统用 				     人事对子系统接口
			mod.INTERFACE_HR_SKIN = 'http://nwifapp.jiaobaowang.net/hrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用        人事对单点及登录皮肤接口
			mod.INTERFACE_OA = 'http://nwifapp.jiaobaowang.net/oasubapi/sub/api/';//oa接口(孔)
			mod.INTERFACE_ITEM = 'http://nwifapp.jiaobaowang.net/imsubapi/sub/api/';//物品管理接口(孔)
			mod.INTERFACE_BASESUB = 'http://nwifapp.jiaobaowang.net/baseapi/api/baseapi/';//统一信息接口:考务、家校用(顾)
			mod.INTERFACE_EXAMINATION = 'http://nwifapp.jiaobaowang.net/stuzy/api/paper/';//考务系统接口(蒙)
			mod.INTERFACE_WORK = 'http://nwifapp.jiaobaowang.net/stukqsubapi/attendance/';//学生考勤系统接口(阮)
			mod.INTERFACE_PROGRAMME = 'http://nwifapp.jiaobaowang.net/tecrcsubapi/sub/api/';//日程（孔)
			mod.INTERFACE_ATTENDAND = 'http://nwifapp.jiaobaowang.net/tecgpskqsubapi/sub/api/';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = 'http://nwifapp.jiaobaowang.net/stuxwsubapi/behavior/';//学生行为（阮) 
			mod.INTERFACE_STUPYSUB = 'http://nwifapp.jiaobaowang.net/stuxwsubapi/comment/';//学生评语（阮)
			mod.INTERFACE_DORM = 'http://nwifapp.jiaobaowang.net/stusssubapi/api/app/';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = 'http://nwifapp.jiaobaowang.net/stuzy/api/stuScore/';//学生成绩（蒙)
			mod.INTERFACE_ZXKT = "http://nwifapp.jiaobaowang.net/resstudysubapi/api";//智学课堂（廖）
			mod.INTERFACE_KYCP = "http://nwifapp.jiaobaowang.net/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = 'http://nwifapp.jiaobaowang.net/hsservsubapi/';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = 'http://nwifapp.jiaobaowang.net/hsservsubapi/';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = 'http://nwifapp.jiaobaowang.net/stukq/api/app/';//学生考勤家长端（阮)、行为与评语
			//七牛上传
			mod.QN_APPID = 16;//七牛appid
			mod.QN_APPKEY = "oatest1010";//七牛appkey
			break;
		case 5://正式
			mod.PLATFORMCODE = 'PT0001'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://sso.108800.com:8080/ssotoskin/api/skin/'; // 单点对登录框接口
			mod.INTERFACE_SSO_HR = 'http://sso.108800.com:8080/ssotohr/api/hr/'; // 单点对人事接口 (gu )
			mod.INTERFACE_SUP_HR = 'http://sso.108800.com/suptohr/api/hr/'; //单点对人事及登录皮肤接口  (zeng)
			mod.INTERFACE_SSO_SUB = 'http://sso.108800.com:8080/ssotosub/api/sub/'; // 单点对子系统接口
			mod.INTERFACE_HR_SUB = 'http://apps.108800.com/hrtosub/api/sub/'; //人事接口,供子系统用 				     人事对子系统接口
			mod.INTERFACE_HR_SKIN = 'http://apps.108800.com/hrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用        人事对单点及登录皮肤接口
			mod.INTERFACE_OA = 'http://apps.108800.com/oasubapi/sub/api/';//oa接口(孔)
			mod.INTERFACE_ITEM = 'http://apps.108800.com/imsubapi/sub/api/';//物品管理接口(孔)
			mod.INTERFACE_BASESUB = 'http://sso.108800.com:8080/baseapi/api/baseapi/';//统一信息接口:考务、家校用(顾)
			mod.INTERFACE_EXAMINATION = 'http://apps.108800.com/stuzy/api/paper/';//考务系统接口(蒙)
			mod.INTERFACE_WORK = 'http://apps.108800.com/stukqsubapi/attendance/';//学生考勤系统接口(阮)
			mod.INTERFACE_PROGRAMME = 'http://apps.108800.com/tecrcsubapi/sub/api/';//日程（孔)
			mod.INTERFACE_ATTENDAND = 'http://apps.108800.com/tecgpskqsubapi/sub/api/';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = 'http://apps.108800.com/stuxwsubapi/behavior/';//学生行为（阮) 
			mod.INTERFACE_STUPYSUB = 'http://apps.108800.com/stuxwsubapi/comment/';//学生评语（阮)
			mod.INTERFACE_DORM = 'http://apps.108800.com/stusssubapi/api/app/';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = 'http://apps.108800.com/stuzy/api/stuScore/';//学生成绩（蒙)
			mod.INTERFACE_ZXKT = "http://res.108800.com/resstudysubapi/api";//智学课堂（廖）
			mod.INTERFACE_KYCP = "http://res.108800.com/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = 'http://apps.108800.com:8080/hsservsubapi/';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = 'http://apps.108800.com:8080/hsservsubapi/';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = 'http://apps.108800.com/stukq/api/app/';//学生考勤家长端（阮)、行为与评语
			//七牛上传
			mod.QN_APPID = 17;//七牛appid
			mod.QN_APPKEY = "oafor1010";//七牛appkey
			break;
		case 6://性能测试
			mod.PLATFORMCODE = 'PT0002'; //平台代码
			mod.APPCODE = 'schapp#'; //应用系统代码
			mod.INTERFACE_SSO_SKIN = 'http://cs1.108800.com/suptohr2/api/skin/'; //单点登录,供PC外皮及APP用户登录,管理  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_HR = 'http://cs1.108800.com/suptohr2/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SUP_HR = 'http://cs1.108800.com/suptohr/api/hr/'; //单点登录,供人事系统使用                  单点对人事及登录皮肤接口
			mod.INTERFACE_SSO_SUB = 'http://cs1.108800.com/suptohr2/api/sub/'; //单点登录,供各子系统用 			     单点对子系统接口
			mod.INTERFACE_HR_SUB = 'http://cs1.108800.com/hrtosub/api/sub/'; //人事接口,供子系统用 				     人事对子系统接口
			mod.INTERFACE_HR_SKIN = 'http://cs1.108800.com/hrtosup/api/skin/'; //人事接口,供APP或PC注册及外皮用        人事对单点及登录皮肤接口
			mod.INTERFACE_OA = 'http://cs1.108800.com/oasubapi/sub/api/';//oa接口(孔)
			mod.INTERFACE_ITEM = 'http://cs1.108800.com/imsubapi/sub/api/';//物品管理接口(孔)
			mod.INTERFACE_BASESUB = 'http://cs1.108800.com/baseapi/api/baseapi/';//统一信息接口:考务、家校用(顾)
			mod.INTERFACE_EXAMINATION = 'http://cs1.108800.com/stuzy/api/paper/';//考务系统接口(蒙)
			mod.INTERFACE_WORK = 'http://cs1.108800.com/stukqsubapi/attendance/';//学生考勤系统接口(阮)
			mod.INTERFACE_PROGRAMME = 'http://cs1.108800.com/tecrcsubapi/sub/api/';//日程（孔)
			mod.INTERFACE_ATTENDAND = 'http://cs1.108800.com/tecgpskqsubapi/sub/api/';//教师考勤（孔)
			mod.INTERFACE_STUXWSUB = 'http://cs1.108800.com/stuxwsubapi/behavior/';//学生行为（阮) 
			mod.INTERFACE_STUPYSUB = 'http://cs1.108800.com/stuxwsubapi/comment/';//学生评语（阮)
			mod.INTERFACE_DORM = 'http://cs1.108800.com/stusssubapi/api/app/';//学生宿舍（阮)
			mod.INTERFACE_STUSCORE = '';//学生成绩（蒙)
			mod.INTERFACE_ZXKT = "http://res.108800.com/resstudysubapi/api";//智学课堂（廖）
			mod.INTERFACE_KYCP = "http://139.129.252.49:8080/resentestsubapi/api"; //口语测评（廖）
			mod.INTERFACE_SCHHOME = '';//家校互动（顾)
			mod.INTERFACE_SCHHOME_STU = '';//家校互动 学生端（顾)
			mod.PARENTS_ATTENDANCE = '';//学生考勤家长端（阮)、行为与评语
			//七牛上传
			mod.QN_APPID = 16;//七牛appid
			mod.QN_APPKEY = "oatest1010";//七牛appkey
			break;
		default:
			break;
	}
	mod.APPFLAG = 0;//0是普通平台，1是大学平台（大学平台注册没有用户类型)
	mod.FIRSTOPEN = 'firstOpen';//首次打开，判断是否同意用户协议
	mod.PWD_ENCRYPTION = '#@_JFnice_@#';//修改密码时，加密密钥
	mod.SCHOOLID = 100005;//学校ID
	mod.ANDROIDUPDATEURL='http://192.168.1.243:8080/app/versionCode.xml';//安卓升级地址
	mod.IOSUPDATEURL='http://itunes.apple.com/lookup?id=1503612695';//IOS升级地址
	mod.PRIVACE='http://www.jiaobao.net/dl/jiaobaoxiaoyuan/jbxyPrivacy.htm';//用户隐私政策地址
	
	//正式包 屏蔽控制台打印
	// ['log','warn','info','error'].map(function(item){
	// 	if(mod.key==1||mod.key==2||mod.key==3||mod.key==4||mod.key==6){
	// 		console[item]=console[item].bind(console)
	// 	}else{
	// 		console[item]=function(){}
	// 	}
	// })
	
	mod.pay = 0; //0,单个商家接口;1,多商家接口
	// var exLog = console.log;
	// console.log = function(hint, object) {
	// 	if(mod.key === 0) {
	// 		var argus = hint;
	// 		if(typeof(object)!=='undefined') {
	// 			argus = hint + JSON.stringify(object);
	// 		}
	// 		exLog.apply(this, [argus]);
	// 	}
	// }
	
	mod.ALIPAYSERVER='http://192.168.1.121:8081/app/versionCode.xml';//支付宝支付地址
	if(mod.pay==0) {//单商家
		mod.WXPAYSERVER='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/AppServer.aspx';//微信支付地址
		mod.SEARCHPAYSESULT='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/PcQRCode.aspx';//获取支付结果的地址
	}else if(mod.pay==1){//多商家
		mod.WXPAYSERVER='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/AppServer.aspx';//微信支付地址
		mod.SEARCHPAYSESULT='http://jsypay.jiaobaowang.net/jsypaym/wxpay/sys/PcQRCode.aspx';//获取支付结果的地址
	}
	//---七牛空间和接口---开发---start---
	mod.QNPB = 'https://qn-educds.jiaobaowang.net/'; //公开空间域名
	mod.QNGETUPLOADTOKEN = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen';
	mod.QNGETUPTOKENHEADIMGE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen'; //获取上传个人头像，群头像，资料头像到七牛的token的url
	mod.QNGETUPTOKENFILE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen'; //获取上传文件（云存储）到七牛的token的url
	mod.QNGETDOWNTOKENFILE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetAccess'; //获取下载文件（云存储）的token的url，url+七牛文件url
	mod.QNGETTOKENDELETE = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/Delete'; //获取批量（或者一个）删除七牛文件的token的url
	//	---七牛空间和接口---开发---end---
	mod.MENULIST = 'menuList'; //获取菜单列表
	mod.MOREMENU = 'moremenu'; //更多菜单列表
	mod.CHECKUPDATE = 'CHECK'; //是否检查更新
	
	// 智学资源
	mod.CATALOG = 'catalog';//滑动菜单对象
	mod.CATALOGOBJ = 'catalogObj';//滑动菜单选择值对象
	mod.ZJPERCODE = 'zjpercode';//组卷测试 学段选择值对象
	
	mod.BADGENUMBER = 'badgeNumber'//app角标
	mod.PUBLICPARAMETER = 'publicParameter'//共用参数
	mod.ISFIRST = 'isFitst'; //是否是第一次登陆
	mod.PERSONALINFO = 'personalInfo1111'; //个人信息，登录成功后返回值
	mod.SHAKEHAND = 'ShakeHand'; //公钥，登录时，返回的握手信息，
	mod.AUTOLOGIN = 'autoLogin'; //登录信息
	 

	mod.VIDEOSIZE = -1;//视频大小限制 -1为不限制   30 * 1024 * 1024 =30M
	mod.VIDEOLENGTH = 301; //视频时长限制 -1为不限制

	mod.SIGNKEY = 'jsy309'; //签名密钥
	
	mod.STOREAPPID='wxf9b41cac260dd423';

	//七牛空间
	mod.QN_PV_NAME = 'jbsch-pv';//七牛私有空间名
	mod.QN_PB_NAME = 'jbsch-pb';//七牛公有空间名
	//七牛各个模块子级文件夹
	// 头像
	mod.QN_HEADIMG = "headImg/"; //头像
	// oa
	mod.QN_OA_SHIW = "oa/shiw/"; //oa事物
	mod.QN_OA_GZL = "oa/gzl/"; //oa工作流
	mod.QN_OA_ZLSJ = "oa/zlsj/"; //oa资料收集
	mod.QN_OA_TONGZ = "oa/tongz/"; //oa通知
	mod.QN_OA_GONGG = "oa/gongg/"; //oa公告
	mod.QN_OA_XIAOL = "oa/xiaol/"; //oa校历
	// 学生行为
	mod.QN_XSXW_KTXW = "xsxw/ktxw/"; //课堂行为
	mod.QN_XSXW_KWXW = "xsxw/kwxw/"; //课外行为
	mod.QN_XSXW_XSTH = "xsxw/xsth/"; //学生谈话
	// 教师考勤
	mod.QN_JSKQ_WDKQ = "jskq/wdkq/"; //我的考勤
	//---七牛---end---


	
	//----------家校互动短信配置---------start
	mod.MSG_SMS= {
	    SCHOOL:{
	      MSG_TYPE: '1-1', //信息类型 - 学校通知
	      SMS_TYPE: 'jxhd_tz_unit_stugen', //短信类型 - 学校
	      USER_TYPE: 'YHLX0004', //目标用户类型 - 家长
	    },
	    GRADE: {
	      MSG_TYPE: '1-2', //信息类型 - 年级通知
	      SMS_TYPE: 'jxhd_tz_grd_stugen', //短信类型 - 年级
	      USER_TYPE: 'YHLX0004', //目标用户类型 - 家长
	    },
	    CLASS: {
	      MSG_TYPE: '1-3', //信息类型 - 班级通知
	      SMS_TYPE: 'jxhd_tz_cls_stugen', //短信类型 - 班级
	      USER_TYPE: 'YHLX0004', //目标用户类型 - 家长
	    },
	    HOMEWORK: {
	      MSG_TYPE: '1-4', //信息类型 - 班级作业
	      SMS_TYPE: 'jxhd_tz_cls_stugen', //短信类型 - 班级
	      USER_TYPE: 'YHLX0004', //目标用户类型 - 家长
	    },
	    PERFORMANCE: {
	      MSG_TYPE: '1-5', //信息类型 - 在线表现
	      SMS_TYPE: 'jxhd_tz_ps_stugen', //短信类型 - 表现
	      USER_TYPE: 'YHLX0004', //目标用户类型 - 家长
	    },
	  }
	//----------家校互动短信配置---------end
	
	//----------OA短信配置---------start
	mod.OA_MSG_SMS= {
		SMS_TYPE:'oa_tz_ps_tec',
		PAYSLIP: {
		  MSG_TYPE: 'oa-payslip', //信息类型 - OA工资条
		  USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
		},
	     BULLETIN: {
	       MSG_TYPE: 'oa-bulletin', //信息类型 - 公告
	       USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
	     },
		 NOTICE: {
		   MSG_TYPE: 'oa-notice', //信息类型 - 通知
		   USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
		 },
		 AFFAIR: {
		   MSG_TYPE: 'oa-affair', //信息类型 - 事务
		   USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
		 },
		 WORKFLOW: {
		   MSG_TYPE: 'oa-workflow', //信息类型 - 工作流
		   USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
		 },
		 INFOCOLLECT: {
		   MSG_TYPE: 'oa-data', //信息类型 - 资料收集
		   USER_TYPE: 'YHLX0003', //目标用户类型 - 教师
		 },
	 }
	//----------OA短信配置---------end
	
	//----------学生考勤 短信配置---------start
	mod.STUKQ_MSG_SMS= {
		// INOUTSCH: {
		//    MSG_TYPE: 'ac-inoutsch', //信息类型 - 出入校
		//    USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		// },
		INCLS: {
		   MSG_TYPE: 'ac-incls', //信息类型 - 课堂
		   USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		},
		OUTCLS: {
		   MSG_TYPE: 'ac-outcls', //信息类型 - 课外
		   USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		},
		ASKLEAVE: {
		   MSG_TYPE: 'ac-askleave', //信息类型 - 请假
		   USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		},
		// DORM: {
		//    MSG_TYPE: 'ac-dorm', //信息类型 - 宿舍
		//    USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		// },
		// INOUTDORM: {
		//    MSG_TYPE: 'ac-inoutdorm', //信息类型 - 出入宿舍
		//    USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		// },
	}
	//----------学生考勤 短信配置---------end
	//----------学生评语 短信配置---------start
	mod.REMARK_MSG_SMS= {
		REMARK: {
		   MSG_TYPE: 'ac-remark', //信息类型 - 评语
		   USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
		},
	}
	//----------学生评语 短信配置---------end
	//----------学生行为 短信配置---------start
	mod.ACTION_MSG_SMS= {
	   CLSBEHAVIOR: {
	      MSG_TYPE: 'ac-clsbehavior', //信息类型 - 课堂行为
	      USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
	   },
	   OUTCLSBEHAVIOR: {
	      MSG_TYPE: 'ac-outclsbehavior', //信息类型 - 课外行为
	      USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
	   },
	   // DORMBEHAVIOR: {
	   //    MSG_TYPE: 'ac-dormbehavior', //信息类型 - 宿舍行为
	   //    USER_TYPE: 'YHLX0004,YHLX0005', //目标用户类型 - 学生家长
	   // },
	}
	//----------学生行为 短信配置---------end
	
	//---Activity的code---start---
	mod.CODERECORDVIDEO = 0; //录像
	mod.CODEPLAYVIDEO = 1; //播放视频
	//---Activity的code---end---

	return mod;

})(storageKeyName || {});
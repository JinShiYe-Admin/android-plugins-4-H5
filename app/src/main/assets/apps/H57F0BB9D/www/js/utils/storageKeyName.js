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
			mod.INTERFACE_VISITOR = 'http://develop309.jiaobaowang.net/schfksubapi/sub/api/';//访客系统(孔)
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
			mod.INTERFACE_VISITOR = '？？？需连山东开发环境';//访客系统(孔)
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
			mod.INTERFACE_VISITOR = 'http://develop309.jiaobaowang.net/schfksubapi/sub/api/';//访客系统(孔)
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
			mod.INTERFACE_VISITOR = '？？？';//访客系统(孔)
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
			mod.INTERFACE_VISITOR = '？？？';//访客系统(孔)
			//七牛上传
			mod.QN_APPID = 17;//七牛appid
			mod.QN_APPKEY = "oafor1010";//七牛appkey
			break;
		default:
			break;
	}
	mod.APPFLAG = 0;//0是普通平台，1是大学平台（大学平台注册没有用户类型)
	mod.FIRSTOPEN = 'firstOpen';//首次打开，判断是否同意用户协议
	mod.PWD_ENCRYPTION = '#@_JFnice_@#';//修改密码时，加密密钥
	mod.SCHOOLID = 100005;//学校ID
	
	mod.ANDROIDUPDATEURL='http://www.jiaobao.net/dl/fangkeji/versionCode.xml';//安卓升级地址
	
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
	// 访客系统 身份证 头像
	mod.QN_IDHEADIMG = "visitor/IDCardHeadImg/"; //头像
	//---七牛---end---
	
	//---Activity的code---start---
	mod.CODERECORDVIDEO = 0; //录像
	mod.CODEPLAYVIDEO = 1; //播放视频
	//---Activity的code---end---

	return mod;

})(storageKeyName || {});
/**
 * 七牛上传
 */
var qn_upload = (function($, mod) {
	mod.pathList = []; //记录需要删掉的图片和缩略图
	mod.encNameList = []; //附件名称
	mod.QNUptoken; //token数据
	mod.uploadNum = 0; //记录上传的次数
	// mod.wd = events.showWaiting('上传中...');
	mod.qn_appId;
	mod.qn_appKey;
	mod.qn_mainSpace;
	mod.qn_uploadSpace;
	mod.multiMedia;
	
	// 初始化塞值
	mod.uploadInit = function(model){
		mod.qn_appId = model.qn_appId;
		mod.qn_appKey = model.qn_appKey;
		mod.qn_mainSpace = model.qn_mainSpace;
		mod.qn_uploadSpace = model.qn_uploadSpace;
		mod.multiMedia = model.qn_multiMedia;
	}
	/**
	 * 上传文件
	 */
	mod.uploadFile = function(wd,callback) {
		var getUpTokenData = {
			type: '0', //获取上传token的方式
			appId: mod.qn_appId, //项目id
			appKey:mod.qn_appKey,
			fileArray: [], //文件数组
			mainSpace: mod.qn_mainSpace, //文件存放在私有空间或公有空间
			uploadSpace: mod.qn_uploadSpace, //上传的空间
		}
	
		if (mod.multiMedia.data.PictureArray.length != 0) { //图片
			for (var i = 0; i < mod.multiMedia.data.PictureArray.length; i++) {
				getUpTokenData.fileArray.push(mod.multiMedia.data.PictureArray[i].path);
			}
		} else if (mod.multiMedia.data.VideoArray.length != 0) { //视频
			getUpTokenData.type = '2';
			for (var i = 0; i < mod.multiMedia.data.VideoArray.length; i++) {
				getUpTokenData.fileArray.push(mod.multiMedia.data.VideoArray[i].path);
			}
		} else if (mod.multiMedia.data.AudioArray.length != 0) { //音频
			getUpTokenData.type = '3';
			for (var i = 0; i < mod.multiMedia.data.AudioArray.length; i++) {
				getUpTokenData.fileArray.push(mod.multiMedia.data.AudioArray[i].fpath);
			}
		}
		mod.uploadNum = getUpTokenData.fileArray.length; //记录上传的次数
		//								console.log('mod.uploadNum:' + mod.uploadNum);
										// console.log('getUpTokenData:' + JSON.stringify(getUpTokenData));
		CloudFileUtil.getUpLoadTokens(getUpTokenData, function(data) {
								// console.log("getUpLoadTokens111111 " + JSON.stringify(data));
			if (data.code == 1) {
										// console.log('上传配置 ' + JSON.stringify(data.configure));
										// console.log('上传凭证 ' + JSON.stringify(data.data));
				mod.QNUptoken = data.data; //token数据
	
				if (mod.multiMedia.data.PictureArray.length != 0) { //图片
					//记录图片和缩略图地址
					for (var j = 0; j < mod.multiMedia.data.PictureArray.length; j++) {
						for (var i = 0; i < mod.QNUptoken.Data.length; i++) {
																// console.log(JSON.stringify(mod.QNUptoken.Data[i]));
							var filePath = mod.QNUptoken.Data[i].P_Key.split("/");
							var fileName = filePath[filePath.length - 1];
							var fileId = fileName.split("_")[0];
							if (mod.multiMedia.data.PictureArray[j].id == fileId) {
							// console.log('mod.QNUptoken.Data[i].Domain:' + mod.QNUptoken.Data[i].Domain);
							// console.log('+mod.QNUptoken.Data[i].Key:' + mod.QNUptoken.Data[i].Key);
								mod.multiMedia.data.PictureArray[j].domain = mod.QNUptoken.Data[i].Domain + mod.QNUptoken.Data[i].Key;
							}
						}
					}
				} else if (mod.multiMedia.data.VideoArray.length != 0) { //视频
					//记录视频和缩略图地址
					for (var j = 0; j < mod.multiMedia.data.VideoArray.length; j++) {
						var videoPath = mod.multiMedia.data.VideoArray[j].path.split("/");
						var videoName = videoPath[videoPath.length - 1];
						for (var i = 0; i < mod.QNUptoken.Data.length; i++) {
							//console.log(JSON.stringify(mod.QNUptoken.Data[i]));
							var filePath = mod.QNUptoken.Data[i].P_Key.split("/");
							var fileName = filePath[filePath.length - 1];
							if (videoName == fileName) {
								mod.multiMedia.data.VideoArray[j].domain = mod.QNUptoken.Data[i].Domain + mod.QNUptoken.Data[i].Key;
								mod.multiMedia.data.VideoArray[j].thumb = mod.QNUptoken.Data[i].OtherKey[data.configure.thumbKey[i]];
							}
						}
					}
				} else if (mod.multiMedia.data.AudioArray.length != 0) {
					//记录音频文件地址
					for (var j = 0; j < mod.multiMedia.data.AudioArray.length; j++) {
						var audioPath = mod.multiMedia.data.AudioArray[j].fpath.split("/");
						var audioName = audioPath[audioPath.length - 1];
						for (var i = 0; i < mod.QNUptoken.Data.length; i++) {
							////console.log(JSON.stringify(mod.QNUptoken.Data[i]));
							var filePath = mod.QNUptoken.Data[i].P_Key.split("/");
							var fileName = filePath[filePath.length - 1];
							if (audioName == fileName) {
								mod.multiMedia.data.AudioArray[j].domain = mod.QNUptoken.Data[i].Domain + mod.QNUptoken.Data[i].Key;
								mod.multiMedia.data.AudioArray[j].thumb = mod.QNUptoken.Data[i].OtherKey[data.configure.thumbKey[i]];
							}
						}
					}
				}
				wd.setTitle('上传中...');
				//开始执行上传任务
				mod.taskCreate(wd,callback);
			} else {
				//console.log('### ERROR ### 获取上传凭证失败 ### ');
				//document.getElementById("finish").disabled = false;
				wd.close();
				mui.toast('上传失败 ' + data.message);
			}
		});
	}
	
	/**
	 * 删除上传失败的文件
	 */
	mod.BatchDelete = function(paths, wd) {
		var batchDelete = {
			appId: mod.qn_appId, //int 必填 项目id
			appKey: mod.qn_appKey,
			urls: paths //array 必填 需要获取下载token文件的路径
		}
		/**
		 * 七牛批量删除
		 */
		CloudFileUtil.BatchDelete(window.storageKeyName.QNGETTOKENDELETE, batchDelete, function(data) {
				//console.log('七牛删除 ' + JSON.stringify(data));
				if (data.Status == 1) {
					mod.pathList = [];
				} else {
					//console.log('### ERROR ### 七牛删除失败 ### ' + JSON.stringify(data));
				}
				wd.close();
			},
			function(xhr, type, errorThrown) {
				//console.log('### ERROR ### 请求七牛删除失败 ### ' + JSON.stringify(type));
				wd.close();
			}
		);
	}
	
	/**
	 * 创建上传任务并且逐个任务执行
	 */
	mod.taskCreate = function(wd,callback) {
		for (var i = 0; i < mod.QNUptoken.Data.length; i++) {
			if (mod.QNUptoken.Data[i].task == undefined) {
				// console.log('mod.QNUptoken:'+JSON.stringify(mod.QNUptoken));
				var filePath = mod.QNUptoken.Data[i].P_Key.split("/");
				// console.log('filePath:'+filePath);
				var fileName = filePath[filePath.length - 1];
				//获取路径
				var fPath = '';
				var num; //记录第几个文件
				if (mod.multiMedia.data.PictureArray.length !== 0) { //图片
				// console.log('mod.multiMedia.data.PictureArray:'+JSON.stringify(mod.multiMedia.data.PictureArray));
					for (var k = 0; k < mod.multiMedia.data.PictureArray.length; k++) {
						var path = mod.multiMedia.data.PictureArray[k].path.split("/");
						var name = path[path.length - 1];
						if (fileName == name) {
							console.log('111111');
							num = k;
							fPath = mod.multiMedia.data.PictureArray[k].path;
							break;
						}
					}
				} else if (mod.multiMedia.data.VideoArray.length !== 0) { //视频
					for (var k = 0; k < mod.multiMedia.data.VideoArray.length; k++) {
						var path = mod.multiMedia.data.VideoArray[k].path.split("/");
						var name = path[path.length - 1];
						if (fileName == name) {
							num = k;
							fPath = mod.multiMedia.data.VideoArray[k].path;
							break;
						}
					}
				} else if (mod.multiMedia.data.AudioArray.length !== 0) { //音频
					for (var k = 0; k < mod.multiMedia.data.AudioArray.length; k++) {
						var path = mod.multiMedia.data.AudioArray[k].fpath.split("/");
						var name = path[path.length - 1];
						if (fileName == name) {
							num = k;
							fPath = mod.multiMedia.data.AudioArray[k].fpath;
							break;
						}
					}
				}
				// console.log('fPath:'+fPath);
				CloudFileUtil.upload(fPath, mod.QNUptoken.Data[i].Token, mod.QNUptoken.Data[i].Key, function(upload, status) {
					//上传任务完成的监听
					//console.log('上传任务完成' + status + '|' + JSON.stringify(upload));
					if (status == 200) {
	
						//console.log('上传成功');
						mod.QNUptoken.Data[i].task = true;
						//mod.QNUptoken.Data[i].persistentId = JSON.parse(upload.responseText).persistentId;
						mod.uploadNum--;
						var title = '上传 ' + (mod.QNUptoken.Data.length - mod.uploadNum) + "/" + (mod.QNUptoken.Data.length);
						wd.setTitle(title);
						//记录失败后需要删除的文件
						if (mod.multiMedia.data.PictureArray.length !== 0) { //图片
							mod.pathList.push(mod.multiMedia.data.PictureArray[num].domain);
							var path = mod.multiMedia.data.PictureArray[num].path.split("/");
							var name = path[path.length - 1];
							var indexNUM=name.lastIndexOf(".");
							var _name=name.substring(0,indexNUM)
							var _mart=name.substring(indexNUM);
							name = _name + '_(' + cloudutil.transformSize(upload.totalSize) + ')'+_mart;
							mod.encNameList.push(name);
						} else if (mod.multiMedia.data.VideoArray.length !== 0) { //视频
							mod.pathList.push(mod.multiMedia.data.VideoArray[num].domain);
							mod.pathList.push(multiMedia.data.VideoArray[num].thumb);
						} else if (mod.multiMedia.data.AudioArray.length !== 0) { //音频
							mod.pathList.push(mod.multiMedia.data.AudioArray[num].domain);
							mod.pathList.push(mod.multiMedia.data.AudioArray[num].thumb);
						}
	
						if (mod.uploadNum == 0) {
							//console.log('所有上传都成功');
							var encAddr = []; //附件地址
							var encImg = []; //附件缩略图地址
							var encLen = 0; //音视频时长
							var type;
							if (mod.multiMedia.data.PictureArray.length !== 0) { //图片
								for (var j = 0; j < mod.multiMedia.data.PictureArray.length; j++) {
									encAddr.push(mod.multiMedia.data.PictureArray[j].domain);
									//console.log('mod.multiMedia.data.PictureArray:'+ JSON.stringify(mod.multiMedia.data.PictureArray[j]));
	
								}
								type = '1';
							} else if (mod.multiMedia.data.VideoArray.length !== 0) { //视频
								for (var j = 0; j < mod.multiMedia.data.VideoArray.length; j++) {
									encAddr.push(mod.multiMedia.data.VideoArray[j].domain);
									encImg.push(mod.multiMedia.data.VideoArray[j].thumb);
								}
								type = '2';
								encLen = mod.multiMedia.data.VideoArray[0].duration;
							} else if (mod.multiMedia.data.AudioArray.length !== 0) { //音频
								for (var j = 0; j < mod.multiMedia.data.AudioArray.length; j++) {
									encAddr.push(mod.multiMedia.data.AudioArray[j].domain);
									encImg.push(mod.multiMedia.data.AudioArray[j].thumb);
								}
								type = '4';
								encLen = mod.multiMedia.data.AudioArray[0].time;
							}
							var encAddrStr = encAddr.join('|');
							var encImgrStr = encImg.join('|');
							var encNameStr = mod.encNameList.join('|');
							encAddr=[];encImg=[];encNameList=[];
							callback(wd, type, encAddrStr, encImgrStr, encLen, encNameStr);
						} else {
							mod.taskCreate(wd,callback);
						}
					} else {
						//console.log('### ERROR ### 上传失败 ### ' + status + ' ' + JSON.stringify(upload));
						//								document.getElementById("finish").disabled = false;
						mui.toast('上传失败 ' + status + ' ' + upload.responseText);
						if (mod.pathList.length != 0) {
							mod.BatchDelete(mod.pathList, wd);
						} else {
							wd.close();
						}
					}
				}, function(upload, status) {
					switch (upload.state) {
						case 0: //上传任务开始调度
							//console.log('上传任务开始调度:|id:' + upload.__UUID__ + '|uploadState:' + upload.state);
							break;
						case 1: //上传任务开始请求
							//console.log('上传任务开始请求:|id:' + upload.__UUID__ + '|uploadState:' + upload.state);
							break;
						case 2: //上传任务请求已经建立
							//console.log('上传任务请求已经建立:|id:' + upload.__UUID__ + '|uploadState:' + upload.state);
							break;
						case 3: //上传任务提交数据
							////console.log('上传任务状态监听:|id:' + upload.__UUID__ + '|uploadedSize:' + upload.uploadedSize + '|totalSize:' + upload.totalSize + '|uploadState:' + upload.state);
							break;
						case 4: //上传任务已完成
							//console.log('上传任务已完成:|id:' + upload.__UUID__ + '|uploadState:' + upload.state);
							break;
						case 5: //上传任务已暂停
							//console.log('上传任务已暂停:|id:' + upload.__UUID__ + '|uploadState:' + upload.state);
							break;
						default:
							//console.log('上传任务状态监听:其他状态' + upload.state);
							break;
					}
				}, function(task) {
					//上传任务创建成功的回调
					task.start();
				});
	
				//停止本次循环
				break;
			}
		}
	}

	return mod;

})(mui, window.qn_upload || {});
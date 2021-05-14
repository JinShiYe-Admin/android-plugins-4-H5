/**
 * 更新版本模块
 */
var appUpdate = (function(mod) {
	
	mod.androidUpdateUrl=window.storageKeyName.ANDROIDUPDATEURL;
	mod.iosUpdateUrl=window.storageKeyName.IOSUPDATEURL;
	
	mod.fileSize;
	mod.updateFlag = 0; //1确认升级2取消升级
	mod.installFlag = 0; //1确认安装 2取消安装
	mod.updateApp = function(yesCallback,noCallback) {
		plus.webview.currentWebview().canJump = false;
		//版本升级模块
		//47.获取APP版本号
		//console.log('plus.os.name:' + plus.os.name);
		if(mui.os.ios) { //ios
			var request = new XMLHttpRequest();
			request.responseType = 'json';
			request.onreadystatechange = function() {
				console.log("****************request的状态信息：" + request.readyState + ';' + request.status);
				if(request.readyState == 4 && request.status == 200) {
					console.log("请求回来的信息：" + JSON.stringify(request.response));
					if (request.response.results.length == 0) {
						noCallback();
					} else{
						mod.getAppVersion(request.response.results[0],yesCallback,noCallback);
					}
				}
			}
			request.open("post", mod.iosUpdateUrl, true);
			request.send();

			return;
		}else{
			//android 更新逻辑
			getXml(yesCallback,noCallback);
		}
		
	}
	
	//获取android 更新信息
	function getXml(yesCallback,noCallback){
		$.ajax({
		    url:mod.androidUpdateUrl,
		    type: 'GET',
		    dataType: 'xml',
		    timeout: 3000,
		    cache:false,
		    error: function(xml){
		        console.log('APP更新：连接超时,加载XML文档出错'); 
				noCallback()
		    },
	        success: function(xml){ 
				var update_info=$(xml).find("update_info");
				var info={
					version:update_info.children("new_version").text()
					,download_url:update_info.children("download_url").text()
				}
				mod.getAppVersion(info,yesCallback,noCallback);
	        } 
	    });
	}
	
	/**
	 * 获取版本信息后，判断是否更新
	 * @param {Object} versionInfo 服务器返回的版本信息
	 */
	mod.getAppVersion = function(versionInfo,yesCallback,noCallback) {
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			mod.appVersion = getBigVersion(inf.version, plus.runtime.version);
			console.log('应用版本号:' + plus.runtime.version + ',资源升级版本号:' + inf.version)
			console.log("当前应用版本：" + mod.appVersion);
			console.log("服务端应用版本：" + JSON.stringify(versionInfo))
			getUpCondition(versionInfo,yesCallback,noCallback); //判断是否更新
		});
	}
	/**
	 * 获取最大数据
	 * @param {Object} version0
	 * @param {Object} version1
	 */
	var getBigVersion = function(version0, version1) {
		console.log('应用'+plus);
		console.log('应用'+plus.device.model);
		console.log('应用'+plus.runtime);
		console.log('应用'+plus.runtime.version);
		console.log('应用'+plus.runtime.appid);
		console.log('应用'+plus.runtime.arguments);
		console.log('应用'+plus.runtime.channel);
		console.log('应用'+plus.runtime.launcher);
		console.log('应用'+plus.runtime.innerVersion);
		console.log('应用'+plus.runtime.launchLoadedTime);
		console.log('应用'+plus.runtime.processId);
		var version0Array = version0.split('.');
		var version1Array = version1.split('.');
		for(var i in version0Array) {
			if(parseInt(version0Array[i]) > parseInt(version1Array[i])) {
				return version0;
			} else if(parseInt(version0Array[i]) < parseInt(version1Array[i])) {
				return version1;
			}
		}
		return version0;
	}
	/**
	 * 判断是否更新
	 * @param {Object} versionInfo
	 */
	var getUpCondition = function(versionInfo,yesCallback,noCallback) {
//		console.log("服务器版本信息：" + JSON.stringify(versionInfo))
		var appVersions = mod.appVersion.split('.');
		var newestVersions;
		if(mui.os.android) { //android
			events.closeWaiting();
			newestVersions = versionInfo.version.split('.');
			var appVersionMinMax = getMinMax(appVersions);
			var newestVersionMinMax = getMinMax(newestVersions);
			console.log("appVersionMinMax:"+JSON.stringify(appVersionMinMax))
			console.log("newestVersionMinMax:"+JSON.stringify(newestVersionMinMax))
			if(appVersionMinMax.max < newestVersionMinMax.max) { //整包更新   1.0.0 ：2.0.0
				console.log(11111)
				if(mod.updateFlag == 0) {
					//询问是否更新
					setDialog('教宝校园有新版本，是否下载？', "您已取消下载", function() {
						mod.updateFlag = 1;
						console.log("下载APK路径：" + versionInfo.download_url)
						resolveFile(versionInfo.download_url, 1,yesCallback,noCallback);
					}, function() {
						mod.updateFlag = 2;
					},yesCallback,noCallback)
				} else if(mod.updateFlag == 1) {
					resolveFile(versionInfo.download_url, 1,yesCallback,noCallback);
				} 
			} else if(appVersionMinMax.max == newestVersionMinMax.max) {
				if(appVersionMinMax.middle < newestVersionMinMax.middle) { //整包更新   1.0.0 ：1.1.0
				console.log(22222)
					if(mod.updateFlag == 0) {
						//询问是否更新
						setDialog('教宝校园有新版本，是否下载？', "您已取消下载", function() {
							mod.updateFlag = 1;
							console.log("下载APK路径：" + versionInfo.download_url)
							resolveFile(versionInfo.download_url, 1,yesCallback,noCallback);
						}, function() {
							mod.updateFlag = 2;
						},yesCallback,noCallback)
					} else if(mod.updateFlag == 1) {
						resolveFile(versionInfo.download_url, 1,yesCallback,noCallback);
					} 
				}else{
					if(appVersionMinMax.min < newestVersionMinMax.min) { //wgt更新   1.1.0 ：1.1.1
					console.log(33333)
						resolveFile(versionInfo.download_url, 0,yesCallback,noCallback);//在线更新
						// setDialog('教宝校园有新版本，是否下载？', "您已取消下载", function() {
						// 	mod.updateFlag = 1;
						// 	console.log("下载APK路径：" + versionInfo.download_url)
						// 	resolveFile(versionInfo.download_url, 1,yesCallback,noCallback);
						// }, function() {
						// 	mod.updateFlag = 2;
						// },yesCallback,noCallback)
					}else{
						noCallback()
					}
				}
			}else{
				noCallback()
			}
		} else { //ios
			if(versionInfo) {
				events.closeWaiting();
				newestVersions = versionInfo.version.split('.');
				var hasNewerVersion = newestVersions.some(function(verNo, index) {
					return parseInt(verNo) > parseInt(appVersions[index]);
				})
				if(hasNewerVersion && mod.updateFlag == 0) { //如果有新版本
					setDialog('教宝校园有新版本，是否下载？', "您已取消下载", function() {
						mod.updateFlag = 1;
						console.log("下载APK路径：")
						plus.runtime.openURL('https://itunes.apple.com/us/app/%E6%95%99%E5%AE%9D%E4%BA%91/id1503612695?l=zh&ls=1&mt=8');
					}, function() {
						mod.updateFlag = 2;
					},yesCallback,noCallback)
				}else{
					noCallback()
				}
			}else{
				noCallback()
			}
		}
	}
	/**
	 * 设置提示对话框
	 * @param {Object} hint 提示语
	 * @param {Object} callback 确认后的回调函数
	 */
	var setDialog = function(hint, cancelToast, callback, cancelCallback,yesCallback,noCallback) {
			mui.closePopups();
			var btnArray = ['是', '否'];
			mui.confirm(hint, '教宝校园', btnArray, function(e) {
				//console.log("当前点击的东东：" + JSON.stringify(e));
				if(e.index == 0) {
					callback();
					if(mui.os.android) {mui.toast("APP正在下载，稍后将开始安装")}
				} else {
					mui.toast(cancelToast);
					if(cancelCallback) {
						cancelCallback();
						noCallback();
					}
				}
			},'div');
	}
	/**
	 * 获取大版本号和小版本号
	 * @param {Object} numArray
	 */
	var getMinMax = function(numArray) {
		var minMax = {};
		//console.log(JSON.stringify(numArray))
		var min = '';
		for(var i in numArray) {
			if(i == 0) {
				minMax.max = parseInt(numArray[i]);
			}else if(i == 1){
				minMax.middle = parseInt(numArray[i]);
			} else if(i == 2) {
				minMax.min = parseInt(numArray[i]);
			} else {
				break;
			}
		}
		return minMax;
	}
	/**
	 * 下载整包
	 * @param {Object} ApkUrl 整包地址
	 */
	function downApk(ApkUrl,yesCallback,noCallback) {
//		console.log(plus.os.name);
		events.showWaiting('APP正在下载');
		if(plus.os.name == "Android") {
//			console.log("下载APK路径：" + ApkUrl)
			var url = "_doc/update/"; // 下载文件地址
			var dtask = plus.downloader.createDownload(ApkUrl, {
				filename: "_doc/update/"
			}, function(d, status) {
				console.log("下载状态：" + status+"，"+d.state);
				events.closeWaiting();
				if(d.state==4&&status == 200) { // 下载成功
					var path = d.filename;
					console.log(d.filename);
					if(mod.installFlag == 0) {
					setDialog("新版app文件已下载，是否安装？", "您已取消安装", function() {
							installApk(path);
							mod.installFlag = 1;
						}, function() {
							mod.installFlag = 2;
						},yesCallback,noCallback)
					} else if(mod.installFlag == 1) {
						installApk(path);
					}

				} else { //下载失败
					mui.toast("Download failed: " + status);
				}
			});
			dtask.addEventListener("statechanged", onStateChanged, false);
			dtask.start();
			//console.log("开始下载!")
		}
	}
	/**
	 * 下载在线更新的资源
	 * @param {Object} wgtUrl
	 */
	function downWgt(wgtUrl,yesCallback,noCallback) {
		//		plus.nativeUI.showWaiting("下载wgt文件...");
		events.showWaiting('正在下载wgt文件');
		var dtask = plus.downloader.createDownload(wgtUrl, {
			filename: "_doc/update/"
		}, function(d, status) {
			// events.closeWaiting();
			console.log("当前下载状态：" + status);
			if(status == 200) {
				console.log("下载wgt成功：" + d.filename);
				installWgt(d.filename,yesCallback,noCallback); // 安装wgt包
			} else {
				events.closeWaiting();
				noCallback()
				//console.log("下载wgt失败！");
								// plus.nativeUI.alert("下载wgt失败！");
			}
		});
		dtask.addEventListener("statechanged", onStateChanged, false);
		dtask.start();
	}
	var onStateChanged = function(download, status) {
		//		//console.log("当前下载状态：" + download.state + ":" + status + ":" + download.totalSize)
		if(download.state == 3) {
			if(!store.get("loadFileSize") || store.get("loadFileSize") != download.totalSize) {
				store.set("loadFileSize", download.totalSize);
			}
		}
	}
	/**
	 * 装载正整包
	 * @param {Object} path
	 */
	function installApk(path) {
		if(plus.os.name == "Android") {
			plus.runtime.install(path); // 安装下载的apk文件
		} else {
			var url = 'itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8'; // HelloH5应用在appstore的地址
			plus.runtime.openURL(url);
		}
	}
	/**
	 * 加载在线安装包
	 * @param {Object} path
	 */
	function installWgt(path,yesCallback,noCallback) {
		plus.runtime.install(path, {
			force: true
		}, function() {
			removeFile(path,yesCallback,noCallback);
			console.log("安装wgt文件成功！");
			events.closeWaiting();
		}, function(e) {
			// plus.nativeUI.closeWaiting();
			noCallback();
			events.closeWaiting();
			console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		});
	}
	/**
	 * 
	 * @param {Object} fileUrl
	 * @param {Object} type 0升级包 1apk整包
	 */
	var resolveFile = function(fileUrl, type,yesCallback,noCallback) {
		console.log("文件路径：" + fileUrl + ";type:" + type);
		var filePath = "_doc/update/" + fileUrl.split('/')[fileUrl.split('/').length - 1]
		plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
			// 可通过entry对象操作test.html文件 
			console.log('存在文件！' + entry.isFile+"，"+entry.toLocalURL());
			entry.getMetadata(function(metadata) {
					entry.remove(function(entry) {
						if(type) {
							downApk(fileUrl,yesCallback,noCallback);
						} else {
							downWgt(fileUrl,yesCallback,noCallback);
						}
					}, function(e) {
						alert(e.message); 
					});
			}, function() {
				//console.log("文件错误");
			});
		}, function(e) {
			if(type) { 
				downApk(fileUrl,yesCallback,noCallback);
			} else {
				downWgt(fileUrl,yesCallback,noCallback)
			}
		});
	}

	function removeFile(fileName, type,yesCallback,noCallback) {
		plus.io.resolveLocalFileSystemURL(fileName, function(entry) {
			entry.remove(function() {
				console.log("删除文件成功！")
				yesCallback()
			}, function(e) {
				noCallback()
			})
		}, function(e) {
			noCallback()
		})
	}
	return mod;
})(appUpdate || {})
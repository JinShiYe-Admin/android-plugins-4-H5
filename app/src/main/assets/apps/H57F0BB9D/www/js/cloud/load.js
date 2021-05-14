/**
 * 上传、下载组件
 */
var load = (function(mod) {
	/**
	 * 上传文件
	 * @param {Object} url 上传接口
	 * @param {Object} paths 需上传文件的路径
	 */
	mod.createUpload = function(url, paths, savePath, getToken) {
		//等待框
		var wt = plus.nativeUI.showWaiting();
		//创建上传方法
		var task = plus.uploader.createUpload(url, {
				method: "POST",
				blocksize: 409600,
				priority: 100
			},
			function(t, status) {
				//关闭对话框
				wt.close();
				//console.log('当前状态：' + status);
				//上传完成
				//上传成功
				if (status == 200) {
					//console.log("Upload success" + t.responseText);
					//上传失败
				} else {
					mui.toast('上传失败,请重新上传');
				}
			});

		task.addData('token', getToken)
		//加载所有文件
		paths.forEach(function(path, i) {
			task.addData('key', path);
			task.addFile(path, {
				key: "file",
				name: "file"
			});
			//console.log(path);
		})
		task.addEventListener("statechanged", onStateChanged, false);
		//开始上传
		task.start();
		//console.log('start');
	}
	// 监听上传任务状态
	function onStateChanged(upload, status) {
		//console.log('mui上传状态：' + upload.state)
		if (upload.state == 4 && status == 200) {
			// 上传完成
			//console.log("Upload success: " + upload.getFileName());
		}
	}
	/**
	 * 
	 * @param {Object} type 图片
	 * @param {Object} filePath
	 * @param {Object} callback 回调函数
	 * @param {Object} extras 额外数据
	 */
	mod.getManageOptions = function(type, filePath, callback, extras) {
		var data = {};
		//		data.spaceId = spaceId;
		data.spaceType = 0; //公共空间
		switch (type) {
			case 1: //图片
				data.options = {
					type: 0,
					thumbSize: {
						width: 200,
						height: 200
					},
					cropSize: {
						width: event.width,
						height: event.width * 0.45
					}
				}
				if (isClip) {
					data.options.type = 10;
				}
				callback(data);
				break;
			case 2: //视频
				mod.getVideoThumb(filePath, function(thumb, width, height) {
					data.options = {
						type: 2,
						thumbSize: {
							width: width,
							height: height
						},
						cropSize: {}
					}
					callback(data, thumb);
				})
				break;
			case 3: //文字
				break;
			case 4: //音频
				break;
			default:
				break;
		}
	}
	mod.getVideoThumb = function(videoPath, callback) {
		//				video.setAttribute("preload","metadata");
		//		
		if (plus.os.name == "iOS") {
			var video = document.createElement("video");
			video.src = videoPath;
			video.onloadedmetadata = function() {
				var canvas = document.createElement('canvas');
				canvas.width = video.videoWidth / 2;
				canvas.height = video.videoHeight / 2;
				//console.log('canvas ' + canvas.width + ' ' + canvas.height)
				canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				var thumb = canvas.toDataURL("image/png");
				video = null;
				//console.log("video的宽度：" + canvas.width + "video的高度：" + canvas.height);
				callback(thumb, '360px', '360px');
			}
		} else {
			var video = document.createElement("video");
			video.src = videoPath;
			video.onloadeddata = function() {
				var canvas = document.createElement('canvas');
				canvas.width = video.videoWidth / 2;
				canvas.height = video.videoHeight / 2;
				//console.log('canvas ' + canvas.width + ' ' + canvas.height)
				canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
				var thumb = canvas.toDataURL("image/png");
				video = null;
				//console.log("video的宽度：" + canvas.width + "video的高度：" + canvas.height);
				callback(thumb, canvas.width * 2, canvas.height * 2);
			}

		}
	}
	/**
	 * 
	 * @param {Number} type
	 * @param {Object} fileData {filePath:,spaceId: ,saveSpace:,manageOptions:,}
	 */
	mod.upload = function(type, fileData) {
		switch (type) {
			case 1: //图片
				break;
			case 2: //视频
				break;
			case 3: //文字
				break;
			case 4: //音频
				break;
			default:
				break;
		}
	}
})(load || {})

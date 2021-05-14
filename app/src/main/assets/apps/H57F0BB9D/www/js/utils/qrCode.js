document.addEventListener("plusready", function() {
	var _BARCODE = 'QRCodeUtil',
		B = window.plus.bridge;
	
	var qrCode = {
		//验证扫码模块
		getQRCode: function(successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE,'getQRCode', [callbackID]);
		},
		//播放响应音
		playBeep:function() {
			B.exec(_BARCODE,'playBeep', []);
		},
	};
	window.plus.qrCode = qrCode;
}, true);
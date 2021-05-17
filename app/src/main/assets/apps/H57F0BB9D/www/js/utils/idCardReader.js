document.addEventListener("plusready", function() {
	var _BARCODE = 'idCardReaderUtil',
		B = window.plus.bridge;
	
	var idCardReader = {
		//读取身份证信息
		readIDCard: function(successCallback, errorCallback) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE,'readIDCard', [callbackID]);
		},
	};
	window.plus.idCard = idCardReader;
}, true);
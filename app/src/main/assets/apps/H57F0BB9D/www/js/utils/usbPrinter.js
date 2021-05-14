document.addEventListener("plusready", function() {
	var _BARCODE = 'usbPrinterUtil',
		B = window.plus.bridge;
	
	var usbPrinter = {
		//打印凭条
		printPage: function(successCallback, errorCallback,visitorID) {
			var success = typeof successCallback !== 'function' ? null : function(args) {
					successCallback(args);
				},
				fail = typeof errorCallback !== 'function' ? null : function(code) {
					errorCallback(code);
				};
			callbackID = B.callbackId(success, fail);
			return B.exec(_BARCODE,'printPage', [callbackID,visitorID]);
		},
	};
	window.plus.usbPrinter = usbPrinter;
}, true);
var appPay = (function(mod) {
	mod.main = mui.createMask(_closeMenu);
	mod.menu = mui.createMask(_closeMenu);
	mod.mask = mui.createMask(_closeMenu);
	mod.showMenu = false,
	mod.mode = 'all-move';

	mod.back =function() {
		if (mod.showMenu) {
			//菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
			mod.closeMenu();
			return false;
		} else {
			//菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
			mod.menu.close('none');
			return true;
		}
	}

	/**
	 * 显示菜单菜单
	 */
	mod.openMenu = function() {
		if (!mod.showMenu) {
			var wvs = plus.webview.getDisplayWebview();
			for (var i = 0; i < wvs.length; i++) {
				var url = wvs[i].getURL();
				if (url.indexOf('/mine/mine') == -1) {
					if (plus.os.name == 'Android') {
						wvs[i].setStyle({
							mask: "rgba(0,0,0,0.1)"
						});
					} else {
						wvs[i].setStyle({
							mask: "rgba(0,0,0,0.3)"
						});
					}
					wvs[i].addEventListener("maskClick", function() {
						mod.closeMenu();
					}, false);
				}
			}
			//侧滑菜单处于隐藏状态，则立即显示出来；
			//显示完毕后，根据不同动画效果移动窗体；
			console.log("mod.menu:"+mod.menu)
			console.log("mod.main:"+mod.main)
			console.log("mod.mask:"+mod.mask)
			if (mod.menu) {
				mod.menu.show('none', 0, function() {
					// mod.main.setStyle({
					// 	left: '70%',
					// 	transition: {
					// 		duration: 150
					// 	}
					// });
					// mod.menu.setStyle({
					// 	left: '0%',
					// 	transition: {
					// 		duration: 10
					// 	}
					// });
					//显示遮罩
					mod.mask.show();
					mod.showMenu = true;
				});
			}
			//通知index页隐藏tab栏
		}
	}
	/**
	 * 关闭侧滑菜单
	 */
	mod.closeMenu = function() {
		_closeMenu();
		//关闭遮罩
		mod.mask.close();
	}

	/**
	 * 关闭侧滑菜单（业务部分）
	 */
	function _closeMenu() {
		if (mod.showMenu) {
			var wvs = plus.webview.getDisplayWebview();
			for (var i = 0; i < wvs.length; i++) {
				wvs[i].setStyle({
					mask: "none"
				});
			}

			//等窗体动画结束后，隐藏菜单webview，节省资源；
			setTimeout(function() {
				mod.menu.hide();
			}, 1);
			//改变标志位
			mod.showMenu = false;
			//通知index页显示tab栏
		}
	}
	//重写mui.menu方法，Android版本menu按键按下可自动打开、关闭侧滑菜单；
	mui.menu = function() {
		if (mod.showMenu) {
			mod.closeMenu();
		} else {
			openMenu();
		}
	}

	window.addEventListener('home_setHeadImg', function(data) {
		tempHead.headImg = data.detail.img_url;
	});
	//关闭侧滑
	window.addEventListener('closeMinePage', function(data) {
		mod.closeMenu();
	});

	window.addEventListener('hideMenu', function(data) {
		console.log('侧滑执行方法')
		mod.mask.close();
		mod.menu.hide();
		mod.showMenu = false;
		var wvs = plus.webview.getDisplayWebview();
		for (var i = 0; i < wvs.length; i++) {
			wvs[i].setStyle({
				mask: "none"
			});
		}
	});
	setTimeout(function() {
		//侧滑菜单默认隐藏，这样可以节省内存；
		mod.menu = mui.preload({
			id: '../../html/mine/mine.html',
			url: '../../html/mine/mine.html',
			styles: {
				left: 0,
				width: '70%',
				zindex: 9997
			}
		});
	}, 1000);
return mod;
})(appPay || {})

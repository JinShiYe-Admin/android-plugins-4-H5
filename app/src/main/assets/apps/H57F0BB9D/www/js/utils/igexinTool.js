function igexinTool() {  
    var isAndorid, PushManager, context, Instance, GeTuiSdk;  

    if(plus.os.name == 'Android') {  
        isAndorid = true;  
    } else {  
        isAndorid = false;  
    }  

    if(isAndorid) {  
        PushManager = plus.android.importClass("com.igexin.sdk.PushManager");  
        context = plus.android.runtimeMainActivity().getContext();  
        Instance = PushManager.getInstance();  
    } else {  
        GeTuiSdk = plus.ios.importClass("GeTuiSdk");  
    }  

    this.bindAlias = function(alias) {  
        if(isAndorid) {  
            Instance.bindAlias(context, alias);  
        } else {  
            GeTuiSdk.bindAliasandSequenceNum(alias, alias);  
        }  
    }  

    this.unbindAlias = function(alias) {  
        if(isAndorid) {  
            Instance.unBindAlias(context, alias, true);  
        } else {  
            GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, alias, true);  
        }  
    }  

    this.getVersion = function() {  
        if(isAndorid) {  
            return Instance.getVersion(context);  
        } else {  
            return GeTuiSdk.version;  
        }  
    }  

    //开启推送  
    this.turnOnPush = function() {  
        if(isAndorid) {  
            Instance.turnOnPush(context);  
        } else {  
            GeTuiSdk.setPushModeForOff(false);  
        }  
    }  

    //关闭推送  
    this.turnOffPush = function() {  
        if(isAndorid) {  
            Instance.turnOffPush(context);  
        } else {  
            GeTuiSdk.setPushModeForOff(true);  
        }  
    }  

}
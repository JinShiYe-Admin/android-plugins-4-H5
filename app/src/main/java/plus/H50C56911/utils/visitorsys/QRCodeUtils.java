package plus.H50C56911.utils.visitorsys;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.widget.Toast;

import com.google.zxing.other.BeepManager;

import org.json.JSONArray;

import java.util.List;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;
import plus.H50C56911.R;

/**
 * 类名：QRCodeUtils.class
 * 描述：访客机系统 扫码识别
 * Created by：LS on 2021/5/13.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */
public class QRCodeUtils extends StandardFeature {
    private Activity activity;

    public void getQRCode(IWebview pWebview, JSONArray array){
        String CallBackID = array.optString(0);
        activity=pWebview.getActivity();
        if (checkPackage("com.telpo.tps550.api")) {
            JSONArray newArray = new JSONArray();
            String json="";
            json="{\"code\":0,\"msg\":"+true+"}";
            newArray.put(json);
            JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);
        } else {
            Toast.makeText(activity, "未安装API模块，无法进行二维码/身份证识别", Toast.LENGTH_LONG).show();
        }
    }

    public void playBeep(IWebview pWebview, JSONArray array){
        activity=pWebview.getActivity();
        BeepManager mBeepManager = new BeepManager(activity, R.raw.beep);
        mBeepManager.playBeepSoundAndVibrate();
    }

    private boolean checkPackage(String packageName) {
        PackageManager manager = activity.getPackageManager();
        Intent intent = new Intent().setPackage(packageName);
        @SuppressLint("WrongConstant") List<ResolveInfo> infos = manager.queryIntentActivities(intent, PackageManager.GET_INTENT_FILTERS);
        if (infos == null || infos.size() < 1) {
            return false;
        }
        return true;
    }
}

package plus.H50C56911.utils.visitorsys;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.widget.Toast;

import com.google.zxing.other.BeepManager;
import com.telpo.tps550.api.idcard.IdCard;
import com.telpo.tps550.api.idcard.IdentityMsg;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;
import plus.H50C56911.R;

/**
 * 类名：IDCard.class
 * 描述：访客机系统 身份证识别
 * Created by：LS on 2021/5/13.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */
public class IDCard extends StandardFeature {
    private Activity activity;
    IdentityMsg info;
    IdCard mIdcard;
    Bitmap bitmap;
    byte[] image;
    private String cardInfo = "";
    String CallBackID = null;
    Thread mThread;

    public void readIDCard(IWebview pWebview, JSONArray array) throws JSONException, JSONException {
        CallBackID = array.optString(0);
        activity = pWebview.getActivity();
        mIdcard = new IdCard(pWebview.getContext());
        if (checkPackage("com.telpo.tps550.api")) {
//            mThread = new Thread(new Runnable() {
//                @Override
//                public void run() {
//                    try {
//                        info = mIdcard.checkIdCardOverseas();
//                        try {
//                            image = mIdcard.getIdCardImageOverseas(info);
//                            if (image.length == 2048 || image.length == 1024) {
//                                bitmap = mIdcard.decodeIdCardImageOverseas(image);
//                            }
//                            cardInfo = "姓名：" + info.getName() + "\n\n" + "性别："
//                                    + info.getSex() + "\n\n" + "出生日期：" + info.getBorn() + "\n\n"
//                                    + "国籍或所在地区代码：" + "有效期限："
//                                    + info.getPeriod() + "\n\n" + "签发机关：" + info.getApartment()
//                                    + "\n\n" + "身份证号码：" + info.getNo() + "\n\n";
//                            JSONArray newArray = new JSONArray();
//                            String json = "";
//                            json = "{\"code\":0,\"msg\":" + true + "}";
//                            newArray.put(json);
//                            JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);
//                        } catch (TelpoException e) {
//                            e.printStackTrace();
//                            Toast.makeText(activity, "身份证信息读取失败！", Toast.LENGTH_LONG).show();
//                        }
//                    } catch (TelpoException e) {
//                        e.printStackTrace();
//                        Toast.makeText(activity, "身份证读取模块异常！", Toast.LENGTH_LONG).show();
//                    }
//                }
//            });
//            mThread.start();

            Bitmap bitmap = BitmapFactory.decodeResource(activity.getResources(), R.drawable.splash);

            JSONArray newArray = new JSONArray();
            JSONObject json = new JSONObject();
            json.put("code",0);
            json.put("msg",true);
            json.put("bitmap",bitmapToBase64(bitmap));
            newArray.put(json);
            JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);
        } else {
            Toast.makeText(activity, "未安装API模块，无法进行二维码/身份证识别", Toast.LENGTH_LONG).show();
        }
    }

    //播放系统音乐
    public void playBeep(IWebview pWebview, JSONArray array){
        activity=pWebview.getActivity();
        BeepManager mBeepManager = new BeepManager(activity, R.raw.beep);
        mBeepManager.playBeepSoundAndVibrate();
    }

    /*
     * bitmap转base64
     * */
    private static String bitmapToBase64(Bitmap bitmap) {
        String result = null;
        ByteArrayOutputStream baos = null;
        try {
            if (bitmap != null) {
                baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos);

                baos.flush();
                baos.close();

                byte[] bitmapBytes = baos.toByteArray();
                result = Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (baos != null) {
                    baos.flush();
                    baos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    @Override
    public void onStop() {
        super.onStop();
        try {
            if (mThread != null && (mThread.isAlive())) {
                mThread.interrupt();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
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

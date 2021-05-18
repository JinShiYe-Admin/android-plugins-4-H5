package plus.H50C56911.utils.visitorsys;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Base64;
import android.widget.Toast;

import com.common.pos.api.util.PosUtil;
import com.google.zxing.other.BeepManager;
import com.telpo.tps550.api.TelpoException;
import com.telpo.tps550.api.fingerprint.FingerPrint;
import com.telpo.tps550.api.idcard.IdCard;
import com.telpo.tps550.api.idcard.IdentityMsg;
import com.telpo.tps550.api.util.ShellUtils;

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
    Activity activity;
    IdCard mIdcard;
    String CallBackID = null;
    Context context;
    IWebview pWebView;
    BeepManager mBeepManager;
    Thread mThread;
    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {
        try{
            powerOn();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void readIDCard(IWebview pWebview, JSONArray array) throws JSONException, JSONException {
        CallBackID = array.optString(0);
        activity = pWebview.getActivity();
        context = pWebview.getContext();
        pWebView = pWebview;
        boolean read=checkPackage("com.telpo.tps550.api");
        if (read) {
            readLoop();
        } else {
            Toast.makeText(activity, "未安装API模块，无法进行二维码/身份证识别", Toast.LENGTH_LONG).show();
        }
    }

    Handler mHandler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            playBeep();
            stopThread();
            switch (msg.what) {
                case 1:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    Toast.makeText(activity, "请重新放置身份证！", Toast.LENGTH_LONG).show();
                    break;
                case 2:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    Toast.makeText(activity, "超时，请重新尝试！", Toast.LENGTH_LONG).show();
                    break;
                case 3:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    Toast.makeText(activity, "读卡器未打开！", Toast.LENGTH_LONG).show();
                    break;
                case 4:
                    try{
                        IdentityMsg info= (IdentityMsg) msg.obj;
                        JSONArray newArray = new JSONArray();
                        JSONObject json = new JSONObject();
                        json.put("name",info.getName());//姓名
                        json.put("sex",info.getSex());//性别
                        json.put("nation",info.getNation());//民族
                        json.put("born",info.getBorn());//出生日期
                        json.put("address",info.getAddress());//地址
                        json.put("period",info.getPeriod());//有效期限
                        json.put("apartment",info.getApartment());//签证机关
                        json.put("country",info.getCountry());//国籍或所在地区代码
                        json.put("no",info.getNo());//身份证号码
                        json.put("card_type",info.getCard_type());//证件类型
                        json.put("reserve",info.getReserve());//保留信息
                        byte[] image =mIdcard.getIdCardImageOverseas(info);
                        if (image.length == 2048 || image.length == 1024) {
                            Bitmap bitmap = mIdcard.decodeIdCardImageOverseas(image);
                            json.put("headPhoto",bitmapToBase64(bitmap));
                        }
                        newArray.put(json);
                        System.out.println(json.toString());
                        playBeep();
                        stopThread();
                        JSUtil.execCallback(pWebView, CallBackID, newArray, JSUtil.OK, false);
                    }catch (JSONException |TelpoException e) {
                        Toast.makeText(activity, "请正确放置身份证！", Toast.LENGTH_LONG).show();
                        e.printStackTrace();
                    }
                    break;
                default:
                    break;
            }
        }
    };

    public void readLoop() {
            mIdcard = new IdCard(context);
            mThread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        IdentityMsg info = mIdcard.checkIdCardOverseas();
                        if (info != null) {
                            Message msg =new Message();
                            msg.what=4;
                            msg.obj=info;
                            mHandler.sendMessage(msg);
                        } else {
                            mHandler.sendEmptyMessage(1);
                        }
                    } catch (TelpoException e) {
                        e.printStackTrace();
                        mHandler.sendEmptyMessage(1);
                    }

                }
            });
            mThread.start();
    }

    /**
     * bitmap转为base64
     * @param bitmap
     * @return
     */
    public static String bitmapToBase64(Bitmap bitmap) {

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
    //播放系统音乐
    public void playBeep(){
        mBeepManager = new BeepManager(activity, R.raw.beep);
        mBeepManager.playBeepSoundAndVibrate();
    }

    public void stopThread(){
        if(mThread!=null && (mThread.isAlive())){
            mThread.interrupt();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        mBeepManager.close();
        mBeepManager = null;
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

    private void powerOn() {
        if (android.os.Build.MODEL.contains("TPS350")) {
            // PosUtil.setFingerPrintPower(PosUtil.FINGERPRINT_POWER_ON);
        } else if (android.os.Build.MODEL.contains("TPS616")) {
            ShellUtils.execCommand("echo 3 >/sys/class/telpoio/power_status",
                    true);// usb

        } else if (android.os.Build.MODEL.contains("TPS520A")) {
            FingerPrint.fingerPrintPower(1);
        } else {
            PosUtil.setIdcardPower(1);
            FingerPrint.fingerPrintPower(1);
        }

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
    }
}

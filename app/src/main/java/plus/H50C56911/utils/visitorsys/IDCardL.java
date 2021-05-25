package plus.H50C56911.utils.visitorsys;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Base64;
import android.widget.Toast;

import com.google.zxing.other.BeepManager;
import com.telpo.tps550.api.TelpoException;
import com.telpo.tps550.api.idcard.IdCard;
import com.telpo.tps550.api.idcard.IdentityInfo;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;

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
public class IDCardL extends StandardFeature {
    Activity activity;
    String CallBackID = null;
    Context context;
    IWebview pWebView;
    BeepManager mBeepManager;
    Thread mThread;
    UsbManager mUsbManager;
    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {

    }

    public void readIDCard(IWebview pWebview, JSONArray array) {
        CallBackID = array.optString(0);
        activity = pWebview.getActivity();
        context = pWebview.getContext();
        pWebView = pWebview;
        readLoop();
    }

    Handler mHandler = new Handler() {

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            playBeep();
            switch (msg.what) {
                case 1:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    stopThread();
                    Toast.makeText(activity, "读取身份证信息失败！", Toast.LENGTH_LONG).show();
                    break;
                case 2:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    stopThread();
                    Toast.makeText(activity, "超时，请重新尝试！", Toast.LENGTH_LONG).show();
                    break;
                case 3:
                    JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                    stopThread();
                    Toast.makeText(activity, "读卡器未打开！", Toast.LENGTH_LONG).show();
                    break;
                case 4:
                    try{
                        IdentityInfo info= (IdentityInfo) msg.obj;
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
                        byte[] image = IdCard.getIdCardImage();
                        System.out.println(image.length);
                        Bitmap bitmap = IdCard.decodeIdCardImage(image);
                        json.put("headPhoto",bitmapToBase64(bitmap));
                        newArray.put(json);
                        stopThread();
                        System.out.println(newArray.toString());
                        JSUtil.execCallback(pWebView, CallBackID, newArray, JSUtil.OK, false);
                    }catch (JSONException |TelpoException e) {
                        JSUtil.execCallback(pWebView, CallBackID, new JSONArray(), JSUtil.ERROR, false);
                        stopThread();
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
            mThread = new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        IdCard.open(context);
                        if(isUsb()) {
                            IdCard.open(IdCard.IDREADER_TYPE_USB, activity);
                        }
                        IdentityInfo info = IdCard.checkIdCard(1600);
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
                        if(e.toString()=="com.telpo.tps550.api.TimeoutException"){
                            mHandler.sendEmptyMessage(2);
                        }else if(e.toString()=="com.telpo.tps550.api.DeviceNotOpenException"){
                            mHandler.sendEmptyMessage(3);
                        }else{
                            mHandler.sendEmptyMessage(1);
                        }
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
            IdCard.close();
            mBeepManager.close();
            mBeepManager = null;
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        IdCard.close();
        mBeepManager.close();
        mBeepManager = null;
    }

    private boolean isUsb() {
        mUsbManager = (UsbManager) activity.getSystemService(Context.USB_SERVICE);
        HashMap<String, UsbDevice> deviceHashMap = mUsbManager.getDeviceList();
        Iterator<UsbDevice> iterator = deviceHashMap.values().iterator();

        while (iterator.hasNext()) {
            UsbDevice usbDevice = iterator.next();
            int pid = usbDevice.getProductId();
            int vid = usbDevice.getVendorId();

            if (pid == IdCard.READER_PID && vid == IdCard.READER_VID) {
                return true;
            }
        }
        return false;
    }
}

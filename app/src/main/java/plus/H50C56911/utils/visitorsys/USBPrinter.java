package plus.H50C56911.utils.visitorsys;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.BatteryManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.telpo.tps550.api.printer.UsbThermalPrinter;
import com.telpo.tps550.api.util.ShellUtils;
import com.telpo.tps550.api.util.StringUtil;
import com.telpo.tps550.api.util.SystemUtil;

import org.json.JSONArray;

import java.util.Hashtable;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;

/**
 * 类名：USBPrinter.class
 * 描述：访客机系统 打印模块
 * Created by：LS on 2021/5/13.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */
public class USBPrinter extends StandardFeature {
    private Activity activity;
    private boolean LowBattery=false;
    private boolean nopaper = false;
    private MyHandler handler=null;



    private final int NOPAPER = 3;
    private final int LOWBATTERY = 4;
    private final int PRINTBARCODE = 6;
    private final int CANCELPROMPT = 10;
    private final int PRINTERR = 11;
    private final int OVERHEAT = 12;
    private ProgressDialog progressDialog;
    UsbThermalPrinter mUsbThermalPrinter = null;
    private final int PRINTGRAY=1;
    private String Result;
    private BarcodePrintThread bThread=null;
    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {
        handler=new MyHandler();
        //监听设备广播，获取设备电量信息
        IntentFilter pIntentFilter = new IntentFilter();
        pIntentFilter.addAction(Intent.ACTION_BATTERY_CHANGED);
        pIntentFilter.addAction("android.intent.action.BATTERY_CAPACITY_EVENT");
        pContext.registerReceiver(printReceive, pIntentFilter);
    }

    //打印凭条
    public void printPage(IWebview pWebview, JSONArray array){
        activity=pWebview.getActivity();
        String visitorID =array.optString(1);
        if(visitorID.isEmpty()){
            Toast.makeText(activity, "无效的访问单号！", Toast.LENGTH_LONG).show();
            return;
        }
        Context context = pWebview.getContext();
        activity=pWebview.getActivity();
        mUsbThermalPrinter=new UsbThermalPrinter(activity);
        preference = activity.getSharedPreferences("TPS390PRINTER", context.MODE_PRIVATE);
        editor = preference.edit();
        handler.sendMessage(handler.obtainMessage(PRINTBARCODE, 0, 0, visitorID));
    }

    //注册广播接收
    private final BroadcastReceiver printReceive = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals(Intent.ACTION_BATTERY_CHANGED)) {
                int status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, BatteryManager.BATTERY_STATUS_NOT_CHARGING);
                int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, 0);
                int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, 0);
                if (SystemUtil.getDeviceType() == StringUtil.DeviceModelEnum.TPS390.ordinal()) {
                    if (level * 5 <= scale) {
                        LowBattery = true;
                    } else {
                        LowBattery = false;
                    }
                } else {
                    if (status != BatteryManager.BATTERY_STATUS_CHARGING) {
                        if (level * 5 <= scale) {
                            LowBattery = true;
                        } else {
                            LowBattery = false;
                        }
                    } else {
                        LowBattery = false;
                    }
                }
            }
            // Only use for TPS550MTK devices
            else if (action.equals("android.intent.action.BATTERY_CAPACITY_EVENT")) {
                int status = intent.getIntExtra("action", 0);
                int level = intent.getIntExtra("level", 0);
                if (status == 0) {
                    if (level < 1) {
                        LowBattery = true;
                    } else {
                        LowBattery = false;
                    }
                } else {
                    LowBattery = false;
                }
            }
        }
    };


    private class MyHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case NOPAPER:
                    noPaperDlg();
                    break;
                case LOWBATTERY:
                    lowBattery();
                    break;
                case PRINTBARCODE:
                    if(!LowBattery){
                        if(!nopaper){
                          bThread = new BarcodePrintThread(""+msg.obj);
                          bThread.start();
                        }else{
                            noPaperDlg();
                        }
                    }else{
                        lowBattery();
                    }
                    break;
                case CANCELPROMPT:
                    if (progressDialog != null && !activity.isFinishing()) {
                        progressDialog.dismiss();
                        progressDialog = null;
                    }
                    break;
                case OVERHEAT:
                    overheat();
                    break;
                default:
                    Toast.makeText(activity, "打印异常！", Toast.LENGTH_LONG).show();
                    break;
            }
        }
    }

    private class BarcodePrintThread extends Thread {
        private  String  visitorID="";

        public BarcodePrintThread(String visitorID) {
            this.visitorID=visitorID;
        }

        @Override
        public void run() {
            super.run();
            try {
                String temp = getUsbPrinterDev();
                if (temp.equals("-2") || !temp.equals(preference.getString("usbPrinterDev", "-1"))) {
                    mUsbThermalPrinter.stop();
                    Thread.sleep(250);
                    mUsbThermalPrinter.start(0);
                }
                mUsbThermalPrinter.reset();
                mUsbThermalPrinter.setGray(PRINTGRAY);
                Bitmap bitmap = CreateCode(visitorID, BarcodeFormat.QR_CODE, 260, 260);
                mUsbThermalPrinter.setAlgin(UsbThermalPrinter.ALGIN_MIDDLE);
                if (bitmap != null) {
//                    mUsbThermalPrinter.setLeftIndent(50);
                    mUsbThermalPrinter.printLogo(bitmap, true);
                }
//                mUsbThermalPrinter.setGray(1);
                mUsbThermalPrinter.addString(visitorID);
                mUsbThermalPrinter.printString();
                mUsbThermalPrinter.walkPaper(20);
            } catch (Exception e) {
                e.printStackTrace();
                Result = e.toString();
                if (Result.equals("com.telpo.tps550.api.printer.NoPaperException")) {
                    nopaper = true;
                } else if (Result.equals("com.telpo.tps550.api.printer.OverHeatException")) {
                    handler.sendMessage(handler.obtainMessage(OVERHEAT, 1, 0, null));
                } else {
                    handler.sendMessage(handler.obtainMessage(PRINTERR, 1, 0, null));
                }
            } finally {
                handler.sendMessage(handler.obtainMessage(CANCELPROMPT, 1, 0, null));
                if (nopaper) {
                    handler.sendMessage(handler.obtainMessage(NOPAPER, 1, 0, null));
                    nopaper = false;
                    return;
                }
            }
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        bThread.interrupt();
    }

    /**
     * 生成条码
     *
     * @param str
     *            条码内容
     * @param type
     *            条码类型： AZTEC, CODABAR, CODE_39, CODE_93, CODE_128, DATA_MATRIX,
     *            EAN_8, EAN_13, ITF, MAXICODE, PDF_417, QR_CODE, RSS_14,
     *            RSS_EXPANDED, UPC_A, UPC_E, UPC_EAN_EXTENSION;
     * @param bmpWidth
     *            生成位图宽,宽不能大于384，不然大于打印纸宽度
     * @param bmpHeight
     *            生成位图高，8的倍数
     */

    public Bitmap CreateCode(String str, com.google.zxing.BarcodeFormat type, int bmpWidth, int bmpHeight)
            throws WriterException {
        Hashtable<EncodeHintType, String> mHashtable = new Hashtable<EncodeHintType, String>();
        mHashtable.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        // mHashtable.put(EncodeHintType.CHARACTER_SET, "GBK");
        // 生成二维矩阵,编码时要指定大小,不要生成了图片以后再进行缩放,以防模糊导致识别失败
        BitMatrix matrix = new MultiFormatWriter().encode(str, type, bmpWidth, bmpHeight, mHashtable);
        int width = matrix.getWidth();
        int height = matrix.getHeight();
        // 二维矩阵转为一维像素数组（一直横着排）
        int[] pixels = new int[width * height];
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (matrix.get(x, y)) {
                    pixels[y * width + x] = 0xff000000;
                } else {
                    pixels[y * width + x] = 0xffffffff;
                }
            }
        }
        Bitmap bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        // 通过像素数组生成bitmap,具体参考api
        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
        return bitmap;
    }

    private SharedPreferences preference;
    private SharedPreferences.Editor editor;
    String[] portNum = new String[20];
    String[] productNum = new String[20];
    String[] readerNum = new String[4];

    private String getUsbPrinterDev() {
        String msgSuccess = ShellUtils.execCommand("cat /proc/bus/usb/devices", false).successMsg;
        searchAllIndex(msgSuccess, "Dev#=", 1);
        searchAllIndex(msgSuccess, "Product=", 2);
        return checkPort(portNum, productNum);
    }

    private void searchAllIndex(String str, String key, int type) {
        if (str != null && !str.equals("")) {
            int a = str.indexOf(key);
            int i = -1;
            while (a != -1) {
                i++;
                if (type == 1) {
                    portNum[i] = str.substring(a + 5, a + 8);
                    Log.d("idcard demo", "portNum[" + i + "]:" + portNum[i]);
                } else if (type == 2) {
                    productNum[i] = str.substring(a + 8, a + 27);
                    Log.d("idcard demo", "portNum[" + i + "]:" + portNum[i]);
                }
                a = str.indexOf(key, a + 1);//
            }
        }
    }

    private String checkPort(String[] port, String[] product) {
        int k = -1;
        for (int i = 0; i < 20; i++) {
            if (productNum[i] != null && productNum[i].equals("USB Thermal Printer")) {
                k++;
                readerNum[k] = portNum[i];
                Log.d("idcard demo", "readnum[]:" + readerNum[k]);
                editor.putString("usbPrinterDev", readerNum[k]);
                editor.commit();
                return readerNum[k];
            }
        }
        editor.putString("usbPrinterDev", "-2");
        editor.commit();
        return "-2";
    }


    private void noPaperDlg() {
        AlertDialog.Builder dlg = new AlertDialog.Builder(activity);
        dlg.setTitle("打印机缺纸");
        dlg.setMessage("打印缺纸，请放入纸后重试");
        dlg.setCancelable(false);
        dlg.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
            }
        });
        dlg.show();
    }

    private void lowBattery() {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(activity);
        alertDialog.setTitle("提醒");
        alertDialog.setMessage("电池电量低，请连接充电器！");
        alertDialog.setPositiveButton("确定",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                    }
                });
        alertDialog.show();
    }

    private void overheat(){
        AlertDialog.Builder overHeatDialog = new AlertDialog.Builder(activity);
        overHeatDialog.setTitle("提醒");
        overHeatDialog.setMessage("打印过热！");
        overHeatDialog.setPositiveButton("确定",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                    }
                });
        overHeatDialog.show();
    }
}

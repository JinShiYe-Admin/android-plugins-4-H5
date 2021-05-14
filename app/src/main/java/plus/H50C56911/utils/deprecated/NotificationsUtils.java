package plus.H50C56911.utils.deprecated;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.AppOpsManager;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import org.json.JSONArray;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import androidx.annotation.RequiresApi;
import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

/**
 * 类名：.class
 * 描述：
 * Created by：LS on 2018/6/14.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */

public class NotificationsUtils extends StandardFeature {
    private static final String CHECK_OP_NO_THROW = "checkOpNoThrow";
    private static final String OP_POST_NOTIFICATION = "OP_POST_NOTIFICATION";
    private static final int TIMEOUTDATE =3;

    public void onStart(Context pContext, Bundle pSavedInstanceState, String[] pRuntimeArgs) {

        /**
         * 如果需要在应用启动时进行初始化，可以继承这个方法，并在properties.xml文件的service节点添加扩展插件的注册即可触发onStart方法
         * */
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void  isNotificationEnabled(IWebview pWebview, JSONArray array ) {
        Context context = pWebview.getContext();
        String CallBackID = array.optString(0);
        System.out.println("action================="+context);
        System.out.println("CallBackID================="+CallBackID);
        AppOpsManager mAppOps = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
        ApplicationInfo appInfo = context.getApplicationInfo();
        String pkg = context.getApplicationContext().getPackageName();
        int uid = appInfo.uid;
        Class appOpsClass = null;
      /* Context.APP_OPS_MANAGER */
        JSONArray newArray = new JSONArray();
        String json="";
        try {
            appOpsClass = Class.forName(AppOpsManager.class.getName());
            Method checkOpNoThrowMethod = appOpsClass.getMethod(CHECK_OP_NO_THROW, Integer.TYPE, Integer.TYPE,
                    String.class);
            Field opPostNotificationValue = appOpsClass.getDeclaredField(OP_POST_NOTIFICATION);

            int value = (Integer) opPostNotificationValue.get(Integer.class);
            boolean isEnabled=(Integer) checkOpNoThrowMethod.invoke(mAppOps, value, uid, pkg) == AppOpsManager.MODE_ALLOWED;
            json="{\"code\":0,\"msg\":"+isEnabled+"}";
            newArray.put(json);
        } catch (ClassNotFoundException e) {
            json="{\"code\":9999,\"msg\":"+e+"}";
            newArray.put(json);
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            json="{\"code\":9999,\"msg\":"+e+"}";
            newArray.put(json);
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            json="{\"code\":9999,\"msg\":"+e+"}";
            newArray.put(json);
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            json="{\"code\":9999,\"msg\":"+e+"}";
            newArray.put(json);
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            json="{\"code\":9999,\"msg\":"+e+"}";
            newArray.put(json);
            e.printStackTrace();
        }
        JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);
    }

    public static boolean checkIsTimeOut(final Context conn, final SharedPreferences sp) {
        DateFormat format = new SimpleDateFormat("yyyy-mm-dd");
        String oldDate = sp.getString("showDialogTime", "1990-01-01");
        String newDate =new SimpleDateFormat("yyyy-mm-dd").format(new Date());
        try {
            if(getDisDay(format.parse(oldDate),format.parse(newDate))>=TIMEOUTDATE){
                return true;
            }
        } catch (ParseException e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public static void showDialog(final Context conn, final SharedPreferences sp) {
        final AlertDialog.Builder normalDialog = new AlertDialog.Builder(conn);
//        normalDialog.setIcon(R.drawable.warning);
        normalDialog.setTitle("开启消息通知");
        normalDialog.setMessage("开启后可第一时间收到消息通知");
        normalDialog.setPositiveButton("立即开启",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
//                        gotoSettings(conn);
                    }
                });
        normalDialog.setNegativeButton("以后再说",
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        SharedPreferences.Editor editor = sp.edit();
                        editor.putString("showDialogTime",new SimpleDateFormat("yyyy-mm-dd").format(new Date())).commit();
                    }
                });
        normalDialog.setCancelable(false);
        normalDialog.show();
    }

    private static long getDisDay(Date startDate, Date endDate) {
        long[] dis = getDisTime(startDate, endDate);
        long day = dis[0];
        if (dis[1] > 0 || dis[2] > 0 || dis[3] > 0) {
            day += 1;
        }
        return day;
    }

    private static long[] getDisTime(Date startDate, Date endDate) {
        long timesDis = Math.abs(startDate.getTime() - endDate.getTime());
        long day = timesDis / (1000 * 60 * 60 * 24);
        long hour = timesDis / (1000 * 60 * 60) - day * 24;
        long min = timesDis / (1000 * 60) - day * 24 * 60 - hour * 60;
        long sec = timesDis / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;
        return new long[]{day, hour, min, sec};
    }

    public void gotoSetting(IWebview pWebview, JSONArray array ) {
        Activity conn=pWebview.getActivity();
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= 26) {
            intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            intent.putExtra("android.provider.extra.APP_PACKAGE", conn.getPackageName());
        }
        //android 5.0-7.0
        if (Build.VERSION.SDK_INT >= 21 && Build.VERSION.SDK_INT < 26) {
            intent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            intent.putExtra("app_package", conn.getPackageName());
            intent.putExtra("app_uid", conn.getApplicationInfo().uid);
        }
        //其他
        if (Build.VERSION.SDK_INT < 21) {
            intent.setAction("android.settings.APPLICATION_DETAILS_SETTINGS");
            intent.setData(Uri.fromParts("package", conn.getPackageName(), null));
        }
        conn.startActivity(intent);
        String CallBackID = array.optString(0);
        JSONArray newArray = new JSONArray();
        String json="{\"code\":0,\"msg\":\"\"}";
        newArray.put(json);
        JSUtil.execCallback(pWebview, CallBackID, newArray, JSUtil.OK, false);
    }
}

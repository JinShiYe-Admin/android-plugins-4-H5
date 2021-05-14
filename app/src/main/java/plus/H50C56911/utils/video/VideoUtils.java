package plus.H50C56911.utils.video;

import android.app.Activity;
import android.os.Build;
import android.os.Environment;
import android.util.Log;

import com.qiniu.pili.droid.shortvideo.PLMediaFile;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

/**
 * 类名：VideoUtils.class
 * 描述：视频压缩工具类
 * Created by：LS on 2018/7/19.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */

public class VideoUtils extends StandardFeature {
    private final int CODE_SUCCESS=0;
    private final int CODE_ERROR_LONG=1;
    private final int CODE_ERROR_HIGHQ=2;
    private final int CODE_ERROR_NOPERMISSION=3;
    private final int CODE_ERROR_JSONERROR=4;
    private final int CODE_ERROR_NOFILE=5;
    private final int CODE_ERROR_SAVEFILED=6;
    public final int CODE_ERROR_SAVECANCEL=7;

    private final String TAG="VideoUtils";
    private int width=0,height=0,bitrateLevel=0;
    private long length=0L;
    private long size=0;
    private long t1,t2;
    private long startTime, endTime;

    private PLMediaFile mMediaFile;
    private CustomProgressDialog mProcessingDialog;
    private Activity activity;
    private String CallBackID;
    private IWebview pWebview;


    private VideoUtils utils;

    public void  compressVideo(IWebview pWebview, JSONArray array) {
        utils=this;
        this.activity = pWebview.getActivity();
        this.CallBackID = array.optString(0);
        this.pWebview=pWebview;
        try {
            JSONObject obj = new JSONObject( array.optString(1));
            String filePath = (String)obj.get("filePath");
            String newPath = (String)obj.get("newPath");
            compress(filePath,newPath);
        } catch (Exception e) {
            callBack(CODE_ERROR_JSONERROR,e+" ");
        }
    }

    /**
     * 获取视频参数
     * @param filePath 原路径
     * @param newPath 新路径
     */
    private void compress(String filePath,String newPath) throws  IOException{
        if(isPermissionOK()){
            System.out.println("filePath:"+filePath+",newPath="+newPath);
            mMediaFile = new PLMediaFile(filePath);
            length=mMediaFile.getDurationMs();
            width=mMediaFile.getVideoWidth();
            height=mMediaFile.getVideoHeight();
            size=new File(filePath).length();
            String bitrate = (mMediaFile.getVideoBitrate() / 1000) + " kbps";
            System.out.println(mMediaFile.getVideoWidth() + " x " + mMediaFile.getVideoHeight()+",====bitrate"+bitrate);
            mProcessingDialog = new CustomProgressDialog(activity,utils);

//            if(length>61*1000){
//                callBack(CODE_ERROR_LONG,"视频拍摄时长不能超过60秒");
//            }else{
                if(size>30*1024*1024){//视频大于30M
                        doTranscode(filePath,newPath);
                }else{
                    callBack(CODE_SUCCESS,"file://"+filePath);
                }
//            }
        }else{
            callBack(CODE_ERROR_NOPERMISSION,"请打开摄像头、麦克风、存储等权限后再尝试");
        }
    }

    //检查各种视频压缩权限是否开启
    private boolean isPermissionOK() {
        PermissionChecker checker = new PermissionChecker(activity);
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.M || checker.checkPermission();
    }

    //开始压缩
    private void doTranscode(final String filePath, String _newPath) {
        mProcessingDialog.show();
        String path = Environment.getExternalStorageDirectory()+File.separator+"xiaoxuntong"+File.separator+"video"+File.separator;

        String[] paths=_newPath.split("/");
        String pathName =paths[paths.length-1];
        final String newPath=path+pathName;
        File pfile=new File(path);
        if(!pfile.exists()){
            pfile.mkdirs();
        }
        File file = new File(newPath);
        if (file.exists()) {
            file.delete();
        }
//        VideoCompress.compressVideoMedium(filePath, newPath, new VideoCompress.CompressListener() {
//            @Override
//            public void onStart() {
//                t1=startTime = System.currentTimeMillis();
//                setTime(startTime,"开始时间");
//
//            }
//
//            @Override
//            public void onSuccess() {
//                endTime = System.currentTimeMillis();
//                setTime(endTime,"结束时间");
//                activity.runOnUiThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        mProcessingDialog.dismiss();
//                        callBack(CODE_SUCCESS,"file://"+newPath);
//                    }
//                });
//                Log.i(TAG,"压缩前大小="+getFileSize(filePath)+",压缩后大小 = "+getFileSize(newPath)+",累计耗时时间="+getTime());
//            }
//
//            @Override
//            public void onFail() {
//                endTime = System.currentTimeMillis();
//                setTime(endTime,"失败时间");
//                activity.runOnUiThread(new Runnable() {
//                    @Override
//                    public void run() {
//                        mProcessingDialog.dismiss();
//                        callBack(CODE_ERROR_SAVEFILED,"压缩失败");
//                    }
//                });
//            }
//
//            @Override
//            public void onProgress(float percent) {
//                Log.i(TAG,String.valueOf(percent) + "%");
//                mProcessingDialog.setProgress((int)percent);
//            }
//        });
    }

    private void setTime(Long time, String type){
        SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date=new Date(time);
        Log.i(TAG,type+" = "+dateFormat.format(date));
    }

    private String getTime(){
        t2=System.currentTimeMillis();
        return (t2-t1)/1000+"."+(t2-t1)%1000;
    }

    private String getFileSize(String path) {
        File f = new File(path);
        if (!f.exists()) {
            return "0 MB";
        } else {
            long size = f.length();
            return (size / 1024f) / 1024f + "MB";
        }
    }


    public void callBack(int code,String msg){
        int _code=0;
        switch (code){
            case CODE_SUCCESS:
                _code=0;
                break;
            case CODE_ERROR_LONG:
            case CODE_ERROR_HIGHQ:
            case CODE_ERROR_NOPERMISSION:
            case CODE_ERROR_JSONERROR:
            case CODE_ERROR_NOFILE:
            case CODE_ERROR_SAVEFILED:
            case CODE_ERROR_SAVECANCEL:
                _code=9999;
                break;
        }
        final String json="{\"code\":"+_code+",\"msg\":\""+msg+"\"}";
        System.out.println(json);
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                JSUtil.execCallback(pWebview, CallBackID, new JSONArray().put(json), JSUtil.OK, false);
            }
        });
        if (mMediaFile != null) {
            mMediaFile.release();
        }
    }
}

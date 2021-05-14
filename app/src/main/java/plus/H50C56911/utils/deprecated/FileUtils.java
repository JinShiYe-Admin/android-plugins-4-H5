//package com.jsyapp.baseframe.utils;
//
//import android.annotation.TargetApi;
//import android.app.Activity;
//import android.content.Intent;
//import android.os.Build;
//import android.util.Log;
//
//import com.alibaba.fastjson.JSON;
//import com.alibaba.fastjson.JSONObject;
//
//import org.json.JSONArray;
//
//import fm.jiecao.jcvideoplayer_lib.JCVideoPlayer;
//import io.dcloud.common.DHInterface.IWebview;
//import io.dcloud.common.DHInterface.StandardFeature;
//import io.dcloud.common.util.JSUtil;
//
//public class FileUtils extends StandardFeature {
//
//    private String CallBackID;
//    private Activity activity;
//    private String  URL,TYPE;
//    private String json;
//    private IWebview pWebview;
//    public static FileUtils fileUtils;
//
//    public FileUtils(){
//        super();
//        fileUtils=this;
//    }
//
//    @TargetApi(Build.VERSION_CODES.M)
//    public void openFileFromURL(IWebview pWebview, JSONArray array ) {
//        try {
//            this.pWebview=pWebview;
//            this.activity = pWebview.getActivity();
//            this.CallBackID = array.optString(0);
//            String jsonStr =array.optString(1);
//            System.out.println(jsonStr);
//            JSONObject obj=JSON.parseObject(jsonStr);
//            this.URL=obj.get("openFileUrl")+"";
//            this.TYPE=obj.get("file_ext")+"";
//            Log.d("app", " openFileFromURL is " + URL);
//
//            int i = URL.lastIndexOf("/");
//            int z = URL.indexOf("?");
//            String nameC=URL.substring(i,z);
//            String NAME = nameC.contains(".")?nameC:nameC+"."+TYPE;
//            if(TYPE.toLowerCase().equals("wmv")||
//                    TYPE.toLowerCase().equals("wma")||
//                    TYPE.toLowerCase().equals("mpg")||
//                    TYPE.toLowerCase().equals("avi")||
//                    TYPE.toLowerCase().equals("flv")||
//                    TYPE.toLowerCase().equals("mkv")||
//                    TYPE.toLowerCase().equals("asf")){//视频格式
//                JCVideoPlayer.toFullscreenActivity(activity,URL, null, NAME);
//                json="{\"code\":0,\"msg\":\"文件正在打开...\"}";
//            }else{//文件格式
//                Intent intent =new Intent();
//                intent.setClass(activity,TbsActivity.class);
//                intent.putExtra("URL",URL);
//                intent.putExtra("NAME",NAME);
//                activity.startActivity(intent);
//                json="{\"code\":0,\"msg\":\"文件下载成功，正在打开...\"}";
//            }
//            JSUtil.execCallback(pWebview, CallBackID,new JSONArray().put(json), JSUtil.OK, false);
//        }catch (Exception e){
//            json="{\"code\":-1,\"msg\":\"文件格式不正确，无法打开，e:\""+e.getMessage()+"}";
//            JSUtil.execCallback(pWebview, CallBackID,new JSONArray().put(json), JSUtil.OK, false);
//        }
//    }
//}

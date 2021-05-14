//package com.jsyapp.baseframe.utils;
//
//import android.app.Activity;
//import android.os.Bundle;
//import android.os.Environment;
//import android.text.TextUtils;
//import android.util.Log;
//import android.view.View;
//import android.widget.ImageView;
//import android.widget.RelativeLayout;
//import android.widget.TextView;
//
//import com.lzy.okgo.OkGo;
//import com.lzy.okgo.callback.FileCallback;
//import com.tencent.smtt.sdk.TbsReaderView;
//
//import com.jsyapp.baseframe.R;
//
//import java.io.File;
//import java.text.DecimalFormat;
//
//import okhttp3.Call;
//
///**
// * 类名：.class
// * 描述：
// * Created by：LS on 2019/2/25.
// * --------------------------------------
// * 修改内容：
// * 备注：
// * Modify by：
// */
//
//public class TbsActivity extends Activity implements TbsReaderView.ReaderCallback {
//
//    RelativeLayout mRelativeLayout,loading_office;
//    private TbsReaderView mTbsReaderView;
//    private TextView titleText,loading_text;
//    private ImageView back;
//    private String docUrl="",fileName="";
//    private String download = Environment.getExternalStorageDirectory() + "/download/zhixueketang/document/";
//    private DecimalFormat df2 = new DecimalFormat("###.0");
//    private boolean idDownload=false;
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        docUrl=this.getIntent().getStringExtra("URL");
//        fileName=this.getIntent().getStringExtra("NAME");
//        setContentView(R.layout.activity_tbs);
//        titleText=findViewById(R.id.titleText);
//        loading_text=findViewById(R.id.loading_text);
//        back=findViewById(R.id.back);
//        mTbsReaderView = new TbsReaderView(this, this);
//        mRelativeLayout = findViewById(R.id.tbsView);
//        loading_office = findViewById(R.id.loading_office);
//        mRelativeLayout.addView(mTbsReaderView,new RelativeLayout.LayoutParams(-1,-1));
//        back.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                finish();
//            }
//        });
//        initDoc();
//    }
//
//    private void initDoc() {
//        String docName =fileName;
//        Log.d("print", "---substring---" + docName);
//        titleText.setText(docName.substring(1,docName.length()));
//        //判断是否在本地/[下载/直接打开]
//        File docFile = new File(download, docName);
//        if (docFile.exists()) {
//            //存在本地;
//            Log.d("print", "本地存在");
//            displayFile(docFile.toString(),  docName);
//            idDownload=true;
//        } else {
//            OkGo.get(docUrl)//
//                    .tag(this)//
//                    .execute(new FileCallback(download, docName) {
//                        @Override
//                        public void onSuccess(File file, Call call, okhttp3.Response response) {
//                            // file 即为文件数据，文件保存在指定目录
//                            Log.d("print", "下载文件成功");
//                            displayFile(download+file.getName(), file.getName());
//                            loading_office.setVisibility(View.GONE);
//                            Log.d("print", "" + file.getName());
//                            idDownload=true;
//                        }
//
//                        @Override
//                        public void downloadProgress(long currentSize, long totalSize, float progress, long networkSpeed) {
//                            //这里回调下载进度(该回调在主线程,可以直接更新ui)
//                            Log.d("print", "总大小---" + totalSize + "---文件下载进度---" + progress);
//                            String pro=progress*100>1?df2.format(progress*100):"0.0";
//                            loading_text.setText("正在加载文档  "+pro+"%");
//                        }
//                    });
//        }
//
//    }
//
//    private String tbsReaderTemp = Environment.getExternalStorageDirectory() + "/TbsReaderTemp";
//    private void displayFile(String filePath, String fileName) {
//
//        //增加下面一句解决没有TbsReaderTemp文件夹存在导致加载文件失败
//        String bsReaderTemp = tbsReaderTemp;
//        File bsReaderTempFile =new File(bsReaderTemp);
//        if (!bsReaderTempFile.exists()) {
//            Log.d("print","准备创建/TbsReaderTemp！！");
//            boolean mkdir = bsReaderTempFile.mkdir();
//            if(!mkdir){
//                Log.d("print","创建/TbsReaderTemp失败！！！！！");
//            }
//        }
//        Bundle bundle = new Bundle();
//        Log.d("print","filePath"+filePath);
//        Log.d("print","tempPath"+tbsReaderTemp);
//        bundle.putString("filePath", filePath);
//        bundle.putString("tempPath", tbsReaderTemp);
//        boolean result = mTbsReaderView.preOpen(getFileType(fileName), false);
//        Log.d("print","查看文档---"+result);
//        if (result) {
//            mTbsReaderView.openFile(bundle);
//        }else{
//
//        }
//    }
//
//    private String getFileType(String paramString) {
//        String str = "";
//
//        if (TextUtils.isEmpty(paramString)) {
//            Log.d("print", "paramString---->null");
//            return str;
//        }
//        Log.d("print", "paramString:" + paramString);
//        int i = paramString.lastIndexOf('.');
//        if (i <= -1) {
//            Log.d("print", "i <= -1");
//            return str;
//        }
//
//        str = paramString.substring(i + 1);
//        Log.d("print", "paramString.substring(i + 1)------>" + str);
//        return str;
//    }
//
//    @Override
//    public void onCallBackAction(Integer integer, Object o, Object o1) {
//    }
//
//    @Override
//    protected void onDestroy() {
//        super.onDestroy();
//        mTbsReaderView.onStop();
//        OkGo.getInstance().cancelAll();
//        File docFile = new File(download, fileName);
//        if(!idDownload&&docFile.exists()){
//            System.out.println("文件没下完整，退出时要删除该文件");
//            docFile.delete();
//        }
//    }
//
//}
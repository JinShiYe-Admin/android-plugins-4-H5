package plus.H50C56911.utils;

import android.content.Context;

import io.dcloud.application.DCloudApplication;


public class BaseApplication extends DCloudApplication {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
    }

    @Override
    public void onCreate() {
        super.onCreate();
    }

//    private  void initOkhttp(){
//        ImageLoaderConfiguration config = new ImageLoaderConfiguration.Builder(
//                this)
//                .memoryCacheExtraOptions(480, 800)
//                // 缓存在内存的图片的宽和高度
//                // default = device screen dimensions
//                .diskCacheExtraOptions(480, 800, null)
//                .threadPoolSize(3)
//                // 线程池内加载的数量
//                .threadPriority(Thread.NORM_PRIORITY - 2)
//                .tasksProcessingOrder(QueueProcessingType.FIFO)
//                .denyCacheImageMultipleSizesInMemory()
//                .memoryCache(new LruMemoryCache(2 * 1024 * 1024))//你可以通过自己的内存缓存实现
//                .memoryCacheSize(3 * 1024 * 1024)// 缓存到内存的最大数据
//                .memoryCacheSizePercentage(13)
//                .diskCacheSize(50 * 1024 * 1024)// //缓存到文件的最大数据
//                .diskCacheFileCount(100)// 文件数量
//                .diskCacheFileNameGenerator(new Md5FileNameGenerator())//将保存的时候的URI名称用MD5 加密
//                .imageDownloader(new BaseImageDownloader(this)) // default
//                .writeDebugLogs()// Remove for release app
//                .build();
//        // Initialize ImageLoader with configuration.
//        ImageLoader.getInstance().init(config);// 初始化
//    }

    /**
     * 初始化TBS浏览服务X5内核
     */
//    private void initTBS() {
//
//
//        //搜集本地tbs内核信息并上报服务器，服务器返回结果决定使用哪个内核。
//        QbSdk.setDownloadWithoutWifi(true);//非wifi条件下允许下载X5内核
//        QbSdk.PreInitCallback cb = new QbSdk.PreInitCallback() {
//
//            @Override
//            public void onViewInitFinished(boolean arg0) {
//                //x5內核初始化完成的回调，为true表示x5内核加载成功，否则表示x5内核加载失败，会自动切换到系统内核。
//                Log.d("app", " onViewInitFinished is " + arg0);
//            }
//
//            @Override
//            public void onCoreInitFinished() {}
//        };
//        //x5内核初始化接口
//        QbSdk.initX5Environment(getApplicationContext(), cb);
//    }
}

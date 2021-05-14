package plus.H50C56911.utils.video;
/**
 * 类名：CustomProgressDialog.class
 * 描述：视频压缩处理弹窗
 * Created by：LS on 2018/7/19.
 * --------------------------------------
 * 修改内容：
 * 备注：
 * Modify by：
 */
import android.app.ProgressDialog;
import android.content.Context;
public class CustomProgressDialog extends ProgressDialog {
    private VideoUtils utils;
    public CustomProgressDialog(Context context, VideoUtils utils) {
        super(context);
        this.utils=utils;
//        VideoController.resume();
        setMessage("视频处理中...");
        setMax(100);
        setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        setCanceledOnTouchOutside(false);
        setCancelable(true);
    }

    @Override
    public void dismiss() {
        super.dismiss();
//        VideoController.resume();
        setProgress(0);
    }

    @Override
    public void cancel() {
        super.cancel();
        utils.callBack(utils.CODE_ERROR_SAVECANCEL,"压缩被关闭");
//        VideoController.cancel();
        setProgress(0);

    }
}

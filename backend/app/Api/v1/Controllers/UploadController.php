<?php
namespace App\Api\v1\Controllers;

use App\Http\Requests;
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;
use function GuzzleHttp\json_encode;
use Illuminate\Support\Facades\Storage;
use Qiniu\Auth;
use Qiniu\Storage\UploadManager;
use function Qiniu\time;

class UploadController extends BaseController {

    use Helpers;
    protected $guard = 'api';

    public function uploadImage(Request $request)
    {
        // return $_GET;
        $ck = $request->get('CKEditorFuncNum')?:'';
        $file_character = $request->file('upload');
        //return $file_character;
        if($file_character&&$file_character->isValid()) {
            $pic = $file_character->store('/public/'. date('Y-m-d').'/articles' );
            //return $pic;
            //上传的头像字段avatar是文件类型
            $url = Storage::url($pic);//就是很简单的一个步骤
//            echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction($ck, '$url', '上传成功');</script>";
            echo json_encode([
                'uploaded' => 1,
                'fileName' => $file_character->getClientOriginalName(),
                'url' => $url
            ]);
            exit;
        }else{
            //return 1;
            echo "<script></script>";

        }


    }

    public function upload(Request $request){
        $token = $this->getToken();
        $uploadManager = new UploadManager();

        $image = request()->file('upload');

        $name = $image->getClientOriginalName();

        $filePath = $image->path();
        $type = $image->getMimeType();
        list($ret,$err) = $uploadManager->putFile($token,$name,$filePath,null,$type,false);
        if($err){//上传失败
            return $this->error(102, '上传失败');
        }else{//成功

            $callback = $request->input("CKEditorFuncNum");
            $CKEditor = $request->input('CKEditor');
            $url = config('filesystems.disks.qiniu.url') . '/' . $ret['key'];
//            echo "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction(1, '$url', '上传成功');</script>";
//            return $this->success(['url' => config('filesystems.disks.qiniu.url') . '/' . $ret['key']]);
            echo json_encode([
                'uploaded' => 1,
                'fileName' => $name,
                'url' => $url
            ]);exit;
        }
    }
    /**
     * 生成上传凭证
     * @return string
     */
    private function getToken(){
        $accessKey = config('filesystems.disks.qiniu.access_key');
        $secretKey = config('filesystems.disks.qiniu.secret_key');
        $auth = new Auth($accessKey, $secretKey);
        $bucket = config('filesystems.disks.qiniu.bucket');//上传空间名称
        //设置put policy的其他参数
        //$opts=['callbackUrl'=>'http://www.callback.com/','callbackBody'=>'name=$(fname)&hash=$(etag)','returnUrl'=>"http://www.baidu.com"];
        return $auth->uploadToken($bucket);//生成token
    }

}
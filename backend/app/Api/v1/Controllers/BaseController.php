<?php

namespace App\Api\v1\Controllers;

use App\Models\TzUserModel;
use Dingo\Api\Routing\Helpers;
use Dingo\Api\Routing\Route;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use function Qiniu\waterImg;

class BaseController extends Controller
{
    use Helpers;

    protected $request = null;
    protected $user = [];
    protected $user_id = 0;
    protected $uri = [
        '/api/login',
        '/api/openid',
        '/api/upload',
    ];

    public function __construct(Request $request){
        $this->request = $request;

        // 设置跳转登录限制接口
        $uri = (\request()->route()->action)['uri'];
        if(in_array($uri, $this->uri)) return true;

        $openid = $_SERVER['HTTP_OPENID'] ?? '';

        // 获取 openid (如果小程序没有往这边传openid 的时候)
        if (!$openid) {
            $code = $request->get('code') ?? $request->post('code') ?? $_SERVER['HTTP_CODE'] ?? '';
            if ($code) {
                $openid = TzUserModel::getOPenId($code);
            }
        }

        if ($openid) {
            // 登录
            $user = TzUserModel::getUserByOpenid($openid);
        }

        // 设置全局用户信息
        $this->user = $user ?? null;
        $this->user_id = $user->id ?? 0;

        return true;
    }


    /**
     * 返回接口数据
     *
     * @param array
     * @return mixed
     */
    protected function success($data = []){
        $data =  [
            'code' => 0,
            'status' => 'success',
            'data' => $data
        ];
        return $data;
        // return $this->response->array($data)->send();
    }

    /**
     * 返回错误
     *
     * @param int code
     * @param string $message
     * @return mixed
     */
    public function error($code = 101, $message){
         return $this->response->array([
            'code' => $code,
            'status' => 'error',
            'message' => $message
        ])->send();
    }
}

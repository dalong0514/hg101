<?php

namespace App\Api\v1\Controllers;

use App\Models\LikeModel;
use App\Models\TzUserModel;
use function GuzzleHttp\Promise\is_settled;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

class UserController extends BaseController
{
    use Helpers;
    protected $guard = 'api';

    public function openid() {
        $code = $this->request->get('code') ?? $this->request->post('code') ?? $_SERVER['HTTP_CODE'] ?? '';
        
        $openid = TzUserModel::getOPenId($code);

        if(!$openid) return $this->error(301, '获取微信数据失败');

        // 检测注册用户
        if(!TzUserModel::getUserInfo($openid)) return $this->error(508, '登录失败');

        return $this->success($openid);
    }

    /**
     * 登录
     *
     * @url /login
     */
    public function login(){
        if(!$open_id = $this->request->only('openid')){
            return $this->error(501, 'openid错误');
        }

        // 登录
        return TzUserModel::getUserInfo($open_id);
    }

    /**
     * 点赞
     * @url /like
     */
    public function like(){
        $param = $this->request->all();

        $entry_id = $param['entry_id'] ?? 0;
        $entry_type = $param['entry_type'] ?? 1;
        $type = $param['type'] ?? 1;

        // 参数验证
        if(!$entry_id) return $this->error(502, '点赞id必传');
        if(!in_array($entry_type, [LikeModel::PRODUCT, LikeModel::CASE])) {
            return $this->error(503, '点赞类型错误');
        }
        if(!in_array($type, [LikeModel::LIKE, LikeModel::COLLECT])) {
            return $this->error(503, '类型错误');
        }

        LikeModel::opera($this->user_id, $type, $entry_type, $entry_id);

        return $this->success();
    }

    /**
     * 点赞 收藏列表
     */
    public function likeList(){
        $data['like'] = LikeModel::getLikeList($this->user_id, LikeModel::LIKE);
        $data['like_count'] = count($data['like']);
        $data['collect'] = LikeModel::getLikeList($this->user_id, LikeModel::COLLECT);
        $data['collect_count'] = count($data['collect']);

        return $this->success($data);
    }


}

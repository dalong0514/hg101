<?php
/**
 * Created by PhpStorm.
 * User: dingo
 * Date: 13/04/2019
 * Time: 02:23
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use function Psy\debug;

class TzUserModel extends Model
{
    use SoftDeletes;

    protected $table = "tz_user";

    public $primaryKey = 'id';

    protected $dates = ['deleted_at'];

    public $timestamps = true;

    public static $sex = [0 => '未知', 1 => '男', 2 => '女'];

    public static $appid = 'wx5a06ed1ae5d0c297'; // 微信appid

    public static $secret = 'c4e70d691f639979eece7fd85da55c8b'; // 微信secret

    public static $token_url = 'https://api.weixin.qq.com/sns/jscode2session?'; // 微信获取openid地址

    /**
     * 修改时间是时间戳格式
     */
    public function fromDateTime($value){
        return strtotime(parent::fromDateTime($value));
    }

    public function feedback()
    {
        return $this->belongsTo(FeedbackModel::class, 'user_id');
    }

    /**
     * 根据token 查询出用户
     *
     * @param string token
     * @return mixed
     */
    public static function getUserByOpenid($openid){
        return self::query()->where(['open_id'=>trim($openid)])->first();
    }

    /**
     * 查询用户的openid
     * @param string code
     * @return mixed
     */
    public static function getOPenId($code){
        try {
            $token_url = self::getTokenUrl(self::$appid, self::$secret, $code);
            $info = file_get_contents($token_url);
            $info = json_decode($info, true);
        } catch (\Exception $e) {
            return null;
        }

        return $info['openid'] ?? null;
    }

    /**
     * 获取查询openid 的 url
     * @param string appid
     * @param string secret
     * @param string code
     * @return mixed
     */
    public static function getTokenUrl($appid, $secret, $code){
        return self::$token_url . "appid={$appid}&secret={$secret}&js_code={$code}&grant_type=authorization_code";
    }

    /**
     * 查询是否存在 openid
     * 不存在 则创建
     *
     * @param int open_id
     *
     * @return mixed
     */
    public static function getUserInfo($open_id){
        $user = self::query()->where(['open_id' => $open_id])->first();
        if(!$user) {
            $user = self::insert(['open_id' => $open_id]);
        }
        return $user;
    }

    /**
     * 制作 token
     *
     * @param int user_id
     * @return string token
     */
    public static function makeToken($user_id){
       return md5(md5($user_id) . time());
    }


}
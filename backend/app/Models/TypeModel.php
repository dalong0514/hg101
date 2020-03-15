<?php/** * Created by PhpStorm. * User: dingo * Date: 13/04/2019 * Time: 02:23 */namespace App\Models;use Illuminate\Database\Eloquent\Model;class TypeModel extends Model{    protected $table = "tz_type";    public $timestamps = true;    public $primaryKey = 'id';    public static $status = [0 => '禁用', 1 => '使用'];    const USE = 1; // 禁用    const NO_USE = 0; // 使用    /**     * 修改时间是时间戳格式     */    public function fromDateTime($value){        return strtotime(parent::fromDateTime($value));    }    protected function getLogoAttribute($logo){        if($logo){            $logo = env('QN_URL') . $logo;        }else{            $logo = '';        }        return $logo;    }    /**     * 获取产品类型     *     */    public static function type(){        return self::query()->where('status', self::USE)            ->select('id', 'name', 'logo')            ->get()->toArray();    }    /**     * 将产品类型转成key value     */    public static function _type(){        $type = [];        foreach (self::type() as $value){            $type[$value['id']] = $value['name'];        }        return $type;    }}
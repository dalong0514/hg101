<?php/** * Created by PhpStorm. * User: dingo * Date: 13/04/2019 * Time: 02:23 */namespace App\Models;use Illuminate\Database\Eloquent\Model;class LabelModel extends Model{    protected $table = "tz_label";    public $timestamps = true;    public $primaryKey = 'id';    public static $status = [0 => '禁用', 1 => '使用'];    const USE = 1; // 使用    const NO_USE = 0; // 禁用    /**     * 修改时间是时间戳格式     */    public function fromDateTime($value){        return strtotime(parent::fromDateTime($value));    }    /**     * 获取标签     *     */    public static function label(){        return self::query()->where('status', self::USE)            ->select('id', 'name')            ->get();    }    /**     * 将产品类型转成key value     */    public static function _label(){        $type = [];        foreach (self::label() as $value){            $type[$value['id']] = $value['name'];        }        return $type;    }}
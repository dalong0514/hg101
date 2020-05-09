<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypesizeModel extends Model
{
    protected $table = 'tz_typesize';
    protected static $_centrifuge = ['typeid', 'drum_diameter', 'drum_height',
    'drum_volume', 'loading_capacity', 'max_speed', 'max_sep_factor', 'power',
    'size', 'weight'];

    // 同系列设备数据提取
    protected static function get_typesize($title, $typeclass) {
        if ($typeclass == 'centrifuge') {
            return self::query()
            ->where('title', $title)
            ->get(self::$_centrifuge);
        } else return null;
    }
}

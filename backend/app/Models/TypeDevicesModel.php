<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeDevicesModel extends Model
{
    protected static $_field = ['id', 'type', 'title', 'summary', 'material', 'class'];

    protected $table = "tz_typedevices";

     /**
     * 获取定型设备数据
     * @param
     * @return array
     */
    public static function getTypedevices($keyword){
        return self::query()
            ->where('class', $keyword)
            ->select(self::$_field)
            ->orderBy('id')
            ->get();
    }

     // 单个设备数据提前
     protected static function getdevice($title) {
        return self::query()
        ->where('title', $title)
        ->get();

    }

}

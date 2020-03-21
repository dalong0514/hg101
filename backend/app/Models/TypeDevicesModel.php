<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TypeDevicesModel extends Model
{

    protected $table = "tz_typedevices";

     /**
     * 获取定型设备数据
     * @param
     * @return array
     */
    public static function getTypedevices(){
        return self::query()
            ->orderBy('id')
            ->select(['id', 'type', 'equipname', 'spec', 'material'])
            ->get();
    }
}

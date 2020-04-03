<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyModel extends Model
{
    protected $table = 'tz_property';
    // 提取物性数据字段
    protected static function getproperty() {
        return self::query()
        -> select(['id', 'cname', 'ename', 'hazard', 'comment'])
        -> get();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyModel extends Model
{
    protected $table = 'tz_property';
    // 提取物性数据字段
    protected static function getproperty($index) {
        // 处理筛选条件
        $indexlist = explode('-', $index);
        $startindex = (int)$indexlist[0];
        $endindex = (int)$indexlist[1];
        return self::query()
        ->select(['id', 'cname', 'ename', 'cas', 'hazard', 'alisname', 'comment'])
        ->where('id', '>=', $startindex) 
        ->where('id', '<=', $endindex) 
        ->get();
    }
}

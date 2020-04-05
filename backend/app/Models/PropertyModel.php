<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyModel extends Model
{
    protected $table = 'tz_property';
    protected static $_field = ['id', 'cname', 'ename', 'cas', 'hazard', 'alisname', 'comment'];

    // 提取物性数据字段
    protected static function getproperty($index) {
        // 处理筛选条件
        $indexlist = explode('-', $index);
        $startindex = (int)$indexlist[0];
        $endindex = (int)$indexlist[1];
        return self::query()
        ->select(self::$_field)
        ->where('id', '>=', $startindex) 
        ->where('id', '<=', $endindex) 
        ->get();
    }

    /**
     * 物性搜索
     *
     * @param string keyword
     * @return array
     */
    public static function search($keyword){
        return self::query()
            ->where('cname', $keyword)
            ->orwhere('cas', $keyword)
            // ->orwhere('hazard', 'like', '%' . $keyword . '%')
            ->orwhere('cname', 'like', '%' . $keyword . '%')
            ->orwhere('cas', 'like', '%' . $keyword . '%')
            ->orderBy('id')
            ->select(self::$_field)
            ->get();
    }
}

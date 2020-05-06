<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToArray;

class HarmModel extends Model
{
    protected $table = 'tz_harmdata';
    protected static $_field = ['industy_source', 'harm_code', 'harm_material', 'harm_feature', 'harm_category_modify', 'harm_category', 'hw_id', 'hw', 'harm_modify'];

    // 提取危废品大类数据
    protected static function get_harmdata($index) {
        // 处理筛选条件
        $indexlist = explode('-', $index);
        $startindex = (int)$indexlist[0];
        $endindex = (int)$indexlist[1];
        return self::query()
        ->where('hw_id', '>=', $startindex) 
        ->where('hw_id', '<=', $endindex) 
        ->select(['hw', 'harm_modify', 'hw_id', 'harm_category_modify'])
        ->distinct()    // 剔除重复的数据
        ->get();
    }

    // 提取危废品详细数据
    protected static function get_harmdetail($hwid) {

        // 处理筛选条件
        $source = self::query()
        ->where('hw_id', $hwid) 
        ->select(self::$_field)
        ->get();

        // 根据行业来源分组
        $result = array();
        foreach ($source as $value) {
            $result[$value['industy_source']][] = $value;
        }
        return $result;
    }
}

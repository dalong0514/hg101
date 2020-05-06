<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PumpModel extends Model
{
    protected $table = 'tz_pump';
    protected static $_field = ['bigclass', 'title', 'briefinfo', 'class'];

    // 设备大类数据提取
    protected static function getpumps($keyword) {
        if ($keyword == 'bigclass') {
            return self::query()
            ->select('bigclass')
            ->distinct()    // 剔除重复的
            ->get();
        } else {
            return self::query()
            ->where('bigclass', $keyword)
            ->select(self::$_field)
            ->get();
        }

    }

    // 单个设备数据提前
    protected static function getdevice($title) {
        return self::query()
        ->where('title', $title)
        ->get();

    }

    /**
     * 设备搜索
     *
     * @param string keyword
     * @return array
     */
    public static function search($keyword){
        return self::query()
            ->where('bigclass', $keyword)
            ->orwhere('title', $keyword)
            ->orwhere('bigclass', 'like', '%' . $keyword . '%')
            ->orwhere('title', 'like', '%' . $keyword . '%')
            ->select(self::$_field)
            ->get();
    }
}

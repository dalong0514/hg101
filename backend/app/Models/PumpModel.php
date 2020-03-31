<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PumpModel extends Model
{
    protected $table = 'tz_pump';
    //
    protected static function getpumps() {
        return self::query()
        -> select(['bigclass', 'title', 'briefinfo', 'intro'])
        -> get();
    }
}

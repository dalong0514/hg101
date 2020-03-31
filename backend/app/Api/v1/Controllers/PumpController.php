<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\PumpModel;

class PumpController extends BaseController
{
    use Helpers;
    protected $guard = 'api';
    /**
     * 输送泵 api
     *
     * @return \Illuminate\Http\Response
     */
    public function pump()
    {
        $data = PumpModel::getpumps();
        return $this -> success($data);
    }

}

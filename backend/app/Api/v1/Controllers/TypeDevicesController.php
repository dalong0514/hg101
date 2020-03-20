<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\TypeDevicesModel;

class TypeDevicesController extends BaseController
{
    use Helpers;
    protected $guard = 'api';

    /**
     * 定型设备数据 api
     *
     * @return \Illuminate\Http\Response
     */
    public function typedevices()
    {
        $data = TypeDevicesModel::getTypedevices();
        // return $data;
        return $this->success($data);
    }
}

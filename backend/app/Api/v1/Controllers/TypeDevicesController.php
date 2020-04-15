<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\TypeDevicesModel;
use App\Models\PumpModel;

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
        $param = $this->request->all();
        $keyword = $param['keyword'];
        $title = $param['title'];
        if ($title == '') {
            $data = TypeDevicesModel::getTypedevices($keyword);
        } else {
            $data = TypeDevicesModel::getdevice($title);
        }
        return $this->success($data);
    }

    /**
     * 输送泵 api
     *
     * @return \Illuminate\Http\Response
     */
    public function pump()
    {
        $param = $this->request->all();
        $keyword = $param['keyword'];
        $title = $param['title'];
        if ($title == '') {
            $data = PumpModel::getpumps($keyword);
        } else {
            $data = PumpModel::getdevice($title);
        }
        
        return $this -> success($data);
    }

    /**
     * 定型设备搜索接口
     *
     * @url api/search
     * @return
     */
    public function  typesearch(){
        $param = $this->request->all();
        $keyword = $param['keyword'];
        $data = PumpModel::search($keyword);
        return $this->success($data);
    }

}

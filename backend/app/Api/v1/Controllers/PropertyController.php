<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\PropertyModel;

class PropertyController extends BaseController
{
    use Helpers;
    protected $guard = 'api';
    /**
     * 输送泵 api
     *
     * @return \Illuminate\Http\Response
     */
    public function property()
    {
        $param = $this->request->all();
        $index = $param['index'];
        $data = PropertyModel::getproperty($index);
        return $this->success($data);
    }

    /**
     * 物性搜索接口
     *
     * @url api/search
     * @return
     */
    public function  prosearch(){
        $param = $this->request->all();
        $keyword = $param['keyword'];
        $data = [];
        $data = PropertyModel::search($keyword);
        return $this->success($data);
    }

}

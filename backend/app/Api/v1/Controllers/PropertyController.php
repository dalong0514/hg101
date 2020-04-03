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
        // $indexlist = explode('-', $index);
        // $startindex = (int)$indexlist[0];
        // $endindex = (int)$indexlist[1];
        // var_dump($param);
        // var_dump($index);
        // var_dump((int)$indexlist[0]);
        // var_dump($indexlist[1]);
        // exit;
        $data = PropertyModel::getproperty($index);
        return $this->success($data);
    }

}

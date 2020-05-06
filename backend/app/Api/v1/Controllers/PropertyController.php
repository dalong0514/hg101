<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\PropertyModel;
use App\Models\HarmModel;
use Doctrine\DBAL\Schema\Index;

class PropertyController extends BaseController
{
    use Helpers;
    protected $guard = 'api';
    /**
     * 物性数据 api
     *
     * @return \Illuminate\Http\Response
     */
    public function property()
    {
        $param = $this->request->all();
        $index = $param['index'];
        $id = $param['id'];
        $superid = $param['superid'];
        if ($index) {
            $data = PropertyModel::getproperty($index);
        } else if ($superid) {
            $data = PropertyModel::getsuperproperty($superid);
        } else if ($id) {
            $data = PropertyModel::getidproperty($id);
        }
        
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
        $data = PropertyModel::search($keyword);
        return $this->success($data);
    }

    // 获取危险废物目录
    public function harm()
    {
        $param = $this->request->all();
        $status = (int)$param['status'];
        $index = $param['index'];
        if ($status == 1) {
            $data = HarmModel::get_harmdata($index);
            return $this->success($data);
        } elseif ($status == 2) {
            $data = HarmModel::get_harmdetail($index);
            return $this->success($data);
        } else {
            return null;
        }
    }
}

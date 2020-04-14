<?php

namespace App\Api\v1\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;

use App\Models\PropertyModel;
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

}

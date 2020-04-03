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
        $data = PropertyModel::getproperty();
        return $this -> success($data);
    }

}
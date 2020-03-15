<?php

namespace App\Api\v1\Controllers;

use App\Models\BannerModel;
use App\Models\CaseModel;
use App\Models\ConfigModel;
use App\Models\FeedbackModel;
use App\Models\LabelModel;
use App\Models\LikeModel;
use App\Models\ProductModel;
use App\Models\TypeModel;
use App\User;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use Illuminate\Routing\Controller;

class HomeController extends BaseController
{
    use Helpers;
    protected $guard = 'api';

    /**
     * 首页数据接口
     *
     * @url api/home
     *
     * @return resource
     */
    public function index() {
        // 获取 Banner
        $data['banner'] = BannerModel::getBanner();
        $type = TypeModel::type();

        if(count($type) > 4) {
            $data['type'][0] = array_slice($type, 0, 4);
            $data['type'][1] = array_slice($type, 4, 4);
        }else {
            $data['type'][0] = $type;
        }
        
        $data['product'] = ProductModel::hotList($this->user_id);
        return $this->success($data);
    }

    /**
     * 搜索接口
     *
     * @url api/search
     * @return
     */
    public function search(){
        $param = $this->request->all();

        $keyword = $param['keyword'] ?? '';

        $data = [];
        if (!$keyword) {
            $data = ProductModel::list($this->user_id);
        }else{
            $product = ProductModel::search($keyword, $this->user_id);
//            $case = CaseModel::search($keyword, $this->user_id);
            $case = [];
            if($product && $case){
                $data = $this->sortArray(array_merge($product, $case), 'like_count');
            }else{
                $data = $product ?: $case;
            }
        }

        return $this->success($data);
    }

    /**
     * 筛选 产品
     * @url api/screen
     */
    public function screen(){
        $param = $this->request->all();

        $type = $param['type'] ?? 0;
        $label = $param['label'] ?? 0;

        $data = ProductModel::screen($type, $label, $this->user_id);
        return $this->success($data);
    }

    /**
     * 获取 设备类型
     * @url api/type
     */
    public function type(){
        return $this->success(TypeModel::type());
    }

    /**
     * 获取 标签
     * @url api/label
     */
    public function label(){
        return $this->success(LabelModel::label());
    }

    /**
     * 详情
     * @url api/detail
     */
    public function detail(){
        $entry_type = $this->request->get('entry_type', 1);  // entry_type 1 设备 2 案例
        $entry_id = $this->request->get('id', 0); // entry_id
        $keyword = $this->request->get('search_string', '');

        if(!$entry_id || !in_array($entry_type, [LikeModel::PRODUCT, LikeModel::CASE])) {
            return $this->error(102, '参数错误');
        }

        if($entry_type == LikeModel::PRODUCT) {
            $data = ProductModel::detailOne($entry_id, $keyword);
        }else {
            $data = CaseModel::detailOne($entry_id, $this->user_id);
        }
        return $this->success($data);
    }

    /**
     * 案列列表
     *
     * @url api/case
     */
    public function case(){
        $label_ids = LabelModel::label();
        if(!$label_ids) return $this->success([]);

        $data = [];
        foreach ($label_ids as $key => $label_id){

            $data[$key]['label_id'] = $label_id->id;
            $data[$key]['banner'] = CaseModel::forList($label_id->id, $this->user_id);

            $data[$key]['list'] = CaseModel::getList($label_id->id, $this->user_id);
        }

        return $this->success($data);
    }

    /**
     * 问题提交
     * @url api/problem
     */
    public function problem(){
        $param = $this->request->all();

        $contact = $param['contact'] ?? '';
        $describe = $param['describe'] ?? '';
        
        if(!$describe) return $this->error(109, '问题内容必填');

        if(FeedbackModel::createQ($this->user_id, $describe, $contact)) return $this->success();
        return $this->error(110, '问题提交失败');
    }

    /**
     * 问题收集页 搜索框 文案
     * @url api/problem_txt
     */
    public function problem_txt(){
        return $this->success(ConfigModel::find(1));
    }


    /**
     * 二维数组排序
     *
     * @param array
     * @param string key
     * @param string SORT_DESC SORT_ASC
     * @return array
     */
    private function sortArray($arr, $key){
        array_multisort(array_column($arr, $key), SORT_DESC, $arr);
        return $arr;
    }

}

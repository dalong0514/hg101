<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TxUserModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\FeedbackModel;
use Encore\Admin\Grid;

class FeedbackController extends Controller
{
    use HasResourceActions;
    /**
     * 产品列表
     *
     * @return mixed
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function index(Content $content)
    {
        return $content
            ->header('问题')
            ->description('用户反馈')
            ->row($this->grid());
    }

    /**
     * 获取设备列表数据
     *
     * @return object
     * @author duo_mi
     * @ 2019-04-13
     */
    protected function grid()
    {
        $grid = new Grid(new FeedbackModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->disableActions();
        $grid->disableCreateButton();
        $grid->disableRowSelector();

        $grid->id('ID')->sortable();

        $grid->describe('问题描述')->limit(10)->modal('问题详情', function ($model){
            return $model->describe;
        });
        $grid->column('user.nick', '反馈者昵称');
        $grid->contact('反馈者联系方式');
        $grid->status('问题状态')->editable('select', FeedbackModel::$status);

        $grid->created_at('问题反馈时间');

        return $grid;
    }

    /**
     * 构建form
     *
     * @return mixed
     * @author duo_mi
     * @date 2019-04-12
     */
    protected function form()
    {
        $form = new Form(new FeedbackModel());

        $form->display('id', 'ID');

        $form->select('status', '状态')->options(FeedbackModel::$status);

        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }
}

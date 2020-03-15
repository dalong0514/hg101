<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TzUserModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\FeedbackModel;
use Encore\Admin\Grid;

class TzuserController extends Controller
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
            ->header('用户')
            ->description('小程序用户管理')
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
        $grid = new Grid(new TzUserModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->disableActions();
        $grid->disableCreateButton();
        $grid->disableRowSelector();

        $grid->id('ID')->sortable();

        $grid->nick('昵称');
        $grid->avatar('头像')->image();
        $grid->sex('性别')->using(TzUserModel::$sex);
        $grid->age('年龄');
        $grid->city('城市');
        $grid->province('省份');
        $grid->created_at('关注小程序时间');

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
        $form = new Form(new TzUserModel());

        $form->display('id', 'ID');

        $form->select('status', '状态')->options(TzUserModel::$status);

        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }
}

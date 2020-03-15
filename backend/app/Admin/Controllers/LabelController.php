<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BannerModel;
use App\Models\LabelModel;
use App\Models\TypeModel;
use App\Models\TzUserModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\FeedbackModel;
use Encore\Admin\Grid;

class LabelController extends Controller
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
            ->header('设备类型')
            ->description('设备类型管理')
            ->row($this->grid());
    }

    /**
     * 创建Banner.
     *
     * @return Content
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function create(Content $content)
    {
        return $content
            ->header('设备类型')
            ->description('创建')
            ->body($this->form());
    }

    /**
     * 编辑Banner
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('设备类型')
            ->description('编辑')
            ->body($this->form()->edit($id));
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
        $grid = new Grid(new LabelModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->disableRowSelector();
        $grid->disableExport();

        $grid->id('ID')->sortable();

        $grid->name('类型名');
        $grid->status('状态')->switch(LabelModel::$status);
        $grid->created_at('创建时间');

        $grid->actions(function (Grid\Displayers\Actions $actions) {
            $actions->disableView();
        });

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
        $form = new Form(new LabelModel());

        $form->display('id', 'ID');

        $form->text('name', '类型名')->rules('required');
        $form->switch('status', '状态')->options(LabelModel::$status);

        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }
}

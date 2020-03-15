<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BannerModel;
use App\Models\TzUserModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\FeedbackModel;
use Encore\Admin\Grid;

class BannerController extends Controller
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
            ->header('Banner')
            ->description('首页Banner管理')
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
            ->header('Banner')
            ->description('创建')
            ->body($this->form());
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header('Banner')
            ->description('查看')
            ->body($this->detail($id));
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
            ->header('Banner')
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
        $grid = new Grid(new BannerModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->disableRowSelector();
        $grid->disableExport();

        $grid->id('ID')->sortable();

        $grid->title('标题');
        $grid->image('图片')->image();
        $grid->status('状态');
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
        $form = new Form(new BannerModel());

        $form->display('id', 'ID');

        $form->text('title', '标题')->rules('required');
        $form->switch('status', '状态')->options(BannerModel::$status);
        $form->select('param_type', '跳转类型')->options(BannerModel::$param_type);
        $form->number('param_id', '跳转ID');
        $form->image('image', '图片')->rules('required');

        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }
}

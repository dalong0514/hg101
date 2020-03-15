<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\LabelModel;
use App\Models\TypeModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\ProductModel;
use Encore\Admin\Grid;
use function foo\func;

class ProductController extends Controller
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
            ->header('设备')
            ->description('列表')
            ->row($this->grid());
    }

    /**
     * 编辑产品
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('设备')
            ->description('编辑')
            ->body($this->form()->edit($id));
    }

    /**
     * 创建产品.
     *
     * @return Content
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function create(Content $content)
    {
        return $content
            ->header('设备')
            ->description('创建')
            ->body($this->form());
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
        $form = new Form(new ProductModel());

        $form->display('id', 'ID');

        $form->disableViewCheck();

        $form->tab('基础信息', function (Form $form) {
            $form->number('wight', '排序');
            $form->text('name', '标题')->rules('required');
            $form->text('describe', '简介')->rules('required');
            $form->text('company', '生成公司')->rules('required');
            $form->radio('type_id', '设备类型')->options(TypeModel::_type())->stacked()->rules('required');
            $form->multipleSelect('label_id', '标签')->options(LabelModel::_label())->rules('required');
            $form->switch('status', '是否发布');
            $form->switch('is_hot', '设置为推荐')->options(ProductModel::$is_hot);
        })->tab('产品图片', function (Form $form){
            $form->multipleImage('images', '设备图片')->removable();
            $form->image('cover_image', '设备封面图')->rules('required');
        })->tab('产品详情', function (Form $form){
//            $form->embeds('detail', function ($form){
//                $form->textarea('summary','产品概述');
//                $form->textarea('merit','产品优点');
//                $form->textarea('purpose','产品用途');
//                $form->textarea('property','性能范围');
//            });
            $form->ckeditor('detail');
        })->tab('产品型号', function (Form $form){
            $form->ckeditor('information');
        });



        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }

    /**
     * 获取设备列表数据
     *
     * @return object
     * @author duo_mi
     * @ 2019-04-12
     */
    protected function grid()
    {
        $grid = new Grid(new ProductModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->id('ID')->sortable();

        $grid->name('设备名称')->editable();
        $grid->describe('设备简介')->editable();
        $grid->cover_image('封面图')->image();

        $grid->created_at('创建时间');

        $grid->actions(function (Grid\Displayers\Actions $actions) {
            $actions->disableView();
        });

        return $grid;
    }
}

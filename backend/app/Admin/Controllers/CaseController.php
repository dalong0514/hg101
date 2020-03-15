<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CaseModel;
use App\Models\LabelModel;
use App\Models\TypeModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\ProductModel;
use Encore\Admin\Grid;
use function foo\func;

class CaseController extends Controller
{
    use HasResourceActions;
    /**
     * 案例列表
     *
     * @return mixed
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function index(Content $content)
    {
        return $content
            ->header('案例')
            ->description('列表')
            ->row($this->grid());
    }

    /**
     * 编辑案例
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('案例')
            ->description('编辑')
            ->body($this->form()->edit($id));
    }

    /**
     * 创建案例.
     *
     * @return Content
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function create(Content $content)
    {
        return $content
            ->header('案例')
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
        $form = new Form(new CaseModel());

        $form->display('id', 'ID');

        $form->disableViewCheck();

        $form->tab('基础信息', function (Form $form) {
            $form->number('wight', '排序');
            $form->text('name', '标题')->rules('required');
            $form->text('describe', '简介')->rules('required');
//            $form->radio('type_id', '案例类型')->options(TypeModel::_type())->stacked()->rules('required');
            $form->multipleSelect('label_id', '标签')->options(LabelModel::_label())->rules('required');
            $form->switch('status', '是否发布');
            $form->switch('is_hot', '设置为推荐');
        })->tab('案例图片', function (Form $form){
            $form->multipleImage('images', '案例图片')->removable();
            $form->image('cover_image', '案例封面图');
        })->tab('案例详情', function (Form $form){
            $form->ckeditor('detail');
        })->tab('案例型号', function (Form $form){
            $form->ckeditor('information');
        });



        $form->display('created_at', '创建时间');
        $form->display('updated_at', '更新时间');

        return $form;
    }

    /**
     * 获取案例列表数据
     *
     * @return object
     * @author duo_mi
     * @ 2019-04-12
     */
    protected function grid()
    {
        $grid = new Grid(new CaseModel());

        $grid->model()->orderBy('id', 'desc');

        $grid->id('ID')->sortable();

        $grid->name('案例名称')->editable();
        $grid->describe('案例简介')->editable();
        $grid->cover_image('封面图')->image();

        $grid->created_at('创建时间');

        $grid->actions(function (Grid\Displayers\Actions $actions) {
            $actions->disableView();
        });

        return $grid;
    }
}

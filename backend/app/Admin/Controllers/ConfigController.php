<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ConfigModel;
use App\Models\TxUserModel;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Layout\Content;
use App\Models\FeedbackModel;
use Encore\Admin\Grid;

class ConfigController extends Controller
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
            ->header('配置')
            ->description('配置页面')
            ->row($this->form());
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
        $form = new Form(new ConfigModel());

        $form->disableReset();
        $form->disableEditingCheck();
        $form->disableViewCheck();

        //表单右上角
        $form->tools(function (Form\Tools $tools) {
            $tools->disableDelete();
            $tools->disableView();
        });

        $form->text('problem_title', '问题收集页标题文案');
        $form->text('problem_txt', '问题收集页文本框文案');
        $form->text('search_txt', '搜索框文案');

        $form->saved(function () {
            // 跳转页面
            return redirect('/admin/config/1/edit');
        });

        return $form;
    }

    /**
     * 编辑配置
     *
     * @author duo_mi
     * @date 2019-04-12
     */
    public function edit($id=1, Content $content)
    {
        return $content
            ->header('Config')
            ->description('编辑')
            ->body($this->form()->edit(1));
    }
}

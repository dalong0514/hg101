<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\Dashboard;
use Encore\Admin\Layout\Column;
use Encore\Admin\Layout\Content;
use Encore\Admin\Layout\Row;

class HomeController extends Controller
{
    public function __construct(){
        // 系统环境配置

    }


    public function index(Content $content)
    {
        return $content
            ->header('系统仪表盘')
            ->description('系统运行环境配置信息')
            ->row(view('dashboard.title'))
            ->row(function (Row $row) {

//                $row->column(4, function (Column $column) {
//                    $column->append(view('dashboard.dataview'));
//                });

//                $row->column(4, function (Column $column) {
//                    $column->append(Dashboard::environment());
//                });

//                $row->column(4, function (Column $column) {
//                    $column->append(Dashboard::extensions());
//                });
//
//                $row->column(4, function (Column $column) {
//                    $column->append(Dashboard::dependencies());
//                });
            });
    }
}

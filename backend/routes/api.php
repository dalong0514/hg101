<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['namespace' => 'App\Api\v1\Controllers'], function($api){

    // 获取用户 openid
    $api->get('openid', 'UserController@openid')->name('openid');

    // 登录
    $api->post('login', 'UserController@login')->name('login');

    // 点赞
    $api->post('like', 'UserController@like')->name('like');

    // 主页
    $api->get('home', 'HomeController@index');

    // 搜索
    $api->get('search', 'HomeController@search');

    // 筛选
    $api->get('screen', 'HomeController@screen');

    // 设备类型
    $api->get('type', 'HomeController@type');

    // 标签
    $api->get('label', 'HomeController@label');

    // 详情
    $api->get('detail', 'HomeController@detail');

    // 案例主页面
    $api->post('case', 'HomeController@case');

    // 问题
    $api->post('problem', 'HomeController@problem');

    // 点赞列表
    $api->get('likeList', 'UserController@likeList');

    // 点赞列表
    $api->get('problem_txt', 'HomeController@problem_txt');

    // 上传图片
    $api->post('upload','UploadController@uploadImage');

    // 定型设备 api
    $api->get('typedevices','TypeDevicesController@typedevices');
    
    // 泵的 api
    $api->get('pump','TypeDevicesController@pump');

    // 物性的 api
    $api->get('property','PropertyController@property');

    // 物性搜索
    $api->get('prosearch', 'PropertyController@prosearch');
});

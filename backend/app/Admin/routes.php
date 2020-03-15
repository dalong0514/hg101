<?php

use Illuminate\Routing\Router;

Admin::registerAuthRoutes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
], function (Router $router) {

    $router->get('/', 'HomeController@index');

    $router->resources([
        'product'            => ProductController::class,
        'case'               => CaseController::class,
        'feedback'           => FeedbackController::class,
        'tzuser'             => TzuserController::class,
        'banner'             => BannerController::class,
        'type'               => TypeController::class,
        'label'              => LabelController::class,
        'config'             => ConfigController::class,
    ]);

});

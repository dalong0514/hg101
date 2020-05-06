<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/tz', function () {
    return view('dataflow');
});

Route::get('/excel/upload', 'ImportController@show');
Route::post('/excel/upload', 'ImportController@upload');

Route::get('/excel/import', 'ImportController@import');
Route::get('/excel/export', 'ImportController@export');
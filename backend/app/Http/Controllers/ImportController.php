<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Imports\DataImport;
use League\Fractal\Resource\Item;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ImportController extends Controller
{
    public function show() {
        return view('import');
    }

    // 文件上传
    // public function upload(Request $request) {
    //     $fileCharater = $request->file('source');
    //     // 先验证
    //     if ($fileCharater->isValid()) {
    //         // 获取扩展名
    //         $ext = $fileCharater->getClientOriginalExtension();
    //         // 获取文件绝对路径
    //         $path = $fileCharater->getRealPath();
    //         // 定义存入的文件名
    //         $filename = date('Y-m-d-h-i-s') . '.' . $ext;
    //         // 存储文件
    //         Storage::disk('public')->put($filename, file_get_contents($path));
    //     }
    //     return view('importresult');
    //     // return back();  // 返回到上一个页面
    // }

    // 文件导出
    public function export() {
        // return Excel::download(new InvoicesExport, 'invoices.xlsx');
        $this->storeExcel();
    }

    // 导入文件数据
    public function import() 
    {
        $collection = Excel::toCollection(new DataImport, 'invoices.xlsx');
        var_dump($collection);
        echo $collection;
        // Excel::import(new DataImport, 'invoices.xlsx');
    }

    // 直接从上传的文件里抽取数据
    public function upload(Request $request) {
        $fileCharater = $request->file('source');
        // 先验证
        if ($fileCharater->isValid()) {
            // 直接读取
            $collection = Excel::toArray(new DataImport, $fileCharater);
            // $collection = Excel::toCollection(new DataImport, $fileCharater);
            $data = $collection[0];
            $cadata = [];
            $keyindex = $collection[0][0];
            $keyindex = array_map('strtolower', $keyindex);    // 转小写                
            foreach ($data as $item) {
                array_push($cadata, $this->replace_keys($item, $keyindex));
            }
            array_shift($cadata);    // 剔除首个数据
            // DB::table('ns_ventilation')->insert($cadata);   // 写入数据库
            var_dump($cadata);
            // return view('cadconfirm', ['model' => $cadata]);
        }
    }

    // 更新 cad 数组键名
    public function replace_keys($array, $keyarray) {
        $keys = array_keys($keyarray);
        foreach ($keyarray as $key => $value) {
            $keys[$key] = $value;
        }
        return array_combine($keys, array_values($array));
    }
}

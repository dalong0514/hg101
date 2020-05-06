<?php

namespace App\Imports;

use App\Models\NsVentilation;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;

class DataImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows) {
        NsVentilation::created($rows);
    }
}

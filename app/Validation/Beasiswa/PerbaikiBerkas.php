<?php

namespace App\Validation\Beasiswa;

class PerbaikiBerkas
{

   public function submitPerbaiki(): array
   {
      return [
         'catatan_perbaikan' => [
            'rules' => 'required',
            'label' => 'Catatan perbaikan'
         ]
      ];
   }
}

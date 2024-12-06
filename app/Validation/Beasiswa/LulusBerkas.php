<?php

namespace App\Validation\Beasiswa;

class LulusBerkas
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

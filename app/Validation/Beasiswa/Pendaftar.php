<?php

namespace App\Validation\Beasiswa;

class Pendaftar
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

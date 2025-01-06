<?php

namespace App\Validation\Beasiswa;

class Penerima
{

   public function submitImport(): array
   {
      return [
         'jenis_beasiswa' => [
            'rules' => 'required',
            'label' => 'Jenis beasiswa'
         ]
      ];
   }

   public function submitPerbaiki(): array
   {
      return [
         'catatan_perbaikan' => [
            'rules' => 'required',
            'label' => 'Catatan'
         ]
      ];
   }
}

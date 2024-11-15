<?php

namespace App\Validation;

class Informasi
{
   public function submit(): array
   {
      return [
         'judul' => [
            'rules' => 'required',
            'label' => 'Judul informasi'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'rules' => 'required|numeric',
            'label' => 'ID informasi'
         ]
      ];
   }
}

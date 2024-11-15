<?php

namespace App\Validation;

class Berita
{
   public function submit(): array
   {
      return [
         'judul' => [
            'rules' => 'required',
            'label' => 'Judul berita'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'rules' => 'required|numeric',
            'label' => 'ID berita'
         ]
      ];
   }
}

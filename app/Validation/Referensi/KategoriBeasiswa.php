<?php

namespace App\Validation\Referensi;

class KategoriBeasiswa
{
   public function submit(): array
   {
      return [
         'nama' => [
            'label' => 'Kategori Beasiswa',
            'rules' => 'required'
         ],
         'keterangan' => [
            'label' => 'Keterangan',
            'rules' => 'required'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'rules' => 'required|numeric',
            'label' => 'ID kategori'
         ]
      ];
   }
}

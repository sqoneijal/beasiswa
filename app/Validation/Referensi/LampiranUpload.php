<?php

namespace App\Validation\Referensi;

class LampiranUpload
{
   public function submit(): array
   {
      return [
         'nama' => [
            'rules' => 'required',
            'label' => 'Nama lampiran'
         ],
         'keterangan' => [
            'rules' => 'required',
            'label' => 'Keterangan lampiran'
         ]
      ];
   }

   public function hapus(): array
   {
      return [
         'id' => [
            'rules' => 'required|numeric',
            'label' => 'ID lampiran'
         ]
      ];
   }
}

<?php

namespace App\Validation;

class GenerateBeasiswa
{

   public function hapus(): array
   {
      return [
         'id' => [
            'rules' => 'required|numeric',
            'label' => 'ID generate beasiswa'
         ]
      ];
   }

   public function submit(array $post): array
   {
      return [
         'tanggal_mulai' => [
            'rules' => 'required|valid_date[Y-m-d]',
            'label' => 'Tanggal mulai'
         ],
         'tanggal_akhir' => [
            'rules' => 'required|valid_date[Y-m-d]',
            'label' => 'Tanggal akhir'
         ],
         'angkatan' => [
            'rules' => 'required',
            'label' => 'Angkatan'
         ],
         'lampiran_upload' => [
            'rules' => 'required',
            'label' => 'Lampiran upload'
         ],
         'wajib_ipk' => [
            'rules' => 'required',
            'label' => 'Apakah wajib IPK'
         ],
         'id_kategori_beasiswa' => [
            'rules' => ['required', 'numeric', static function ($value, array $data, ?string &$error): bool {
               if ($data['pageType'] === 'add') {
                  $db = \Config\Database::connect();

                  $table = $db->table('tb_generate_beasiswa');
                  $table->where('periode', $data['periode']);
                  $table->where('id_kategori_beasiswa', $value);

                  $found = $table->countAllResults() > 0 ? true : false;

                  if ($found) {
                     $error = 'Kategori beasiswa ini sudah terdaftar pada periode aktif sekarang. Silahkan ganti dengan kategori yang lain.';
                     return false;
                  }
                  return true;
               }

               return true;
            }],
            'label' => 'Kategori beasiswa'
         ],
         'minimal_ipk' => [
            'rules' => @$post['wajib_ipk'] === 't' ? 'required|numeric|greater_than[0]' : 'permit_empty',
            'label' => 'Minimal IPK'
         ],
         'maksimal_ipk' => [
            'rules' => @$post['wajib_ipk'] === 't' ? 'required|numeric|greater_than[0]' : 'permit_empty',
            'label' => 'Maksimal IPK'
         ]
      ];
   }
}

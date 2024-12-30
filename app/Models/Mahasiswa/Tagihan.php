<?php

namespace App\Models\Mahasiswa;

use App\Models\Common;

class Tagihan extends Common
{

   public function syncronTagihan(array $post): void
   {
      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTagihanMahasiswa($post['nim']);

      $fields = ['id_tagihan', 'id_transaksi', 'kode_transaksi', 'id_periode', 'uraian', 'tanggal_transaksi', 'tanggal_akhir', 'nim', 'nama_mahasiswa', 'id_pendaftar', 'nama_pendaftar', 'id_periode_daftar', 'id_jenis_akun', 'jenis_akun', 'id_mata_uang', 'nominal_tagihan', 'nominal_denda', 'nominal_potongan', 'total_potongan', 'nominal_terbayar', 'nominal_sisa_tagihan', 'is_lunas', 'is_batal', 'is_rekon', 'waktu_rekon'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_tagihan');
         $table->ignore(true)->insertBatch($data);
      }
   }

   public function getData(array $post): array
   {
      $table = $this->db->table('tb_tagihan');
      $table->where('nim', $post['nim']);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }
      return $response;
   }
}

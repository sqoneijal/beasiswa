<?php

namespace App\Models;

class Dashboard extends Common
{

   public function jumlahPendaftarPerJenisBeasiswa(): array
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tgb.id_kategori_beasiswa, coalesce(count(*), 0) as jumlah');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->groupBy('tgb.id_kategori_beasiswa');

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[$row['id_kategori_beasiswa']] = $row['jumlah'];
      }
      return $response;
   }
}

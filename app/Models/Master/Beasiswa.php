<?php

namespace App\Models\Master;

use App\Models\Common;

class Beasiswa extends Common
{

   public function getData(): array
   {
      $table = $this->db->table('tb_mst_jenis_beasiswa');

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

<?php

namespace App\Models;

class User extends Common
{

   public function getData(string $username): array
   {
      $table = $this->db->table('tb_users');
      $table->where('username', $username);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }
}

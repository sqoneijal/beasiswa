<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class Tentang extends Common
{

   public function submit(array $post): array
   {
      try {
         $checkData = $this->checkData();

         $fields = ['content'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];
         $data['modified'] = new RawSql('now()');

         $table = $this->db->table('tb_tentang');
         if ($checkData) {
            $table->update($data);
         } else {
            $table->insert($data);
         }

         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function checkData(): bool
   {
      $table = $this->db->table('tb_tentang');

      return $table->countAllResults() > 0;
   }

   public function getData(): array
   {
      try {
         $table = $this->db->table('tb_tentang');

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

         return ['status' => true, 'content' => $response];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }
}

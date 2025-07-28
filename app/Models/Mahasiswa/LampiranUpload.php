<?php

namespace App\Models\Mahasiswa;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class LampiranUpload extends Common
{

   private function checkFileExists(int $id_lampiran_upload, int $nim): bool
   {
      $table = $this->db->table('tb_lampiran_upload_mahasiswa');
      $table->where('id_lampiran_upload', $id_lampiran_upload);
      $table->where('nim', $nim);

      return $table->countAllResults() > 0;
   }

   public function uploadDokumen(array $post): array
   {
      try {
         $checkFileExists = $this->checkFileExists($post['id_lampiran_upload'], $post['nim']);

         $table = $this->db->table('tb_lampiran_upload_mahasiswa');
         if ($checkFileExists) {
            $table->where('id_lampiran_upload', $post['id_lampiran_upload']);
            $table->where('nim', $post['nim']);
            $table->update([
               'orig_name' => $post['orig_name'],
               'file_path' => $post['file_path'],
               'modified' => new RawSql('NOW()'),
               'user_modified' => $post['nim']
            ]);
         } else {
            $table->insert([
               'nim' => $post['nim'],
               'id_lampiran_upload' => $post['id_lampiran_upload'],
               'orig_name' => $post['orig_name'],
               'file_path' => $post['file_path'],
               'uploaded' => new RawSql('NOW()'),
               'user_modified' => $post['nim']
            ]);
         }

         sleep(3);

         return ['status' => true, 'content' => $this->getDataLampiranUpload($post['nim'])];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function getDataLampiranUpload(int $nim): array
   {
      $table = $this->db->table('tb_lampiran_upload_mahasiswa');
      $table->where('nim', $nim);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[$row['id_lampiran_upload']] = $row;
      }
      return $response;
   }
}

<?php

namespace App\Models\Mahasiswa;

use CodeIgniter\Model;

class Transkrip extends Model
{

   public function getTranskripMahasiswa(string $nim): array
   {
      $this->checkTranskrip($nim);

      $table = $this->db->table('tb_transkrip');
      $table->where('nim', $nim);

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

   private function checkTranskrip(string $nim): void
   {
      $table = $this->db->table('tb_transkrip');
      $table->where('nim', $nim);

      $found = $table->countAllResults() > 0;
      if (!$found) {
         $this->syncronTranskrip(['nim' => $nim]);
         sleep(3);
      }
   }

   public function syncronTranskrip(array $post): void
   {
      $this->deleteTranskrip($post['nim']);

      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTranskripMahasiswa($post['nim']);

      $this->insertTranskrip($content);
   }

   private function insertTranskrip(array $post): void
   {
      $fields = ['nim', 'id_program_studi', 'jenjang_program_studi', 'program_studi', 'id_kurikulum', 'kode_mata_kuliah', 'nama_mata_kuliah', 'nama_mata_kuliah_en', 'semester_mata_kuliah_ditempuh', 'sks_mata_kuliah', 'bobot_mata_kuliah', 'nilai_huruf', 'nilai_angka', 'is_transfer', 'semester_mahasiswa', 'id_kelompok_mata_kuliah', 'kelompok_mata_kuliah', 'id_periode', 'periode', 'is_mkdu', 'is_mengulang', 'is_lulus', 'is_mata_kuliah_wajib', 'is_deleted'];

      $data = [];
      foreach ($post as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_transkrip');
         $table->insertBatch($data);
      }
   }

   private function deleteTranskrip(string $nim): void
   {
      $table = $this->db->table('tb_transkrip');
      $table->where('nim', $nim);
      $table->delete();
   }
}

<?php

namespace App\Models\Mahasiswa;

use App\Models\Common;

class Khs extends Common
{

   public function syncronKHS(array $post): void
   {
      $this->deleteKHSMahasiswa($post['nim']);

      $sevima = service('curlrequest', [
         'baseURI' => env('SEVIMA_PATH_URL'),
         'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-App-Key' => env('SEVIMA_APP_KEY'),
            'X-Secret-Key' => env('SEVIMA_APP_SECRET')
         ]
      ]);

      $req = $sevima->request('GET', 'mahasiswa/' . $post['nim'] . '/khs');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      $this->insertKHSMahasiswa($data);
   }

   private function insertKHSMahasiswa(array $post): void
   {
      $fields = ['id_periode', 'nim', 'id_kelas', 'kelompok', 'nama_kelas', 'id_kelas_perkuliahan', 'kelas_perkuliahan', 'id_kurikulum', 'id_program_studi', 'program_studi', 'kode_mata_kuliah', 'mata_kuliah', 'sks', 'nilai_angka', 'nilai_numerik', 'nilai_huruf', 'is_pakai', 'is_lulus', 'is_nilai_masuk', 'is_nilai_akhir', 'is_auto_nilai', 'is_ulang', 'is_tunda_nilai', 'is_deleted'];

      $data = [];
      foreach ($post as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_khs');
         $table->insertBatch($data);
      }
   }

   private function deleteKHSMahasiswa(string $nim): void
   {
      $table = $this->db->table('tb_khs');
      $table->where('nim', $nim);
      $table->delete();
   }

   private function checkKHS(string $nim): void
   {
      $table = $this->db->table('tb_khs');
      $table->where('nim', $nim);

      $found = $table->countAllResults() > 0;

      if (!$found) {
         $this->syncronKHS(['nim' => $nim]);
         sleep(3);
      }
   }

   public function getKHSMahasiswa(string $nim): array
   {
      $this->checkKHS($nim);

      $table = $this->db->table('tb_khs');
      $table->where('nim', $nim);

      $get = $table->get();
      $result = $get->getResultArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $output = [];
      foreach ($result as $key => $val) {
         foreach ($fieldNames as $field) {
            $output[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
         }
      }

      $periode = [];
      $content = [];
      foreach ($output as $row) {
         $periode[] = $row['id_periode'];

         $content[$row['id_periode']][] = $row;
      }

      $uniqueArray = array_values(array_unique($periode));
      sort($uniqueArray);

      return [
         'periode' => $uniqueArray,
         'content' => $content
      ];
   }
}

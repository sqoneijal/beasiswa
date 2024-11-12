<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class GenerateBeasiswa extends Common
{

   public function submit(array $post): array
   {
      try {
         $fields = ['periode', 'tanggal_mulai', 'tanggal_akhir', 'wajib_ipk', 'minimal_ipk', 'maksimal_ipk', 'id_kategori_beasiswa'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_generate_beasiswa');
         if ($post['pageType'] === 'add') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);

            $lastID = $this->db->insertID('tb_generate_beasiswa_id_seq');

            if ($lastID && $post['angkatan']) {
               $this->generateAngkatanBeasiswa($lastID, $post['angkatan']);
            }

            if ($lastID && $post['lampiran_upload']) {
               $this->generateLampiranUpload($lastID, $post['lampiran_upload']);
            }
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->update($data, ['id' => $post['id']]);
         }
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function generateLampiranUpload(int $id_generate_beasiswa, string $lampiran): void
   {
      $this->deleteOldLampiranUpload($id_generate_beasiswa);

      $dataLampiran = json_decode($lampiran, true);

      $data = [];
      if (!empty($dataLampiran)) {
         foreach ($dataLampiran as $row) {
            array_push($data, [
               'id_lampiran_upload' => $row['id'],
               'id_generate_beasiswa' => $id_generate_beasiswa
            ]);
         }
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_lampiran_upload');
         $table->insertBatch($data);
      }
   }

   private function deleteOldLampiranUpload(int $id_generate_beasiswa): void
   {
      $table = $this->db->table('tb_lampiran_upload');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);
      $table->delete();
   }

   private function generateAngkatanBeasiswa(int $id_generate_beasiswa, string $angkatan): void
   {
      $this->deleteOldAngkatan($id_generate_beasiswa);
      $dataAngkatan = json_decode($angkatan, true);

      $data = [];
      if (!empty($dataAngkatan)) {
         foreach ($dataAngkatan as $row) {
            array_push($data, [
               'id_generate_beasiswa' => $id_generate_beasiswa,
               'angkatan' => $row['id']
            ]);
         }
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_angkatan_beasiswa');
         $table->insertBatch($data);
      }
   }

   private function deleteOldAngkatan(int $id_generate_beasiswa): void
   {
      $table = $this->db->table('tb_angkatan_beasiswa');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);
      $table->delete();
   }

   public function getData($post = [])
   {
      try {
         $table = $this->queryData($post);
         $table->limit((int) $post['length'], (int) $post['start']);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();

         $get->freeResult();

         $response = [];
         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = ($val[$field] ? trim($val[$field]) : '');
            }
         }
         return $response;
      } catch (\Exception $e) {
         die($e->getMessage());
      }
   }

   public function countData()
   {
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      return $table->countAllResults();
   }

   public function filteredData()
   {
      $table = $this->queryData();
      return $table->countAllResults();
   }

   private function queryData()
   {
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->select('tgb.id, tgb.periode, tgb.tanggal_mulai, tgb.tanggal_akhir, tgb.wajib_ipk, tgb.minimal_ipk, tgb.maksimal_ipk, tgb.id_kategori_beasiswa, tmjb.nama as kategori_beasiswa, tab.angkatan');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->join('(select id_generate_beasiswa, array_agg(angkatan) as angkatan from tb_angkatan_beasiswa group by id_generate_beasiswa) tab', 'tab.id_generate_beasiswa = tgb.id', 'left');

      $this->datatableColumnSearch($table, ['tmjb.nama']);
      $this->datatableColumnOrder($table, ['kategori_beasiswa']);

      return $table;
   }
}

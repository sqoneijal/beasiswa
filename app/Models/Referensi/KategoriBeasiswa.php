<?php

namespace App\Models\Referensi;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class KategoriBeasiswa extends Common
{

   private function getAngkatanBeasiswa(int $id_generate_beasiswa): array
   {
      $table = $this->db->table('tb_angkatan_beasiswa');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[] = $row['angkatan'];
      }
      return $response;
   }

   private function getLampiranUpload(int $id_generate_beasiswa): array
   {
      $table = $this->db->table('tb_lampiran_upload tlu');
      $table->select('tmlu.nama');
      $table->join('tb_mst_lampiran_upload tmlu', 'tmlu.id = tlu.id_lampiran_upload');
      $table->where('tlu.id_generate_beasiswa', $id_generate_beasiswa);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[] = $row['nama'];
      }
      return $response;
   }

   public function getDetail(string $slug): array
   {
      $table = $this->db->table('tb_mst_jenis_beasiswa tmjb');
      $table->select('tmjb.*, tgb2.periode, tgb2.tanggal_mulai, tgb2.tanggal_akhir, tgb2.wajib_ipk, tgb2.minimal_ipk, tgb2.maksimal_ipk, tgb2.id as id_generate_beasiswa');
      $table->join('(select id_kategori_beasiswa, max(periode) as periode from tb_generate_beasiswa group by id_kategori_beasiswa) tgb', 'tgb.id_kategori_beasiswa = tmjb.id', 'left');
      $table->join('tb_generate_beasiswa tgb2', 'tgb2.id_kategori_beasiswa = tmjb.id and tgb2.periode = tgb.periode', 'left');
      $table->where('replace(lower(tmjb.nama), \' \', \'-\')', $slug);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }

         $response['angkatan'] = isset($data['id_generate_beasiswa']) ? $this->getAngkatanBeasiswa($data['id_generate_beasiswa']) : [];
         $response['lampiranUpload'] = isset($data['id_generate_beasiswa']) ? $this->getLampiranUpload($data['id_generate_beasiswa']) : [];
      }
      return $response;
   }

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_mst_jenis_beasiswa');
         $table->where('id', $post['id']);
         $table->delete();

         return ['status' => true, 'msg_response' => 'Data berhasil dihapus.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function submit(array $post): array
   {
      try {
         $fields = ['nama', 'keterangan'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_mst_jenis_beasiswa');
         if ($post['pageType'] === 'add') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);
         }

         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
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
      $table = $this->db->table('tb_mst_jenis_beasiswa');
      return $table->countAllResults();
   }

   public function filteredData($post = [])
   {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData()
   {
      $table = $this->db->table('tb_mst_jenis_beasiswa');

      $this->datatableColumnSearch($table, ['nama']);
      $this->datatableColumnOrder($table, ['nama']);

      return $table;
   }
}

<?php

namespace App\Models\Referensi;

use App\Models\Common;
use CodeIgniter\Database\RawSql;

class KategoriBeasiswa extends Common
{

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

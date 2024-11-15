<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class Berita extends Common
{

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_berita');
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
         $fields = ['judul', 'id_jenis_beasiswa', 'user_modified'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['content'] = htmlentities($post['content']);
         $data['slug'] = url_title($post['judul'], '-', true);

         $table = $this->db->table('tb_berita');
         if ($post['pageType'] === 'add') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);

            $lastID = $this->db->insertID('tb_berita_id_seq');

            if ($lastID) {
               $this->generateLampiranBerita($lastID, $post['lampiran']);
            }
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->where('id', $post['id']);
            $table->update($data);

            $this->generateLampiranBerita($post['id'], $post['lampiran']);
         }
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function generateLampiranBerita(int $id_berita, string $lampiran): void
   {
      if ($lampiran) {
         $decodeLampiran = json_decode($lampiran, true);

         if (!empty($decodeLampiran)) {
            $this->deleteLampiranBerita($id_berita);

            $data = [];
            foreach ($decodeLampiran as $row) {
               array_push($data, [
                  'id_berita' => $id_berita,
                  'id_lampiran_upload' => $row['id']
               ]);
            }

            if (!empty($data)) {
               $table = $this->db->table('tb_lampiran_berita');
               $table->insertBatch($data);
            }
         }
      }
   }

   private function deleteLampiranBerita(int $id_berita): void
   {
      $table = $this->db->table('tb_lampiran_berita');
      $table->where('id_berita', $id_berita);
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
      $table = $this->db->table('tb_berita');
      return $table->countAllResults();
   }

   public function filteredData()
   {
      $table = $this->queryData();
      return $table->countAllResults();
   }

   private function queryData()
   {
      $table = $this->db->table('tb_berita tb');
      $table->select('tb.*, coalesce(tlb.lampiran_upload, \'[]\') as lampiran_upload, tmjb.nama as jenis_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tb.id_jenis_beasiswa', 'left');
      $table->join('(select tlb.id_berita, json_agg(json_build_object(\'id\', tlb.id_lampiran_upload, \'label\', tmlu.nama)) as lampiran_upload
      from tb_lampiran_berita tlb
      join tb_mst_lampiran_upload tmlu on tmlu.id = tlb.id_lampiran_upload
      group by tlb.id_berita) tlb', 'tlb.id_berita = tb.id', 'left');

      $this->datatableColumnSearch($table, ['tb.judul']);
      $this->datatableColumnOrder($table, ['judul', 'jenis_beasiswa', 'uploaded']);

      return $table;
   }
}

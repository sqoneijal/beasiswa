<?php

namespace App\Models;

class Periode extends Common
{

   public function getData(): array
   {
      $table = $this->db->table('tb_mst_periode');
      $table->orderBy('id', 'desc');

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

   public function downloadDariSevima(): array
   {
      try {
         $sevima = service('curlrequest', [
            'baseURI' => env('SEVIMA_PATH_URL'),
            'headers' => [
               'Content-Type' => 'application/json',
               'Accept' => 'application/json',
               'X-App-Key' => env('SEVIMA_APP_KEY'),
               'X-Secret-Key' => env('SEVIMA_APP_SECRET')
            ]
         ]);

         $req = $sevima->request('GET', 'periode');
         $body = json_decode($req->getBody(), true);

         $attributes = [];
         $data = [];
         foreach ($body['data'] as $row) {
            array_push($data, ['id' => $row['id']]);
            $attributes[] = $row['attributes'];
         }

         foreach ($attributes as $index => $row) {
            $data[$index] = array_merge($data[$index], [
               'nama_periode' => $row['nama_periode'],
               'nama_singkat' => $row['nama_singkat'],
               'tahun_ajar' => $row['tahun_ajar'],
               'is_aktif' => $row['is_aktif'],
            ]);
         }

         $this->deleteOldPeriode();
         $this->insertPeriode($data);

         return ['status' => true, 'content' => $data, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function insertPeriode(array $data): void
   {
      $table = $this->db->table('tb_mst_periode');
      $table->insertBatch($data);
   }

   private function deleteOldPeriode(): void
   {
      $table = $this->db->table('tb_mst_periode');
      $table->emptyTable();
   }
}

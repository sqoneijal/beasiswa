<?php

namespace App\Libraries;

class Sevima
{

   protected $curl;

   public function __construct()
   {
      $this->curl = service('curlrequest', [
         'baseURI' => env('SEVIMA_PATH_URL'),
         'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-App-Key' => env('SEVIMA_APP_KEY'),
            'X-Secret-Key' => env('SEVIMA_APP_SECRET')
         ]
      ]);
   }

   public function getBiodataMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim);
      $body = json_decode($req->getBody(), true);

      return $body['attributes'];
   }

   public function getTranskripMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/transkrip');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      return $data;
   }

   public function getKHSMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/khs');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      $periode = [];
      $content = [];
      foreach ($data as $row) {
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

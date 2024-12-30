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

   public function getTagihanMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/invoice');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      return $data;
   }

   public function getPeriodeAktif(): array
   {
      sleep(3);
      $req = $this->curl->request('GET', 'periode?f-is_aktif=1');
      $body = json_decode($req->getBody(), true);

      $results = [];
      foreach ($body['data'] as $row) {
         $results[] = $row['attributes'];
      }

      return current($results);
   }

   public function getPeriode(): array
   {
      $req = $this->curl->request('GET', 'periode');
      $body = json_decode($req->getBody(), true);

      $results = [];
      foreach ($body['data'] as $row) {
         $results[] = $row['attributes'];
      }

      return $results;
   }

   public function getKRSMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim . '/krs');
      $body = json_decode($req->getBody(), true);

      $data = [];
      foreach ($body['data'] as $row) {
         $data[] = $row['attributes'];
      }

      return $data;
   }

   public function getBiodataMahasiswa(string $nim): array
   {
      $req = $this->curl->request('GET', 'mahasiswa/' . $nim);
      $body = json_decode($req->getBody(), true);

      return $body['attributes'];
   }

   public function getTranskripMahasiswa(string $nim): array
   {
      sleep(3);
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

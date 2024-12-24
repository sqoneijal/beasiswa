<?php

namespace App\Models;

class User extends Common
{

   public function generateBiodataMahasiswa(array $post): void
   {
      $checkExistsBiodataMahasiswa = $this->checkExistsBiodataMahasiswa($post['nim']);
      if (!$checkExistsBiodataMahasiswa) {
         $sevima = new \App\Libraries\Sevima();
         $this->insertBiodataMahasiswa($sevima->getBiodataMahasiswa($post['nim']));
      }
   }

   private function insertBiodataMahasiswa(array $post): void
   {
      $fields = [
         'nim',
         'nisn',
         'nupn',
         'npsn',
         'nirm',
         'nirl',
         'id_periode',
         'id_periode_terakhir',
         'id_negara',
         'nama_negara',
         'id_agama',
         'agama',
         'id_sistem_kuliah',
         'sistem_kuliah',
         'id_kurikulum',
         'id_kurikulum_asal',
         'id_jalur_pendaftaran',
         'jalur_pendaftaran',
         'id_program_studi',
         'id_satuan_kerja',
         'program_studi',
         'id_jenjang',
         'id_status_mahasiswa',
         'status_mahasiswa',
         'id_gelombang',
         'gelombang',
         'id_pekerjaan',
         'pekerjaan',
         'nama',
         'gelar_depan',
         'gelar_belakang',
         'alamat',
         'rt',
         'rw',
         'dusun',
         'desa',
         'kode_pos',
         'id_kecamatan',
         'kecamatan',
         'id_kota',
         'kota',
         'id_provinsi',
         'provinsi',
         'alamat_domisili',
         'rt_domisili',
         'rw_domisili',
         'dusun_domisili',
         'desa_domisili',
         'kode_pos_domisili',
         'id_kecamatan_domisili',
         'kecamatan_domisili',
         'id_kota_domisili',
         'kota_domisili',
         'id_provinsi_domisili',
         'provinsi_domisili',
         'telepon',
         'hp',
         'tempat_lahir',
         'tanggal_lahir',
         'jenis_kelamin',
         'status_nikah',
         'email',
         'nik',
         'nomor_kk',
         'nomor_kps',
         'tanggal_daftar',
         'nama_sekolah',
         'no_ijazah_sma',
         'id_kategori_ukt',
         'kategori_ukt',
         'is_transfer',
         'nim_lama',
         'id_universitas_asal',
         'universitas_asal',
         'id_program_studi_asal',
         'program_studi_asal',
         'ipk_asal',
         'sks_asal',
         'id_periode_transfer',
         'tanggal_transfer',
         'email_kampus',
         'is_disabilitas',
         'tanggal_sk_keluar',
         'no_sk_keluar',
         'alasan_keluar'
      ];
      $data = [];
      foreach ($fields as $field) {
         if (@$post[$field]) {
            $data[$field] = $post[$field];
         } else {
            $data[$field] = null;
         }
      }

      $table = $this->db->table('tb_mahasiswa');
      $table->insert($data);
   }

   private function checkExistsBiodataMahasiswa(string $nim): bool
   {
      $table = $this->db->table('tb_mahasiswa');
      $table->where('nim', $nim);

      return $table->countAllResults() > 0;
   }

   public function getData(string $username): array
   {
      $table = $this->db->table('tb_users');
      $table->where('username', $username);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }
      }
      return $response;
   }
}

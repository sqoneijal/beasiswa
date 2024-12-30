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
         $this->insertTagihan($sevima->getTagihanMahasiswa($post['nim']));
         $this->insertTranskrip($sevima->getTranskripMahasiswa($post['nim']));
      }
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
         $table->ignore(true)->insertBatch($data);
      }
   }

   private function insertTagihan(array $post): void
   {
      $fields = ['id_tagihan', 'id_transaksi', 'kode_transaksi', 'id_periode', 'uraian', 'tanggal_transaksi', 'tanggal_akhir', 'nim', 'nama_mahasiswa', 'id_pendaftar', 'nama_pendaftar', 'id_periode_daftar', 'id_jenis_akun', 'jenis_akun', 'id_mata_uang', 'nominal_tagihan', 'nominal_denda', 'nominal_potongan', 'total_potongan', 'nominal_terbayar', 'nominal_sisa_tagihan', 'is_lunas', 'is_batal', 'is_rekon', 'waktu_rekon'];

      $data = [];
      foreach ($post as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_tagihan');
         $table->ignore(true)->insertBatch($data);
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
      $table->ignore(true)->insert($data);
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

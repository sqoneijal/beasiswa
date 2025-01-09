<?php

namespace App\Models\Beasiswa;

use App\Models\Common;

class Dibatalkan extends Common
{

   public function syncronTagihan(array $post): array
   {
      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTagihanMahasiswa($post['nim']);

      $fields = ['id_tagihan', 'id_transaksi', 'kode_transaksi', 'id_periode', 'uraian', 'tanggal_transaksi', 'tanggal_akhir', 'nim', 'nama_mahasiswa', 'id_pendaftar', 'nama_pendaftar', 'id_periode_daftar', 'id_jenis_akun', 'jenis_akun', 'id_mata_uang', 'nominal_tagihan', 'nominal_denda', 'nominal_potongan', 'total_potongan', 'nominal_terbayar', 'nominal_sisa_tagihan', 'is_lunas', 'is_batal', 'is_rekon', 'waktu_rekon'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_tagihan');
         $table->ignore(true)->insertBatch($data);
      }

      sleep(3);
      return $this->getTagihanMahasiswa($post['nim']);
   }

   public function syncronKHS(array $post): array
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

      sleep(3);

      return $this->getKHSMahasiswa($post['nim']);
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

   public function syncronTranskrip(array $post): array
   {
      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTranskripMahasiswa($post['nim']);

      $fields = ['nim', 'id_program_studi', 'jenjang_program_studi', 'program_studi', 'id_kurikulum', 'kode_mata_kuliah', 'nama_mata_kuliah', 'nama_mata_kuliah_en', 'semester_mata_kuliah_ditempuh', 'sks_mata_kuliah', 'bobot_mata_kuliah', 'nilai_huruf', 'nilai_angka', 'is_transfer', 'semester_mahasiswa', 'id_kelompok_mata_kuliah', 'kelompok_mata_kuliah', 'id_periode', 'periode', 'is_mkdu', 'is_mengulang', 'is_lulus', 'is_mata_kuliah_wajib', 'is_deleted'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_transkrip');
         $table->ignore(true)->insertBatch($data);
      }

      return $this->getTranskripMahasiswa($post['nim']);
   }

   public function getDetail(string $nim, int $periode): array
   {
      return [
         'biodata' => $this->getBiodataMahasiswa($nim),
         'informasiPendaftaran' => $this->getInformasiPendaftaranBeasiswa($nim, $periode),
         'transkrip' => $this->getTranskripMahasiswa($nim),
         'khs' => $this->getKHSMahasiswa($nim),
         'tagihan' => $this->getTagihanMahasiswa($nim),
      ];
   }

   public function getInformasiPendaftaranBeasiswa(string $nim, int $periode): array
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tp.id as id_pendaftar, tp.periode, tp.nim, tp.id_generate_beasiswa, tp.uploaded as tanggal_daftar, tp.is_aktif, tp.nama as nama_mahasiswa, tgb.tanggal_mulai, tgb.tanggal_akhir, tgb.wajib_ipk, tgb.minimal_ipk, tgb.maksimal_ipk, tgb.id_kategori_beasiswa, tmjb.nama as nama_kategori_beasiswa, tmjb.keterangan as keterangan_kategori_beasiswa, tp.catatan_perbaikan');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->where('tp.nim', $nim);
      $table->where('tp.periode', $periode);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }

         $response['angkatanBeasiswa'] = $this->getAngkatanBeasiswa($data['id_generate_beasiswa']);
         $response['lampiranUploadBeasiswa'] = $this->getLampiranUploadBeasiswa($data['id_generate_beasiswa']);
         $response['lampiranYangDiUpload'] = $this->getLampiranYangDiUpload($nim);
      }
      return $response;
   }

   private function getLampiranYangDiUpload(int $nim): array
   {
      $table = $this->db->table('tb_lampiran_upload_mahasiswa');
      $table->where('nim', $nim);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[$row['id_lampiran_upload']] = $row;
      }
      return $response;
   }

   private function getLampiranUploadBeasiswa(int $id_generate_beasiswa): array
   {
      $table = $this->db->table('tb_lampiran_upload tlu');
      $table->select('tlu.id_lampiran_upload, tmlu.nama');
      $table->join('tb_mst_lampiran_upload tmlu', 'tmlu.id = tlu.id_lampiran_upload');
      $table->where('tlu.id_generate_beasiswa', $id_generate_beasiswa);

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

   private function getAngkatanBeasiswa(int $id_generate_beasiswa): array
   {
      $table = $this->db->table('tb_angkatan_beasiswa');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);
      $table->orderBy('angkatan');

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

   public function getGenerateBeasiswa(): array
   {
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->select('tgb.id as id_generate_beasiswa, tmjb.id as id_jenis_beasiswa, tmjb.nama as jenis_beasiswa, tgb.periode');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');

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

   public function countData($post = [])
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');

      $this->dt_where($table, [
         'tp.periode' => $post['periode'],
         'tp.id_status_pendaftaran' => 5
      ]);

      return $table->countAllResults();
   }

   public function filteredData($post = [])
   {
      $table = $this->queryData($post);
      return $table->countAllResults();
   }

   private function queryData($post = [])
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tp.id, tp.nim, tm.nama, tmjb.nama as jenis_beasiswa, tp.modified, tp.periode, tp.catatan_perbaikan, round(tt.ipk, 2) as ipk');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->join('(select nim, sum(bobot_mata_kuliah::numeric) / sum(sks_mata_kuliah::numeric) as ipk from tb_transkrip where is_lulus = \'1\' group by nim) tt', 'cast(tt.nim as numeric) = tp.nim', 'left');
      $table->join('tb_mahasiswa tm', 'cast(tm.nim as numeric) = tp.nim');

      $this->dt_where($table, [
         'tp.periode' => $post['periode'],
         'tp.id_status_pendaftaran' => 5
      ]);

      $this->datatableColumnSearch($table, ['tm.nim', 'tm.nama']);
      $this->datatableColumnOrder($table, ['nim', 'nama', 'jenis_beasiswa']);

      return $table;
   }
}

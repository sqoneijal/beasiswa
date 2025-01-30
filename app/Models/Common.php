<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;
use CodeIgniter\Model;

class Common extends Model
{

   protected $db;

   public function __construct()
   {
      parent::__construct();

      $this->db = \Config\Database::connect('default');
   }

   public function syncronTranskripMahasiswa(string $nim): void
   {
      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTranskripMahasiswa($nim);

      $fields = ['nim', 'id_program_studi', 'jenjang_program_studi', 'program_studi', 'id_kurikulum', 'kode_mata_kuliah', 'nama_mata_kuliah', 'nama_mata_kuliah_en', 'semester_mata_kuliah_ditempuh', 'sks_mata_kuliah', 'bobot_mata_kuliah', 'nilai_huruf', 'nilai_angka', 'is_transfer', 'semester_mahasiswa', 'id_kelompok_mata_kuliah', 'kelompok_mata_kuliah', 'id_periode', 'periode', 'is_mkdu', 'is_mengulang', 'is_lulus', 'is_mata_kuliah_wajib', 'is_deleted'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_transkrip');
         $table->ignore(true)->insertBatch($data);
      }
   }

   public function syncronKHSMahasiswa(string $nim): void
   {
      $sevima = service('curlrequest', [
         'baseURI' => env('SEVIMA_PATH_URL'),
         'headers' => [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'X-App-Key' => env('SEVIMA_APP_KEY'),
            'X-Secret-Key' => env('SEVIMA_APP_SECRET')
         ]
      ]);

      $req = $sevima->request('GET', 'mahasiswa/' . $nim . '/khs');
      $body = json_decode($req->getBody(), true);

      $content = [];
      foreach ($body['data'] as $row) {
         $content[] = $row['attributes'];
      }

      $fields = ['id_periode', 'nim', 'id_kelas', 'kelompok', 'nama_kelas', 'id_kelas_perkuliahan', 'kelas_perkuliahan', 'id_kurikulum', 'id_program_studi', 'program_studi', 'kode_mata_kuliah', 'mata_kuliah', 'sks', 'nilai_angka', 'nilai_numerik', 'nilai_huruf', 'is_pakai', 'is_lulus', 'is_nilai_masuk', 'is_nilai_akhir', 'is_auto_nilai', 'is_ulang', 'is_tunda_nilai', 'is_deleted'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_khs');
         $table->ignore(true)->insertBatch($data);
      }
   }

   public function syncronTagihanMahasiswa(string $nim): void
   {
      $sevima = new \App\Libraries\Sevima();
      $content = $sevima->getTagihanMahasiswa($nim);

      $fields = ['id_tagihan', 'id_transaksi', 'kode_transaksi', 'id_periode', 'uraian', 'tanggal_transaksi', 'tanggal_akhir', 'nim', 'nama_mahasiswa', 'id_pendaftar', 'nama_pendaftar', 'id_periode_daftar', 'id_jenis_akun', 'jenis_akun', 'id_mata_uang', 'nominal_tagihan', 'nominal_denda', 'nominal_potongan', 'total_potongan', 'nominal_terbayar', 'nominal_sisa_tagihan', 'is_lunas', 'is_batal', 'is_rekon', 'waktu_rekon'];

      $data = [];
      foreach ($content as $value) {
         $data[] = array_intersect_key($value, array_flip($fields));
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_tagihan');
         $table->ignore(true)->insertBatch($data);
      }
   }

   public function getDaftarJenisBeasiswa(): array
   {
      $table = $this->db->table('tb_mst_jenis_beasiswa');
      $table->orderBy('nama');

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

   public function getTagihanMahasiswa(string $nim): array
   {
      $table = $this->db->table('tb_tagihan');
      $table->where('nim', $nim);
      $table->orderBy('id_periode');

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

   public function getKHSMahasiswa(string $nim): array
   {
      $table = $this->db->table('tb_khs');
      $table->where('nim', $nim);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $periode = [];
      $content = [];
      foreach ($result as $row) {
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

   public function getTranskripMahasiswa(string $nim): array
   {
      $table = $this->db->table('tb_transkrip');
      $table->where('nim', $nim);
      $table->where('is_lulus', '1');
      $table->orderBy('semester_mata_kuliah_ditempuh');

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

   public function getPeriodeAktif(): array
   {
      $table = $this->db->table('tb_mst_periode');
      $table->where('is_aktif', '1');

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

   public function getBiodataMahasiswa(string $nim): array
   {
      $table = $this->db->table('tb_mahasiswa');
      $table->where('nim', $nim);

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

   public function getDaftarPeriode(): array
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

   public function datatableColumnOrder($table, $column_order = []): void
   {
      if (isset($_POST['order'])) {
         $column = @$_POST['order'][0]['column'];
         $dir = @$_POST['order'][0]['dir'];
      } else {
         $column = 0;
         $dir = 'asc';
      }

      $table->orderBy($column_order[$column], $dir);
   }

   public function datatableColumnSearch($table, $column_search = []): void
   {
      $i = 0;
      foreach ($column_search as $item) {
         if (@$_POST['search']['value']) {
            if ($i === 0) {
               $table->groupStart();
               $table->like('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            } else {
               $table->orLike('trim(lower(cast(' . $item . ' as varchar)))', trim(strtolower($_POST['search']['value'])));
            }

            if (count($column_search) - 1 === $i) {
               $table->groupEnd();
            }
         }
         $i++;
      }
   }

   public function dt_where($table, array $columns): void
   {
      foreach ($columns as $key => $value) {
         if ($value) {
            $table->where(new RawSql("trim(lower(cast(" . $key . " as varchar))) = '" . trim(strtolower($value)) . "'"));
         }
      }
   }
}

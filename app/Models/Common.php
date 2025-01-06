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

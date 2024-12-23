<?php

namespace App\Models\Beasiswa;

use App\Models\Common;
use App\Libraries\Sevima;
use CodeIgniter\Database\RawSql;

class PerbaikiBerkas extends Common
{

   public function submitTerima(array $post): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('id', $post['id_pendaftar']);
         $table->update([
            'tanggal_validasi' => new RawSql('now()'),
            'user_modified' => $post['user_modified'],
            'modified' => new RawSql('now()'),
            'id_status_pendaftaran' => 1
         ]);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function submitPerbaiki(array $post): array
   {
      try {
         $table = $this->db->table('tb_pendaftar');
         $table->where('id', $post['id_pendaftar']);
         $table->update([
            'catatan_perbaikan' => $post['catatan_perbaikan'],
            'tanggal_validasi' => new RawSql('now()'),
            'user_modified' => $post['user_modified'],
            'id_status_pendaftaran' => 2
         ]);
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function getDetail(string $nim, int $periode): array
   {
      $sevima = new Sevima();

      return [
         'biodata' => $sevima->getBiodataMahasiswa($nim),
         'transkrip' => $sevima->getTranskripMahasiswa($nim),
         'informasiPendaftaran' => $this->getInformasiPendaftaranBeasiswa($nim, $periode),
      ];
   }

   private function getInformasiPendaftaranBeasiswa(string $nim, int $periode): array
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tp.id as id_pendaftar, tp.periode, tp.nim, tp.id_generate_beasiswa, tp.uploaded as tanggal_daftar, tp.is_aktif, tp.nama as nama_mahasiswa, tgb.tanggal_mulai, tgb.tanggal_akhir, tgb.wajib_ipk, tgb.minimal_ipk, tgb.maksimal_ipk, tgb.id_kategori_beasiswa, tmjb.nama as nama_kategori_beasiswa, tmjb.keterangan as keterangan_kategori_beasiswa');
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
         'tp.periode' => @$post['periode'],
         'tp.id_status_pendaftaran' => 2
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
      $table->select('tp.id, tp.nim, tp.nama, tmjb.nama as jenis_beasiswa, tp.modified, tp.periode, tp.catatan_perbaikan');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');

      $this->dt_where($table, [
         'tp.periode' => @$post['periode'],
         'tp.id_status_pendaftaran' => 2
      ]);

      $this->datatableColumnSearch($table, ['tp.nim']);
      $this->datatableColumnOrder($table, ['nim', 'nama', 'jenis_beasiswa', 'modified']);

      return $table;
   }
}

<?php

namespace App\Models;

use CodeIgniter\Database\RawSql;

class GenerateBeasiswa extends Common
{

   public function getIPKMahasiswa(string $nim): float
   {
      $table = $this->db->table('tb_transkrip');
      $table->where('nim', $nim);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      if (empty($result)) {
         return 0.0; // Handle empty results
      }

      $total_sks = 0;
      $total_bobot = 0;
      foreach ($result as $row) {
         $total_bobot += $row['bobot_mata_kuliah'];
         $total_sks += $row['sks_mata_kuliah'];
      }

      if ($total_sks == 0) {
         return 0.0; // Avoid division by zero
      }

      return round($total_bobot / $total_sks, 2);
   }

   public function getStatusPembayaranSPP(string $nim): bool
   {
      $table = $this->db->table('tb_tagihan tg');
      $table->join('tb_mst_periode tmp', 'tmp.id = tg.id_periode and tmp.is_aktif = \'1\'');
      $table->where('tg.nim', $nim);
      $table->groupStart();
      $table->where('tg.jenis_akun', 'SPP');
      $table->orWhere('tg.jenis_akun', 'Uang Kuliah Tunggal');
      $table->groupEnd();
      $table->where('tg.is_lunas', '1');

      return $table->countAllResults() > 0;
   }

   public function getStatusPendaftaranBeasiswa(array $post): array
   {
      $pendaftar = $this->queryPendaftar($post);
      $id_generate_beasiswa = @$pendaftar['id_generate_beasiswa'] ?? null;

      return [
         'pendaftar' => $pendaftar,
         'lampiranUpload' => $this->queryLampiranUpload($id_generate_beasiswa),
         'lampiranYangDiupload' => $this->getDataLampiranUpload($post['nim']),
      ];
   }

   private function queryLampiranUpload(int $id_generate_beasiswa = null): array
   {
      $table = $this->db->table('tb_lampiran_upload tlu');
      $table->select('tmlu.id, tmlu.nama');
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

   private function queryPendaftar(array $post)
   {
      $table = $this->db->table('tb_pendaftar tp');
      $table->select('tp.id as id_pendaftar, tp.periode, tp.nim, tp.id_generate_beasiswa, tp.uploaded, tp.is_aktif, tp.nama, tp.catatan_perbaikan, tp.tanggal_validasi, tgb.tanggal_mulai, tgb.tanggal_akhir, tgb.wajib_ipk, tgb.minimal_ipk, tgb.maksimal_ipk, tgb.id_kategori_beasiswa, tmjb.nama as nama_jenis_beasiswa, tmjb.keterangan as keterangan_jenis_beasiswa');
      $table->join('tb_generate_beasiswa tgb', 'tgb.id = tp.id_generate_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->where('tp.nim', $post['nim']);
      $table->where('tp.periode', $post['periode']);

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

   public function submitDaftar(array $post): array
   {
      try {
         $checkApakahSudahMendaftarSebelumnya = $this->checkApakahSudahMendaftarSebelumnya($post);

         if (!$checkApakahSudahMendaftarSebelumnya) {
            $table = $this->db->table('tb_pendaftar');
            $table->ignore(true)->insert([
               'nim' => $post['nim'],
               'periode' => $post['periode'],
               'id_generate_beasiswa' => $post['id_generate_beasiswa'],
               'uploaded' => new RawSql('now()'),
               'nama' => $post['nama']
            ]);
         }
         return ['status' => true, 'msg_response' => 'Pendaftaran berhasil.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   public function initPendaftaranMahasiswa(array $post): array
   {
      $periode = $this->getPeriodeAktif()['id'];

      $statusPendaftaran = $this->getStatusPendaftaran(array_merge($post, ['periode' => $periode]));

      return [
         'generateBeasiswa' => $this->getDetailGenerateBeasiswa($post['id_generate_beasiswa']),
         'statusPendaftaran' => $statusPendaftaran,
         'apakahSudahMendaftarSebelumnya' => $this->checkApakahSudahMendaftarSebelumnya(array_merge($post, ['periode' => $periode])),
         'lampiranTelahDiUpload' => $this->getDataLampiranUpload($post['nim'])
      ];
   }

   public function getDataLampiranUpload(int $nim): array
   {
      $table = $this->db->table('tb_lampiran_upload_mahasiswa');
      $table->select('id_lampiran_upload, orig_name, google_drive_id');
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

   private function checkApakahSudahMendaftarSebelumnya(array $post): bool
   {
      $table = $this->db->table('tb_pendaftar');
      $table->where('nim', $post['nim']);
      $table->where('is_aktif', true);

      return $table->countAllResults() > 0;
   }

   private function getDetailGenerateBeasiswa(int $id_generate_beasiswa = null): array
   {
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->select('tgb.id, tgb.periode, tgb.tanggal_mulai, tgb.tanggal_akhir, tgb.wajib_ipk, tgb.minimal_ipk, tgb.maksimal_ipk, tgb.id_kategori_beasiswa, tmjb.nama as jenis_kategori_beasiswa, tmjb.keterangan as keterangan_kategori_beasiswa');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->where('tgb.id', $id_generate_beasiswa);

      $get = $table->get();
      $data = $get->getRowArray();
      $fieldNames = $get->getFieldNames();
      $get->freeResult();

      $response = [];
      if (isset($data)) {
         foreach ($fieldNames as $field) {
            $response[$field] = ($data[$field] ? trim($data[$field]) : (string) $data[$field]);
         }

         $response['angkatan'] = $this->getAngkatanGenerateBeasiswa($id_generate_beasiswa);
         $response['lampiranToUpload'] = $this->getLampiranToUpload($id_generate_beasiswa);

         unset($response['user_modified']);
      }
      return $response;
   }

   public function getLampiranToUpload(int|string $id_generate_beasiswa = null): array
   {
      $response = [];
      if ($id_generate_beasiswa) {
         $table = $this->db->table('tb_lampiran_upload tlu');
         $table->select('tmlu.id, tmlu.nama');
         $table->join('tb_mst_lampiran_upload tmlu', 'tmlu.id = tlu.id_lampiran_upload');
         $table->where('tlu.id_generate_beasiswa', $id_generate_beasiswa);

         $get = $table->get();
         $result = $get->getResultArray();
         $fieldNames = $get->getFieldNames();
         $get->freeResult();


         foreach ($result as $key => $val) {
            foreach ($fieldNames as $field) {
               $response[$key][$field] = $val[$field] ? trim($val[$field]) : (string) $val[$field];
            }
         }
      }

      return $response;
   }

   private function getAngkatanGenerateBeasiswa(int $id_generate_beasiswa): array
   {
      $table = $this->db->table('tb_angkatan_beasiswa');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);

      $get = $table->get();
      $result = $get->getResultArray();
      $get->freeResult();

      $response = [];
      foreach ($result as $row) {
         $response[] = $row['angkatan'];
      }
      return $response;
   }

   public function getStatusPendaftaran(array $post): array
   {
      $table = $this->db->table('tb_pendaftar');
      $table->where('nim', $post['nim']);
      $table->where('periode', $post['periode']);

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

   public function hapus(array $post): array
   {
      try {
         $table = $this->db->table('tb_generate_beasiswa');
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
         $fields = ['periode', 'tanggal_mulai', 'tanggal_akhir', 'wajib_ipk', 'minimal_ipk', 'maksimal_ipk', 'id_kategori_beasiswa'];
         foreach ($fields as $field) {
            if (@$post[$field]) {
               $data[$field] = $post[$field];
            } else {
               $data[$field] = null;
            }
         }

         $data['user_modified'] = $post['user_modified'];

         $table = $this->db->table('tb_generate_beasiswa');
         if ($post['pageType'] === 'add') {
            $data['uploaded'] = new RawSql('now()');

            $table->insert($data);

            $lastID = $this->db->insertID('tb_generate_beasiswa_id_seq');

            if ($lastID && $post['angkatan']) {
               $this->generateAngkatanBeasiswa($lastID, $post['angkatan']);
            }

            if ($lastID && $post['lampiran_upload']) {
               $this->generateLampiranUpload($lastID, $post['lampiran_upload']);
            }
         } elseif ($post['pageType'] === 'update') {
            $data['modified'] = new RawSql('now()');

            $table->update($data, ['id' => $post['id']]);

            $this->generateAngkatanBeasiswa($post['id'], $post['angkatan']);
            $this->generateLampiranUpload($post['id'], $post['lampiran_upload']);
         }
         return ['status' => true, 'msg_response' => 'Data berhasil disimpan.'];
      } catch (\Exception $e) {
         return ['status' => false, 'msg_response' => $e->getMessage()];
      }
   }

   private function generateLampiranUpload(int $id_generate_beasiswa, string $lampiran): void
   {
      $this->deleteOldLampiranUpload($id_generate_beasiswa);

      $dataLampiran = json_decode($lampiran, true);

      $data = [];
      if (!empty($dataLampiran)) {
         foreach ($dataLampiran as $row) {
            array_push($data, [
               'id_lampiran_upload' => $row['id'],
               'id_generate_beasiswa' => $id_generate_beasiswa
            ]);
         }
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_lampiran_upload');
         $table->insertBatch($data);
      }
   }

   private function deleteOldLampiranUpload(int $id_generate_beasiswa): void
   {
      $table = $this->db->table('tb_lampiran_upload');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);
      $table->delete();
   }

   private function generateAngkatanBeasiswa(int $id_generate_beasiswa, string $angkatan): void
   {
      $this->deleteOldAngkatan($id_generate_beasiswa);
      $dataAngkatan = json_decode($angkatan, true);

      $data = [];
      if (!empty($dataAngkatan)) {
         foreach ($dataAngkatan as $row) {
            array_push($data, [
               'id_generate_beasiswa' => $id_generate_beasiswa,
               'angkatan' => $row['id']
            ]);
         }
      }

      if (!empty($data)) {
         $table = $this->db->table('tb_angkatan_beasiswa');
         $table->insertBatch($data);
      }
   }

   private function deleteOldAngkatan(int $id_generate_beasiswa): void
   {
      $table = $this->db->table('tb_angkatan_beasiswa');
      $table->where('id_generate_beasiswa', $id_generate_beasiswa);
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
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      return $table->countAllResults();
   }

   public function filteredData()
   {
      $table = $this->queryData();
      return $table->countAllResults();
   }

   private function queryData()
   {
      $table = $this->db->table('tb_generate_beasiswa tgb');
      $table->select('tgb.*, tmjb.nama as kategori_beasiswa, coalesce(tab.angkatan, \'[]\') as angkatan, coalesce(tlu.lampiran_upload, \'[]\') as lampiran_upload');
      $table->join('tb_mst_jenis_beasiswa tmjb', 'tmjb.id = tgb.id_kategori_beasiswa');
      $table->join('(select id_generate_beasiswa, json_agg(angkatan) as angkatan from tb_angkatan_beasiswa group by id_generate_beasiswa) tab', 'tab.id_generate_beasiswa = tgb.id', 'left');
      $table->join('(select tlu.id_generate_beasiswa, json_agg(json_build_object(\'id\', tlu.id_lampiran_upload,     \'label\', tmlu.nama)) as lampiran_upload
      from tb_lampiran_upload tlu
      join tb_mst_lampiran_upload tmlu on tmlu.id = tlu.id_lampiran_upload
      group by tlu.id_generate_beasiswa) tlu', 'tlu.id_generate_beasiswa = tgb.id', 'left');

      $this->datatableColumnSearch($table, ['tmjb.nama']);
      $this->datatableColumnOrder($table, ['kategori_beasiswa', 'tanggal_mulai', 'tanggal_akhir', 'periode']);

      return $table;
   }
}

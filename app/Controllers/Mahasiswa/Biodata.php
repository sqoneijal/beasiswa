<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Libraries\Sevima;
use App\Models\GenerateBeasiswa as Model;

class Biodata extends BaseController
{

   public function getData()
   {
      $model = new Model();
      $sevima = new Sevima();

      $periode = array_map(function ($row) {
         return $row['nama_singkat'];
      }, array_filter($sevima->getPeriode(), function ($row) {
         return $row['is_aktif'] === '1';
      }));
      $periodeAktif = current($periode);


      $content = $sevima->getBiodataMahasiswa($this->post['nim']);
      return $this->respond(array_merge(
         $content,
         [
            'statusPendaftaranBeasiswa' => $model->getStatusPendaftaran([
               'nim' => $this->post['nim'],
               'id_generate_beasiswa' => $this->post['id_generate_beasiswa'],
               'periode' => $periodeAktif
            ]),
            'lampiranYangDiupload' => $model->getDataLampiranUpload($this->post['nim']),
            'lampiranPerluDiupload' => $model->getLampiranToUpload($this->post['id_generate_beasiswa']),
         ]
      ));
   }
}

<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\GenerateBeasiswa as Model;

class Biodata extends BaseController
{

   public function getData()
   {
      $model = new Model();

      $content = $model->getBiodataMahasiswa($this->post['nim']);
      return $this->respond(array_merge(
         $content,
         [
            'statusPendaftaranBeasiswa' => $model->getStatusPendaftaran([
               'nim' => $this->post['nim'],
               'periode' => $model->getPeriodeAktif()['id']
            ]),
            'lampiranYangDiupload' => $model->getDataLampiranUpload($this->post['nim']),
            'lampiranPerluDiupload' => $model->getLampiranToUpload(@$this->post['id_generate_beasiswa']),
            'statusPembayaranSPP' => $model->getStatusPembayaranSPP($this->post['nim']),
            'ipk' => $model->getIPKMahasiswa($this->post['nim'])
         ]
      ));
   }

   public function getStatusPendaftaranBeasiswa(): object
   {
      $model = new Model();
      $content = $model->getStatusPendaftaranBeasiswa($this->post);
      return $this->respond($content);
   }
}

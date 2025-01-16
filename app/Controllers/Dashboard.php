<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Dashboard as Model;

class Dashboard extends BaseController
{
   public function initPage(): object
   {
      $model = new Model();
      $content = [
         'daftarJenisBeasiswa' => $model->getDaftarJenisBeasiswa(),
         'jumlahPendaftarPerJenisBeasiswa' => $model->jumlahPendaftarPerJenisBeasiswa()
      ];
      return $this->respond($content);
   }
}

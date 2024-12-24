<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\Transkrip as Model;

class Transkrip extends BaseController
{

   public function syncronTranskrip(): void
   {
      $model = new Model();
      $model->syncronTranskrip($this->post);
   }

   public function getData()
   {
      $model = new Model();
      $content = $model->getTranskripMahasiswa($this->post['nim']);
      return $this->respond($content);
   }
}

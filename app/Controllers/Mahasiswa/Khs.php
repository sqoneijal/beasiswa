<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\Khs as Model;

class Khs extends BaseController
{

   public function syncronKHS(): void
   {
      $model = new Model();
      $model->syncronKHS($this->post);
   }

   public function getData()
   {
      $model = new Model();
      $content = $model->getKHSMahasiswa($this->post['nim']);
      return $this->respond($content);
   }
}

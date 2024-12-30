<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\Tagihan as Model;

class Tagihan extends BaseController
{

   public function syncronTagihan(): void
   {
      $model = new Model();
      $model->syncronTagihan($this->post);
   }

   public function getData(): object
   {
      $model = new Model();
      $content = $model->getData($this->post);
      return $this->respond($content);
   }
}

<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Tentang as Model;

class Tentang extends BaseController
{

   public function submit(): object
   {
      $model = new Model();
      $content = $model->submit($this->post);
      return $this->respond($content);
   }

   public function getData()
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respond($content);
   }
}

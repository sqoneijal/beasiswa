<?php

namespace App\Controllers\Master;

use App\Controllers\BaseController;
use App\Models\Master\Beasiswa as Model;

class Beasiswa extends BaseController
{
   public function getData()
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respond($content);
   }
}

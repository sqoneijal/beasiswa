<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Periode as Model;

class Periode extends BaseController
{
   public function getData(): object
   {
      $model = new Model();
      $content = $model->getData();
      return $this->respond($content);
   }

   public function periodeAktif(): object
   {
      $model = new Model();
      $content = $model->getPeriodeAktif();
      return $this->respond($content);
   }

   public function downloadDariSevima(): object
   {
      $model = new Model();
      $content = $model->downloadDariSevima();
      return $this->respond($content);
   }
}

<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Libraries\Sevima;

class Periode extends BaseController
{
   public function getData(): object
   {
      $sevima = new Sevima();
      $content = $sevima->getPeriode();
      return $this->respond($content);
   }

   public function periodeAktif(): object
   {
      $sevima = new Sevima();
      $content = $sevima->getPeriodeAktif();
      return $this->respond($content);
   }
}

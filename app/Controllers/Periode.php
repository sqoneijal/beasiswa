<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Libraries\Sevima;

class Periode extends BaseController
{
   public function getData()
   {
      $sevima = new Sevima();
      $content = $sevima->getPeriode();
      return $this->respond($content);
   }
}

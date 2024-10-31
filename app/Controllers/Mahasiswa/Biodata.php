<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Libraries\Sevima;

class Biodata extends BaseController
{

   public function getData()
   {
      $sevima = new Sevima();
      $content = $sevima->getBiodataMahasiswa($this->post['nim']);
      return $this->respond($content);
   }
}

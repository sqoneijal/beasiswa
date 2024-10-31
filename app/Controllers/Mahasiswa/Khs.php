<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Libraries\Sevima;

class Khs extends BaseController
{

   public function getData()
   {
      $sevima = new Sevima();
      $content = $sevima->getKHSMahasiswa($this->post['nim']);
      return $this->respond($content);
   }
}

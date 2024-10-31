<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Libraries\Sevima;

class Transkrip extends BaseController
{

   public function getData()
   {
      $sevima = new Sevima();
      $content = $sevima->getTranskripMahasiswa($this->post['nim']);
      return $this->respond($content);
   }
}

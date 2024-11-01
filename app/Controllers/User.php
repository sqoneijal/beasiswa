<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\User as Model;

class User extends BaseController
{
   public function getData()
   {
      $model = new Model();
      $content = $model->getData($this->post['username']);
      return $this->respond($content);
   }
}

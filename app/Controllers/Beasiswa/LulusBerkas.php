<?php

namespace App\Controllers\Beasiswa;

use App\Controllers\BaseController;
use App\Libraries\Sevima;
use App\Models\Beasiswa\LulusBerkas as Model;
use App\Validation\Beasiswa\LulusBerkas as Validate;

class LulusBerkas extends BaseController
{
   public function submitTerima(): object
   {
      $model = new Model();
      $content = $model->submitTerima($this->post);
      return $this->respond($content);
   }

   public function submitPerbaiki(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitPerbaiki())) {
         $model = new Model();
         $submit = $model->submitPerbaiki($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function getDetail(): object
   {
      $model = new Model();
      $content = $model->getDetail($this->post['nim'], $this->post['periode']);
      return $this->respond($content);
   }

   public function initPage(): object
   {
      $sevima = new Sevima();

      $content = [
         'daftarPeriode' => $sevima->getPeriode(),
      ];
      return $this->respond($content);
   }

   public function getData()
   {
      $model = new Model();
      $query = $model->getData($this->getVar);

      $output = [
         'draw' => intval(@$this->post['draw']),
         'recordsTotal' => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data' => $query
      ];
      return $this->respond($output);
   }
}
<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Validation\GenerateBeasiswa as Validate;
use App\Models\GenerateBeasiswa as Model;

class GenerateBeasiswa extends BaseController
{

   public function hapus(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $submit = $model->hapus($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit($this->post))) {
         $model = new Model();
         $submit = $model->submit($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
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

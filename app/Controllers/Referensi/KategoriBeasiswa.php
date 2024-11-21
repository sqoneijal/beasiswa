<?php

namespace App\Controllers\Referensi;

use App\Controllers\BaseController;
use App\Models\Referensi\KategoriBeasiswa as Model;
use App\Validation\Referensi\KategoriBeasiswa as Validate;

class KategoriBeasiswa extends BaseController
{

   public function read(): object
   {
      $model = new Model();
      $content = $model->getDetail($this->post['slug']);
      return $this->respond($content);
   }

   public function submit(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
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
         'recordsTotal' => intval($model->countData($this->getVar)),
         'recordsFiltered' => intval($model->filteredData($this->getVar)),
         'data' => $query
      ];
      return $this->respond($output);
   }

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
}

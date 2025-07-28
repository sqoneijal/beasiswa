<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Validation\Informasi as Validate;
use App\Models\Informasi as Model;

class Informasi extends BaseController
{

   public function read(): object
   {
      $model = new Model();
      $content = $model->getDetailBerita($this->post['slug']);
      return $this->respond($content);
   }

   public function submit()
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submit())) {
         $thumbnail = $this->request->getFile('thumbnail');
         if ($thumbnail) {
            $cdn = cdn_upload($thumbnail, 'berita');

            if ($cdn) {
               $this->post['thumbnail'] = $cdn;
            }
         } else {
            $this->post['thumbnail'] = null;
         }

         $model = new Model();
         $submit = $model->submit($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function hapus()
   {
      $response = ['status' => false, 'errors' => [], 'msg_response' => 'Terjadi sesuatu kesalahan.'];

      $validation = new Validate();
      if ($this->validate($validation->hapus())) {
         $model = new Model();
         $submit = $model->hapus($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $errors = \Config\Services::validation()->getErrors();
         foreach ($errors as $key) {
            $response['msg_response'] = $key;
         }
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

   public function getInformasiTerbaru()
   {
      $model = new Model();
      $content = $model->getInformasiTerbaru();
      return $this->respond($content);
   }
}

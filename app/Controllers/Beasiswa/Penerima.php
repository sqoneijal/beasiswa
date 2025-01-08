<?php

namespace App\Controllers\Beasiswa;

use App\Controllers\BaseController;
use App\Models\Beasiswa\Penerima as Model;
use App\Validation\Beasiswa\Penerima as Validate;

class Penerima extends BaseController
{

   public function download(): object
   {
      $model = new Model();
      $content = $model->download($this->post);
      return $this->respond($content);
   }

   public function submitImport(): object
   {
      $response = ['status' => false, 'errors' => []];

      $validation = new Validate();
      if ($this->validate($validation->submitImport())) {
         $model = new Model();
         $submit = $model->submitImport($this->post);

         $response = array_merge($submit, ['errors' => []]);
      } else {
         $response['msg_response'] = 'Tolong periksa kembali inputan anda!';
         $response['errors'] = \Config\Services::validation()->getErrors();
      }
      return $this->respond($response);
   }

   public function validasiImportExcel(): object
   {
      $model = new Model();
      $content = $model->validasiImportExcel($this->post);
      return $this->respond($content);
   }

   public function downloadExcel(): object
   {
      $content = [];
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

   public function syncronTagihan(): object
   {
      $model = new Model();
      $content = $model->syncronTagihan($this->post);
      return $this->respond($content);
   }

   public function syncronKHS(): object
   {
      $model = new Model();
      $content = $model->syncronKHS($this->post);
      return $this->respond($content);
   }

   public function getDetail(): object
   {
      $model = new Model();
      $content = $model->getDetail($this->post['nim'], $this->post['periode']);
      return $this->respond($content);
   }

   public function syncronTranskrip(): object
   {
      $model = new Model();
      $content = $model->syncronTranskrip($this->post);
      return $this->respond($content);
   }

   public function initPage(): object
   {
      $model = new Model();

      $content = [
         'ipRequest' => $this->request->getIPAddress(),
         'periodeAktif' => $model->getPeriodeAktif(),
         'daftarPeriode' => $model->getDaftarPeriode(),
         'daftarGenerateBeasiswa' => $model->getGenerateBeasiswa(),
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

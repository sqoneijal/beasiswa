<?php

namespace App\Controllers\Beasiswa;

use App\Controllers\BaseController;
use App\Models\Beasiswa\Dibatalkan as Model;

class Dibatalkan extends BaseController
{

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

   public function syncronTranskrip(): object
   {
      $model = new Model();
      $content = $model->syncronTranskrip($this->post);
      return $this->respond($content);
   }

   public function getDetail(): object
   {
      $model = new Model();
      $content = $model->getDetail($this->post['nim'], $this->post['periode']);
      return $this->respond($content);
   }

   public function initPage(): object
   {
      $model = new Model();

      $content = [
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

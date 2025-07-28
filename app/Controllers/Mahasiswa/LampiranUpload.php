<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\LampiranUpload as Model;

class LampiranUpload extends BaseController
{

   public function upload(): object
   {
      $response = ['status' => false, 'errors' => []];
      $file = $this->request->getFile('file');
      if ($file) {
         $cdn_upload = cdn_upload($file, 'lampiran_mahasiswa');

         if ($cdn_upload) {
            $this->post['file_path'] = $cdn_upload;
            $this->post['orig_name'] = $file->getName();

            $model = new Model();
            $content = $model->uploadDokumen($this->post);

            $response['status'] = true;
            $response['msg_response'] = 'Lampiran berhasil diupload.';
            $response['data'] = $content['content'];
         } else {
            $response['msg_response'] = 'Gagal melakukan upload file lampiran!';
         }
      } else {
         $response['msg_response'] = 'Silahkan pilih file lampiran terlebih dahulu!';
      }
      return $this->respond($response);
   }

   public function getData(): object
   {
      $model = new Model();
      $content = $model->getDataLampiranUpload($this->post['nim']);
      return $this->respond($content);
   }
}

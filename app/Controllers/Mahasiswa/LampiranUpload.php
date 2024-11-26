<?php

namespace App\Controllers\Mahasiswa;

use App\Controllers\BaseController;
use App\Models\Mahasiswa\LampiranUpload as Model;
use Google\Client as Google_Client;
use Google\Service\Drive as Google_Service_Drive;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

class LampiranUpload extends BaseController
{

   public function upload(): object
   {
      $response = ['status' => false, 'errors' => []];
      $file = $this->request->getFile('file');
      if ($file) {
         $parentId = '1407S_6xxwNQ6b6LoxTL54BsAGnqYC9Ag';

         $client = new Google_Client();
         $client->setAuthConfig(WRITEPATH . 'beasiswa-service.json');
         $client->addScope(Google_Service_Drive::DRIVE);

         $driveService = new Google_Service_Drive($client);

         $driveFile = new Google_Service_Drive_DriveFile();
         $folderId = cariFolderGoogleDrive($driveService, 'lampiran_mahasiswa', $parentId);
         $endPointFolder = cariFolderGoogleDrive($driveService, $this->post['nim'], $folderId);

         if ($endPointFolder === null) {
            $endPointFolder = buatFolderGoogleDrive($driveService, $this->post['nim'], $folderId);
         }

         $driveFile->setName($file->getClientName());
         $driveFile->setParents([$endPointFolder]);

         $googleFile = $driveService->files->create($driveFile, array(
            'data' => file_get_contents($file->getTempName()),
            'mimeType' => $file->getClientMimeType(),
            'uploadType' => 'multipart'
         ));

         if ($googleFile['id']) {
            $this->post['orig_name'] = $file->getClientName();
            $this->post['google_drive_id'] = $googleFile['id'];

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

<?php

use CodeIgniter\Files\File;
use Google\Service\Drive\DriveFile as Google_Service_Drive_DriveFile;

function doUpload($file, $upload_path, $ext_allowed = [])
{
   try {
      if (!file_exists($upload_path)) {
         mkdir($upload_path, 0755);
      }

      $client_mime = $file->getMimeType();
      $allowed_mime = getAllowedMimeTypes($ext_allowed);

      if (isClientMimeTypeAllowed($client_mime, $allowed_mime)) {
         $getRandomName = $file->getRandomName();
         $file->move($upload_path, $getRandomName);

         if (isUploadedFileValid($upload_path, $getRandomName, $allowed_mime)) {
            $response['status'] = true;
            $response['content'] = $getRandomName;
         } else {
            $response['status'] = false;
            $response['content'] = 'Anda mencoba upload file yang tidak diizinkan oleh sistem.';
         }
      } else {
         $response['status'] = false;
         $response['content'] = 'File yang coba anda upload tidak diizinkan.';
      }
   } catch (\Exception $e) {
      $response = ['status' => false, 'msg_response' => $e->getMessage()];
   }
   return $response;
}

function getAllowedMimeTypes($ext_allowed)
{
   $config_mime = new \Config\Mimes();
   $allowed_mime = [];

   foreach ($ext_allowed as $ext) {
      foreach ($config_mime::$mimes[$ext] as $row) {
         $allowed_mime[] = $row;
      }
   }

   return $allowed_mime;
}

function isClientMimeTypeAllowed($client_mime, $allowed_mime)
{
   return in_array($client_mime, $allowed_mime);
}

function isUploadedFileValid($upload_path, $getRandomName, $allowed_mime)
{
   $filePath = $upload_path . '/' . $getRandomName;
   if (file_exists($filePath)) {
      $info = new File($filePath);
      return in_array($info->getMimeType(), $allowed_mime);
   }
   return false;
}

function cariFolderGoogleDrive($service, $folderName, $parentId = null)
{
   $query = "name = '$folderName' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";

   if ($parentId) {
      $query .= " and '$parentId' in parents";
   }

   $response = $service->files->listFiles(array(
      'q' => $query,
      'spaces' => 'drive',
      'fields' => 'files(id, name)'
   ));

   if (count($response->files) > 0) {
      return $response->files[0]->id; // Mengambil ID dari folder pertama yang ditemukan
   } else {
      return null;
   }
}

function buatFolderGoogleDrive($service, $folderName, $parentId = null)
{
   $fileMetadata = new Google_Service_Drive_DriveFile(array(
      'name' => $folderName,
      'mimeType' => 'application/vnd.google-apps.folder'
   ));

   if ($parentId) {
      $fileMetadata->setParents(array($parentId));
   }

   $folder = $service->files->create($fileMetadata, array(
      'fields' => 'id'
   ));

   return $folder->id;
}

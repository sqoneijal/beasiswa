<?php

namespace App\Validation;

class Pengguna
{

   public function submit(): array
   {
      return [
         'nip' => [
            'rules' => 'required',
            'label' => 'NIP'
         ],
         'role' => [
            'rules' => 'required',
            'label' => 'Role'
         ]
      ];
   }
}

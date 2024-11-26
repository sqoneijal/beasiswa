<?php

$routes = service('routes');

function informasi($routes): void
{
   $routes->group('informasi', function ($routes) {
      $routes->post('submit', 'Informasi::submit');
      $routes->post('getdata', 'Informasi::getData');
      $routes->post('hapus', 'Informasi::hapus');
      $routes->post('read', 'Informasi::read');
   });
}
informasi($routes);

function generateBeasiswa($routes): void
{
   $routes->group('generatebeasiswa', function ($routes) {
      $routes->post('submit', 'GenerateBeasiswa::submit');
      $routes->post('getdata', 'GenerateBeasiswa::getData');
      $routes->post('hapus', 'GenerateBeasiswa::hapus');
      $routes->post('initpendaftaranmahasiswa', 'GenerateBeasiswa::initPendaftaranMahasiswa');
      $routes->post('daftar', 'GenerateBeasiswa::daftar');
   });
}
generateBeasiswa($routes);

function periode($routes): void
{
   $routes->group('periode', function ($routes) {
      $routes->post('getdata', 'Periode::getData');
   });
}
periode($routes);

function referensiKategoriBeasiswa($routes): void
{
   $routes->group('kategoribeasiswa', function ($routes) {
      $routes->post('getdata', 'KategoriBeasiswa::getData');
      $routes->post('submit', 'KategoriBeasiswa::submit');
      $routes->post('hapus', 'KategoriBeasiswa::hapus');
      $routes->post('read', 'KategoriBeasiswa::read');
   });
}

function referensiLampiranUpload($routes): void
{
   $routes->group('lampiranupload', function ($routes) {
      $routes->post('getdata', 'LampiranUpload::getData');
      $routes->post('submit', 'LampiranUpload::submit');
      $routes->post('hapus', 'LampiranUpload::hapus');
   });
}

$routes->group('referensi', ['namespace' => 'App\Controllers\Referensi'], function ($routes) {
   referensiKategoriBeasiswa($routes);
   referensiLampiranUpload($routes);
});

function user($routes): void
{
   $routes->post('getdata', 'User::getData');
}

$routes->group('user', function ($routes) {
   user($routes);
});

function masterBeasiswa($routes): void
{
   $routes->group('beasiswa', function ($routes) {
      $routes->get('getdata', 'Beasiswa::getData');
   });
}

$routes->group('master', ['namespace' => 'App\Controllers\Master'], function ($routes) {
   masterBeasiswa($routes);
});


function mahasiswaBiodata($routes): void
{
   $routes->group('biodata', function ($routes) {
      $routes->post('getdata', 'Biodata::getData');
   });
}

function mahasiswaKHS($routes): void
{
   $routes->group('khs', function ($routes) {
      $routes->post('getdata', 'Khs::getData');
   });
}

function mahasiswaTranskrip($routes): void
{
   $routes->group('transkrip', function ($routes) {
      $routes->post('getdata', 'Transkrip::getData');
   });
}

function mahasiswaLampiranUpload($routes): void
{
   $routes->group('lampiranupload', function ($routes) {
      $routes->post('getdata', 'LampiranUpload::getData');
      $routes->post('upload', 'LampiranUpload::upload');
   });
}

$routes->group('mahasiswa', ['namespace' => 'App\Controllers\Mahasiswa'], function ($routes) {
   mahasiswaBiodata($routes);
   mahasiswaKHS($routes);
   mahasiswaTranskrip($routes);
   mahasiswaLampiranUpload($routes);
});

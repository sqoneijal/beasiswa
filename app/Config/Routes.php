<?php

$routes = service('routes');

function pengguna($routes): void
{
   $routes->group('pengguna', function ($routes) {
      $routes->post('submit', 'Pengguna::submit');
      $routes->post('getdata', 'Pengguna::getData');
   });
}
pengguna($routes);

function beasiswaPendaftar($routes): void
{
   $routes->group('pendaftar', function ($routes) {
      $routes->get('initpage', 'Pendaftar::initPage');

      $routes->post('getdata', 'Pendaftar::getData');
      $routes->post('getdetail', 'Pendaftar::getDetail');
      $routes->post('submitperbaiki', 'Pendaftar::submitPerbaiki');
      $routes->post('submitterima', 'Pendaftar::submitTerima');
   });
}

function beasiswaPerbaikiBerkas($routes): void
{
   $routes->group('perbaikiberkas', function ($routes) {
      $routes->get('initpage', 'PerbaikiBerkas::initPage');

      $routes->post('getdata', 'PerbaikiBerkas::getData');
      $routes->post('getdetail', 'PerbaikiBerkas::getDetail');
      $routes->post('submitperbaiki', 'PerbaikiBerkas::submitPerbaiki');
      $routes->post('submitterima', 'PerbaikiBerkas::submitTerima');
   });
}

function beasiswaLulusBerkas($routes): void
{
   $routes->group('lulusberkas', function ($routes) {
      $routes->get('initpage', 'LulusBerkas::initPage');

      $routes->post('getdata', 'LulusBerkas::getData');
      $routes->post('getdetail', 'LulusBerkas::getDetail');
      $routes->post('submitperbaiki', 'LulusBerkas::submitPerbaiki');
      $routes->post('submitterima', 'LulusBerkas::submitTerima');
   });
}

function beasiswaTahapWawancara($routes): void
{
   $routes->group('tahapwawancara', function ($routes) {
      $routes->get('initpage', 'TahapWawancara::initPage');
      $routes->get('downloadexcel', 'TahapWawancara::downloadExcel');

      $routes->post('getdata', 'TahapWawancara::getData');
      $routes->post('getdetail', 'TahapWawancara::getDetail');
      $routes->post('submitperbaiki', 'TahapWawancara::submitPerbaiki');
      $routes->post('submitperbaiki', 'TahapWawancara::submitPerbaiki');
      $routes->post('grepdatafromsevima', 'TahapWawancara::grepDataFromSevima');
      $routes->post('validasiimportexcel', 'TahapWawancara::validasiImportExcel');
      $routes->post('submitimport', 'TahapWawancara::submitImport');
      $routes->post('syncrontranskrip', 'TahapWawancara::syncronTranskrip');
      $routes->post('syncronkhs', 'TahapWawancara::syncronKHS');
      $routes->post('syncrontagihan', 'TahapWawancara::syncronTagihan');
      $routes->post('submitterima', 'TahapWawancara::submitTerima');
   });
}

function beasiswaPenerima($routes): void
{
   $routes->group('penerima', function ($routes) {
      $routes->get('initpage', 'Penerima::initPage');

      $routes->post('getdata', 'Penerima::getData');
      $routes->post('getdetail', 'Penerima::getDetail');
      $routes->post('syncrontranskrip', 'Penerima::syncronTranskrip');
      $routes->post('syncronkhs', 'Penerima::syncronKHS');
      $routes->post('syncrontagihan', 'Penerima::syncronTagihan');
      $routes->post('submitperbaiki', 'Penerima::submitPerbaiki');
      $routes->post('downloadexcel', 'Penerima::downloadExcel');
      $routes->post('validasiimportexcel', 'Penerima::validasiImportExcel');
      $routes->post('submitimport', 'Penerima::submitImport');
      $routes->post('download', 'Penerima::download');
   });
}

function beasiswaDibatalkan($routes): void
{
   $routes->group('dibatalkan', function ($routes) {
      $routes->get('initpage', 'Dibatalkan::initPage');

      $routes->post('getdata', 'Dibatalkan::getData');
      $routes->post('getdetail', 'Dibatalkan::getDetail');
      $routes->post('syncrontranskrip', 'Dibatalkan::syncronTranskrip');
      $routes->post('syncronkhs', 'Dibatalkan::syncronKHS');
      $routes->post('syncrontagihan', 'Dibatalkan::syncronTagihan');
   });
}

function beasiswa($routes): void
{
   $routes->group('beasiswa', ['namespace' => 'App\Controllers\Beasiswa'], function ($routes) {
      beasiswaPendaftar($routes);
      beasiswaPerbaikiBerkas($routes);
      beasiswaLulusBerkas($routes);
      beasiswaTahapWawancara($routes);
      beasiswaPenerima($routes);
      beasiswaDibatalkan($routes);
   });
}
beasiswa($routes);

function tentang($routes): void
{
   $routes->group('tentang', function ($routes) {
      $routes->get('getdata', 'Tentang::getData');

      $routes->post('submit', 'Tentang::submit');
   });
}
tentang($routes);

function informasi($routes): void
{
   $routes->group('informasi', function ($routes) {
      $routes->get('getinformasiterbaru', 'Informasi::getInformasiTerbaru');

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
      $routes->get('periodeaktif', 'Periode::periodeAktif');
      $routes->get('downloaddarisevima', 'Periode::downloadDariSevima');

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
   $routes->post('generatebiodatamahasiswa', 'User::generateBiodataMahasiswa');
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
      $routes->post('getstatuspendaftaran', 'Biodata::getStatusPendaftaranBeasiswa');
   });
}

function mahasiswaKHS($routes): void
{
   $routes->group('khs', function ($routes) {
      $routes->post('getdata', 'Khs::getData');
      $routes->post('syncronkhs', 'Khs::syncronKHS');
   });
}

function mahasiswaTranskrip($routes): void
{
   $routes->group('transkrip', function ($routes) {
      $routes->post('getdata', 'Transkrip::getData');
      $routes->post('syncrontranskrip', 'Transkrip::syncronTranskrip');
   });
}

function mahasiswaLampiranUpload($routes): void
{
   $routes->group('lampiranupload', function ($routes) {
      $routes->post('getdata', 'LampiranUpload::getData');
      $routes->post('upload', 'LampiranUpload::upload');
   });
}

function mahasiswaTagihan($routes): void
{
   $routes->group('tagihan', function ($routes) {
      $routes->post('getdata', 'Tagihan::getData');
      $routes->post('syncrontagihan', 'Tagihan::syncronTagihan');
   });
}

$routes->group('mahasiswa', ['namespace' => 'App\Controllers\Mahasiswa'], function ($routes) {
   mahasiswaBiodata($routes);
   mahasiswaKHS($routes);
   mahasiswaTranskrip($routes);
   mahasiswaLampiranUpload($routes);
   mahasiswaTagihan($routes);
});

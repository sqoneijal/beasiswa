<?php

$routes = service('routes');

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

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

$routes->group('mahasiswa', ['namespace' => 'App\Controllers\Mahasiswa'], function ($routes) {
   mahasiswaBiodata($routes);
   mahasiswaKHS($routes);
   mahasiswaTranskrip($routes);
});

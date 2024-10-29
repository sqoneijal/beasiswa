<?php

$routes = service('routes');

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

function masterBeasiswa($routes)
{
   $routes->group('beasiswa', function ($routes) {
      $routes->get('getdata', 'Beasiswa::getData');
   });
}

$routes->group('master', function ($routes) {
   masterBeasiswa($routes);
});

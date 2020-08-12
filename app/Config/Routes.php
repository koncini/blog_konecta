<?php namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('UserController');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'UserController::index');
$routes->get('/index', 'UserController::index');
$routes->get('/user', 'UserController::index');
$routes->get('/login', 'UserController::index');
$routes->get('/user/index', 'UserController::index');
$routes->get('/user/form', 'UserController::index');
$routes->post('/api/user/auth', 'UserController::auth');
$routes->post('/api/user/deauth', 'UserController::deauth', ['filter' => 'noauth']);
$routes->post('/api/user/create', 'UserController::create');
$routes->get('/api/user/list', 'UserController::list', ['filter' => 'auth']);
$routes->get('/api/user/get', 'UserController::get/$1', ['filter' => 'auth']);
$routes->put('/api/user/update/(:num)','UserController::update/$1', ['filter' => 'auth']);
$routes->delete('/api/user/delete/(:num)','UserController::delete/$1', ['filter' => 'auth']);
//blog routes
$routes->get('/blog', 'BlogController::index', ['filter' => 'auth']);
$routes->post('/api/blog/create', 'BlogController::create', ['filter' => 'auth']);
$routes->get('/api/blog/list', 'BlogController::list');
$routes->get('/api/blog/get', 'BlogController::get/$1', ['filter' => 'auth']);
$routes->put('/api/blog/update/(:num)','BlogController::update/$1', ['filter' => 'auth']);
$routes->delete('/api/blog/delete/(:num)','BlogController::delete/$1', ['filter' => 'auth']);

/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}

<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class NoAuth implements FilterInterface
{
	public function before(RequestInterface $request, $arguments = null)
	{
		if(session()->get('isLoggedIn')){
			$response = service('response');
			$response->setStatusCode(401, 'Already Authenticated');
			return $response;
		}
	}

	//--------------------------------------------------------------------

	public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
	{
		// Do something here
	}
}
<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Auth implements FilterInterface
{
	public function before(RequestInterface $request)
	{
		if(! session()->get('isLoggedIn')){
			$response['success'] = true;
			$response['message'] = "Need Authentication";
			return json_encode($response);
		}

	}

	//--------------------------------------------------------------------

	public function after(RequestInterface $request, ResponseInterface $response)
	{
		// Do something here
	}
}
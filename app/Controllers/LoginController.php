<?php namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;
use Config\Services;

class LoginController extends Controller {

	protected $user;
	protected $data = [];

	public function __construct()
	{
		$this->user = new UserModel();
		$this->request = Services::request();
	}

	function index()
	{
		return view('login');
	}

	public function auth()
	{
		helper(['form']);

		if ($this->request->getMethod() == 'post')
		{
			$rules = [
				'email' => 'required|min_length[6]|max_length[50]|valid_email',
				'password' => 'required|min_length[8]|max_length[255]|validateUser[email,password]',
			];

			$errors = [
				'password' => [
					'validateUser' => 'Email or Password don\'t match'
				]
			];

			if (! $this->validate($rules, $errors)) {
				$data['validation'] = $this->validator;
			}else{
				$model = new UserModel();

				$user = $model->where('email', $this->request->getVar('email'))
					->first();

				$this->setUserSession($user);
				//$session->setFlashdata('success', 'Successful Registration');
				return redirect()->to('dashboard');
			}
		}
	}

	private function setUserSession($user){
		$data = [
			'id' => $user['id'],
			'firstname' => $user['firstname'],
			'lastname' => $user['lastname'],
			'email' => $user['email'],
			'isLoggedIn' => true,
		];

		session()->set($data);
		return true;
	}

	public function logout(){
		session()->destroy();
		return redirect()->to('/');
	}
}
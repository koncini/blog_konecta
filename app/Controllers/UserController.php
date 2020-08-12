<?php namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;
use Config\Services;
use Exception;

class UserController extends Controller {

	protected $user;
	protected $request;

	public function __construct()
	{
		$this->user = new UserModel();
		$this->request = Services::request();
	}

	public function index()
	{
		return view('login');
	}

	public function delete($id)
	{
		try
		{
			$res = $this->user->delete($id);
			$response['res'] = $res;
			$response['success'] = TRUE;
			$response['message'] = "Successful delete";
			return json_encode($response);
		} catch (Exception $e)
		{
			$response['success'] = FALSE;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function update($id)
	{
		try
		{
			$json = $this->request->getJSON();
			$update['name'] = $json->name;
			$update['email'] = $json->email;
			$update['password'] = $json->password;
			$update['phone_number'] = $json->phone_number;
			$update['role'] = $json->role;
			$res = $this->user->update($id, $update);
			$response['success'] = TRUE;
			$response['message'] = "Successful update";
			return json_encode($response);
		} catch (Exception $e)
		{
			$response['success'] = FALSE;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function get($id)
	{
		try
		{
			$data = $this->user->find($id);
			if ($data)
			{
				$response['data'] = $data;
				$response['success'] = TRUE;
				$response['message'] = "Successful load";
			} else
			{
				$response['success'] = FALSE;
				$response['message'] = "Not found data";
			}
			return json_encode($response);
		} catch (Exception $e)
		{
			$response['success'] = FALSE;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function list()
	{
		try
		{
			$data = $this->user->findAll();
			$response['data'] = $data;
			$response['success'] = TRUE;
			$response['message'] = "Successful load";
			return json_encode($response);
		} catch (Exception $e)
		{
			$response['success'] = FALSE;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function create()
	{
		helper(['form']);

		try
		{
			if ($this->request->getMethod() == 'post')
			{
				$rules = [
					'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[users.email]',
					'password' => 'required|min_length[8]|max_length[255]',
					'password_confirm' => 'matches[password]'
				];

				if ( ! $this->validate($rules))
				{
					return $this->response->setStatusCode(400, json_encode($this->validator->listErrors()));
				} else
				{
					$newData = [
						'name' => $this->request->getVar('name'),
						'email' => $this->request->getVar('email'),
						'password' => $this->request->getVar('password'),
						'phone_number' => $this->request->getVar('phone_number'),
						'role' => $this->request->getVar('role'),
					];
					$res = $this->user->insert($newData);
					$response['success'] = TRUE;
					$response['message'] = "Usuario Creado";
					return json_encode($response);
				}
			}
		} catch (Exception $e)
		{
			$response['success'] = FALSE;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function auth()
	{
		if ($this->request->getMethod() == 'post')
		{
			$rules = [
				'email' => 'required|min_length[6]|max_length[50]|valid_email|is_unique[users.email]',
				'password' => 'required|min_length[8]|max_length[255]|validateUser[email,password]',
			];

			$errors = [
				'password' => [
					'validateUser' => 'Correo o contraseña no coinciden'
				]
			];

			if ( ! $this->validate($rules, $errors))
			{
				return $this->response->setStatusCode(400, json_encode($this->validator->listErrors()));
			} else
			{
				$user = $this->user->where('email', $this->request->getVar('email'))->first();
				$this->setUserSession($user);
				return redirect()->to('/blog');
			}
		}
	}

	private function setUserSession($user)
	{
		$data = [
			'id' => $user['id'],
			'name' => $user['name'],
			'email' => $user['email'],
			'isLoggedIn' => TRUE
		];

		session()->set($data);
		return TRUE;
	}

	public function deauth()
	{
		session()->destroy();
		return redirect()->to('/');
	}

}
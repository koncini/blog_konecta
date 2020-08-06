<?php namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\Controller;

class UserController extends Controller {

	protected $user;
	protected $request;

	public function __construct(){
		$this->user = new UserModel();
		$this->request = \Config\Services::request();
	}

	public function delete($id)
	{
		try {
			$res = $this->user->delete($id);
			$response['res'] = $res;
			$response['success'] = true;
			$response['message'] = "Successful delete";
			return json_encode($response);
		}
		catch (\Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function update($id)
	{
		try {
			$json = $this->request->getJSON();
			$update['nombre'] = $json->nombre;
			$update['correo'] = $json->correo;
			$update['contrasena'] = $json->contrasena;
			$update['numero_movil'] = $json->numero_movil;
			$update['tipo_usuario'] = $json->tipo_usuario;
			$res = $this->user->update($id,$update);
			$response['success'] = true;
			$response['message'] = "Successful update";
			return json_encode($response);
		} catch (\Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function get($id)
	{
		try {
			$data = $this->user->find($id);
			if ($data) {
				$response['data'] = $data;
				$response['success'] = true;
				$response['message'] = "Successful load";
			}
			else {
				$response['success'] = false;
				$response['message'] = "Not found data";
			}
			return json_encode($response);
		} catch (\Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function list()
	{
		try {
			$data = $this->user->findAll();
			$response['data'] = $data;
			$response['success'] = true;
			$response['message'] = "Successful load";
			return json_encode($response);
		} catch (\Exception $e) {
			$response['success'] = false;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

	public function create()
	{
		try {
			$json = $this->request->getJSON();
			// create data
			$insert['nombre'] = $json->nombre;
			$insert['correo'] = $json->correo;
			$insert['contrasena'] = $json->contrasena;
			$insert['numero_movil'] = $json->numero_movil;
			$insert['tipo_usuario'] = $json->tipo_usuario;
			$res = $this->user->insert($insert);
			$response['success'] = true;
			$response['message'] = "Successful save";
			return json_encode($response);
		}
		catch (\Exception $e)
		{
			$response['success'] = false;
			$response['message'] = $e->getMessage();
			return json_encode($response);
		}
	}

}
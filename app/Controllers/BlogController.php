<?php namespace App\Controllers;

use App\Models\BlogModel;
use CodeIgniter\Controller;

class BlogController extends Controller {

	protected $post;

	public function __construct(){
		$this->post = new BlogModel();
		$this->request = \Config\Services::request();
	}

	public function delete($id)
	{
		try {
			$res = $this->post->delete($id);
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
			$update['id_texto_largo'] = $json->id_texto_largo;
			$update['titulo'] = $json->titulo;
			$update['slug'] = $json->slug;
			$update['texto_corto'] = $json->texto_corto;
			$update['texto_largo'] = $json->texto_largo;
			$res = $this->post->update($id,$update);
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
			$data = $this->post->find($id);
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
			$data = $this->post->findAll();
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
			$insert['id_texto_largo'] = $json->id_texto_largo;
			$insert['titulo'] = $json->titulo;
			$insert['slug'] = $json->slug;
			$insert['texto_corto'] = $json->texto_corto;
			$insert['texto_largo'] = $json->texto_largo;
			$res = $this->post->insert($insert);
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
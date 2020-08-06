<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model {
	protected $table = 'users';
	protected $primaryKey = 'id';

	protected $returnType = 'array';
	protected $useSoftDeletes = FALSE;

	protected $allowedFields = [
		'name',
		'email',
		'password',
		'phone_number',
		'role',
	];

	protected $useTimestamps = TRUE;
	protected $createdField = 'fecha_creacion';
	protected $updatedField = 'fecha_actualizacion';
	protected $beforeInsert = ['beforeInsert'];
	protected $beforeUpdate = ['beforeUpdate'];

	protected function beforeInsert(array $data)
	{
		$data = $this->passwordHash($data);
		$data['data']['created_at'] = date('Y-m-d H:i:s');

		return $data;
	}

	protected function passwordHash(array $data)
	{
		if (isset($data['data']['contrasena']))
		{
			$data['data']['contrasena'] = password_hash($data['data']['contrasena'], PASSWORD_DEFAULT);
		}

		return $data;
	}

	protected function beforeUpdate(array $data)
	{
		$data = $this->passwordHash($data);
		$data['data']['updated_at'] = date('Y-m-d H:i:s');
		return $data;
	}
}
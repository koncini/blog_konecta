<?php namespace App\Models;

use CodeIgniter\Model;

class BlogModel extends Model {
	protected $table = 'posts';
	protected $primaryKey = 'id';

	protected $returnType = 'array';
	protected $useSoftDeletes = FALSE;

	protected $allowedFields = [
			'category_id',
			'title',
			'slug',
			'short_text',
			'long_text',
		];

	protected $useTimestamps = TRUE;
	protected $createdField = 'fecha_creacion';
	protected $updatedField = 'fecha_actualizacion';
}
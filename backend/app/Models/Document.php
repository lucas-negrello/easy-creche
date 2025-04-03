<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $table = 'documents';

    protected $fillable = [
        'register_student_id',
        'name',
        'original_name',
        'file_path',
        'mime_type',
        'size'
    ];

    protected $with = ['student'];

    public function student()
    {
        return $this->belongsTo(RegisterStudent::class);
    }
}

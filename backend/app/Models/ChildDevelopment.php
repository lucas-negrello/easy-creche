<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChildDevelopment extends Model
{
    protected $table = 'child_developments';

    protected $fillable = [
        'created_by',
        'student_id',
        'description',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function student()
    {
        return $this->belongsTo(RegisterStudent::class, 'student_id');
    }

    public function registerAdmin()
    {
        return $this->belongsTo(RegisterAdmin::class, 'created_by');
    }
}

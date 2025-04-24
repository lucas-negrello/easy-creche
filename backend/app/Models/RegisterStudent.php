<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisterStudent extends Model
{
    protected $table = 'register_students';

    protected $fillable = [
        'responsible_id',
        'name',
        'birth_certificate',
        'meta'
    ];

    protected $casts = [
        'meta' => 'array'
    ];

    protected $with = ['documents'];

    public function responsible()
    {
        return $this->belongsTo(RegisterResponsible::class, 'responsible_id', 'id');
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function studentProgress()
    {
        return $this->hasMany(StudentProgress::class, 'student_id');
    }
}

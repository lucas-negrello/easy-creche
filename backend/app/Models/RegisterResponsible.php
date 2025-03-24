<?php

namespace App\Models;
class RegisterResponsible extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $hidden = ['password'];

    public function students()
    {
        return $this->hasMany(RegisterStudent::class, 'responsible_id', 'id');
    }
}

<?php

namespace App\Models;
class RegisterAdmin extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $hidden = ['password'];
}

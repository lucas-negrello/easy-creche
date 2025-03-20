<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegisterAdmin extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';
}

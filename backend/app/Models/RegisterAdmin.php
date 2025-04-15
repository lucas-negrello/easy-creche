<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RegisterAdmin extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $hidden = ['password'];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_role_permissions', 'user_id', 'role_id');
    }
}

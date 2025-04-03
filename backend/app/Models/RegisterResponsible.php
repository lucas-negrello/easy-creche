<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RegisterResponsible extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $hidden = ['password'];

    public function students(): HasMany
    {
        return $this->hasMany(RegisterStudent::class, 'responsible_id', 'id');
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_role_permissions', 'user_id', 'role_id');
    }
}

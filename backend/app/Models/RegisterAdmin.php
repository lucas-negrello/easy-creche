<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RegisterAdmin extends User
{
    protected $table = 'users';
    protected $primaryKey = 'id';

    protected $hidden = ['password'];

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_role_permissions', 'user_id', 'role_id');
    }

    public function chats(): BelongsToMany
    {
        return $this->belongsToMany(Chat::class);
    }

    public function studentProgress(): HasMany
    {
        return $this->hasMany(StudentProgress::class, 'created_by');
    }
}

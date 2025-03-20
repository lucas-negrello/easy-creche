<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    const ROLES = [
        self::ROLE_ADMIN,
        self::ROLE_USER,
    ];

    const
        ROLE_SUPER_ADMIN = 'super_admin',
        ROLE_ADMIN = 'admin',
        ROLE_USER = 'user';
    protected $fillable = ['name'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions', 'role_id', 'permission_id');

    }
}

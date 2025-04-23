<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name' => 'super_admin'],
            ['name' => 'admin'],
            ['name' => 'user'],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(['name' => $role['name']], $role);
        }

        $contexts = [
            'register-admin',
            'register-responsible',
            'register-student',
            'resources',
            'docs',
            'schedules',
            'student-progress',
            'monitoring',
            'chat',
            'chat-message'
        ];

        $actions = [
            'view',
            'create',
            'update',
            'delete',
        ];

        $permissions = [];

        foreach ($contexts as $context) {
            foreach ($actions as $action) {
                $permissions[] = [
                    'name' => "{$context}_{$action}",
                ];
            }
        }

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(['name' => $permission['name']], $permission);
        }



        $rolePermissions = [
            'super_admin' => [
                'register-admin' => ['view', 'create', 'update', 'delete'],
                'register-responsible' => ['view', 'create', 'update', 'delete'],
                'register-student' => ['view', 'create', 'update', 'delete'],
                'resources' => ['view', 'create', 'update', 'delete'],
                'docs' => ['view', 'create', 'update', 'delete'],
                'schedules' => ['view', 'create', 'update', 'delete'],
                'student-progress' => ['view', 'create', 'update', 'delete'],
                'monitoring' => ['view', 'create', 'update', 'delete'],
                'chat' => ['view', 'create', 'update', 'delete'],
                'chat-message' => ['view', 'create', 'update', 'delete'],
            ],
            'admin' => [
                'register-admin' => ['view', 'create', 'update', 'delete'],
                'register-responsible' => ['view', 'create', 'update', 'delete'],
                'register-student' => ['view', 'create', 'update', 'delete'],
                'resources' => ['view', 'create', 'update', 'delete'],
                'docs' => ['view', 'create', 'update', 'delete'],
                'schedules' => ['view', 'create', 'update', 'delete'],
                'student-progress' => ['view', 'create', 'update', 'delete'],
                'monitoring' => ['view', 'create', 'update', 'delete'],
                'chat' => ['view', 'create', 'delete'],
                'chat-message' => ['view', 'create'],
            ],
            'user' => [
                'register-admin' => [''],
                'register-responsible' => [''],
                'register-student' => [''],
                'resources' => ['view'],
                'docs' => ['view', 'create', 'update', 'delete'],
                'schedules' => ['view', 'create', 'update', 'delete'],
                'student-progress' => ['view'],
                'monitoring' => ['view'],
                'chat' => ['view', 'create'],
                'chat-message' => ['view', 'create'],
            ]
        ];

        $rolePermissionArray = [];

        foreach ($rolePermissions as $roleName => $allowed) {
            $names = [];
            foreach ($allowed as $context => $allowedActions) {
                foreach ($allowedActions as $action) {
                    $names[] = "{$context}_{$action}";
                }
            }
            $rolePermissionArray[$roleName] = Permission::whereIn('name', $names)->pluck('id')->toArray();
        }

        foreach ($rolePermissionArray as $roleName => $permissionIds) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $role->permissions()->sync($permissionIds);
            }
        }

        $superAdmin = [
            'name' => 'Super Admin',
            'email' => 'superadmin@admin.com',
            'password' => bcrypt('password'),
            'email_verified_at' => Carbon::now(),
        ];

        $user = User::updateOrCreate(['name' => $superAdmin['name']], $superAdmin);

        $user->assignRole('super_admin');

    }
}

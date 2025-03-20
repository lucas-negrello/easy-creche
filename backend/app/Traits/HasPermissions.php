<?php

namespace App\Traits;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasPermissions
{

    /**
     * Determine if the model has (one of) the given permissions(s).
     *
     * @param string|int|array $permission
     * @return bool
     */
    public function hasExplicitPermission($permission)
    {
        if(is_string($permission)) {
            return $this->permissions()->where('name', $permission)->exists();
        }

        if(is_array($permission)) {
            return $this->permissions()->whereIn('name', $permission)->exists();
        }

        if(is_int($permission)) {
            return $this->permissions()->where('permissions.id', $permission)->exists();
        }

        return false;
    }

    /**
     * Determine if the model has (one of) the given permissions(s).
     *
     * @param string|int|array $permission
     * @return bool
     */
    public function hasImplicitPermission($permission)
    {
        if(is_string($permission)) {
            return Permission::where('name', $permission)->whereHas('roles', function ($query) {
                $query->whereIn('roles.id', $this->roles->pluck('id'));
            })->exists();
        }

        if(is_array($permission)) {
            return Permission::whereIn('name', $permission)->whereHas('roles', function ($query) {
                $query->whereIn('roles.id', $this->roles->pluck('id'));
            })->exists();
        }

        if(is_int($permission)) {
            return Permission::where('permissions.id', $permission)->whereHas('roles', function ($query) {
                $query->whereIn('roles.id', $this->roles->pluck('id'));
            })->exists();
        }

        return false;

    }
    public function hasPermission($permission)
    {
        return $this->hasExplicitPermission($permission) || $this->hasImplicitPermission($permission);
    }

    /**
     * Verify if the permission exists by the permission name given
     *
     * @param string $permission_name
     * @return bool
     */
    private function permissionExistsByName($permission_name): bool
    {
        return Permission::where('name', $permission_name)->exists();
    }

    /**
     * Verify if the permission exists by the permission id given
     *
     * @param int $permission_id
     * @return bool
     */
    private function permissionExistsById($permission_id): bool
    {
        return Permission::where('id', $permission_id)->exists();
    }

    /**
     * Transform the Permissions given into a Permission Type
     *
     * @param string|int|array $permissions
     * @return Permission|array|null
     */
    private function transformToPermission($permissions)
    {
        $permission = null;
        if (is_string($permissions)) {
            if ($this->searchPermissionByName($permissions) !== null) {
                $permission = $this->searchPermissionByName($permissions);
            }
        }
        if (is_int($permissions)) {
            if ($this->searchPermissionById($permissions) !== null) {
                $permission = $this->searchPermissionById($permissions);
            }
        }
        if (is_array($permissions)) {
            foreach ($permissions as $permission_name) {
                if ($this->searchPermissionByName($permission_name) !== null) {
                    $permission[] = $this->searchPermissionByName($permission_name);
                }
            }
        }
        return $permission;
    }
    /**
     * Search permission by the name given
     *
     * @param string $permission_name
     * @return Permission|null
     */
    public function searchPermissionByName($permission_name)
    {
        if (!$this->permissionExistsByName($permission_name)) {
            return null;
        }
        return Permission::where('name', $permission_name)->first();
    }

    /**
     * Search permission by the id given
     *
     * @param int $permission_id
     * @return Permission|null
     */
    public function searchPermissionById($permission_id)
    {
        if (!$this->permissionExistsById($permission_id)) {
            return null;
        }
        return Permission::where('id', $permission_id)->first();
    }

    /**
     * Attach permissions to a user.
     *
     * @param string|int|array $permissions
     */
    public function assignPermission($permissions)
    {
        $permission = $this->transformToPermission($permissions);
        if (is_array($permission)) {
            foreach ($permission as $singlePermission) {
                if (!$this->hasExplicitPermission($singlePermission->id)) {
                    $this->permissions()->attach($singlePermission->id);
                }
            }
        } else {
            if (!$this->hasExplicitPermission($permission->id)) {
                $this->permissions()->attach($permission->id);
            }
        }
    }

    /**
     * Remove permissions from a user
     *
     * @param string|int|array $permissions
     */
    public function removePermission($permissions)
    {
        $permission = $this->transformToPermission($permissions);
        if (is_array($permission)) {
            foreach ($permission as $singlePermission) {
                if ($this->hasExplicitPermission($singlePermission->id)) {
                    $this->permissions()->detach($singlePermission->id);
                }
            }
        } else {
            if ($this->hasExplicitPermission($permission->id)) {
                $this->permissions()->detach($permission->id);
            }
        }
    }
}

<?php

namespace App\Traits;

use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasRoles
{

    /**
     * Determine if the model has (one of) the given role(s).
     *
     * @param string|int|array $roles
     * @return bool
     */
    public function hasRole($roles): bool
    {
        if(is_string($roles)) {
            return $this->roles()->where('name', $roles)->exists();
        }

        if(is_array($roles)) {
            return $this->roles()->whereIn('name', $roles)->exists();
        }

        if(is_int($roles)) {
            return $this->roles()->where('roles.id', $roles)->exists();
        }

        return false;
    }

    /**
     * Verify if the role Exists by the name given
     *
     * @param string $role_name
     * @return bool
     */
    private function roleExistsByName($role_name)
    {
        return Role::where('name', $role_name)->exists();
    }

    /**
     * Verify if the role Exists by the id given
     *
     * @param int $role_id
     * @return bool
     */
    private function roleExistsById($role_id)
    {
        return Role::where('id', $role_id)->exists();
    }

    /**
     * Transform the Roles given into a Role Type
     *
     * @param string|int|array $roles
     * @return Role|array|null
     */
    private function transformToRole($roles)
    {
        $role = null;
        if (is_string($roles)) {
            if($this->searchRoleByName($roles) !== null){
                $role = $this->searchRoleByName($roles);
            }
        }
        if (is_int($roles)) {
            if($this->searchRoleById($roles) !== null){
                $role = $this->searchRoleById($roles);
            }
        }
        if (is_array($roles)) {
            foreach ($roles as $role_name) {
                if ($this->searchRoleByName($role_name) !== null) {
                    $role[] = $this->searchRoleByName($role_name);
                }
            }
        }
        return $role;
    }
    /**
     * Search the role by the name
     *
     * @param string $role_name
     * @return Role|null
     */
    public function searchRoleByName($role_name)
    {
        if(!$this->roleExistsByName($role_name)){
            return null;
        }
        return Role::where('name', $role_name)->first();
    }

    /**
     * Search the role by the name
     *
     * @param int $role_id
     * @return Role|null
     */
    public function searchRoleById($role_id)
    {
        if(!$this->roleExistsById($role_id)){
            return null;
        }
        return Role::where('id', $role_id)->first();
    }

    /**
     * Assign Roles to a user
     *
     * @param string|int|array $roles
     */
    public function assignRole($roles)
    {
        $role = $this->transformToRole($roles);
        if (is_array($role)) {
            foreach ($role as $singleRole) {
                if(!$this->hasRole($singleRole->id)) {
                    $this->roles()->attach($singleRole->id);
                }
            }
        } else {
            if(!$this->hasRole($role->id)){
                $this->roles()->attach($role->id);
            }
        }
    }

    /**
     * Remove Roles to a user
     *
     * @param string|int|array $roles
     */
    public function removeRole($roles)
    {
        $role = $this->transformToRole($roles);
        if (is_array($role)) {
            foreach ($role as $singleRole) {
                if($this->hasRole($singleRole->id)) {
                    $this->roles()->detach($singleRole->id);
                }
            }
        } else {
            if($this->hasRole($role->id)){
                $this->roles()->detach($role->id);
            }
        }
    }
}

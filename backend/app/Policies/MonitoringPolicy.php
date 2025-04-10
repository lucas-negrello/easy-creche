<?php

namespace App\Policies;

use App\Models\Monitoring;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class MonitoringPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('monitoring_view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Monitoring $monitoring): bool
    {
        return $user->hasPermission('monitoring_view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('monitoring_create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Monitoring $monitoring): bool
    {
        return $user->hasPermission('monitoring_update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Monitoring $monitoring): bool
    {
        return $user->hasPermission('monitoring_delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Monitoring $monitoring): bool
    {
        return $user->hasPermission('monitoring_update');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Monitoring $monitoring): bool
    {
        return $user->hasPermission('monitoring_delete');
    }
}

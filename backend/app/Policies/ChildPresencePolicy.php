<?php

namespace App\Policies;

use App\Models\ChildPresence;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ChildPresencePolicy
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
    public function view(User $user, ChildPresence $childPresence): bool
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
    public function update(User $user, ChildPresence $childPresence): bool
    {
        return $user->hasPermission('monitoring_update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ChildPresence $childPresence): bool
    {
        return $user->hasPermission('monitoring_delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ChildPresence $childPresence): bool
    {
        return $user->hasPermission('monitoring_update');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ChildPresence $childPresence): bool
    {
        return $user->hasPermission('monitoring_delete');
    }
}

<?php

namespace App\Policies;

use App\Models\StudentProgress;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class StudentProgressPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('student-progress_view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, StudentProgress $studentProgress): bool
    {
        return $user->hasPermission('student-progress_view');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('student-progress_create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, StudentProgress $studentProgress): bool
    {
        return $user->hasPermission('student-progress_update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, StudentProgress $studentProgress): bool
    {
        return $user->hasPermission('student-progress_delete');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, StudentProgress $studentProgress): bool
    {
        return $user->hasPermission('student-progress_update');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, StudentProgress $studentProgress): bool
    {
        return $user->hasPermission('student-progress_delete');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterResponsibleRequest;
use App\Http\Requests\UpdateRegisterResponsibleRequest;
use App\Models\RegisterResponsible;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class RegisterResponsibleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', RegisterResponsible::class);
        $responsibles = User::whereHas('roles', function ($query) {
            $query->where('name', 'user');
        })->get();
        return response()->json([
            'message'       => 'Responsibles listed successfully',
            'data'          => $responsibles,
            'success'       => true,
            'status_code'   => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterResponsibleRequest $request)
    {
        $responsibleUser = $request->validated();
        $user = User::create([
            'name'              => $responsibleUser['name'],
            'email'             => $responsibleUser['email'],
            'password'          => Hash::make($responsibleUser['password']),
            'email_verified_at' => Carbon::now(),
            'meta'              => $responsibleUser['meta'],
        ]);
        $user->markEmailAsVerified();
        $user->assignRole('user');
        return response()->json([
            'message'       => 'Responsible created successfully',
            'data'          => $user,
            'success'       => true,
            'status_code'   => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RegisterResponsible $registerResponsible)
    {
        $this->authorize('view', $registerResponsible);
        return response()->json([
            'message'       => 'Responsible retrieved successfully',
            'data'          => $registerResponsible,
            'success'       => true,
            'status_code'   => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegisterResponsibleRequest $request, RegisterResponsible $registerResponsible)
    {
        $registerResponsible->update($request->validated());
        return response()->json([
            'message'       => 'Responsible updated successfully',
            'data'          => $registerResponsible,
            'success'       => true,
            'status_code'   => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegisterResponsible $registerResponsible)
    {
        $this->authorize('delete', $registerResponsible);
        if(auth()->user()->id === $registerResponsible->id){
            return response([
                'message'           => 'Impossible to delete responsible. This user is still logged in',
                'success'           => false,
                'status_code'       => 422,
            ], 422);
        }
        $registerResponsible->delete();
        return response()->json([
            'message'       => 'Responsible deleted successfully',
            'data'          => $registerResponsible,
            'success'       => true,
            'status_code'   => 200
        ]);
    }
}

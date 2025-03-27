<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRegisterAdminRequest;
use App\Http\Requests\UpdateRegisterAdminRequest;
use App\Models\RegisterAdmin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class RegisterAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(!Gate::allows('viewAny', RegisterAdmin::class)){
            return response([
                'message'           => 'Unauthorized',
                'success'           => false,
                'status_code'       => 401,
            ], 401);
        }

        $admins = User::whereHas('roles', function ($query) {
            $query->where('name', 'admin');
        })->get();
        return response()->json([
            'message'       => 'Admins listed successfully',
            'data'          => $admins,
            'success'       => true,
            'status_code'   => 200
        ]);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRegisterAdminRequest $request)
    {
        $adminUser = $request->validated();
        $user = User::create([
            'name'              => $adminUser['name'],
            'email'             => $adminUser['email'],
            'password'          => Hash::make($adminUser['password']),
            'email_verified_at' => Carbon::now(),
            'meta'              => $adminUser['meta'],
        ]);
        $user->markEmailAsVerified();
        $user->assignRole('admin');
        return response()->json([
            'message'       => 'Admin created successfully',
            'data'          => $user,
            'success'       => true,
            'status_code'   => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $registerAdmin)
    {
        if(!Gate::allows('view', RegisterAdmin::class)){
            return response([
                'message'           => 'Unauthorized',
                'success'           => false,
                'status_code'       => 401,
            ], 401);
        }
        return response()->json([
            'message'       => 'Admin retrieved successfully',
            'data'          => $registerAdmin,
            'success'       => true,
            'status_code'   => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRegisterAdminRequest $request, User $registerAdmin)
    {
        if($registerAdmin->hasRole('super_admin')){
            return response([
                'message'           => 'Impossible to update super admin user',
                'success'           => false,
                'status_code'       => 422,
            ], 422);
        }

        $registerAdmin->update($request->validated());
        return response()->json([
            'message'       => 'Admin updated successfully',
            'data'          => $registerAdmin,
            'success'       => true,
            'status_code'   => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $registerAdmin)
    {
        if(!Gate::allows('delete', RegisterAdmin::class)){
            return response([
                'message'           => 'Unauthorized',
                'success'           => false,
                'status_code'       => 401,
            ], 401);
        }

        if($registerAdmin->hasRole('super_admin')){
            return response([
                'message'           => 'Impossible to delete super admin user',
                'success'           => false,
                'status_code'       => 422,
            ], 422);
        }

        if(auth()->user()->id === $registerAdmin->id){
            return response([
                'message'           => 'Impossible to delete admin. This user is still logged in',
                'success'           => false,
                'status_code'       => 422,
            ], 422);
        }

        $registerAdmin->delete();

        return response()->json([
            'message'       => 'Admin deleted successfully',
            'data'          => $registerAdmin,
            'success'       => true,
            'status_code'   => 200
        ]);
    }
}

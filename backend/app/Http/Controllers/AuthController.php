<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\RegisterResponsible;
use App\Models\RegisterStudent;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        if (!$user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Your email address is not verified.'], 403);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'message' => 'Successful login',
            'email' => $user->email,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $currentAccessToken = $request->user()->currentAccessToken();

        $currentAccessToken->delete();

        return response()->json(['message' => 'Successful Logout']);
    }

    public function me()
    {
        $user = auth()->user();

        if($user->hasRole(['user'])) {
            $responsible = RegisterResponsible::where('id', $user->id)->with('students')->with('roles')->first();
            return response()->json([
                'user'      => $responsible,
                'role'      => $user->roles,
                'students'  => $responsible->students,
            ]);
        }
        return response()->json([
            'user'      => $user,
            'role'      => $user->roles,
            'students'  => RegisterStudent::all()
        ]);
    }

}

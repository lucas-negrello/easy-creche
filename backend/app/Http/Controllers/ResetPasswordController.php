<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function reset(Request $request, string $token, string $email)
    {
        $rules = [
            'password' => 'required|min:8|confirmed',
        ];

        $request->validate($rules);

        $resetToken = DB::table('password_reset_tokens')->where('email', $email)->first();

        if (!$resetToken || $token !== $resetToken->token) {
            return response([
                'message'           => 'Invalid reset token',
                'success'           => false,
                'status_code'       => 400,
            ], 400);
        }

        $user = User::where('email', $email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $email)->delete();

        return response()->json([
            'message' => 'Password has been reset successfully',
            'email' => $user->email,
        ]);
    }
}

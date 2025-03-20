<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $rules = [
            'token' => 'required',
            'email' => 'required|email',
            'new_password' => 'required|min:8|confirmed',
        ];

        $request->validate($rules);

        $resetToken = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if (!$resetToken || $resetToken->token !== $request->token) {
            return response()->json(['message' => 'Invalid reset token'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->new_password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Password has been reset successfully',
            'email' => $user->email,
        ]);
    }
}

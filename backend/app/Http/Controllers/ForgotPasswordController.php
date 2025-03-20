<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{

    public function sendResetLinkEmail(Request $request)
    {
        $rules = [
            'email' => 'required|email|exists:users'
        ];

        $feedback = [
            'email.exists' => 'Email is not registered yet.'
        ];

        $request->validate($rules, $feedback);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        $token = Str::random(64);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

//        $user->notify(new MailForgotPasswordNotification($request->email, $token));

        return response()->json([
            'message' => 'New token generated',
            'email' => $request->email,
            'reset_token' => $token,
        ]);
    }

}

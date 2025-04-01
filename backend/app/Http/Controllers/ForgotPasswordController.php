<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\Mail\MailForgotPasswordNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ForgotPasswordController extends Controller
{

    public function sendResetLinkEmail(Request $request)
    {

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response([
                'message'           => 'Email not found',
                'success'           => false,
                'status_code'       => 404,
            ], 404);
        }

        $token = Str::random(64);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            ['token' => $token, 'created_at' => Carbon::now()]
        );

        $user->notify(new MailForgotPasswordNotification($request->email, $token));

        return response()->json([
            'message'       => 'Token created successfully and mail sent.',
            'data'          => [],
            'success'       => true,
            'status_code'   => 200
        ]);
    }

}

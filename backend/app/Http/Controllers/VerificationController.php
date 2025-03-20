<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerificationController extends Controller
{

    public function verify($id, $hash)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Invalid verification link.'], 403);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email has already been verified.']);
        }

        $user->markEmailAsVerified();

        event(new Verified($user));

        return response()->json(['message' => 'Email verified successfully.']);
    }

    public function resend(Request $request)
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

        if($user->hasVerifiedEmail()){
            return response()->json(['message' => 'Email has already been verified.']);
        }

        $verificationCode = env('APP_URL').':'.env('APP_DEV_PORT').'/api/email/verify/'.$user->id.'/'.sha1($user->email);

//        $user->notify(new MailVerifyNotification($user));

        return response()->json([
            'message' => 'Email have been resend. Please check your mailbox',
            'name' => $user->name,
            'email' => $user->email,
            'verification_url' => $verificationCode,
            'verification_id' => $user->id,
            'verification_hash' => sha1($user->email),
        ]);

    }
}

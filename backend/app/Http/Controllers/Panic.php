<?php

namespace App\Http\Controllers;

use App\Http\Requests\PanicRequest;
use App\Mail\PanicNotification;
use App\Models\RegisterResponsible;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class Panic extends Controller
{
    public function sendPanicMessage(PanicRequest $request)
    {
        $password = $request->input('password');
        $user = auth()->user();

        if (!Hash::check($password, $user->password)) {
            return response([
                'message'           => 'Wrong password provided.',
                'success'           => false,
                'status_code'       => 403,
            ], 403);
        }

        $responsibles = User::query()->whereHas('roles', function ($query) {
            $query->where('name', 'user');
        })->select(['name', 'email'])->get();

        foreach ($responsibles as $recipient) {
            Mail::to($recipient->email)->send(new PanicNotification($user));
        }

        return response()->json([
            'message'       => 'Email sent successfully to all responsibles.',
            'data'          => [
                'responsibles' => $responsibles->map(function ($recipient) {
                    return [
                        'name'  => $recipient->name,
                        'email' => $recipient->email
                    ];
                })->toArray()
            ],
            'success'       => true,
            'status_code'   => 200
        ]);
    }
}

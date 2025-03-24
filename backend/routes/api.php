<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\RegisterAdminController;
use App\Http\Controllers\RegisterResponsibleController;
use App\Http\Controllers\RegisterStudentController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\VerificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// EMAIL VERIFICATION ROUTES
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
    ->name('verification.verify');
Route::post('/email/resend', [VerificationController::class, 'resend']);

// LOGIN-LOGOUT ROUTES
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

// PASSWORD RESEND ROUTES
Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');

// ROUTES FOR VERIFIED EMAILS USERS
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

// ROUTES FOR AUTHENTICATED/LOGGED IN USERS
Route::middleware('auth:sanctum')->group(function () {
    // RESOURCE ROUTES
    Route::apiResources([
        'register-admins' => RegisterAdminController::class,
        'register-responsibles' => RegisterResponsibleController::class,
        'register-students' => RegisterStudentController::class,
    ]);
});





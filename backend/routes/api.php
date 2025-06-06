<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\ChildDevelopmentController;
use App\Http\Controllers\ChildPresenceController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\MonitoringController;
use App\Http\Controllers\Panic;
use App\Http\Controllers\RegisterAdminController;
use App\Http\Controllers\RegisterResponsibleController;
use App\Http\Controllers\RegisterStudentController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentProgressController;
use Illuminate\Support\Facades\Route;

// LOGIN-LOGOUT ROUTES
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

// PASSWORD RESEND ROUTES
Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset/{token}/{email}', [ResetPasswordController::class, 'reset'])->name('password.reset');

// ROUTES FOR AUTHENTICATED/LOGGED IN USERS
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/users', [AuthController::class, 'users']);
    Route::post('/panic', [Panic::class, 'sendPanicMessage']);
    // RESOURCE ROUTES
    Route::apiResources([
        'register-admins' => RegisterAdminController::class,
        'register-responsibles' => RegisterResponsibleController::class,
        'register-students' => RegisterStudentController::class,
        'schedule' => ScheduleController::class,
        'monitoring' => MonitoringController::class,
        'student-progress' => StudentProgressController::class,
        'chats' => ChatController::class,
        'child-presences' => ChildPresenceController::class,
        'child-development' => ChildDevelopmentController::class,
    ]);
    Route::get('chats/{chat}/messages', [ChatMessageController::class, 'index'])
        ->name('chats.messages.index');
    Route::post('chats/{chat}/messages', [ChatMessageController::class, 'store'])
        ->name('chats.messages.store');
    Route::delete('messages/{chatMessage}', [ChatMessageController::class, 'destroy'])
        ->name('messages.destroy');
    Route::group([
        'prefix'    => 'docs',
        'as'        => 'docs.'
    ], function() {
        Route::post('/', [DocumentController::class, 'upload']);
        Route::get('/', [DocumentController::class, 'index']);
        Route::post('/{document}', [DocumentController::class, 'update']);
        Route::get('/{document}', [DocumentController::class, 'download']);
        Route::delete('/{document}', [DocumentController::class, 'destroy']);
    });
});





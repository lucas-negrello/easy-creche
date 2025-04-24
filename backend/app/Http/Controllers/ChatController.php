<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChatRequest;
use App\Http\Requests\UpdateChatRequest;
use App\Models\Chat;
use App\Models\User;
use App\Traits\UseChats;

class ChatController extends Controller
{
    use UseChats;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Chat::class);
        $chats = auth()->user()->chats()->with(['users' => function ($query) {
            $query->select('users.id', 'users.name', 'users.email')->without('students');
        }])->latest()->get();
        return response()->json([
            'message'           => 'Chats listed successfully',
            'data'              => $chats,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatRequest $request)
    {
        $sender = $request->user();
        $recipient = User::findOrFail($request->recipient_id);
        if($this->verifyChatOnCreate($sender, $recipient)) {
            return response([
                'message'           => 'Impossible to create chat between two users',
                'success'           => false,
                'status_code'       => 409,
            ], 409);
        }
        return $this->createChat($sender, $recipient);
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        $this->authorize('view', $chat);
        return response()->json([
            'message'           => 'Chat retrieved successfully',
            'data'              => $chat,
            'success'           => true,
            'status_code'       => 200
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatRequest $request, Chat $chat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        $this->authorize('delete', $chat);
        $chat->delete();

        return response()->json([
            'message'           => 'Chat deleted successfully',
            'data'              => $chat,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}

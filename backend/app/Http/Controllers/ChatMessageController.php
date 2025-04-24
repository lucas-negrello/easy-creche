<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChatMessageRequest;
use App\Http\Requests\UpdateChatMessageRequest;
use App\Models\Chat;
use App\Models\ChatMessage;

class ChatMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Chat $chat)
    {
        $this->authorize('view', $chat);
        $messages = $chat->messages()->latest()->get();
        return response()->json([
            'message'           => 'Chat Messages listed successfully',
            'data'              => $messages,
            'success'           => true,
            'status_code'       => 200
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatMessageRequest $request, Chat $chat)
    {
        $message = $chat->messages()->create([
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return response()->json([
            'message'           => 'Chat Message created successfully',
            'data'              => $message,
            'success'           => true,
            'status_code'       => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatMessageRequest $request, ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatMessage $chatMessage)
    {
        $this->authorize('delete', $chatMessage);
        $chatMessage->delete();

        return response()->json([
            'message'           => 'Chat Message deleted successfully',
            'data'              => $chatMessage,
            'success'           => true,
            'status_code'       => 200
        ]);
    }
}

<?php

namespace App\Traits;

use App\Models\Chat;
use App\Models\User;

trait UseChats
{
    public function verifyChatOnCreate(User $sender, User $recipient)
    {
        $senderIsAdmin = $sender->hasRole(['admin', 'super_admin']);
        $recipientIsAdmin = $recipient->hasRole(['admin', 'super_admin']);
        $senderIsUser = $sender->hasRole(['user']);
        $recipientIsUser = $recipient->hasRole(['user']);

        if(
            ($senderIsUser && $recipientIsUser) ||
            (!($senderIsAdmin || $senderIsUser)) ||
            (!($recipientIsAdmin || $recipientIsUser))
        ) {
            return true;
        }

        return false;
    }

    public function createChat(User $sender, User $recipient)
    {
        $existingChat = Chat::between($sender->id, $recipient->id);

        if ($existingChat) {
            return response()->json([
                'message'       => 'Chat exists',
                'data'          => $existingChat,
                'success'       => true,
                'status_code'   => 200
            ]);
        }

        $chat = Chat::create();
        $chat->users()->sync([$sender->id, $recipient->id]);
        return response()->json([
            'message'       => 'Chat created successfully',
            'data'          => $chat,
            'success'       => true,
            'status_code'   => 201
        ]);
    }
}

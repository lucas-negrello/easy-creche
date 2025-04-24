<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chat extends Model
{
    protected $table = 'chats';

    protected $fillable = [
        'meta'
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }

    public static function between(int $userAId, int $userBId): ?self
    {
        return self::whereHas('users', fn ($q) => $q->where('user_id', $userAId))
            ->whereHas('users', fn ($q) => $q->where('user_id', $userBId))
            ->withCount('users')
            ->get()
            ->firstWhere('users_count', 2);
    }
}

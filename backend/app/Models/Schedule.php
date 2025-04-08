<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $table = 'schedules';

    protected $fillable = [
        'created_by',
        'event_name',
        'event_date',
        'meta'
    ];

    protected $casts = [
        'meta' => 'array',
        'event_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

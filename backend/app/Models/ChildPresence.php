<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChildPresence extends Model
{
    protected $table = 'child_presences';

    protected $fillable = [
        'register_student_id',
        'entrance',
        'exit',
        'meta'
    ];

    protected $casts = [
        'meta' => 'array',
        'entrance' => 'datetime',
        'exit' => 'datetime',
    ];

    public function student(): BelongsTo
    {
        return $this->belongsTo(RegisterStudent::class, 'register_student_id');
    }
}

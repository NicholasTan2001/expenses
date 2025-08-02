<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'income',
        'date',
        'year',
        'month',
        'day',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


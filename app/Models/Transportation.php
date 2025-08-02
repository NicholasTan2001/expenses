<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transportation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'transport',
        'place',
        'total_price',
        'remarks',
        'date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

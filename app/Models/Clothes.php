<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clothes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'brand',
        'total_price',
        'remarks',
        'date',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

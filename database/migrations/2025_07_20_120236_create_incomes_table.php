<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration 
{
    public function up(): void
    {
        Schema::create('incomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('income', 10, 2);
            $table->date('date');
            $table->decimal('year', 10, 2);
            $table->decimal('month', 10, 2);
            $table->decimal('day', 10, 2);
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('incomes');
    }
};


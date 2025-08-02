<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transportations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('transport');
            $table->string('place');
            $table->decimal('total_price', 8, 2);
            $table->text('remarks')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('transportations');
    }
};

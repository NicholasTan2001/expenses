<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('foods_beverages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('type');
            $table->decimal('total_price', 8, 2);
            $table->text('remarks')->nullable();
            $table->date('date');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('foods_beverages');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_configurations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->json('draft_config');
            $table->json('published_config')->nullable();
            $table->unsignedInteger('revision')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->foreignId('published_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_configurations');
    }
};

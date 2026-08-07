<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_configuration_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_configuration_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('revision');
            $table->json('config');
            $table->foreignId('published_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('published_at');
            $table->timestamps();
            $table->unique(['site_configuration_id', 'revision']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_configuration_revisions');
    }
};

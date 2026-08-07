<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('system_code', 32)->nullable()->unique()->after('slug');
            $table->text('problem')->nullable()->after('description');
            $table->text('solution')->nullable()->after('problem');
            $table->text('result')->nullable()->after('solution');
            $table->string('image_alt')->nullable()->after('image_path');
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->dropUnique(['system_code']);
            $table->dropColumn(['system_code', 'problem', 'solution', 'result', 'image_alt']);
        });
    }
};

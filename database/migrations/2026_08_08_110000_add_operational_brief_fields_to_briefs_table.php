<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('briefs', function (Blueprint $table) {
            $table->text('current_workflow')->nullable();
            $table->text('operational_constraint')->nullable();
            $table->text('desired_change')->nullable();
            $table->string('timeline')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('briefs', function (Blueprint $table) {
            $table->dropColumn([
                'current_workflow',
                'operational_constraint',
                'desired_change',
                'timeline',
            ]);
        });
    }
};

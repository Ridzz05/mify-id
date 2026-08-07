<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brief extends Model
{
    protected $fillable = [
        'name',
        'email',
        'company',
        'budget',
        'current_workflow',
        'operational_constraint',
        'desired_change',
        'timeline',
        'message',
        'tech_stack',
        'status',
        'ai_blueprint',
        'priority',
        'notes',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'ai_blueprint' => 'array',
    ];
}

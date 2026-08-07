<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'system_code',
        'category',
        'description',
        'problem',
        'solution',
        'result',
        'image_path',
        'image_alt',
        'project_url',
        'tech_stack',
        'is_featured',
        'order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
        'order' => 'integer',
    ];

    protected $appends = [
        'image_url',
    ];

    /**
     * Get the approved evidence image URL, if one exists.
     */
    public function getImageUrlAttribute(): string
    {
        if ($this->image_path) {
            if (Str::startsWith($this->image_path, ['http://', 'https://'])) {
                return $this->image_path;
            }
            return asset('storage/' . $this->image_path);
        }

        return '';
    }
}

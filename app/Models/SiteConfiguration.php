<?php

namespace App\Models;

use App\Support\LandingConfiguration;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SiteConfiguration extends Model
{
    protected $fillable = [
        'name',
        'draft_config',
        'published_config',
        'revision',
        'published_at',
        'published_by',
    ];

    protected $casts = [
        'draft_config' => 'array',
        'published_config' => 'array',
        'revision' => 'integer',
        'published_at' => 'datetime',
    ];

    public static function primary(): self
    {
        return static::firstOrCreate(
            ['name' => 'Primary landing'],
            [
                'draft_config' => LandingConfiguration::defaults(),
                'published_config' => LandingConfiguration::defaults(),
            ],
        );
    }

    public function revisions(): HasMany
    {
        return $this->hasMany(SiteConfigurationRevision::class)->latest('revision');
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'published_by');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteConfigurationRevision extends Model
{
    protected $fillable = [
        'site_configuration_id',
        'revision',
        'config',
        'published_by',
        'published_at',
    ];

    protected $casts = [
        'config' => 'array',
        'revision' => 'integer',
        'published_at' => 'datetime',
    ];

    public function configuration(): BelongsTo
    {
        return $this->belongsTo(SiteConfiguration::class, 'site_configuration_id');
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'published_by');
    }
}

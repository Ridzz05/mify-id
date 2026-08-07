<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Portfolio;
use App\Models\SiteConfiguration;
use App\Models\SiteConfigurationRevision;
use App\Support\LandingConfiguration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SiteStudioController extends Controller
{
    public function index()
    {
        $configuration = SiteConfiguration::primary();

        return Inertia::render('SiteStudio/Index', [
            'configuration' => [
                'id' => $configuration->id,
                'name' => $configuration->name,
                'draft_config' => LandingConfiguration::normalize($configuration->draft_config),
                'published_config' => LandingConfiguration::normalize($configuration->published_config),
                'revision' => $configuration->revision,
                'published_at' => $configuration->published_at,
            ],
            'revisions' => $configuration->revisions()
                ->with('publisher:id,name,email')
                ->take(20)
                ->get()
                ->map(fn (SiteConfigurationRevision $revision) => [
                    'id' => $revision->id,
                    'revision' => $revision->revision,
                    'published_at' => $revision->published_at,
                    'publisher' => $revision->publisher?->only(['name', 'email']),
                ]),
            'portfolios' => Portfolio::where('is_featured', true)->orderBy('order')->latest()->take(3)->get(),
        ]);
    }

    public function saveDraft(Request $request)
    {
        $configuration = SiteConfiguration::primary();
        $validated = $request->validate(['config' => 'required|array']);
        $normalized = LandingConfiguration::normalize($validated['config']);

        $configuration->update(['draft_config' => $normalized]);

        AuditLog::create([
            'event' => 'Landing Studio draft saved',
            'ip' => $request->ip() ?: '127.0.0.1',
        ]);

        return redirect()->back()->with('success', 'Landing Studio draft saved.');
    }

    public function publish(Request $request)
    {
        $configuration = SiteConfiguration::primary();

        DB::transaction(function () use ($configuration, $request) {
            $locked = SiteConfiguration::query()->lockForUpdate()->findOrFail($configuration->id);
            $normalized = LandingConfiguration::normalize($locked->draft_config);
            $revision = $locked->revision + 1;
            $publishedAt = now();

            $locked->update([
                'draft_config' => $normalized,
                'published_config' => $normalized,
                'revision' => $revision,
                'published_at' => $publishedAt,
                'published_by' => $request->user()->id,
            ]);

            SiteConfigurationRevision::create([
                'site_configuration_id' => $locked->id,
                'revision' => $revision,
                'config' => $normalized,
                'published_by' => $request->user()->id,
                'published_at' => $publishedAt,
            ]);
        });

        AuditLog::create([
            'event' => 'Landing Studio revision published',
            'ip' => $request->ip() ?: '127.0.0.1',
        ]);

        return redirect()->back()->with('success', 'Landing Studio revision published.');
    }

    public function restoreRevision(Request $request, SiteConfigurationRevision $revision)
    {
        $configuration = SiteConfiguration::primary();
        abort_unless($revision->site_configuration_id === $configuration->id, 404);

        $configuration->update([
            'draft_config' => LandingConfiguration::normalize($revision->config),
        ]);

        AuditLog::create([
            'event' => "Landing Studio revision {$revision->revision} restored to draft",
            'ip' => $request->ip() ?: '127.0.0.1',
        ]);

        return redirect()->back()->with('success', "Revision {$revision->revision} restored to draft.");
    }
}

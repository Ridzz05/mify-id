<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $portfolios = [];
    $landingConfig = \App\Support\LandingConfiguration::defaults();
    if (\Illuminate\Support\Facades\Schema::hasTable('site_configurations')) {
        $configuration = \App\Models\SiteConfiguration::where('name', 'Primary landing')->first();
        $landingConfig = \App\Support\LandingConfiguration::normalize($configuration?->published_config);
    }
    if (\Illuminate\Support\Facades\Schema::hasTable('portfolios')) {
        // Selection and presentation are controlled by the published config; portfolio
        // copy and evidence remain domain-owned records.
        $portfolios = \App\Models\Portfolio::orderBy('order', 'asc')->latest()->get();
    }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'portfolios' => $portfolios,
        'landingConfig' => $landingConfig,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'briefs' => \App\Models\Brief::latest()->get(),
        'pipelines' => \Illuminate\Support\Facades\Schema::hasTable('pipelines') ? \App\Models\Pipeline::latest()->get() : [],
        'portfolios' => \Illuminate\Support\Facades\Schema::hasTable('portfolios') ? \App\Models\Portfolio::latest()->get() : [],
        'auditLogs' => \App\Models\AuditLog::latest()->take(5)->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');
Route::post('/briefs', [\App\Http\Controllers\BriefController::class, 'store'])->name('briefs.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Brief actions
    Route::get('/dashboard/briefs', [\App\Http\Controllers\BriefController::class, 'index'])->name('briefs.index');
    Route::patch('/briefs/{brief}/status', [\App\Http\Controllers\BriefController::class, 'updateStatus'])->name('briefs.update-status');
    Route::patch('/briefs/{brief}/notes-priority', [\App\Http\Controllers\BriefController::class, 'updateNotesPriority'])->name('briefs.update-notes-priority');
    Route::delete('/briefs/{brief}', [\App\Http\Controllers\BriefController::class, 'destroy'])->name('briefs.destroy');
    Route::post('/briefs/{brief}/blueprint', [\App\Http\Controllers\BriefController::class, 'generateBlueprint'])->name('briefs.generate-blueprint');

    // Pipeline actions
    Route::get('/dashboard/pipelines', [\App\Http\Controllers\PipelineController::class, 'index'])->name('pipelines.index');
    Route::post('/dashboard/pipelines', [\App\Http\Controllers\PipelineController::class, 'store'])->name('pipelines.store');
    Route::patch('/dashboard/pipelines/{pipeline}', [\App\Http\Controllers\PipelineController::class, 'update'])->name('pipelines.update');
    Route::delete('/dashboard/pipelines/{pipeline}', [\App\Http\Controllers\PipelineController::class, 'destroy'])->name('pipelines.destroy');

    // Portfolio actions
    Route::get('/dashboard/portfolios', [\App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolios.index');
    Route::post('/dashboard/portfolios', [\App\Http\Controllers\PortfolioController::class, 'store'])->name('portfolios.store');
    Route::post('/dashboard/portfolios/{portfolio}', [\App\Http\Controllers\PortfolioController::class, 'update'])->name('portfolios.update');
    Route::delete('/dashboard/portfolios/{portfolio}', [\App\Http\Controllers\PortfolioController::class, 'destroy'])->name('portfolios.destroy');

    // Live Site Overview Screen
    Route::get('/dashboard/live-preview', function () {
        return Inertia::render('LivePreview/Index', [
            'siteUrl' => url('/'),
            'totalPortfolios' => \App\Models\Portfolio::count(),
            'totalBriefs' => \App\Models\Brief::count(),
            'totalPipelines' => \App\Models\Pipeline::count(),
        ]);
    })->name('live-preview.index');

    Route::get('/dashboard/diagnostics', function () {
        $dbPath = database_path('database.sqlite');
        $odSocket = @fsockopen('127.0.0.1', 7456, $odErrno, $odErrstr, 0.2);
        $viteSocket = @fsockopen('127.0.0.1', 5173, $viteErrno, $viteErrstr, 0.2);
        $openDesignStatus = $odSocket ? 'active' : 'offline';
        $viteStatus = $viteSocket ? 'active' : 'offline';

        if ($odSocket) fclose($odSocket);
        if ($viteSocket) fclose($viteSocket);

        return Inertia::render('Diagnostics/Index', [
            'openDesignStatus' => $openDesignStatus,
            'viteStatus' => $viteStatus,
            'dbSize' => file_exists($dbPath) ? round(filesize($dbPath) / 1024) . ' KB' : 'N/A',
            'gitCommit' => trim(@shell_exec('git log -1 --pretty=format:"%h - %s (%ar)"') ?? 'N/A'),
        ]);
    })->name('diagnostics.index');

    // Controlled public landing configuration workspace
    Route::get('/admin/site-studio', [\App\Http\Controllers\SiteStudioController::class, 'index'])->name('site-studio.index');
    Route::patch('/admin/site-studio/draft', [\App\Http\Controllers\SiteStudioController::class, 'saveDraft'])->name('site-studio.save-draft');
    Route::post('/admin/site-studio/publish', [\App\Http\Controllers\SiteStudioController::class, 'publish'])->name('site-studio.publish');
    Route::post('/admin/site-studio/revisions/{revision}/restore', [\App\Http\Controllers\SiteStudioController::class, 'restoreRevision'])->name('site-studio.restore-revision');
});

require __DIR__.'/auth.php';

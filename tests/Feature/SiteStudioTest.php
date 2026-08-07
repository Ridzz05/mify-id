<?php

namespace Tests\Feature;

use App\Models\SiteConfiguration;
use App\Models\SiteConfigurationRevision;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class SiteStudioTest extends TestCase
{
    use RefreshDatabase;

    public function test_site_studio_requires_authentication(): void
    {
        $this->get(route('site-studio.index'))->assertRedirect(route('login'));
    }

    public function test_public_landing_reads_published_configuration_only(): void
    {
        $config = SiteConfiguration::primary();
        $config->update([
            'draft_config' => array_replace_recursive($config->draft_config, [
                'hero' => ['content' => ['en' => ['headline' => 'Private draft headline.']]],
            ]),
            'published_config' => array_replace_recursive($config->published_config, [
                'hero' => ['content' => ['en' => ['headline' => 'Published headline.']]],
            ]),
        ]);

        $this->get('/')->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Welcome')
            ->where('landingConfig.hero.content.en.headline', 'Published headline.')
        );
    }

    public function test_draft_changes_are_allowlisted_and_publishing_creates_a_revision(): void
    {
        $user = User::factory()->create();
        $config = SiteConfiguration::primary();

        $this->actingAs($user)->patch(route('site-studio.save-draft'), [
            'config' => [
            'hero' => [
                    'content' => ['en' => ['headline' => 'Systems for the work that matters.']],
                    'layout' => [
                        'alignment' => 'center',
                        'secondaryObjectPosition' => 'left',
                        'visibility' => ['mobile' => false],
                        'arbitraryClasses' => 'bg-red-500',
                    ],
                    'highlight' => ['style' => 'signal-line'],
                ],
                'cards' => ['shape' => 'soft'],
                'sections' => [
                    'systems' => [
                        'visible' => false,
                        'content' => ['en' => ['title' => 'Selected systems, edited safely.']],
                        'arbitraryClasses' => 'bg-red-500',
                    ],
                ],
                'script' => 'alert(1)',
            ],
        ])->assertRedirect();

        $config->refresh();

        $this->assertSame('Systems for the work that matters.', $config->draft_config['hero']['content']['en']['headline']);
        $this->assertSame('center', $config->draft_config['hero']['layout']['alignment']);
        $this->assertSame('left', $config->draft_config['hero']['layout']['secondaryObjectPosition']);
        $this->assertFalse($config->draft_config['hero']['layout']['visibility']['mobile']);
        $this->assertFalse($config->draft_config['hero']['secondaryObject']['mobile']);
        $this->assertSame('left', $config->draft_config['hero']['secondaryObject']['position']);
        $this->assertArrayNotHasKey('arbitraryClasses', $config->draft_config['hero']['layout']);
        $this->assertFalse($config->draft_config['sections']['systems']['visible']);
        $this->assertSame('Selected systems, edited safely.', $config->draft_config['sections']['systems']['content']['en']['title']);
        $this->assertArrayNotHasKey('arbitraryClasses', $config->draft_config['sections']['systems']);
        $this->assertArrayNotHasKey('script', $config->draft_config);
        $this->assertNotSame($config->draft_config, $config->published_config);

        $this->actingAs($user)->post(route('site-studio.publish'))->assertRedirect();

        $config->refresh();
        $this->assertSame(1, $config->revision);
        $this->assertSame($config->draft_config, $config->published_config);
        $this->assertDatabaseHas('site_configuration_revisions', [
            'site_configuration_id' => $config->id,
            'revision' => 1,
            'published_by' => $user->id,
        ]);
    }

    public function test_restoring_a_revision_changes_only_the_draft(): void
    {
        $user = User::factory()->create();
        $config = SiteConfiguration::primary();

        $this->actingAs($user)->patch(route('site-studio.save-draft'), [
            'config' => ['hero' => ['content' => ['en' => ['headline' => 'First published headline.']]]],
        ]);
        $this->actingAs($user)->post(route('site-studio.publish'));

        $revision = SiteConfigurationRevision::firstOrFail();

        $this->actingAs($user)->patch(route('site-studio.save-draft'), [
            'config' => ['hero' => ['content' => ['en' => ['headline' => 'Second draft headline.']]]],
        ]);

        $this->actingAs($user)->post(route('site-studio.restore-revision', $revision->id))->assertRedirect();

        $config->refresh();
        $this->assertSame('First published headline.', $config->draft_config['hero']['content']['en']['headline']);
        $this->assertSame('First published headline.', $config->published_config['hero']['content']['en']['headline']);
        $this->assertSame(1, $config->revision);
    }
}

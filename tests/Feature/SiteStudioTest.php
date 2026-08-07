<?php

namespace Tests\Feature;

use App\Models\SiteConfiguration;
use App\Models\SiteConfigurationRevision;
use App\Models\User;
use App\Support\LandingConfiguration;
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

    public function test_v1_configuration_migrates_to_bounded_v2_without_raw_markup(): void
    {
        $normalized = LandingConfiguration::normalize([
            'version' => 1,
            'hero' => [
                'content' => ['en' => ['headline' => '<strong>Legacy headline</strong>', 'primaryTarget' => 'javascript:alert(1)']],
                'secondaryObject' => ['position' => 'top', 'mobile' => false],
            ],
            'sections' => [
                'process' => ['content' => ['en' => ['title' => '<script>Bad</script>Legacy process']]],
            ],
            'script' => '<script>alert(1)</script>',
        ]);

        $this->assertSame(2, $normalized['version']);
        $this->assertSame('Legacy headline', $normalized['hero']['content']['en']['headline']);
        $this->assertSame('#intake', $normalized['hero']['content']['en']['primaryTarget']);
        $this->assertSame('center', $normalized['hero']['layout']['secondaryObjectPosition']);
        $this->assertFalse($normalized['hero']['layout']['visibility']['mobile']);
        $this->assertSame('Legacy process', $normalized['sections']['process']['content']['en']['title']);
        $this->assertArrayNotHasKey('script', $normalized);
        $this->assertArrayNotHasKey('arbitraryClasses', $normalized['hero']['layout']);
        $this->assertNotEmpty($normalized['hero']['metaItems']);
        $this->assertNotEmpty($normalized['sections']['process']['steps']);
    }

    public function test_v2_draft_preserves_full_editable_shape_and_normalizes_repeated_content(): void
    {
        $user = User::factory()->create();
        $payload = [
            'version' => 2,
            'global' => [
                'navigation' => ['systems' => ['en' => '<em>Proof systems</em>']],
                'contact' => ['email' => 'studio@example.test'],
                'arbitraryClasses' => 'bg-red-500',
            ],
            'hero' => [
                'metaItems' => [
                    ['id' => 'meta-one', 'text' => ['en' => 'One', 'id' => 'Satu']],
                    ['id' => 'meta-one', 'text' => ['en' => 'Two', 'id' => 'Dua']],
                ],
                'secondaryObject' => ['type' => 'workflow'],
                'workflow' => ['rows' => [['id' => 'workflow-row', 'label' => ['en' => 'Input'], 'value' => ['en' => 'Manual'], 'status' => 'attention']]],
            ],
            'sections' => [
                'disciplines' => ['groups' => [['id' => 'build', 'items' => [['id' => 'build-item', 'text' => ['en' => 'Custom item']]]]]],
                'systems' => ['presentation' => ['selectionMode' => 'selected', 'selectedIds' => [42], 'displayLimit' => 99, 'showResult' => false]],
                'transformation' => ['rows' => [['id' => 'change', 'before' => ['en' => 'Before'], 'after' => ['en' => 'After']]]],
                'process' => ['steps' => [['id' => 'step', 'number' => '01', 'label' => ['en' => 'Map'], 'description' => ['en' => 'Map the work.']]]],
                'principles' => ['items' => [['id' => 'principle', 'text' => ['en' => 'A principle']]]],
                'intake' => [
                    'presentation' => ['submit' => ['en' => 'Send it']],
                    'fields' => ['name' => ['label' => ['en' => 'Contact name'], 'required' => false]],
                    'success' => ['title' => ['en' => 'Received']],
                ],
            ],
        ];

        $this->actingAs($user)->patch(route('site-studio.save-draft'), ['config' => $payload])->assertRedirect();

        $config = SiteConfiguration::primary()->fresh();
        $draft = $config->draft_config;
        $this->assertSame(2, $draft['version']);
        $this->assertSame('Proof systems', $draft['global']['navigation']['systems']['en']);
        $this->assertSame('studio@example.test', $draft['global']['contact']['email']);
        $this->assertArrayNotHasKey('arbitraryClasses', $draft['global']);
        $this->assertSame('workflow', $draft['hero']['secondaryObject']['type']);
        $this->assertSame('meta-one-2', $draft['hero']['metaItems'][1]['id']);
        $this->assertSame('selected', $draft['sections']['systems']['presentation']['selectionMode']);
        $this->assertSame(12, $draft['sections']['systems']['presentation']['displayLimit']);
        $this->assertFalse($draft['sections']['systems']['presentation']['showResult']);
        $this->assertSame('Custom item', $draft['sections']['disciplines']['groups'][0]['items'][0]['text']['en']);
        $this->assertSame('Contact name', $draft['sections']['intake']['fields']['name']['label']['en']);
        $this->assertFalse($draft['sections']['intake']['fields']['name']['required']);
        $this->assertSame('Received', $draft['sections']['intake']['success']['title']['en']);
    }

    public function test_publishing_and_restoring_preserves_full_v2_configuration(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->patch(route('site-studio.save-draft'), ['config' => [
            'version' => 2,
            'global' => ['contact' => ['email' => 'revision@example.test']],
            'sections' => [
                'transformation' => ['rows' => [['id' => 'revision-row', 'before' => ['en' => 'Old'], 'after' => ['en' => 'New']]]],
                'intake' => ['success' => ['title' => ['en' => 'Revision success']]],
            ],
        ]])->assertRedirect();
        $this->actingAs($user)->post(route('site-studio.publish'))->assertRedirect();

        $revision = SiteConfigurationRevision::firstOrFail();
        $this->assertSame('revision@example.test', $revision->config['global']['contact']['email']);
        $this->assertSame('revision-row', $revision->config['sections']['transformation']['rows'][0]['id']);
        $this->assertSame('Revision success', $revision->config['sections']['intake']['success']['title']['en']);

        $this->actingAs($user)->post(route('site-studio.restore-revision', $revision->id))->assertRedirect();
        $draft = SiteConfiguration::primary()->fresh()->draft_config;
        $this->assertSame($revision->config, $draft);
    }
}

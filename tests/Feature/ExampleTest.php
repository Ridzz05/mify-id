<?php

namespace Tests\Feature;

use App\Models\Brief;
use App\Models\SiteConfiguration;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_a_structured_operational_brief_is_stored_without_synthetic_metadata(): void
    {
        $response = $this->from('/')->post(route('briefs.store'), [
            'name' => 'Ari Wijaya',
            'email' => 'ari@northstar.example',
            'company' => 'Northstar Operations',
            'current_workflow' => 'Requests arrive through several WhatsApp groups.',
            'operational_constraint' => 'The team cannot see ownership or next action.',
            'desired_change' => 'One workflow with visible status and assigned owners.',
            'budget' => 'IDR 150–300M',
            'timeline' => 'Discovery this month',
        ]);

        $response->assertRedirect('/');

        $brief = Brief::firstOrFail();

        $this->assertSame('Northstar Operations', $brief->company);
        $this->assertSame('IDR 150–300M', $brief->budget);
        $this->assertSame('Discovery this month', $brief->timeline);
        $this->assertSame([], $brief->tech_stack);
        $this->assertSame(
            "Current workflow: Requests arrive through several WhatsApp groups.\n\nOperational constraint: The team cannot see ownership or next action.\n\nDesired change: One workflow with visible status and assigned owners.\n\nTimeline: Discovery this month",
            $brief->message,
        );
    }

    public function test_legacy_message_only_briefs_remain_supported(): void
    {
        $response = $this->from('/')->post(route('briefs.store'), [
            'name' => 'Maya Putri',
            'email' => 'maya@gmail.com',
            'message' => 'We need a Laravel and React dashboard for order tracking.',
        ]);

        $response->assertRedirect('/');

        $brief = Brief::firstOrFail();

        $this->assertSame('Freelance / Personal', $brief->company);
        $this->assertNull($brief->budget);
        $this->assertSame('We need a Laravel and React dashboard for order tracking.', $brief->message);
        $this->assertSame(['Laravel', 'React'], $brief->tech_stack);
    }

    public function test_published_intake_required_flags_drive_submission_validation(): void
    {
        $configuration = SiteConfiguration::primary();
        $published = $configuration->published_config;
        foreach (['company', 'current_workflow', 'operational_constraint', 'desired_change', 'budget', 'timeline'] as $key) {
            $published['sections']['intake']['fields'][$key]['required'] = false;
        }
        $configuration->update(['published_config' => $published]);

        $response = $this->from('/')->post(route('briefs.store'), [
            'name' => 'Optional Intake',
            'email' => 'optional@example.test',
        ]);

        $response->assertRedirect('/');
        $this->assertDatabaseHas('briefs', ['email' => 'optional@example.test']);
    }
}

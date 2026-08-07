<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed truthful internal-system drafts. They stay unpublished until an
     * approved evidence image or diagram is attached by an operator.
     */
    public function run(): void
    {
        $systems = [
            [
                'system_code' => 'SYS-001',
                'title' => 'Systemify Operations Workspace',
                'slug' => 'systemify-operations-workspace',
                'category' => 'Internal System',
                'description' => 'A working view for project decisions, client intake, pipeline health, and operational activity.',
                'problem' => 'Project state, client intake, and health signals were split across separate views.',
                'solution' => 'One authenticated workspace that groups the next decision, project pipeline, intake queue, health, and activity.',
                'result' => 'Operators can see what changed, decide what happens next, and verify the state of active work from one place.',
                'image_path' => null,
                'image_alt' => null,
                'project_url' => null,
                'tech_stack' => ['Laravel', 'React', 'Inertia', 'Tailwind'],
                'is_featured' => false,
                'order' => 1,
            ],
            [
                'system_code' => 'SYS-002',
                'title' => 'Systemify Client Intake Workflow',
                'slug' => 'systemify-client-intake-workflow',
                'category' => 'Workflow System',
                'description' => 'A structured path from an initial system brief to discovery notes, review status, and project conversion.',
                'problem' => 'Incoming requests needed a shared place for review, context, priority, and next action.',
                'solution' => 'A client intake inbox with status movement, notes, priority, blueprint generation, and pipeline conversion seams.',
                'result' => 'Every request has a visible state and an operator-facing next action instead of disappearing into a message thread.',
                'image_path' => null,
                'image_alt' => null,
                'project_url' => null,
                'tech_stack' => ['Laravel', 'React', 'Inertia', 'SQLite'],
                'is_featured' => false,
                'order' => 2,
            ],
        ];

        foreach ($systems as $data) {
            Portfolio::updateOrCreate(['system_code' => $data['system_code']], $data);
        }
    }
}

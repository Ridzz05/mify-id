<?php

namespace App\Support;

final class LandingConfiguration
{
    public static function defaults(): array
    {
        $localized = static fn (string $en, ?string $id = null): array => ['en' => $en, 'id' => $id ?? $en];
        $item = static fn (string $id, string $en, ?string $idText = null): array => ['id' => $id, 'text' => $localized($en, $idText)];
        $section = static fn (array $content): array => ['visible' => true, 'content' => $content];

        return [
            'version' => 2,
            'global' => [
                'brand' => ['name' => 'Systemify', 'mark' => 'S/', 'homeLabel' => $localized('Systemify home', 'Beranda Systemify')],
                'meta' => [
                    'title' => $localized('Digital Systems Studio'),
                    'description' => $localized(
                        'Systemify builds the systems behind how businesses operate: digital products, workflow automation, and the infrastructure that keeps them useful.',
                        'Systemify membangun sistem di balik operasional bisnis: produk digital, otomasi workflow, dan infrastruktur yang membuatnya tetap berguna.',
                    ),
                ],
                'navigation' => [
                    'capabilities' => $localized('Capabilities', 'Kapabilitas'),
                    'systems' => $localized('Selected systems', 'Sistem pilihan'),
                    'process' => $localized('Process', 'Proses'),
                    'intake' => $localized('Start a brief', 'Mulai brief'),
                    'workspace' => $localized('Workspace'),
                    'primaryCta' => $localized('Start a brief', 'Mulai brief'),
                    'languageSwitch' => $localized('Bahasa Indonesia', 'English'),
                ],
                'footer' => [
                    'description' => $localized('We build the systems behind how businesses operate.', 'Kami membangun sistem di balik operasional bisnis.'),
                    'navigateLabel' => $localized('Navigate', 'Navigasi'),
                    'contactLabel' => $localized('Contact', 'Kontak'),
                    'startBrief' => $localized('Start a system brief', 'Mulai system brief'),
                ],
                'contact' => ['email' => 'hello@systemify.id'],
            ],
            'hero' => [
                'content' => [
                    'en' => ['eyebrow' => 'Digital systems studio', 'headline' => 'We build the systems behind how businesses operate.', 'description' => 'Systemify designs, builds, and operates business software around the workflows that keep a company moving.', 'primaryCta' => 'Start a project', 'primaryTarget' => '#intake', 'secondaryCta' => 'View selected systems', 'secondaryTarget' => '#systems'],
                    'id' => ['eyebrow' => 'Studio sistem digital', 'headline' => 'Kami membangun sistem di balik operasional bisnis.', 'description' => 'Systemify merancang, membangun, dan mengoperasikan software bisnis berdasarkan alur kerja yang membuat perusahaan terus berjalan.', 'primaryCta' => 'Mulai proyek', 'primaryTarget' => '#intake', 'secondaryCta' => 'Lihat sistem pilihan', 'secondaryTarget' => '#systems'],
                ],
                'layout' => ['alignment' => 'left', 'verticalAlignment' => 'center', 'contentWidth' => 'wide', 'height' => 'auto', 'secondaryObjectPosition' => 'right', 'visibility' => ['desktop' => true, 'tablet' => true, 'mobile' => true]],
                'highlight' => ['text' => 'how businesses operate', 'textId' => 'operasional bisnis', 'style' => 'marker', 'width' => 'compact', 'shape' => 'soft'],
                'secondaryObject' => ['type' => 'system-status', 'position' => 'right', 'desktop' => true, 'tablet' => true, 'mobile' => true],
                'metaItems' => [
                    $item('hero-meta-business-software', 'BUSINESS SOFTWARE', 'SOFTWARE BISNIS'),
                    $item('hero-meta-internal-systems', 'INTERNAL SYSTEMS', 'SISTEM INTERNAL'),
                    $item('hero-meta-workflow-automation', 'WORKFLOW AUTOMATION', 'OTOMASI WORKFLOW'),
                    $item('hero-meta-continuous-operations', 'CONTINUOUS OPERATIONS', 'OPERASIONAL BERKELANJUTAN'),
                ],
                'operatingModel' => [
                    'content' => [
                        'en' => ['eyebrow' => 'SYSTEMIFY / OPERATING MODEL', 'description' => 'The work behind a useful business system.', 'statusLabel' => 'live', 'outcomeStatement' => 'A working system is easier to trust than a promise.', 'footerLabel' => 'OUTCOME FIRST / ARCHITECTURE SECOND'],
                        'id' => ['eyebrow' => 'SYSTEMIFY / OPERATING MODEL', 'description' => 'Pekerjaan di balik sistem bisnis yang berguna.', 'statusLabel' => 'live', 'outcomeStatement' => 'Sistem yang berjalan lebih mudah dipercaya daripada janji.', 'footerLabel' => 'HASIL DAHULU / ARSITEKTUR KEMUDIAN'],
                    ],
                    'status' => 'operational',
                    'rows' => [
                        ['id' => 'hero-operating-build', 'label' => $localized('Build'), 'value' => $localized('Product + interface', 'Produk + interface'), 'status' => 'operational'],
                        ['id' => 'hero-operating-automate', 'label' => $localized('Automate', 'Otomasi'), 'value' => $localized('Rules + integrations', 'Rules + integrasi'), 'status' => 'operational'],
                        ['id' => 'hero-operating-operate', 'label' => $localized('Operate', 'Operasikan'), 'value' => $localized('Monitor + iterate', 'Pantau + iterasi'), 'status' => 'operational'],
                    ],
                ],
                'workflow' => [
                    'content' => ['en' => ['eyebrow' => 'SYSTEMIFY / WORKFLOW', 'description' => 'From a manual constraint to a working system.', 'statusLabel' => 'workflow', 'footerLabel' => 'INPUT / SYSTEM / OUTPUT'], 'id' => ['eyebrow' => 'SYSTEMIFY / WORKFLOW', 'description' => 'Dari kendala manual menjadi sistem yang berjalan.', 'statusLabel' => 'workflow', 'footerLabel' => 'INPUT / SYSTEM / OUTPUT']],
                    'rows' => [['id' => 'hero-workflow-input', 'label' => $localized('Input', 'Masukan'), 'value' => $localized('Manual workflow', 'Workflow manual'), 'status' => 'attention'], ['id' => 'hero-workflow-system', 'label' => $localized('System', 'Sistem'), 'value' => $localized('Custom operational software', 'Software operasional kustom'), 'status' => 'operational'], ['id' => 'hero-workflow-output', 'label' => $localized('Output', 'Keluaran'), 'value' => $localized('Structured operations', 'Operasional terstruktur'), 'status' => 'operational']],
                ],
                'activeProject' => [
                    'content' => ['en' => ['eyebrow' => 'SYSTEMIFY / ACTIVE PROJECT', 'description' => 'A current system in operation.', 'statusLabel' => 'live', 'footerLabel' => 'OUTCOME FIRST / ARCHITECTURE SECOND'], 'id' => ['eyebrow' => 'SYSTEMIFY / ACTIVE PROJECT', 'description' => 'Sistem yang sedang beroperasi.', 'statusLabel' => 'live', 'footerLabel' => 'HASIL DAHULU / ARSITEKTUR KEMUDIAN']],
                    'rows' => [['id' => 'hero-project-system', 'label' => $localized('System', 'Sistem'), 'value' => $localized('Selected system', 'Sistem pilihan'), 'status' => 'operational'], ['id' => 'hero-project-stage', 'label' => $localized('Stage', 'Tahap'), 'value' => $localized('Operating', 'Beroperasi'), 'status' => 'operational'], ['id' => 'hero-project-focus', 'label' => $localized('Focus', 'Fokus'), 'value' => $localized('Workflow clarity', 'Kejelasan workflow'), 'status' => 'attention']],
                ],
                'motion' => ['preset' => 'editorial-reveal', 'intensity' => 'subtle', 'scrollBehavior' => 'once', 'duration' => 'standard', 'delay' => 'none'],
            ],
            'cards' => ['shape' => 'half-rounded'],
            'sections' => [
                'disciplines' => [
                    'visible' => true,
                    'content' => ['en' => ['eyebrow' => '02 / Capabilities', 'title' => 'Three disciplines. One operating view.', 'intro' => 'The work is grouped by the job it does for your team — creating a system, removing repeated work, and keeping the result useful after launch.'], 'id' => ['eyebrow' => '02 / Kapabilitas', 'title' => 'Tiga disiplin. Satu pandangan operasional.', 'intro' => 'Pekerjaan kami dikelompokkan berdasarkan fungsi untuk tim Anda — membuat sistem, menghilangkan pekerjaan berulang, dan menjaga hasilnya tetap berguna setelah diluncurkan.']],
                    'groups' => [
                        ['id' => 'discipline-build', 'label' => $localized('BUILD'), 'description' => $localized('Create digital products and operational interfaces.', 'Membuat produk digital dan interface operasional.'), 'icon' => 'globe', 'items' => [$item('build-websites', 'Websites', 'Website'), $item('build-web-applications', 'Web applications', 'Aplikasi web'), $item('build-internal-systems', 'Internal systems', 'Sistem internal'), $item('build-crm', 'CRM'), $item('build-pos', 'POS'), $item('build-dashboards', 'Dashboards', 'Dashboard')]],
                        ['id' => 'discipline-automate', 'label' => $localized('AUTOMATE', 'OTOMASI'), 'description' => $localized('Remove repetitive operational work.', 'Mengurangi pekerjaan operasional yang berulang.'), 'icon' => 'lightning', 'items' => [$item('automate-ai-workflows', 'AI-assisted workflows', 'Workflow berbantuan AI'), $item('automate-whatsapp', 'WhatsApp automation', 'Otomasi WhatsApp'), $item('automate-integrations', 'API integrations', 'Integrasi API'), $item('automate-notifications', 'Notifications', 'Notifikasi'), $item('automate-sync', 'Data synchronization', 'Sinkronisasi data')]],
                        ['id' => 'discipline-operate', 'label' => $localized('OPERATE', 'OPERASIKAN'), 'description' => $localized('Keep production systems useful after deployment.', 'Menjaga sistem production tetap berguna setelah deployment.'), 'icon' => 'wrench', 'items' => [$item('operate-maintenance', 'Maintenance'), $item('operate-infrastructure', 'Infrastructure', 'Infrastruktur'), $item('operate-monitoring', 'Monitoring'), $item('operate-optimization', 'Optimization', 'Optimasi'), $item('operate-improvement', 'Continuous improvement', 'Perbaikan berkelanjutan')]],
                    ],
                ],
                'systems' => [
                    'visible' => true,
                    'content' => ['en' => ['eyebrow' => '03 / Selected systems', 'title' => 'Evidence, not a gallery.', 'intro' => 'Every project should show the problem it addressed, the system that replaced it, and the result the team can now see.'], 'id' => ['eyebrow' => '03 / Sistem pilihan', 'title' => 'Bukti, bukan galeri.', 'intro' => 'Setiap proyek perlu menunjukkan masalah yang ditangani, sistem yang menggantikannya, dan hasil yang kini dapat dilihat tim.']],
                    'presentation' => ['displayLimit' => 3, 'layout' => 'evidence', 'selectionMode' => 'featured', 'selectedIds' => [], 'showImage' => true, 'showCategory' => true, 'showDescription' => true, 'showProblem' => true, 'showSolution' => true, 'showResult' => true, 'showStack' => true, 'showProjectLink' => true, 'emptyState' => $localized('Featured systems will appear here as they are published.', 'Sistem pilihan akan tampil di sini saat sudah dipublikasikan.'), 'missingImage' => $localized('Interface evidence pending approval.', 'Bukti interface menunggu persetujuan.'), 'missingValue' => $localized('Not documented', 'Belum didokumentasikan'), 'fieldLabels' => ['category' => $localized('System', 'Sistem'), 'description' => $localized('Description', 'Deskripsi'), 'problem' => $localized('Problem', 'Masalah'), 'solution' => $localized('Solution', 'Solusi'), 'result' => $localized('Result', 'Hasil'), 'stack' => $localized('Stack'), 'openProject' => $localized('Open {title}', 'Buka {title}')]],
                ],
                'transformation' => ['visible' => true, 'content' => ['en' => ['eyebrow' => '04 / Before → after', 'title' => 'Make the operating change visible.', 'intro' => ''], 'id' => ['eyebrow' => '04 / Sebelum → sesudah', 'title' => 'Buat perubahan operasional terlihat.', 'intro' => '']], 'rows' => [['id' => 'transformation-manual-follow-up', 'before' => $localized('Manual follow-up', 'Follow-up manual'), 'after' => $localized('Automated workflow', 'Workflow otomatis')], ['id' => 'transformation-spreadsheet', 'before' => $localized('Spreadsheet tracking', 'Tracking spreadsheet'), 'after' => $localized('Operational database', 'Database operasional')], ['id' => 'transformation-scattered-messages', 'before' => $localized('Scattered messages', 'Pesan tersebar'), 'after' => $localized('Unified workflow', 'Workflow terpadu')], ['id' => 'transformation-unknown-status', 'before' => $localized('Unknown project status', 'Status proyek tidak terlihat'), 'after' => $localized('Visible pipeline', 'Pipeline yang terlihat')], ['id' => 'transformation-repeated-admin', 'before' => $localized('Repeated admin work', 'Admin berulang'), 'after' => $localized('System rules', 'Aturan sistem')]]],
                'process' => ['visible' => true, 'content' => ['en' => ['eyebrow' => '05 / Process', 'title' => 'A technical timeline with a business starting point.', 'intro' => ''], 'id' => ['eyebrow' => '05 / Proses', 'title' => 'Linimasa teknis dengan titik awal dari bisnis.', 'intro' => '']], 'steps' => [['id' => 'process-understand', 'number' => '01', 'label' => $localized('Understand', 'Pahami'), 'description' => $localized('Map the workflow, the people inside it, and the decisions currently hidden in manual work.', 'Petakan alur kerja, orang yang terlibat, dan keputusan yang masih tersembunyi di pekerjaan manual.')], ['id' => 'process-architect', 'number' => '02', 'label' => $localized('Architect', 'Arsitektur'), 'description' => $localized('Choose the smallest reliable system shape, data model, and integration boundary that solves the real constraint.', 'Pilih bentuk sistem, model data, dan batas integrasi paling kecil yang menyelesaikan kendala nyata.')], ['id' => 'process-build', 'number' => '03', 'label' => $localized('Build', 'Bangun'), 'description' => $localized('Turn the model into an interface the team can use, test, and hand over without a translation layer.', 'Ubah model menjadi interface yang bisa digunakan, diuji, dan diserahkan tanpa lapisan terjemahan.')], ['id' => 'process-operate', 'number' => '04', 'label' => $localized('Operate', 'Operasikan'), 'description' => $localized('Monitor what happens in production, then keep improving the workflow as the business changes.', 'Pantau apa yang terjadi di production, lalu terus perbaiki workflow saat bisnis berubah.')]]],
                'principles' => ['visible' => true, 'content' => ['en' => ['eyebrow' => '06 / Principles', 'title' => 'What we refuse to hide behind.', 'intro' => ''], 'id' => ['eyebrow' => '06 / Prinsip', 'title' => 'Hal yang tidak kami tutupi.', 'intro' => '']], 'items' => [$item('principle-no-templates', "We don't sell templates as custom systems.", 'Kami tidak menjual template sebagai sistem custom.'), $item('principle-no-ai-by-default', "We don't add AI where a normal rule works better.", 'Kami tidak menambahkan AI ketika aturan biasa sudah lebih tepat.'), $item('principle-workflow-first', "We don't choose technology before understanding the workflow.", 'Kami tidak memilih teknologi sebelum memahami alur kerja.'), $item('principle-operate-after-launch', "We don't disappear after deployment.", 'Kami tidak menghilang setelah deployment.')]],
                'intake' => [
                    'visible' => true,
                    'content' => ['en' => ['eyebrow' => '07 / Project intake', 'title' => 'Start with the workflow, not the wish list.', 'intro' => 'Tell us what is slowing the team down. We will come back with the questions, constraints, and first system shape worth discussing.'], 'id' => ['eyebrow' => '07 / Project intake', 'title' => 'Mulai dari alur kerja, bukan daftar keinginan.', 'intro' => 'Ceritakan apa yang memperlambat tim. Kami akan kembali dengan pertanyaan, batasan, dan bentuk sistem pertama yang layak dibicarakan.']],
                    'presentation' => ['note' => $localized('No sales deck required / just the constraint', 'Tidak perlu sales deck / cukup jelaskan kendalanya'), 'submit' => $localized('Send system brief', 'Kirim system brief'), 'sending' => $localized('Sending brief…', 'Mengirim brief…'), 'previewOnly' => $localized('Preview only', 'Pratinjau saja')],
                    'fields' => [
                        'name' => ['label' => $localized('Your name', 'Nama Anda'), 'placeholder' => $localized('Name', 'Nama'), 'required' => true],
                        'email' => ['label' => $localized('Work email', 'Email kerja'), 'placeholder' => $localized('you@company.com', 'anda@perusahaan.com'), 'required' => true],
                        'company' => ['label' => $localized('Company / team', 'Perusahaan / tim'), 'placeholder' => $localized('Company or operating team', 'Nama perusahaan atau tim operasional'), 'required' => false],
                        'current_workflow' => ['label' => $localized('What is happening today?', 'Apa yang terjadi hari ini?'), 'placeholder' => $localized('Describe the workflow as it exists now — people, tools, handoffs, or manual steps.', 'Jelaskan workflow saat ini — orang, tools, handoff, atau langkah manual yang terlibat.'), 'required' => true],
                        'operational_constraint' => ['label' => $localized('Where does it break?', 'Di mana prosesnya terhambat?'), 'placeholder' => $localized('What gets delayed, duplicated, lost, or difficult to see?', 'Apa yang terlambat, terduplikasi, hilang, atau sulit dilihat?'), 'required' => true],
                        'desired_change' => ['label' => $localized('What should be different?', 'Apa yang perlu berbeda?'), 'placeholder' => $localized('Describe the operating change that would make the team more effective.', 'Jelaskan perubahan operasional yang akan membuat tim lebih efektif.'), 'required' => true],
                        'budget' => ['label' => $localized('Budget range (optional)', 'Kisaran anggaran (opsional)'), 'placeholder' => $localized('For example: IDR 150–300M', 'Contoh: IDR 150–300 juta'), 'required' => false],
                        'timeline' => ['label' => $localized('Timeline (optional)', 'Timeline (opsional)'), 'placeholder' => $localized('For example: discovery this month', 'Contoh: discovery bulan ini'), 'required' => false],
                    ],
                    'success' => ['title' => $localized('Brief received.', 'Brief diterima.'), 'description' => $localized('We will review the workflow and get back to you with a useful next conversation.', 'Kami akan meninjau alur kerjanya dan kembali dengan percakapan berikutnya yang berguna.'), 'sendAnother' => $localized('Send another brief', 'Kirim brief lain')],
                ],
            ],
        ];
    }

    public static function normalize(?array $input): array
    {
        $defaults = self::defaults();
        $source = is_array($input) ? $input : [];
        $global = self::object($source['global'] ?? null);

        $defaults['global']['brand']['name'] = self::text(self::object($global['brand'] ?? null)['name'] ?? null, $defaults['global']['brand']['name'], 80);
        $defaults['global']['brand']['mark'] = self::text(self::object($global['brand'] ?? null)['mark'] ?? null, $defaults['global']['brand']['mark'], 12);
        $defaults['global']['brand']['homeLabel'] = self::localized(self::object($global['brand'] ?? null)['homeLabel'] ?? null, $defaults['global']['brand']['homeLabel'], 80);
        $defaults['global']['meta']['title'] = self::localized(self::object($global['meta'] ?? null)['title'] ?? null, $defaults['global']['meta']['title'], 160);
        $defaults['global']['meta']['description'] = self::localized(self::object($global['meta'] ?? null)['description'] ?? null, $defaults['global']['meta']['description'], 1000);
        foreach (array_keys($defaults['global']['navigation']) as $key) $defaults['global']['navigation'][$key] = self::localized(self::object($global['navigation'] ?? null)[$key] ?? null, $defaults['global']['navigation'][$key], 100);
        foreach (array_keys($defaults['global']['footer']) as $key) $defaults['global']['footer'][$key] = self::localized(self::object($global['footer'] ?? null)[$key] ?? null, $defaults['global']['footer'][$key], 255);
        $defaults['global']['contact']['email'] = self::text(self::object($global['contact'] ?? null)['email'] ?? null, $defaults['global']['contact']['email'], 160);

        $hero = self::object($source['hero'] ?? null);
        foreach (['en', 'id'] as $locale) {
            $localeSource = self::object(self::object($hero['content'] ?? null)[$locale] ?? null);
            foreach (['eyebrow' => 255, 'headline' => 500, 'description' => 1000, 'primaryCta' => 120, 'secondaryCta' => 120] as $key => $limit) $defaults['hero']['content'][$locale][$key] = self::text($localeSource[$key] ?? null, $defaults['hero']['content'][$locale][$key], $limit);
            $defaults['hero']['content'][$locale]['primaryTarget'] = self::target($localeSource['primaryTarget'] ?? null, $defaults['hero']['content'][$locale]['primaryTarget']);
            $defaults['hero']['content'][$locale]['secondaryTarget'] = self::target($localeSource['secondaryTarget'] ?? null, $defaults['hero']['content'][$locale]['secondaryTarget']);
        }

        $layout = self::object($hero['layout'] ?? null);
        $secondary = self::object($hero['secondaryObject'] ?? null);
        $visibility = self::object($layout['visibility'] ?? null);
        $responsive = static fn (string $device): mixed => array_key_exists($device, $secondary) ? $secondary[$device] : ($visibility[$device] ?? null);
        $legacyPosition = ($secondary['position'] ?? null) === 'top' ? 'center' : ($secondary['position'] ?? null);
        $position = self::enum($layout['secondaryObjectPosition'] ?? $legacyPosition, ['left', 'center', 'right'], 'right');
        $defaults['hero']['layout'] = ['alignment' => self::enum($layout['alignment'] ?? null, ['left', 'center', 'right'], 'left'), 'verticalAlignment' => self::enum($layout['verticalAlignment'] ?? null, ['start', 'center', 'end'], 'center'), 'contentWidth' => self::enum($layout['contentWidth'] ?? null, ['compact', 'wide', 'full'], 'wide'), 'height' => self::enum($layout['height'] ?? null, ['auto', 'tall', 'full'], 'auto'), 'secondaryObjectPosition' => $position, 'visibility' => ['desktop' => self::bool($responsive('desktop'), true), 'tablet' => self::bool($responsive('tablet'), true), 'mobile' => self::bool($responsive('mobile'), true)]];
        $highlight = self::object($hero['highlight'] ?? null);
        $defaults['hero']['highlight'] = ['text' => self::text($highlight['text'] ?? null, 'how businesses operate', 120), 'textId' => self::text($highlight['textId'] ?? null, 'operasional bisnis', 120), 'style' => self::enum($highlight['style'] ?? null, ['none', 'marker', 'underline', 'offset-block', 'signal-line'], 'marker'), 'width' => self::enum($highlight['width'] ?? null, ['compact', 'balanced', 'wide'], 'compact'), 'shape' => self::enum($highlight['shape'] ?? null, ['sharp', 'soft', 'half-rounded', 'full-rounded'], 'soft')];
        $defaults['hero']['secondaryObject'] = ['type' => self::enum($secondary['type'] ?? null, ['none', 'system-status', 'operating-model', 'workflow', 'active-project'], 'system-status'), 'position' => $position === 'center' ? 'top' : $position, 'desktop' => $defaults['hero']['layout']['visibility']['desktop'], 'tablet' => $defaults['hero']['layout']['visibility']['tablet'], 'mobile' => $defaults['hero']['layout']['visibility']['mobile']];
        $motion = self::object($hero['motion'] ?? null);
        $defaults['hero']['motion'] = ['preset' => self::enum($motion['preset'] ?? null, ['none', 'editorial-reveal', 'signal-wipe', 'system-stagger', 'evidence-reveal', 'process-progress'], 'editorial-reveal'), 'intensity' => self::enum($motion['intensity'] ?? null, ['subtle', 'standard', 'expressive'], 'subtle'), 'scrollBehavior' => self::enum($motion['scrollBehavior'] ?? null, ['none', 'once', 'scrub'], 'once'), 'duration' => self::enum($motion['duration'] ?? null, ['quick', 'standard', 'long'], 'standard'), 'delay' => self::enum($motion['delay'] ?? null, ['none', 'short', 'staggered'], 'none')];

        $metaSource = self::arrayValue($hero, 'metaItems', $defaults['hero']['metaItems']);
        $defaults['hero']['metaItems'] = self::items($metaSource, $defaults['hero']['metaItems'], 'hero-meta', 8, static fn (array $item, array $fallback, string $id): array => ['id' => $id, 'text' => self::localized($item['text'] ?? null, $fallback['text'], 100)]);
        foreach (['operatingModel', 'workflow', 'activeProject'] as $panelKey) {
            $panelSource = self::object($hero[$panelKey] ?? null);
            $panelDefault = $defaults['hero'][$panelKey];
            $defaults['hero'][$panelKey]['content'] = self::localizedObject($panelSource['content'] ?? null, $panelDefault['content'], ['eyebrow' => 160, 'description' => 500, 'statusLabel' => 80, 'outcomeStatement' => 500, 'footerLabel' => 160]);
            $defaults['hero'][$panelKey]['status'] = self::enum($panelSource['status'] ?? ($panelDefault['status'] ?? 'operational'), ['operational', 'attention', 'offline'], $panelDefault['status'] ?? 'operational');
            $defaults['hero'][$panelKey]['rows'] = self::items(self::arrayValue($panelSource, 'rows', $panelDefault['rows'] ?? []), $panelDefault['rows'] ?? [], 'hero-' . $panelKey, 8, static fn (array $item, array $fallback, string $id): array => ['id' => $id, 'label' => self::localized($item['label'] ?? null, $fallback['label'] ?? ['en' => '', 'id' => ''], 100), 'value' => self::localized($item['value'] ?? null, $fallback['value'] ?? ['en' => '', 'id' => ''], 180), 'status' => self::enum($item['status'] ?? null, ['operational', 'attention', 'offline'], $fallback['status'] ?? 'operational')]);
        }

        $cards = self::object($source['cards'] ?? null);
        $defaults['cards']['shape'] = self::enum($cards['shape'] ?? null, ['sharp', 'soft', 'half-rounded', 'full-rounded'], 'half-rounded');
        $sections = self::object($source['sections'] ?? null);
        foreach ($defaults['sections'] as $sectionId => $defaultSection) {
            $section = self::object($sections[$sectionId] ?? null);
            $defaults['sections'][$sectionId]['visible'] = self::bool($section['visible'] ?? null, true);
            $defaults['sections'][$sectionId]['content'] = self::localizedObject($section['content'] ?? null, $defaultSection['content'], ['eyebrow' => 255, 'title' => 500, 'intro' => 1000]);
            if ($sectionId === 'disciplines') {
                $defaults['sections'][$sectionId]['groups'] = self::items(self::arrayValue($section, 'groups', $defaultSection['groups']), $defaultSection['groups'], 'discipline', 3, static function (array $item, array $fallback, string $id): array {
                    $items = self::items(self::arrayValue($item, 'items', $fallback['items'] ?? []), $fallback['items'] ?? [], $id . '-item', 12, static fn (array $child, array $childFallback, string $childId): array => ['id' => $childId, 'text' => self::localized($child['text'] ?? null, $childFallback['text'] ?? ['en' => '', 'id' => ''], 120)]);
                    return ['id' => $id, 'label' => self::localized($item['label'] ?? null, $fallback['label'], 80), 'description' => self::localized($item['description'] ?? null, $fallback['description'], 300), 'icon' => self::enum($item['icon'] ?? null, ['globe', 'lightning', 'wrench'], $fallback['icon']), 'items' => $items];
                });
            }
            if ($sectionId === 'systems') {
                $presentation = self::object($section['presentation'] ?? null);
                $fallback = $defaultSection['presentation'];
                $labels = [];
                foreach ($fallback['fieldLabels'] as $key => $label) $labels[$key] = self::localized(self::object($presentation['fieldLabels'] ?? null)[$key] ?? null, $label, 100);
                $limit = is_int($presentation['displayLimit'] ?? null) ? max(1, min(12, $presentation['displayLimit'])) : $fallback['displayLimit'];
                $ids = array_key_exists('selectedIds', $presentation) && is_array($presentation['selectedIds']) ? array_values(array_filter(array_slice($presentation['selectedIds'], 0, 24), static fn ($id): bool => is_int($id) || (is_string($id) && strlen($id) < 80))) : $fallback['selectedIds'];
                $defaults['sections'][$sectionId]['presentation'] = ['displayLimit' => $limit, 'layout' => self::enum($presentation['layout'] ?? null, ['evidence', 'compact', 'split'], $fallback['layout']), 'selectionMode' => self::enum($presentation['selectionMode'] ?? null, ['featured', 'selected'], $fallback['selectionMode']), 'selectedIds' => $ids, 'showImage' => self::bool($presentation['showImage'] ?? null, $fallback['showImage']), 'showCategory' => self::bool($presentation['showCategory'] ?? null, $fallback['showCategory']), 'showDescription' => self::bool($presentation['showDescription'] ?? null, $fallback['showDescription']), 'showProblem' => self::bool($presentation['showProblem'] ?? null, $fallback['showProblem']), 'showSolution' => self::bool($presentation['showSolution'] ?? null, $fallback['showSolution']), 'showResult' => self::bool($presentation['showResult'] ?? null, $fallback['showResult']), 'showStack' => self::bool($presentation['showStack'] ?? null, $fallback['showStack']), 'showProjectLink' => self::bool($presentation['showProjectLink'] ?? null, $fallback['showProjectLink']), 'emptyState' => self::localized($presentation['emptyState'] ?? null, $fallback['emptyState'], 255), 'missingImage' => self::localized($presentation['missingImage'] ?? null, $fallback['missingImage'], 255), 'missingValue' => self::localized($presentation['missingValue'] ?? null, $fallback['missingValue'], 160), 'fieldLabels' => $labels];
            }
            if ($sectionId === 'transformation') $defaults['sections'][$sectionId]['rows'] = self::items(self::arrayValue($section, 'rows', $defaultSection['rows']), $defaultSection['rows'], 'transformation', 12, static fn (array $item, array $fallback, string $id): array => ['id' => $id, 'before' => self::localized($item['before'] ?? null, $fallback['before'], 180), 'after' => self::localized($item['after'] ?? null, $fallback['after'], 180)]);
            if ($sectionId === 'process') $defaults['sections'][$sectionId]['steps'] = self::items(self::arrayValue($section, 'steps', $defaultSection['steps']), $defaultSection['steps'], 'process', 12, static fn (array $item, array $fallback, string $id): array => ['id' => $id, 'number' => self::text($item['number'] ?? null, $fallback['number'], 12), 'label' => self::localized($item['label'] ?? null, $fallback['label'], 120), 'description' => self::localized($item['description'] ?? null, $fallback['description'], 500)]);
            if ($sectionId === 'principles') $defaults['sections'][$sectionId]['items'] = self::items(self::arrayValue($section, 'items', $defaultSection['items']), $defaultSection['items'], 'principle', 12, static fn (array $item, array $fallback, string $id): array => ['id' => $id, 'text' => self::localized($item['text'] ?? null, $fallback['text'], 300)]);
            if ($sectionId === 'intake') {
                $presentation = self::object($section['presentation'] ?? null);
                foreach ($defaultSection['presentation'] as $key => $fallback) $defaults['sections'][$sectionId]['presentation'][$key] = self::localized($presentation[$key] ?? null, $fallback, 255);
                $fields = self::object($section['fields'] ?? null);
                foreach ($defaultSection['fields'] as $key => $fallback) {
                    $field = self::object($fields[$key] ?? null);
                    $defaults['sections'][$sectionId]['fields'][$key] = ['label' => self::localized($field['label'] ?? null, $fallback['label'], 180), 'placeholder' => self::localized($field['placeholder'] ?? null, $fallback['placeholder'], 500), 'required' => self::bool($field['required'] ?? null, $fallback['required'])];
                }
                $success = self::object($section['success'] ?? null);
                $defaults['sections'][$sectionId]['success'] = ['title' => self::localized($success['title'] ?? null, $defaultSection['success']['title'], 180), 'description' => self::localized($success['description'] ?? null, $defaultSection['success']['description'], 500), 'sendAnother' => self::localized($success['sendAnother'] ?? null, $defaultSection['success']['sendAnother'], 180)];
            }
        }

        return $defaults;
    }

    private static function object(mixed $value): array { return is_array($value) ? $value : []; }
    private static function arrayValue(array $source, string $key, array $fallback): array { return array_key_exists($key, $source) && is_array($source[$key]) ? $source[$key] : $fallback; }
    private static function enum(mixed $value, array $allowed, string $fallback): string { return is_string($value) && in_array($value, $allowed, true) ? $value : $fallback; }
    private static function target(mixed $value, string $fallback): string { return is_string($value) && in_array($value, ['#hero', '#capabilities', '#systems', '#transformation', '#method', '#principles', '#intake'], true) ? $value : $fallback; }
    private static function bool(mixed $value, bool $fallback): bool { return is_bool($value) ? $value : $fallback; }
    private static function text(mixed $value, string $fallback, int $limit): string
    {
        if (!is_string($value) || trim($value) === '') return $fallback;
        $clean = preg_replace('/<script\b[^>]*>.*?<\/script>|<style\b[^>]*>.*?<\/style>/is', '', $value) ?? $value;
        $clean = trim(strip_tags($clean));
        return function_exists('mb_substr') ? mb_substr($clean, 0, $limit) : substr($clean, 0, $limit);
    }
    private static function localized(mixed $value, array $fallback, int $limit): array
    {
        $source = self::object($value);
        return ['en' => self::text($source['en'] ?? null, $fallback['en'], $limit), 'id' => self::text($source['id'] ?? null, $fallback['id'], $limit)];
    }
    private static function localizedObject(mixed $value, array $fallback, array $keys): array
    {
        $source = self::object($value);
        $result = [];
        foreach (['en', 'id'] as $locale) {
            $localeSource = self::object($source[$locale] ?? null);
            $result[$locale] = [];
            foreach ($keys as $key => $limit) $result[$locale][$key] = self::text($localeSource[$key] ?? null, $fallback[$locale][$key] ?? '', $limit);
        }
        return $result;
    }
    private static function stableId(mixed $value, string $fallback, array &$used): string
    {
        $candidate = is_string($value) ? strtolower(trim(preg_replace('/[^a-z0-9_-]+/', '-', $value), '-')) : '';
        $candidate = substr($candidate, 0, 80) ?: $fallback;
        $id = $candidate;
        $index = 2;
        while (in_array($id, $used, true)) $id = $candidate . '-' . $index++;
        $used[] = $id;
        return $id;
    }
    private static function items(array $source, array $fallback, string $prefix, int $max, callable $mapper): array
    {
        $used = [];
        $result = [];
        foreach (array_slice($source, 0, $max) as $index => $item) {
            $item = self::object($item);
            $fallbackItem = $fallback[$index] ?? [];
            $result[] = $mapper($item, $fallbackItem, self::stableId($item['id'] ?? null, $prefix . '-' . ($index + 1), $used));
        }
        return $result;
    }
}

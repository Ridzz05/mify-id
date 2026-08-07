export const locales = ['en', 'id'];

export const landingSections = [
    { id: 'hero', label: 'Hero' },
    { id: 'disciplines', label: 'Disciplines' },
    { id: 'systems', label: 'Selected systems' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'process', label: 'Process' },
    { id: 'principles', label: 'Principles' },
    { id: 'intake', label: 'Project intake' },
];

export const globalStudioSections = [
    { id: 'global.navigation', label: 'Navigation' },
    { id: 'global.footer', label: 'Footer' },
    { id: 'global.contact', label: 'Contact' },
];

const localized = (en, id = en) => ({ en, id });
const localizedItem = (id, en, idText = en) => ({ id, text: localized(en, idText) });

export const defaultLandingConfig = {
    version: 2,
    global: {
        brand: {
            name: 'Systemify',
            mark: 'S/',
            homeLabel: localized('Systemify home', 'Beranda Systemify'),
        },
        meta: {
            title: localized('Digital Systems Studio'),
            description: localized(
                'Systemify builds the systems behind how businesses operate: digital products, workflow automation, and the infrastructure that keeps them useful.',
                'Systemify membangun sistem di balik operasional bisnis: produk digital, otomasi workflow, dan infrastruktur yang membuatnya tetap berguna.',
            ),
        },
        navigation: {
            capabilities: localized('Capabilities', 'Kapabilitas'),
            systems: localized('Selected systems', 'Sistem pilihan'),
            process: localized('Process', 'Proses'),
            intake: localized('Start a brief', 'Mulai brief'),
            workspace: localized('Workspace'),
            primaryCta: localized('Start a brief', 'Mulai brief'),
            languageSwitch: localized('Bahasa Indonesia', 'English'),
        },
        footer: {
            description: localized(
                'We build the systems behind how businesses operate.',
                'Kami membangun sistem di balik operasional bisnis.',
            ),
            navigateLabel: localized('Navigate', 'Navigasi'),
            contactLabel: localized('Contact', 'Kontak'),
            startBrief: localized('Start a system brief', 'Mulai system brief'),
        },
        contact: {
            email: 'hello@systemify.id',
        },
    },
    hero: {
        content: {
            en: {
                eyebrow: 'Digital systems studio',
                headline: 'We build the systems behind how businesses operate.',
                description: 'Systemify designs, builds, and operates business software around the workflows that keep a company moving.',
                primaryCta: 'Start a project',
                primaryTarget: '#intake',
                secondaryCta: 'View selected systems',
                secondaryTarget: '#systems',
            },
            id: {
                eyebrow: 'Studio sistem digital',
                headline: 'Kami membangun sistem di balik operasional bisnis.',
                description: 'Systemify merancang, membangun, dan mengoperasikan software bisnis berdasarkan alur kerja yang membuat perusahaan terus berjalan.',
                primaryCta: 'Mulai proyek',
                primaryTarget: '#intake',
                secondaryCta: 'Lihat sistem pilihan',
                secondaryTarget: '#systems',
            },
        },
        layout: {
            alignment: 'left',
            verticalAlignment: 'center',
            contentWidth: 'wide',
            height: 'auto',
            secondaryObjectPosition: 'right',
            visibility: { desktop: true, tablet: true, mobile: true },
        },
        highlight: {
            text: 'how businesses operate',
            textId: 'operasional bisnis',
            style: 'marker',
            width: 'compact',
            shape: 'soft',
        },
        secondaryObject: {
            type: 'system-status',
            position: 'right',
            desktop: true,
            tablet: true,
            mobile: true,
        },
        metaItems: [
            localizedItem('hero-meta-business-software', 'BUSINESS SOFTWARE', 'SOFTWARE BISNIS'),
            localizedItem('hero-meta-internal-systems', 'INTERNAL SYSTEMS', 'SISTEM INTERNAL'),
            localizedItem('hero-meta-workflow-automation', 'WORKFLOW AUTOMATION', 'OTOMASI WORKFLOW'),
            localizedItem('hero-meta-continuous-operations', 'CONTINUOUS OPERATIONS', 'OPERASIONAL BERKELANJUTAN'),
        ],
        operatingModel: {
            content: {
                en: {
                    eyebrow: 'SYSTEMIFY / OPERATING MODEL',
                    description: 'The work behind a useful business system.',
                    statusLabel: 'live',
                    outcomeStatement: 'A working system is easier to trust than a promise.',
                    footerLabel: 'OUTCOME FIRST / ARCHITECTURE SECOND',
                },
                id: {
                    eyebrow: 'SYSTEMIFY / OPERATING MODEL',
                    description: 'Pekerjaan di balik sistem bisnis yang berguna.',
                    statusLabel: 'live',
                    outcomeStatement: 'Sistem yang berjalan lebih mudah dipercaya daripada janji.',
                    footerLabel: 'HASIL DAHULU / ARSITEKTUR KEMUDIAN',
                },
            },
            status: 'operational',
            rows: [
                { id: 'hero-operating-build', label: localized('Build'), value: localized('Product + interface', 'Produk + interface'), status: 'operational' },
                { id: 'hero-operating-automate', label: localized('Automate', 'Otomasi'), value: localized('Rules + integrations', 'Rules + integrasi'), status: 'operational' },
                { id: 'hero-operating-operate', label: localized('Operate', 'Operasikan'), value: localized('Monitor + iterate', 'Pantau + iterasi'), status: 'operational' },
            ],
        },
        workflow: {
            content: {
                en: { eyebrow: 'SYSTEMIFY / WORKFLOW', description: 'From a manual constraint to a working system.', statusLabel: 'workflow', footerLabel: 'INPUT / SYSTEM / OUTPUT' },
                id: { eyebrow: 'SYSTEMIFY / WORKFLOW', description: 'Dari kendala manual menjadi sistem yang berjalan.', statusLabel: 'workflow', footerLabel: 'INPUT / SYSTEM / OUTPUT' },
            },
            rows: [
                { id: 'hero-workflow-input', label: localized('Input', 'Masukan'), value: localized('Manual workflow', 'Workflow manual'), status: 'attention' },
                { id: 'hero-workflow-system', label: localized('System', 'Sistem'), value: localized('Custom operational software', 'Software operasional kustom'), status: 'operational' },
                { id: 'hero-workflow-output', label: localized('Output', 'Keluaran'), value: localized('Structured operations', 'Operasional terstruktur'), status: 'operational' },
            ],
        },
        activeProject: {
            content: {
                en: { eyebrow: 'SYSTEMIFY / ACTIVE PROJECT', description: 'A current system in operation.', statusLabel: 'live', footerLabel: 'OUTCOME FIRST / ARCHITECTURE SECOND' },
                id: { eyebrow: 'SYSTEMIFY / ACTIVE PROJECT', description: 'Sistem yang sedang beroperasi.', statusLabel: 'live', footerLabel: 'HASIL DAHULU / ARSITEKTUR KEMUDIAN' },
            },
            rows: [
                { id: 'hero-project-system', label: localized('System', 'Sistem'), value: localized('Selected system', 'Sistem pilihan'), status: 'operational' },
                { id: 'hero-project-stage', label: localized('Stage', 'Tahap'), value: localized('Operating', 'Beroperasi'), status: 'operational' },
                { id: 'hero-project-focus', label: localized('Focus', 'Fokus'), value: localized('Workflow clarity', 'Kejelasan workflow'), status: 'attention' },
            ],
        },
        motion: {
            preset: 'editorial-reveal',
            intensity: 'subtle',
            scrollBehavior: 'once',
            duration: 'standard',
            delay: 'none',
        },
    },
    cards: {
        shape: 'half-rounded',
    },
    sections: {
        disciplines: {
            visible: true,
            content: {
                en: { eyebrow: '02 / Capabilities', title: 'Three disciplines. One operating view.', intro: 'The work is grouped by the job it does for your team — creating a system, removing repeated work, and keeping the result useful after launch.' },
                id: { eyebrow: '02 / Kapabilitas', title: 'Tiga disiplin. Satu pandangan operasional.', intro: 'Pekerjaan kami dikelompokkan berdasarkan fungsi untuk tim Anda — membuat sistem, menghilangkan pekerjaan berulang, dan menjaga hasilnya tetap berguna setelah diluncurkan.' },
            },
            groups: [
                { id: 'discipline-build', label: localized('BUILD'), description: localized('Create digital products and operational interfaces.', 'Membuat produk digital dan interface operasional.'), icon: 'globe', items: [localizedItem('build-websites', 'Websites', 'Website'), localizedItem('build-web-applications', 'Web applications', 'Aplikasi web'), localizedItem('build-internal-systems', 'Internal systems', 'Sistem internal'), localizedItem('build-crm', 'CRM'), localizedItem('build-pos', 'POS'), localizedItem('build-dashboards', 'Dashboards', 'Dashboard')] },
                { id: 'discipline-automate', label: localized('AUTOMATE', 'OTOMASI'), description: localized('Remove repetitive operational work.', 'Mengurangi pekerjaan operasional yang berulang.'), icon: 'lightning', items: [localizedItem('automate-ai-workflows', 'AI-assisted workflows', 'Workflow berbantuan AI'), localizedItem('automate-whatsapp', 'WhatsApp automation', 'Otomasi WhatsApp'), localizedItem('automate-integrations', 'API integrations', 'Integrasi API'), localizedItem('automate-notifications', 'Notifications', 'Notifikasi'), localizedItem('automate-sync', 'Data synchronization', 'Sinkronisasi data')] },
                { id: 'discipline-operate', label: localized('OPERATE', 'OPERASIKAN'), description: localized('Keep production systems useful after deployment.', 'Menjaga sistem production tetap berguna setelah deployment.'), icon: 'wrench', items: [localizedItem('operate-maintenance', 'Maintenance'), localizedItem('operate-infrastructure', 'Infrastructure', 'Infrastruktur'), localizedItem('operate-monitoring', 'Monitoring'), localizedItem('operate-optimization', 'Optimization', 'Optimasi'), localizedItem('operate-improvement', 'Continuous improvement', 'Perbaikan berkelanjutan')] },
            ],
        },
        systems: {
            visible: true,
            content: {
                en: { eyebrow: '03 / Selected systems', title: 'Evidence, not a gallery.', intro: 'Every project should show the problem it addressed, the system that replaced it, and the result the team can now see.' },
                id: { eyebrow: '03 / Sistem pilihan', title: 'Bukti, bukan galeri.', intro: 'Setiap proyek perlu menunjukkan masalah yang ditangani, sistem yang menggantikannya, dan hasil yang kini dapat dilihat tim.' },
            },
            presentation: {
                displayLimit: 3,
                layout: 'evidence',
                selectionMode: 'featured',
                selectedIds: [],
                showImage: true,
                showCategory: true,
                showDescription: true,
                showProblem: true,
                showSolution: true,
                showResult: true,
                showStack: true,
                showProjectLink: true,
                emptyState: localized('Featured systems will appear here as they are published.', 'Sistem pilihan akan tampil di sini saat sudah dipublikasikan.'),
                missingImage: localized('Interface evidence pending approval.', 'Bukti interface menunggu persetujuan.'),
                missingValue: localized('Not documented', 'Belum didokumentasikan'),
                fieldLabels: {
                    category: localized('System', 'Sistem'),
                    description: localized('Description', 'Deskripsi'),
                    problem: localized('Problem', 'Masalah'),
                    solution: localized('Solution', 'Solusi'),
                    result: localized('Result', 'Hasil'),
                    stack: localized('Stack'),
                    openProject: localized('Open {title}', 'Buka {title}'),
                },
            },
        },
        transformation: {
            visible: true,
            content: {
                en: { eyebrow: '04 / Before → after', title: 'Make the operating change visible.', intro: '' },
                id: { eyebrow: '04 / Sebelum → sesudah', title: 'Buat perubahan operasional terlihat.', intro: '' },
            },
            rows: [
                { id: 'transformation-manual-follow-up', before: localized('Manual follow-up', 'Follow-up manual'), after: localized('Automated workflow', 'Workflow otomatis') },
                { id: 'transformation-spreadsheet', before: localized('Spreadsheet tracking', 'Tracking spreadsheet'), after: localized('Operational database', 'Database operasional') },
                { id: 'transformation-scattered-messages', before: localized('Scattered messages', 'Pesan tersebar'), after: localized('Unified workflow', 'Workflow terpadu') },
                { id: 'transformation-unknown-status', before: localized('Unknown project status', 'Status proyek tidak terlihat'), after: localized('Visible pipeline', 'Pipeline yang terlihat') },
                { id: 'transformation-repeated-admin', before: localized('Repeated admin work', 'Admin berulang'), after: localized('System rules', 'Aturan sistem') },
            ],
        },
        process: {
            visible: true,
            content: {
                en: { eyebrow: '05 / Process', title: 'A technical timeline with a business starting point.', intro: '' },
                id: { eyebrow: '05 / Proses', title: 'Linimasa teknis dengan titik awal dari bisnis.', intro: '' },
            },
            steps: [
                { id: 'process-understand', number: '01', label: localized('Understand', 'Pahami'), description: localized('Map the workflow, the people inside it, and the decisions currently hidden in manual work.', 'Petakan alur kerja, orang yang terlibat, dan keputusan yang masih tersembunyi di pekerjaan manual.') },
                { id: 'process-architect', number: '02', label: localized('Architect', 'Arsitektur'), description: localized('Choose the smallest reliable system shape, data model, and integration boundary that solves the real constraint.', 'Pilih bentuk sistem, model data, dan batas integrasi paling kecil yang menyelesaikan kendala nyata.') },
                { id: 'process-build', number: '03', label: localized('Build', 'Bangun'), description: localized('Turn the model into an interface the team can use, test, and hand over without a translation layer.', 'Ubah model menjadi interface yang bisa digunakan, diuji, dan diserahkan tanpa lapisan terjemahan.') },
                { id: 'process-operate', number: '04', label: localized('Operate', 'Operasikan'), description: localized('Monitor what happens in production, then keep improving the workflow as the business changes.', 'Pantau apa yang terjadi di production, lalu terus perbaiki workflow saat bisnis berubah.') },
            ],
        },
        principles: {
            visible: true,
            content: {
                en: { eyebrow: '06 / Principles', title: 'What we refuse to hide behind.', intro: '' },
                id: { eyebrow: '06 / Prinsip', title: 'Hal yang tidak kami tutupi.', intro: '' },
            },
            items: [
                localizedItem('principle-no-templates', "We don't sell templates as custom systems.", 'Kami tidak menjual template sebagai sistem custom.'),
                localizedItem('principle-no-ai-by-default', "We don't add AI where a normal rule works better.", 'Kami tidak menambahkan AI ketika aturan biasa sudah lebih tepat.'),
                localizedItem('principle-workflow-first', "We don't choose technology before understanding the workflow.", 'Kami tidak memilih teknologi sebelum memahami alur kerja.'),
                localizedItem('principle-operate-after-launch', "We don't disappear after deployment.", 'Kami tidak menghilang setelah deployment.'),
            ],
        },
        intake: {
            visible: true,
            content: {
                en: { eyebrow: '07 / Project intake', title: 'Start with the workflow, not the wish list.', intro: 'Tell us what is slowing the team down. We will come back with the questions, constraints, and first system shape worth discussing.' },
                id: { eyebrow: '07 / Project intake', title: 'Mulai dari alur kerja, bukan daftar keinginan.', intro: 'Ceritakan apa yang memperlambat tim. Kami akan kembali dengan pertanyaan, batasan, dan bentuk sistem pertama yang layak dibicarakan.' },
            },
            presentation: {
                note: localized('No sales deck required / just the constraint', 'Tidak perlu sales deck / cukup jelaskan kendalanya'),
                submit: localized('Send system brief', 'Kirim system brief'),
                sending: localized('Sending brief…', 'Mengirim brief…'),
                previewOnly: localized('Preview only', 'Pratinjau saja'),
            },
            fields: {
                name: { label: localized('Your name', 'Nama Anda'), placeholder: localized('Name', 'Nama'), required: true },
                email: { label: localized('Work email', 'Email kerja'), placeholder: localized('you@company.com', 'anda@perusahaan.com'), required: true },
                company: { label: localized('Company / team', 'Perusahaan / tim'), placeholder: localized('Company or operating team', 'Nama perusahaan atau tim operasional'), required: false },
                current_workflow: { label: localized('What is happening today?', 'Apa yang terjadi hari ini?'), placeholder: localized('Describe the workflow as it exists now — people, tools, handoffs, or manual steps.', 'Jelaskan workflow saat ini — orang, tools, handoff, atau langkah manual yang terlibat.'), required: true },
                operational_constraint: { label: localized('Where does it break?', 'Di mana prosesnya terhambat?'), placeholder: localized('What gets delayed, duplicated, lost, or difficult to see?', 'Apa yang terlambat, terduplikasi, hilang, atau sulit dilihat?'), required: true },
                desired_change: { label: localized('What should be different?', 'Apa yang perlu berbeda?'), placeholder: localized('Describe the operating change that would make the team more effective.', 'Jelaskan perubahan operasional yang akan membuat tim lebih efektif.'), required: true },
                budget: { label: localized('Budget range (optional)', 'Kisaran anggaran (opsional)'), placeholder: localized('For example: IDR 150–300M', 'Contoh: IDR 150–300 juta'), required: false },
                timeline: { label: localized('Timeline (optional)', 'Timeline (opsional)'), placeholder: localized('For example: discovery this month', 'Contoh: discovery bulan ini'), required: false },
            },
            success: {
                title: localized('Brief received.', 'Brief diterima.'),
                description: localized('We will review the workflow and get back to you with a useful next conversation.', 'Kami akan meninjau alur kerjanya dan kembali dengan percakapan berikutnya yang berguna.'),
                sendAnother: localized('Send another brief', 'Kirim brief lain'),
            },
        },
    },
};

export const cloneConfig = (value) => JSON.parse(JSON.stringify(value));

import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from '@/Layouts/AppLayout';
import { normalizeLandingConfig } from '@/Pages/Landing/config/schema';
import { shapeTokens } from '@/Pages/Landing/config/shapeTokens';
import { useTranslation } from '@/Contexts/LanguageContext';
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    EnvelopeSimple,
    Globe,
    Lightning,
    Wrench,
} from '@phosphor-icons/react';

const content = {
    en: {
        eyebrow: 'Digital systems studio',
        title: <>We build the systems behind how <span className="hero-highlight">businesses operate.</span></>,
        intro: 'Systemify designs, builds, and operates business software around the workflows that keep a company moving.',
        primary: 'Start a project',
        secondary: 'View selected systems',
        signal: 'A working system is easier to trust than a promise.',
        capabilitiesEyebrow: '02 / Capabilities',
        capabilitiesTitle: 'Three disciplines. One operating view.',
        capabilitiesIntro: 'The work is grouped by the job it does for your team — creating a system, removing repeated work, and keeping the result useful after launch.',
        systemsEyebrow: '03 / Selected systems',
        systemsTitle: 'Evidence, not a gallery.',
        systemsIntro: 'Every project should show the problem it addressed, the system that replaced it, and the result the team can now see.',
        noSystems: 'Featured systems will appear here as they are published.',
        problem: 'Problem',
        system: 'System',
        solution: 'Solution',
        result: 'Result',
        stack: 'Stack',
        noEvidenceImage: 'Interface evidence pending approval.',
        transformationEyebrow: '04 / Before → after',
        transformationTitle: 'Make the operating change visible.',
        processEyebrow: '05 / Process',
        processTitle: 'A technical timeline with a business starting point.',
        principlesEyebrow: '06 / Principles',
        principlesTitle: 'What we refuse to hide behind.',
        intakeEyebrow: '07 / Project intake',
        intakeTitle: 'Start with the workflow, not the wish list.',
        intakeIntro: 'Tell us what is slowing the team down. We will come back with the questions, constraints, and first system shape worth discussing.',
        name: 'Your name',
        email: 'Work email',
        company: 'Company / team',
        companyPlaceholder: 'Company or operating team',
        currentWorkflow: 'What is happening today?',
        currentWorkflowPlaceholder: 'Describe the workflow as it exists now — people, tools, handoffs, or manual steps.',
        operationalConstraint: 'Where does it break?',
        operationalConstraintPlaceholder: 'What gets delayed, duplicated, lost, or difficult to see?',
        desiredChange: 'What should be different?',
        desiredChangePlaceholder: 'Describe the operating change that would make the team more effective.',
        budget: 'Budget range (optional)',
        budgetPlaceholder: 'For example: IDR 150–300M',
        timeline: 'Timeline (optional)',
        timelinePlaceholder: 'For example: discovery this month',
        namePlaceholder: 'Name',
        emailPlaceholder: 'you@company.com',
        submit: 'Send system brief',
        sending: 'Sending brief…',
        intakeNote: 'No sales deck required / just the constraint',
        successTitle: 'Brief received.',
        successCopy: 'We will review the workflow and get back to you with a useful next conversation.',
        sendAnother: 'Send another brief',
        build: ['Websites', 'Web applications', 'Internal systems', 'CRM', 'POS', 'Dashboards'],
        automate: ['AI-assisted workflows', 'WhatsApp automation', 'API integrations', 'Notifications', 'Data synchronization'],
        operate: ['Maintenance', 'Infrastructure', 'Monitoring', 'Optimization', 'Continuous improvement'],
        transformations: [
            ['Manual follow-up', 'Automated workflow'],
            ['Spreadsheet tracking', 'Operational database'],
            ['Scattered messages', 'Unified workflow'],
            ['Unknown project status', 'Visible pipeline'],
            ['Repeated admin work', 'System rules'],
        ],
        process: [
            ['01', 'Understand', 'Map the workflow, the people inside it, and the decisions currently hidden in manual work.'],
            ['02', 'Architect', 'Choose the smallest reliable system shape, data model, and integration boundary that solves the real constraint.'],
            ['03', 'Build', 'Turn the model into an interface the team can use, test, and hand over without a translation layer.'],
            ['04', 'Operate', 'Monitor what happens in production, then keep improving the workflow as the business changes.'],
        ],
        principles: [
            "We don't sell templates as custom systems.",
            "We don't add AI where a normal rule works better.",
            "We don't choose technology before understanding the workflow.",
            "We don't disappear after deployment.",
        ],
    },
    id: {
        eyebrow: 'Studio sistem digital',
        title: <>Kami membangun sistem di balik <span className="hero-highlight">operasional bisnis.</span></>,
        intro: 'Systemify merancang, membangun, dan mengoperasikan software bisnis berdasarkan alur kerja yang membuat perusahaan terus berjalan.',
        primary: 'Mulai proyek',
        secondary: 'Lihat sistem pilihan',
        signal: 'Sistem yang berjalan lebih mudah dipercaya daripada janji.',
        capabilitiesEyebrow: '02 / Kapabilitas',
        capabilitiesTitle: 'Tiga disiplin. Satu pandangan operasional.',
        capabilitiesIntro: 'Pekerjaan kami dikelompokkan berdasarkan fungsi untuk tim Anda — membuat sistem, menghilangkan pekerjaan berulang, dan menjaga hasilnya tetap berguna setelah diluncurkan.',
        systemsEyebrow: '03 / Sistem pilihan',
        systemsTitle: 'Bukti, bukan galeri.',
        systemsIntro: 'Setiap proyek perlu menunjukkan masalah yang ditangani, sistem yang menggantikannya, dan hasil yang kini dapat dilihat tim.',
        noSystems: 'Sistem pilihan akan tampil di sini saat sudah dipublikasikan.',
        problem: 'Masalah',
        system: 'Sistem',
        solution: 'Solusi',
        result: 'Hasil',
        stack: 'Stack',
        noEvidenceImage: 'Bukti interface menunggu persetujuan.',
        transformationEyebrow: '04 / Sebelum → sesudah',
        transformationTitle: 'Buat perubahan operasional terlihat.',
        processEyebrow: '05 / Proses',
        processTitle: 'Linimasa teknis dengan titik awal dari bisnis.',
        principlesEyebrow: '06 / Prinsip',
        principlesTitle: 'Hal yang tidak kami tutupi.',
        intakeEyebrow: '07 / Project intake',
        intakeTitle: 'Mulai dari alur kerja, bukan daftar keinginan.',
        intakeIntro: 'Ceritakan apa yang memperlambat tim. Kami akan kembali dengan pertanyaan, batasan, dan bentuk sistem pertama yang layak dibicarakan.',
        name: 'Nama Anda',
        email: 'Email kerja',
        company: 'Perusahaan / tim',
        companyPlaceholder: 'Nama perusahaan atau tim operasional',
        currentWorkflow: 'Apa yang terjadi hari ini?',
        currentWorkflowPlaceholder: 'Jelaskan workflow saat ini — orang, tools, handoff, atau langkah manual yang terlibat.',
        operationalConstraint: 'Di mana prosesnya terhambat?',
        operationalConstraintPlaceholder: 'Apa yang terlambat, terduplikasi, hilang, atau sulit dilihat?',
        desiredChange: 'Apa yang perlu berbeda?',
        desiredChangePlaceholder: 'Jelaskan perubahan operasional yang akan membuat tim lebih efektif.',
        budget: 'Kisaran anggaran (opsional)',
        budgetPlaceholder: 'Contoh: IDR 150–300 juta',
        timeline: 'Timeline (opsional)',
        timelinePlaceholder: 'Contoh: discovery bulan ini',
        namePlaceholder: 'Nama',
        emailPlaceholder: 'anda@perusahaan.com',
        submit: 'Kirim system brief',
        sending: 'Mengirim brief…',
        intakeNote: 'Tidak perlu sales deck / cukup jelaskan kendalanya',
        successTitle: 'Brief diterima.',
        successCopy: 'Kami akan meninjau alur kerjanya dan kembali dengan percakapan berikutnya yang berguna.',
        sendAnother: 'Kirim brief lain',
        build: ['Website', 'Aplikasi web', 'Sistem internal', 'CRM', 'POS', 'Dashboard'],
        automate: ['Workflow berbantuan AI', 'Otomasi WhatsApp', 'Integrasi API', 'Notifikasi', 'Sinkronisasi data'],
        operate: ['Maintenance', 'Infrastruktur', 'Monitoring', 'Optimasi', 'Perbaikan berkelanjutan'],
        transformations: [
            ['Follow-up manual', 'Workflow otomatis'],
            ['Tracking spreadsheet', 'Database operasional'],
            ['Pesan tersebar', 'Workflow terpadu'],
            ['Status proyek tidak terlihat', 'Pipeline yang terlihat'],
            ['Admin berulang', 'Aturan sistem'],
        ],
        process: [
            ['01', 'Pahami', 'Petakan alur kerja, orang yang terlibat, dan keputusan yang masih tersembunyi di pekerjaan manual.'],
            ['02', 'Arsitektur', 'Pilih bentuk sistem, model data, dan batas integrasi paling kecil yang menyelesaikan kendala nyata.'],
            ['03', 'Bangun', 'Ubah model menjadi interface yang bisa digunakan, diuji, dan diserahkan tanpa lapisan terjemahan.'],
            ['04', 'Operasikan', 'Pantau apa yang terjadi di production, lalu terus perbaiki workflow saat bisnis berubah.'],
        ],
        principles: [
            'Kami tidak menjual template sebagai sistem custom.',
            'Kami tidak menambahkan AI ketika aturan biasa sudah lebih tepat.',
            'Kami tidak memilih teknologi sebelum memahami alur kerja.',
            'Kami tidak menghilang setelah deployment.',
        ],
    },
};

const capabilityGroups = [
    { key: 'build', label: 'BUILD', note: 'Create digital products and operational interfaces.', icon: Globe },
    { key: 'automate', label: 'AUTOMATE', note: 'Remove repetitive operational work.', icon: Lightning },
    { key: 'operate', label: 'OPERATE', note: 'Keep production systems useful after deployment.', icon: Wrench },
];

gsap.registerPlugin(ScrollTrigger);

const heroAlignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
};

const heroCtaClasses = {
    left: 'items-start sm:justify-start',
    center: 'items-center sm:justify-center',
    right: 'items-end sm:justify-end',
};

const heroVerticalClasses = {
    start: 'lg:items-start',
    center: 'lg:items-center',
    end: 'lg:items-end',
};

const heroWidthClasses = {
    compact: 'max-w-2xl',
    wide: 'max-w-4xl',
    full: 'max-w-none',
};

const heroHeightClasses = {
    auto: '',
    tall: 'min-h-[34rem]',
    full: 'min-h-[calc(100vh-4.75rem)]',
};

const secondaryPositionClasses = {
    left: 'lg:order-first',
    center: 'lg:col-start-4',
    right: '',
};

const highlightStyleClasses = {
    none: '',
    marker: 'hero-highlight',
    underline: 'hero-underline',
    'offset-block': 'hero-highlight hero-highlight--offset',
    'signal-line': 'hero-signal-line',
};

const highlightWidthClasses = {
    compact: 'hero-highlight--compact',
    balanced: 'hero-highlight--balanced',
    wide: 'hero-highlight--wide',
};

function responsiveVisibility({ desktop, tablet, mobile }) {
    return [
        desktop ? '' : 'lg:hidden',
        tablet ? '' : 'md:max-lg:hidden',
        mobile ? '' : 'max-md:hidden',
    ].filter(Boolean).join(' ');
}

function StatusLine({ label, value, status = 'operational' }) {
    return (
        <div className="flex items-center justify-between border-b border-white/15 py-3 last:border-b-0">
            <span className="text-sm text-white/65">{label}</span>
            <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/90">
                <span className={`status-dot status-dot--${status}`} />
                {value}
            </span>
        </div>
    );
}

export function LandingRenderer({ portfolios = [], landingConfig = {}, motionKey = 0, preview = false }) {
    const { locale } = useTranslation();
    const config = normalizeLandingConfig(landingConfig);
    const baseCopy = content[locale] || content.en;
    const heroContent = config.hero.content[locale] || config.hero.content.en;
    const sectionContent = (sectionId) => config.sections?.[sectionId]?.content?.[locale] || config.sections?.[sectionId]?.content?.en || {};
    const disciplinesContent = sectionContent('disciplines');
    const systemsContent = sectionContent('systems');
    const transformationContent = sectionContent('transformation');
    const processContent = sectionContent('process');
    const principlesContent = sectionContent('principles');
    const intakeContent = sectionContent('intake');
    const copy = {
        ...baseCopy,
        eyebrow: heroContent.eyebrow,
        intro: heroContent.description,
        primary: heroContent.primaryCta,
        secondary: heroContent.secondaryCta,
        capabilitiesEyebrow: disciplinesContent.eyebrow || baseCopy.capabilitiesEyebrow,
        capabilitiesTitle: disciplinesContent.title || baseCopy.capabilitiesTitle,
        capabilitiesIntro: disciplinesContent.intro || baseCopy.capabilitiesIntro,
        systemsEyebrow: systemsContent.eyebrow || baseCopy.systemsEyebrow,
        systemsTitle: systemsContent.title || baseCopy.systemsTitle,
        systemsIntro: systemsContent.intro || baseCopy.systemsIntro,
        transformationEyebrow: transformationContent.eyebrow || baseCopy.transformationEyebrow,
        transformationTitle: transformationContent.title || baseCopy.transformationTitle,
        processEyebrow: processContent.eyebrow || baseCopy.processEyebrow,
        processTitle: processContent.title || baseCopy.processTitle,
        principlesEyebrow: principlesContent.eyebrow || baseCopy.principlesEyebrow,
        principlesTitle: principlesContent.title || baseCopy.principlesTitle,
        intakeEyebrow: intakeContent.eyebrow || baseCopy.intakeEyebrow,
        intakeTitle: intakeContent.title || baseCopy.intakeTitle,
        intakeIntro: intakeContent.intro || baseCopy.intakeIntro,
    };
    const [submitted, setSubmitted] = useState(false);
    const motionRoot = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        company: '',
        current_workflow: '',
        operational_constraint: '',
        desired_change: '',
        budget: '',
        timeline: '',
    });
    const selectedSystems = portfolios.filter((portfolio) => portfolio.is_featured).slice(0, 3);
    const heroHighlightText = locale === 'id' ? config.hero.highlight.textId : config.hero.highlight.text;
    const heroHeadline = heroContent.headline;
    const heroHighlightClass = `${highlightStyleClasses[config.hero.highlight.style]} ${highlightWidthClasses[config.hero.highlight.width]} ${shapeTokens[config.hero.highlight.shape]?.className || ''}`.trim();
    const heroLayout = config.hero.layout;
    const heroObject = config.hero.secondaryObject;
    const motion = config.hero.motion;

    useGSAP(() => {
        const root = motionRoot.current;
        if (!root || motion.preset === 'none' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        const intensity = { subtle: 0.7, standard: 1, expressive: 1.25 }[motion.intensity] || 0.7;
        const duration = { quick: 0.45, standard: 0.7, long: 1.1 }[motion.duration] || 0.7;
        const delay = { none: 0, short: 0.12, staggered: 0.2 }[motion.delay] || 0;
        const once = motion.scrollBehavior !== 'scrub';
        const scrollTrigger = motion.scrollBehavior === 'none' ? undefined : { trigger: root, start: 'top 82%', once };
        const reveal = (selector, options = {}) => {
            const targets = gsap.utils.toArray(selector, root);
            if (!targets.length) return;
            gsap.fromTo(targets, { autoAlpha: 0, y: 20 * intensity }, { autoAlpha: 1, y: 0, duration, delay, ease: 'power2.out', stagger: 0.08, scrollTrigger, ...options });
        };

        if (motion.preset === 'editorial-reveal') reveal('[data-motion="hero"]');
        if (motion.preset === 'system-stagger') reveal('[data-motion="system"]', { stagger: 0.12 });
        if (motion.preset === 'evidence-reveal') reveal('[data-motion="evidence"]', { y: 28 * intensity });
        if (motion.preset === 'signal-wipe') {
            const highlight = root.querySelector('[data-motion="highlight"]');
            if (highlight) gsap.fromTo(highlight, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration, delay, ease: 'power2.out', scrollTrigger });
        }
        if (motion.preset === 'process-progress') {
            const processRows = gsap.utils.toArray('[data-motion="process"]', root);
            processRows.forEach((row, index) => gsap.fromTo(row, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: duration * 0.75, delay: index * 0.05, ease: 'none', scrollTrigger: { trigger: row, start: 'top 82%', end: 'top 42%', scrub: motion.scrollBehavior === 'scrub' } }));
        }
    }, { scope: motionRoot, dependencies: [motionKey, motion.preset, motion.intensity, motion.scrollBehavior, motion.duration, motion.delay] });

    const renderHeroHeadline = () => {
        if (config.hero.highlight.style === 'none' || !heroHighlightText || !heroHeadline.includes(heroHighlightText)) return heroHeadline;
        const [before, after] = heroHeadline.split(heroHighlightText);
        return <>{before}<span data-motion="highlight" className={heroHighlightClass}>{heroHighlightText}</span>{after}</>;
    };

    const submitBrief = (event) => {
        event.preventDefault();
        if (preview) return;
        post(route('briefs.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    };

    return (
        <AppLayout title="Digital Systems Studio" containerClassName="w-full" landingConfig={config}>
            <div ref={motionRoot} className="landing-renderer">
            <section id="hero" className={`border-b border-brand-dark/15 py-20 sm:py-28 ${heroHeightClasses[heroLayout.height] || ''}`}>
                <div className={`site-container grid gap-14 lg:grid-cols-12 ${heroVerticalClasses[heroLayout.verticalAlignment] || heroVerticalClasses.center}`}>
                    <div data-motion="hero" className={`flex flex-col lg:col-span-7 ${heroAlignmentClasses[heroLayout.alignment] || heroAlignmentClasses.left}`}>
                        <p className="eyebrow">{copy.eyebrow}</p>
                        <h1 className={`mt-7 ${heroWidthClasses[heroLayout.contentWidth] || heroWidthClasses.wide} text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]`}>
                            {renderHeroHeadline()}
                        </h1>
                        <p className={`mt-8 ${heroWidthClasses[heroLayout.contentWidth] || heroWidthClasses.wide} text-lg leading-8 text-brand-dark/68 sm:text-xl`}>
                            {copy.intro}
                        </p>
                        <div className={`mt-9 flex flex-col gap-3 sm:flex-row sm:items-center ${heroCtaClasses[heroLayout.alignment] || heroCtaClasses.left}`}>
                            <a href="#intake" className="button-ink">
                                {copy.primary} <ArrowRight size={16} weight="bold" />
                            </a>
                            <a href="#systems" className="button-secondary">
                                {copy.secondary} <ArrowUpRight size={16} weight="bold" />
                            </a>
                        </div>
                        <div className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-brand-dark/20 pt-5 sm:grid-cols-4">
                            {['BUSINESS SOFTWARE', 'INTERNAL SYSTEMS', 'WORKFLOW AUTOMATION', 'CONTINUOUS OPERATIONS'].map((item, index) => (
                                <div key={item} className="flex gap-2">
                                    <span className="font-mono text-[0.65rem] text-brand-blue">0{index + 1}</span>
                                    <span className="text-[0.64rem] font-semibold leading-4 text-brand-dark/55">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div data-motion="hero" className={`lg:col-span-5 ${secondaryPositionClasses[heroLayout.secondaryObjectPosition] || ''} ${responsiveVisibility(heroObject)}`}>
                        <div className={`bg-brand-dark p-5 text-white sm:p-7 ${shapeTokens[config.cards.shape]?.className || ''}`}>
                            <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-5">
                                <div>
                                    <p className="mono-meta text-brand-lime">SYSTEMIFY / OPERATING MODEL</p>
                                    <p className="mt-2 text-sm text-white/55">The work behind a useful business system.</p>
                                </div>
                                <span className="flex items-center gap-2 font-mono text-[0.64rem] uppercase text-white/70"><span className="status-dot status-dot--operational" /> live</span>
                            </div>
                            <div className="py-3">
                                <div data-motion="system"><StatusLine label="Build" value="Product + interface" /></div>
                                <div data-motion="system"><StatusLine label="Automate" value="Rules + integrations" /></div>
                                <div data-motion="system"><StatusLine label="Operate" value="Monitor + iterate" /></div>
                            </div>
                            <div className="mt-4 border-l-2 border-brand-lime pl-4 text-sm leading-6 text-white/75">
                                {copy.signal}
                            </div>
                            <p className="mt-8 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/35">OUTCOME FIRST / ARCHITECTURE SECOND</p>
                        </div>
                    </div>
                </div>
            </section>

            {config.sections.disciplines.visible && <section id="capabilities" className="border-b border-brand-dark/15 py-20 sm:py-28">
                <div className="site-container grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="eyebrow">{copy.capabilitiesEyebrow}</p>
                        <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{copy.capabilitiesTitle}</h2>
                        <p className="mt-6 max-w-sm text-sm leading-7 text-brand-dark/62">{copy.capabilitiesIntro}</p>
                    </div>
                    <div className="grid gap-10 md:grid-cols-3 lg:col-span-8 lg:gap-8">
                        {capabilityGroups.map(({ key, label, note, icon: Icon }, index) => (
                            <div key={key} className={`${index > 0 ? 'border-t pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0' : ''}`}>
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{label}</h3>
                                    <Icon size={22} weight="bold" className="text-brand-blue" />
                                </div>
                                <p className="mt-3 min-h-12 text-sm leading-6 text-brand-dark/60">{locale === 'en' ? note : key === 'build' ? 'Membuat produk digital dan interface operasional.' : key === 'automate' ? 'Mengurangi pekerjaan operasional yang berulang.' : 'Menjaga sistem production tetap berguna.'}</p>
                                <ul className="mt-6 border-t border-brand-dark/15">
                                    {copy[key].map((item) => <li key={item} className="flex items-center gap-3 border-b border-brand-dark/15 py-3 text-sm"><span className="font-mono text-[0.65rem] text-brand-blue">+</span>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>}

            {config.sections.systems.visible && <section id="systems" className="bg-brand-dark py-20 text-white sm:py-28">
                <div className="site-container">
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-7">
                            <p className="eyebrow eyebrow--light">{copy.systemsEyebrow}</p>
                            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">{copy.systemsTitle}</h2>
                        </div>
                        <p className="max-w-md text-sm leading-7 text-white/60 lg:col-span-4 lg:col-start-9">{copy.systemsIntro}</p>
                    </div>

                    <div className="mt-14 border-t border-white/20">
                        {selectedSystems.length > 0 ? selectedSystems.map((portfolio, index) => (
                            <article key={portfolio.id || portfolio.slug || portfolio.title} data-motion="evidence" className="grid gap-6 border-b border-white/20 py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8">
                                <span className="font-mono text-xs text-brand-lime">0{index + 1}</span>
                                <div>
                            <div className="flex aspect-[16/9] items-end overflow-hidden border border-white/15 bg-white/[0.02] p-4">
                                        {portfolio.image_url ? <img src={portfolio.image_url} alt={portfolio.image_alt || `${portfolio.title} system evidence`} className="h-full w-full object-cover" loading="lazy" /> : <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/35">{portfolio.system_code || 'SYS—PENDING'} / {copy.noEvidenceImage}</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <p className="mono-meta text-brand-lime">{portfolio.category}</p>
                                            <h3 className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.04em]">{portfolio.title}</h3>
                                        </div>
                                        {portfolio.project_url && <a href={portfolio.project_url} target="_blank" rel="noreferrer" className="text-brand-lime" aria-label={`Open ${portfolio.title}`}><ArrowUpRight size={21} weight="bold" /></a>}
                                    </div>
                                    <p className="mt-5 text-sm leading-7 text-white/62">{portfolio.description}</p>
                                    <dl className="mt-7 grid gap-4 border-t border-white/15 pt-4 text-sm sm:grid-cols-2">
                                        {[[copy.problem, portfolio.problem], [copy.solution, portfolio.solution], [copy.result, portfolio.result], [copy.stack, (portfolio.tech_stack || []).join(' / ') || 'Systemify operating stack']].map(([label, value]) => <div key={label}><dt className="font-mono text-[0.64rem] uppercase text-white/40">{label}</dt><dd className="mt-1 text-white/80">{value || 'Not documented'}</dd></div>)}
                                    </dl>
                                </div>
                            </article>
                        )) : (
                            <div className="border-b border-white/20 py-14 text-sm text-white/55">{copy.noSystems}</div>
                        )}
                    </div>
                </div>
            </section>}

            {config.sections.transformation.visible && <section id="transformation" className="border-b border-brand-dark/15 py-20 sm:py-28">
                <div className="site-container grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="eyebrow">{copy.transformationEyebrow}</p>
                        <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{copy.transformationTitle}</h2>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="border-t border-brand-dark/20">
                            {copy.transformations.map(([before, after]) => (
                            <div key={before} data-motion="process" className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-brand-dark/20 py-5 text-sm sm:gap-6 sm:text-base">
                                    <span className="min-w-0 break-words text-brand-dark/55">{before}</span>
                                    <ArrowRight size={18} className="text-brand-blue" weight="bold" />
                                    <span className="min-w-0 break-words font-semibold">{after}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>}

            {config.sections.process.visible && <section id="method" className="bg-brand-paper-muted border-b border-brand-dark/15 py-20 sm:py-28">
                <div className="site-container">
                    <div className="max-w-3xl">
                        <p className="eyebrow">{copy.processEyebrow}</p>
                        <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{copy.processTitle}</h2>
                    </div>
                    <div className="mt-14 grid gap-0 border-t border-brand-dark/20 md:grid-cols-4">
                        {copy.process.map(([number, label, description], index) => (
                            <div key={number} data-motion="process" className={`${index > 0 ? 'border-t md:border-l md:border-t-0' : ''} border-brand-dark/20 p-5 pl-0 md:p-6 md:pl-6`}>
                                <span className="font-mono text-xs text-brand-blue">{number}</span>
                                <h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">{label}</h3>
                                <p className="mt-4 text-sm leading-7 text-brand-dark/62">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>}

            {config.sections.principles.visible && <section id="principles" className="bg-brand-blue py-20 text-white sm:py-28">
                <div className="site-container grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="eyebrow eyebrow--light">{copy.principlesEyebrow}</p>
                        <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{copy.principlesTitle}</h2>
                    </div>
                    <div className="lg:col-span-7">
                        <ol className="border-t border-white/25">
                            {copy.principles.map((principle, index) => (
                                <li key={principle} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/25 py-6 text-xl leading-tight tracking-[-0.025em] sm:text-2xl"><span className="font-mono text-xs text-brand-lime">0{index + 1}</span><span>{principle}</span></li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>}

            {config.sections.intake.visible && <section id="intake" className="bg-brand-dark py-20 text-white sm:py-28">
                <div className="site-container grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="eyebrow eyebrow--light">{copy.intakeEyebrow}</p>
                        <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">{copy.intakeTitle}</h2>
                        <p className="mt-7 max-w-md text-sm leading-7 text-white/60">{copy.intakeIntro}</p>
                        <div className="mt-10 flex items-center gap-3 text-sm text-white/55"><EnvelopeSimple size={18} className="text-brand-lime" /> hello@systemify.id</div>
                    </div>
                    <div className="lg:col-span-6 lg:col-start-7">
                        {submitted ? (
                            <div className="border border-brand-lime/50 p-7 sm:p-10">
                                <Check size={28} className="text-brand-lime" weight="bold" />
                                <h3 className="mt-7 text-3xl font-semibold tracking-[-0.04em]">{copy.successTitle}</h3>
                                <p className="mt-4 max-w-md text-sm leading-7 text-white/65">{copy.successCopy}</p>
                                <button type="button" onClick={() => setSubmitted(false)} className="button-secondary mt-8 text-white">{copy.sendAnother}</button>
                            </div>
                        ) : (
                            <form onSubmit={submitBrief} className="border-t border-white/25 pt-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block text-sm font-semibold">{copy.name}<input value={data.name} onChange={(event) => setData('name', event.target.value)} className="site-input site-input--dark mt-2" placeholder={copy.namePlaceholder} aria-invalid={Boolean(errors.name)} required />{errors.name && <span className="mt-1 block text-xs text-red-300">{errors.name}</span>}</label>
                                    <label className="block text-sm font-semibold">{copy.email}<input type="email" value={data.email} onChange={(event) => setData('email', event.target.value)} className="site-input site-input--dark mt-2" placeholder={copy.emailPlaceholder} aria-invalid={Boolean(errors.email)} required />{errors.email && <span className="mt-1 block text-xs text-red-300">{errors.email}</span>}</label>
                                </div>
                                <label className="mt-5 block text-sm font-semibold">{copy.company}<input value={data.company} onChange={(event) => setData('company', event.target.value)} className="site-input site-input--dark mt-2" placeholder={copy.companyPlaceholder} aria-invalid={Boolean(errors.company)} />{errors.company && <span className="mt-1 block text-xs text-red-300">{errors.company}</span>}</label>
                                <div className="mt-5 grid gap-5">
                                    <label className="block text-sm font-semibold">{copy.currentWorkflow}<textarea value={data.current_workflow} onChange={(event) => setData('current_workflow', event.target.value)} className="site-input site-input--dark mt-2 min-h-28 resize-y" placeholder={copy.currentWorkflowPlaceholder} aria-invalid={Boolean(errors.current_workflow)} required />{errors.current_workflow && <span className="mt-1 block text-xs text-red-300">{errors.current_workflow}</span>}</label>
                                    <label className="block text-sm font-semibold">{copy.operationalConstraint}<textarea value={data.operational_constraint} onChange={(event) => setData('operational_constraint', event.target.value)} className="site-input site-input--dark mt-2 min-h-28 resize-y" placeholder={copy.operationalConstraintPlaceholder} aria-invalid={Boolean(errors.operational_constraint)} required />{errors.operational_constraint && <span className="mt-1 block text-xs text-red-300">{errors.operational_constraint}</span>}</label>
                                    <label className="block text-sm font-semibold">{copy.desiredChange}<textarea value={data.desired_change} onChange={(event) => setData('desired_change', event.target.value)} className="site-input site-input--dark mt-2 min-h-28 resize-y" placeholder={copy.desiredChangePlaceholder} aria-invalid={Boolean(errors.desired_change)} required />{errors.desired_change && <span className="mt-1 block text-xs text-red-300">{errors.desired_change}</span>}</label>
                                </div>
                                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                    <label className="block text-sm font-semibold">{copy.budget}<input value={data.budget} onChange={(event) => setData('budget', event.target.value)} className="site-input site-input--dark mt-2" placeholder={copy.budgetPlaceholder} aria-invalid={Boolean(errors.budget)} />{errors.budget && <span className="mt-1 block text-xs text-red-300">{errors.budget}</span>}</label>
                                    <label className="block text-sm font-semibold">{copy.timeline}<input value={data.timeline} onChange={(event) => setData('timeline', event.target.value)} className="site-input site-input--dark mt-2" placeholder={copy.timelinePlaceholder} aria-invalid={Boolean(errors.timeline)} />{errors.timeline && <span className="mt-1 block text-xs text-red-300">{errors.timeline}</span>}</label>
                                </div>
                                <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center"><span className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/40">{copy.intakeNote}</span><button type="submit" className="button-primary" disabled={processing || preview}>{preview ? (locale === 'id' ? 'Pratinjau saja' : 'Preview only') : processing ? copy.sending : copy.submit} <ArrowRight size={16} weight="bold" /></button></div>
                            </form>
                        )}
                    </div>
                </div>
            </section>}
            </div>
        </AppLayout>
    );
}

export default function Welcome({ portfolios = [], landingConfig = {} }) {
    return <LandingRenderer portfolios={portfolios} landingConfig={landingConfig} />;
}

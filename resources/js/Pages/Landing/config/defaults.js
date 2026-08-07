export const landingSections = [
    { id: 'hero', label: 'Hero' },
    { id: 'disciplines', label: 'Disciplines' },
    { id: 'systems', label: 'Selected systems' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'process', label: 'Process' },
    { id: 'principles', label: 'Principles' },
    { id: 'intake', label: 'Project intake' },
];

export const defaultSectionContent = {
    disciplines: {
        visible: true,
        content: {
            en: {
                eyebrow: '02 / Capabilities',
                title: 'Three disciplines. One operating view.',
                intro: 'The work is grouped by the job it does for your team — creating a system, removing repeated work, and keeping the result useful after launch.',
            },
            id: {
                eyebrow: '02 / Kapabilitas',
                title: 'Tiga disiplin. Satu pandangan operasional.',
                intro: 'Pekerjaan kami dikelompokkan berdasarkan fungsi untuk tim Anda — membuat sistem, menghilangkan pekerjaan berulang, dan menjaga hasilnya tetap berguna setelah diluncurkan.',
            },
        },
    },
    systems: {
        visible: true,
        content: {
            en: {
                eyebrow: '03 / Selected systems',
                title: 'Evidence, not a gallery.',
                intro: 'Every project should show the problem it addressed, the system that replaced it, and the result the team can now see.',
            },
            id: {
                eyebrow: '03 / Sistem pilihan',
                title: 'Bukti, bukan galeri.',
                intro: 'Setiap proyek perlu menunjukkan masalah yang ditangani, sistem yang menggantikannya, dan hasil yang kini dapat dilihat tim.',
            },
        },
    },
    transformation: {
        visible: true,
        content: {
            en: { eyebrow: '04 / Before → after', title: 'Make the operating change visible.', intro: '' },
            id: { eyebrow: '04 / Sebelum → sesudah', title: 'Buat perubahan operasional terlihat.', intro: '' },
        },
    },
    process: {
        visible: true,
        content: {
            en: { eyebrow: '05 / Process', title: 'A technical timeline with a business starting point.', intro: '' },
            id: { eyebrow: '05 / Proses', title: 'Linimasa teknis dengan titik awal dari bisnis.', intro: '' },
        },
    },
    principles: {
        visible: true,
        content: {
            en: { eyebrow: '06 / Principles', title: 'What we refuse to hide behind.', intro: '' },
            id: { eyebrow: '06 / Prinsip', title: 'Hal yang tidak kami tutupi.', intro: '' },
        },
    },
    intake: {
        visible: true,
        content: {
            en: { eyebrow: '07 / Project intake', title: 'Start with the workflow, not the wish list.', intro: 'Tell us what is slowing the team down. We will come back with the questions, constraints, and first system shape worth discussing.' },
            id: { eyebrow: '07 / Project intake', title: 'Mulai dari alur kerja, bukan daftar keinginan.', intro: 'Ceritakan apa yang memperlambat tim. Kami akan kembali dengan pertanyaan, batasan, dan bentuk sistem pertama yang layak dibicarakan.' },
        },
    },
};

export const defaultLandingConfig = {
    version: 1,
    hero: {
        content: {
            en: {
                eyebrow: 'Digital systems studio',
                headline: 'We build the systems behind how businesses operate.',
                description: 'Systemify designs, builds, and operates business software around the workflows that keep a company moving.',
                primaryCta: 'Start a project',
                secondaryCta: 'View selected systems',
            },
            id: {
                eyebrow: 'Studio sistem digital',
                headline: 'Kami membangun sistem di balik operasional bisnis.',
                description: 'Systemify merancang, membangun, dan mengoperasikan software bisnis berdasarkan alur kerja yang membuat perusahaan terus berjalan.',
                primaryCta: 'Mulai proyek',
                secondaryCta: 'Lihat sistem pilihan',
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
    sections: defaultSectionContent,
};

export const cloneConfig = (value) => JSON.parse(JSON.stringify(value));

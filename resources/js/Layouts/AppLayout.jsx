import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { useTranslation } from '@/Contexts/LanguageContext';

function SystemifyMark({ light = false, compact = false }) {
    return (
        <span className={`inline-flex items-center gap-2 ${light ? 'text-white' : 'text-brand-dark'}`}>
            <span className="flex h-8 w-8 items-center justify-center border border-current bg-brand-lime text-[10px] font-black font-mono tracking-[-0.12em]">
                S/
            </span>
            {!compact && <span className="text-xl font-bold tracking-[-0.05em]">Systemify</span>}
        </span>
    );
}

export default function AppLayout({
    children,
    title = '',
    description = 'Systemify builds the systems behind how businesses operate: digital products, workflow automation, and the infrastructure that keeps them useful.',
    showNav = true,
    showFooter = true,
    containerClassName = 'site-container py-24',
    landingConfig = null,
}) {
    const { locale, toggleLocale } = useTranslation();
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const languageLabel = locale === 'en' ? 'ID' : 'EN';
    const navDefinitions = locale === 'en'
        ? [['#capabilities', 'Capabilities'], ['#systems', 'Selected systems'], ['#method', 'Process'], ['#intake', 'Start a brief']]
        : [['#capabilities', 'Kapabilitas'], ['#systems', 'Sistem pilihan'], ['#method', 'Proses'], ['#intake', 'Mulai brief']];
    const sectionForHref = { '#capabilities': 'disciplines', '#systems': 'systems', '#method': 'process', '#intake': 'intake' };
    const navItems = navDefinitions.filter(([href]) => !landingConfig || landingConfig.sections?.[sectionForHref[href]]?.visible !== false);
    const intakeHref = !landingConfig || landingConfig.sections?.intake?.visible !== false ? '#intake' : '#hero';

    const closeMenu = () => setMobileOpen(false);

    return (
        <>
            <Head>
                <title>{title ? `${title} | Systemify` : 'Systemify — Digital Systems Studio'}</title>
                <meta name="description" content={description} />
            </Head>

            <div className="min-h-screen bg-brand-paper text-brand-dark">
                {showNav && (
                    <header className="sticky top-0 z-50 border-b border-brand-dark/15 bg-brand-paper">
                        <div className="site-container flex min-h-[4.75rem] items-center justify-between gap-6">
                            <Link href="/" aria-label="Systemify home" onClick={closeMenu}>
                                <SystemifyMark />
                            </Link>

                            <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
                                {navItems.map(([href, label]) => (
                                    <a key={href} href={href} className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-brand-dark/65 transition-colors hover:text-brand-blue">
                                        {label}
                                    </a>
                                ))}
                            </nav>

                            <div className="hidden items-center gap-3 lg:flex">
                                <button type="button" onClick={toggleLocale} className="mono-meta border-l border-brand-dark/20 pl-3 text-brand-dark/60 hover:text-brand-blue" aria-label={`Switch language to ${languageLabel}`}>
                                    {languageLabel}
                                </button>
                                {auth?.user && (
                                    <Link href={route('dashboard')} className="button-secondary py-2 text-[0.68rem]">
                                        Workspace <ArrowUpRight size={14} weight="bold" />
                                    </Link>
                                )}
                                <a href={intakeHref} className="button-ink py-2 text-[0.68rem]">
                                    {locale === 'en' ? 'Start a brief' : 'Mulai brief'} <ArrowUpRight size={14} weight="bold" />
                                </a>
                            </div>

                            <button type="button" className="inline-flex items-center justify-center border border-brand-dark/20 p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}>
                                {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
                            </button>
                        </div>

                        {mobileOpen && (
                            <div id="mobile-navigation" className="border-t border-brand-dark/15 bg-brand-paper lg:hidden">
                                <nav className="site-container flex flex-col gap-1 py-4" aria-label="Mobile navigation">
                                    {navItems.map(([href, label]) => (
                                        <a key={href} href={href} onClick={closeMenu} className="border-b border-brand-dark/10 py-3 text-sm font-semibold">
                                            {label}
                                        </a>
                                    ))}
                                    <div className="flex items-center justify-between gap-3 pt-3">
                                        <button type="button" onClick={toggleLocale} className="mono-meta text-brand-blue" aria-label={`Switch language to ${languageLabel}`}>
                                            {locale === 'en' ? 'Bahasa Indonesia' : 'English'}
                                        </button>
                                        <a href={intakeHref} onClick={closeMenu} className="button-ink text-[0.68rem]">
                                            {locale === 'en' ? 'Start a brief' : 'Mulai brief'} <ArrowUpRight size={14} weight="bold" />
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        )}
                    </header>
                )}

                <main className={containerClassName}>{children}</main>

                {showFooter && (
                    <footer className="bg-brand-dark text-white">
                        <div className="site-container grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
                            <div>
                                <SystemifyMark light />
                                <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
                                    {locale === 'en'
                                        ? 'We build the systems behind how businesses operate.'
                                        : 'Kami membangun sistem di balik operasional bisnis.'}
                                </p>
                            </div>
                            <div>
                                <p className="mono-meta text-brand-lime">Navigate</p>
                                <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65">
                                    {navItems.slice(0, 3).map(([href, label]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}
                                </div>
                            </div>
                            <div>
                                <p className="mono-meta text-brand-lime">Contact</p>
                                <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65">
                                    <a href={intakeHref} className="hover:text-white">{locale === 'en' ? 'Start a system brief' : 'Mulai system brief'}</a>
                                    <a href="mailto:hello@systemify.id" className="hover:text-white">hello@systemify.id</a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-white/15">
                            <div className="site-container flex flex-col gap-2 py-4 text-[0.68rem] text-white/40 sm:flex-row sm:items-center sm:justify-between">
                                <span>© {new Date().getFullYear()} Systemify</span>
                                <span className="font-mono">BUILD / AUTOMATE / OPERATE</span>
                            </div>
                        </div>
                    </footer>
                )}
            </div>
        </>
    );
}

// Kept as a compatibility export for pages that have not yet migrated their imports.
export function CustomCursor() {
    return null;
}

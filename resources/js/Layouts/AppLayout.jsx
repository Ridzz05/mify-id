import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, List, X } from '@phosphor-icons/react';
import { useTranslation } from '@/Contexts/LanguageContext';
import { normalizeLandingConfig } from '@/Pages/Landing/config/schema';

function SystemifyMark({ config, light = false, compact = false }) {
    return (
        <span className={`inline-flex items-center gap-2 ${light ? 'text-white' : 'text-brand-dark'}`}>
            <span className="flex h-8 w-8 items-center justify-center border border-current bg-brand-lime text-[10px] font-black font-mono tracking-[-0.12em]">{config.global.brand.mark}</span>
            {!compact && <span className="text-xl font-bold tracking-[-0.05em]">{config.global.brand.name}</span>}
        </span>
    );
}

export default function AppLayout({ children, title = '', description = '', showNav = true, showFooter = true, containerClassName = 'site-container py-24', landingConfig = null }) {
    const { locale, toggleLocale } = useTranslation();
    const { auth } = usePage().props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const config = normalizeLandingConfig(landingConfig || {});
    const navigation = config.global.navigation;
    const footer = config.global.footer;
    const metaTitle = title || config.global.meta.title[locale];
    const metaDescription = description || config.global.meta.description[locale];
    const languageLabel = locale === 'en' ? 'ID' : 'EN';
    const navDefinitions = [
        ['#capabilities', 'disciplines', navigation.capabilities],
        ['#systems', 'systems', navigation.systems],
        ['#method', 'process', navigation.process],
        ['#intake', 'intake', navigation.intake],
    ];
    const navItems = navDefinitions.filter(([, sectionId]) => config.sections?.[sectionId]?.visible !== false).map(([href, sectionId, label]) => ({ href, sectionId, label: label[locale] || label.en }));
    const intakeHref = config.sections?.intake?.visible !== false ? '#intake' : '#hero';
    const closeMenu = () => setMobileOpen(false);

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>

            <div className="min-h-screen bg-brand-paper text-brand-dark">
                {showNav && <header className="sticky top-0 z-50 border-b border-brand-dark/15 bg-brand-paper"><div className="site-container flex min-h-[4.75rem] items-center justify-between gap-6"><Link href="/" aria-label={config.global.brand.homeLabel[locale]} onClick={closeMenu}><SystemifyMark config={config} /></Link><nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">{navItems.map(({ href, label }) => <a key={href} href={href} className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-brand-dark/65 transition-colors hover:text-brand-blue">{label}</a>)}</nav><div className="hidden items-center gap-3 lg:flex"><button type="button" onClick={toggleLocale} className="mono-meta border-l border-brand-dark/20 pl-3 text-brand-dark/60 hover:text-brand-blue" aria-label={config.global.navigation.languageSwitch[locale]}>{languageLabel}</button>{auth?.user && <Link href={route('dashboard')} className="button-secondary py-2 text-[0.68rem]">{navigation.workspace[locale]} <ArrowUpRight size={14} weight="bold" /></Link>}<a href={intakeHref} className="button-ink py-2 text-[0.68rem]">{navigation.primaryCta[locale]} <ArrowUpRight size={14} weight="bold" /></a></div><button type="button" className="inline-flex items-center justify-center border border-brand-dark/20 p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}>{mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}</button></div>{mobileOpen && <div id="mobile-navigation" className="border-t border-brand-dark/15 bg-brand-paper lg:hidden"><nav className="site-container flex flex-col gap-1 py-4" aria-label="Mobile navigation">{navItems.map(({ href, label }) => <a key={href} href={href} onClick={closeMenu} className="border-b border-brand-dark/10 py-3 text-sm font-semibold">{label}</a>)}<div className="flex items-center justify-between gap-3 pt-3"><button type="button" onClick={toggleLocale} className="mono-meta text-brand-blue" aria-label={config.global.navigation.languageSwitch[locale]}>{config.global.navigation.languageSwitch[locale]}</button><a href={intakeHref} onClick={closeMenu} className="button-ink text-[0.68rem]">{navigation.primaryCta[locale]} <ArrowUpRight size={14} weight="bold" /></a></div></nav></div>}</header>}

                <main className={containerClassName}>{children}</main>

                {showFooter && <footer className="bg-brand-dark text-white"><div className="site-container grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]"><div><SystemifyMark config={config} light /><p className="mt-6 max-w-sm text-sm leading-7 text-white/60">{footer.description[locale]}</p></div><div><p className="mono-meta text-brand-lime">{footer.navigateLabel[locale]}</p><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65">{navItems.slice(0, 3).map(({ href, label }) => <a key={href} href={href} className="hover:text-white">{label}</a>)}</div></div><div><p className="mono-meta text-brand-lime">{footer.contactLabel[locale]}</p><div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/65"><a href={intakeHref} className="hover:text-white">{footer.startBrief[locale]}</a><a href={`mailto:${config.global.contact.email}`} className="hover:text-white">{config.global.contact.email}</a></div></div></div><div className="border-t border-white/15"><div className="site-container flex flex-col gap-2 py-4 text-[0.68rem] text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {config.global.brand.name}</span><span className="font-mono">{config.global.brand.mark}</span></div></div></footer>}
            </div>
        </>
    );
}

// Kept as a compatibility export for pages that have not yet migrated their imports.
export function CustomCursor() {
    return null;
}

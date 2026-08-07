import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '@/Contexts/LanguageContext';
import {
    Briefcase,
    ChartLine,
    EnvelopeSimple,
    Globe,
    List,
    Lightning,
    Monitor,
    PaintBrush,
    Pulse,
    SignOut,
    X,
} from '@phosphor-icons/react';

const SystemifyAdminMark = () => (
    <span className="inline-flex items-center gap-2 text-white">
        <span className="flex h-8 w-8 items-center justify-center border border-white/30 bg-brand-lime text-[10px] font-black text-brand-dark font-mono tracking-[-0.12em]">S/</span>
        <span className="text-xl font-bold tracking-[-0.05em]">Systemify</span>
    </span>
);

export default function AdminLayout({ children, activeTab = 'overview', title = 'Workspace' }) {
    const { auth } = usePage().props;
    const { locale, toggleLocale } = useTranslation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navGroups = [
        {
            label: locale === 'en' ? 'Operations' : 'Operasional',
            items: [
                { id: 'overview', label: locale === 'en' ? 'Overview' : 'Ringkasan', icon: ChartLine, href: route('dashboard') },
                { id: 'pipelines', label: locale === 'en' ? 'Project pipeline' : 'Pipeline proyek', icon: Lightning, href: route('pipelines.index') },
                { id: 'briefs', label: locale === 'en' ? 'Client briefs' : 'Brief klien', icon: EnvelopeSimple, href: route('briefs.index') },
            ],
        },
        {
            label: locale === 'en' ? 'Systems' : 'Sistem',
            items: [
                { id: 'portfolios', label: locale === 'en' ? 'Selected systems' : 'Sistem pilihan', icon: Briefcase, href: route('portfolios.index') },
                { id: 'live_preview', label: locale === 'en' ? 'Live site' : 'Website live', icon: Monitor, href: route('live-preview.index') },
            ],
        },
        {
            label: locale === 'en' ? 'Diagnostics' : 'Diagnostik',
            items: [
                { id: 'diagnostics', label: locale === 'en' ? 'Runtime checks' : 'Pemeriksaan runtime', icon: Pulse, href: route('diagnostics.index') },
            ],
        },
        {
            label: locale === 'en' ? 'Site' : 'Site',
            items: [
                { id: 'site-studio', label: locale === 'en' ? 'Landing Studio' : 'Landing Studio', icon: PaintBrush, href: route('site-studio.index') },
            ],
        },
    ];

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-lime selection:text-brand-dark">
            <aside className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col border-r border-white/15 bg-brand-dark transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
                    <Link href={route('dashboard')} onClick={closeSidebar} aria-label="Systemify workspace">
                        <SystemifyAdminMark />
                    </Link>
                    <button type="button" className="border border-white/20 p-1.5 text-white/70 hover:text-white lg:hidden" onClick={closeSidebar} aria-label="Close workspace navigation"><X size={16} weight="bold" /></button>
                </div>

                <div className="px-5 py-6">
                    <p className="mono-meta text-brand-lime">Workspace</p>
                    <p className="mt-2 text-xs leading-5 text-white/45">A working view of projects, intake, and system health.</p>
                </div>

                <nav className="flex-1 px-3" aria-label="Workspace navigation">
                    {navGroups.map((group) => <div key={group.label} className="mb-6 last:mb-0"><p className="px-3 pb-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/30">{group.label}</p><div className="space-y-1">{group.items.map((item) => {
                        const Icon = item.icon;
                        const active = activeTab === item.id;
                        return <Link key={item.id} href={item.href} onClick={closeSidebar} className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm transition-colors ${active ? 'border-brand-lime bg-white/7 text-white' : 'border-transparent text-white/52 hover:bg-white/5 hover:text-white'}`} aria-current={active ? 'page' : undefined}><Icon size={18} weight={active ? 'fill' : 'regular'} className={active ? 'text-brand-lime' : 'text-white/45'} /><span>{item.label}</span></Link>;
                    })}</div></div>)}
                </nav>

                <div className="border-t border-white/15 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-white">{auth?.user?.name || 'System operator'}</p>
                            <p className="mt-1 truncate font-mono text-[0.62rem] text-white/40">{auth?.user?.email || 'operator@systemify.id'}</p>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="border border-white/15 p-2 text-white/45 hover:border-red-300/50 hover:text-red-300" title={locale === 'en' ? 'Log out' : 'Keluar'}><SignOut size={16} weight="bold" /></Link>
                    </div>
                </div>
            </aside>

            {sidebarOpen && <button type="button" className="fixed inset-0 z-40 bg-brand-dark/75 lg:hidden" onClick={closeSidebar} aria-label="Close workspace navigation overlay" />}

            <div className="min-h-screen lg:pl-[17rem]">
                <header className="sticky top-0 z-30 border-b border-white/15 bg-brand-dark">
                    <div className="flex min-h-[4.75rem] items-center justify-between gap-4 px-5 sm:px-8">
                        <div className="flex items-center gap-3">
                            <button type="button" className="border border-white/20 p-2 text-white/70 hover:text-white lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open workspace navigation"><List size={18} weight="bold" /></button>
                            <span className="hidden font-mono text-[0.64rem] uppercase tracking-[0.12em] text-white/35 sm:inline">Systemify / Workspace</span>
                            <span className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-brand-lime sm:hidden">SYS / {activeTab}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="hidden items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/50 md:flex"><span className="status-dot status-dot--operational" /> operational</span>
                            <button type="button" onClick={toggleLocale} className="border-l border-white/20 pl-3 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-brand-lime" aria-label="Switch language">{locale === 'en' ? 'ID' : 'EN'}</button>
                            <Link href="/" className="hidden items-center gap-2 border border-white/20 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-white/70 hover:border-white/50 hover:text-white sm:inline-flex"><Globe size={15} /> {locale === 'en' ? 'View site' : 'Lihat site'}</Link>
                        </div>
                    </div>
                </header>

                <main className="px-5 py-8 sm:px-8 sm:py-10">
                    <div className="mx-auto max-w-[92rem]">
                        <div className="mb-9 flex flex-col gap-4 border-b border-white/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mono-meta text-brand-lime">{activeTab === 'overview' ? '01 / System overview' : `Workspace / ${activeTab}`}</p>
                                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">{title}</h1>
                            </div>
                            <p className="max-w-xs text-xs leading-5 text-white/45">{locale === 'en' ? 'Prioritise what changed, what is blocked, and what needs a decision.' : 'Prioritaskan perubahan, hal yang terblokir, dan keputusan yang dibutuhkan.'}</p>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

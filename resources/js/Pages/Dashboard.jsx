import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    EnvelopeSimple,
    Lightning,
    Monitor,
    Plus,
    Warning,
} from '@phosphor-icons/react';

const statusLabel = (value) => {
    if (value === 'nominal' || value === 'active') return 'operational';
    if (value === 'warning' || value === 'discussion') return 'attention';
    if (value === 'critical' || value === 'offline') return 'blocked';
    return value === 'pending' || !value ? 'attention' : value;
};

const formatDate = (value) => {
    if (!value) return 'Recent';
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));
};

function StatusText({ value, label }) {
    return <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-white/65"><span className={`status-dot status-dot--${statusLabel(value)}`} />{label || value || 'pending'}</span>;
}

export default function Dashboard({
    briefs = [],
    pipelines = [],
    portfolios = [],
    auditLogs = [],
}) {
    const attentionBriefs = briefs.filter((brief) => brief.status !== 'approved').slice(0, 5);
    const operationalPipelines = pipelines.slice(0, 5);
    const featuredCount = portfolios.filter((portfolio) => portfolio.is_featured).length;
    const healthItems = [
        ['Public site', 'active', 'reachable'],
        ['Client intake', briefs.length > 0 ? 'active' : 'attention', `${briefs.length} received`],
        ['Project pipeline', operationalPipelines.length > 0 ? 'active' : 'attention', `${operationalPipelines.length} tracked`],
        ['Published evidence', featuredCount > 0 ? 'active' : 'attention', `${featuredCount} published`],
    ];

    const updateBriefStatus = (brief, status) => {
        router.patch(route('briefs.update-status', brief.id), { status }, { preserveScroll: true });
    };

    const deleteBrief = (brief) => {
        if (window.confirm(`Delete the brief from ${brief.company || brief.name}?`)) {
            router.delete(route('briefs.destroy', brief.id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout activeTab="overview" title="System overview">
            <Head title="System overview | Systemify" />

            <div className="space-y-10">
                <section className="grid gap-6 border-b border-white/15 pb-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-lime"><span className="status-dot status-dot--operational" /> Operating view</div>
                        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl">The work that needs a decision next.</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                        <div><span className="font-mono text-3xl text-white">{operationalPipelines.length}</span><p className="mt-2 text-[0.64rem] uppercase leading-4 tracking-[0.08em] text-white/45">Active projects</p></div>
                        <div><span className="font-mono text-3xl text-brand-lime">{attentionBriefs.length}</span><p className="mt-2 text-[0.64rem] uppercase leading-4 tracking-[0.08em] text-white/45">Needs attention</p></div>
                        <div><span className="font-mono text-3xl text-white">{featuredCount}</span><p className="mt-2 text-[0.64rem] uppercase leading-4 tracking-[0.08em] text-white/45">Published systems</p></div>
                    </div>
                </section>

                <section>
                    <div className="mb-4 flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Lightning size={18} className="text-brand-blue" weight="bold" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">Project pipeline</h2></div><Link href={route('pipelines.index')} className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">View all <ArrowRight size={14} /></Link></div>
                    {operationalPipelines.length > 0 ? (
                        <>
                            <div className="hidden overflow-x-auto border-y border-white/15 sm:block">
                                <table className="w-full min-w-[44rem] text-left text-sm">
                                    <thead className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35"><tr><th className="py-3 pr-6 font-normal">Project</th><th className="py-3 pr-6 font-normal">Phase</th><th className="py-3 pr-6 font-normal">Health</th><th className="py-3 pr-6 font-normal">Deadline</th><th className="py-3 text-right font-normal">Open</th></tr></thead>
                                    <tbody>{operationalPipelines.map((pipeline) => <tr key={pipeline.id} className="border-t border-white/10"><td className="py-4 pr-6"><p className="font-semibold text-white">{pipeline.project_name}</p><p className="mt-1 text-xs text-white/45">{pipeline.client_name}</p></td><td className="py-4 pr-6 font-mono text-xs uppercase text-white/65">{pipeline.phase || 'Build'}</td><td className="py-4 pr-6"><StatusText value={pipeline.health} /></td><td className="py-4 pr-6 font-mono text-xs text-white/55">{formatDate(pipeline.deadline)}</td><td className="py-4 text-right"><Link href={route('pipelines.index')} className="text-brand-lime hover:text-white" aria-label={`Open ${pipeline.project_name}`}><ArrowUpRight size={17} weight="bold" /></Link></td></tr>)}</tbody>
                                </table>
                            </div>
                            <div className="border-y border-white/15 sm:hidden">
                                {operationalPipelines.map((pipeline) => <div key={pipeline.id} className="border-b border-white/10 py-4 last:border-b-0"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-white">{pipeline.project_name}</p><p className="mt-1 text-xs text-white/45">{pipeline.client_name}</p></div><Link href={route('pipelines.index')} className="text-brand-lime" aria-label={`Open ${pipeline.project_name}`}><ArrowUpRight size={17} weight="bold" /></Link></div><div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55"><span className="font-mono uppercase">{pipeline.phase || 'Build'}</span><StatusText value={pipeline.health} /><span className="font-mono">Due {formatDate(pipeline.deadline)}</span></div></div>)}
                            </div>
                        </>
                    ) : <div className="border border-dashed border-white/20 px-5 py-10 text-sm text-white/45">No active projects yet. A new pipeline will appear here when work is ready to be tracked.</div>}
                </section>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
                    <section>
                        <div className="mb-4 flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Warning size={18} className="text-brand-lime" weight="bold" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">Needs attention</h2></div><Link href={route('briefs.index')} className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">Open intake <ArrowRight size={14} /></Link></div>
                        <div className="border-t border-white/15">
                            {attentionBriefs.length > 0 ? attentionBriefs.map((brief) => (
                                <article key={brief.id} className="border-b border-white/15 py-5">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><h3 className="text-base font-semibold text-white">{brief.company || 'Personal project'}</h3><StatusText value={brief.status} /></div><p className="mt-1 text-xs text-white/45">{brief.name} · {brief.email} · {brief.budget || 'Budget not set'}</p><p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">{brief.message}</p></div>
                                        <span className="shrink-0 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/35">{formatDate(brief.created_at)}</span>
                                    </div>
                                    <div className="mt-5 flex flex-wrap items-center gap-2">
                                        {brief.status === 'pending' && <button type="button" onClick={() => updateBriefStatus(brief, 'discussion')} className="button-primary py-2 text-[0.64rem]">Move to discussion <ArrowRight size={14} /></button>}
                                        {brief.status === 'discussion' && <button type="button" onClick={() => updateBriefStatus(brief, 'approved')} className="button-primary py-2 text-[0.64rem]">Mark approved <Check size={14} weight="bold" /></button>}
                                        <Link href={route('briefs.index')} className="button-secondary py-2 text-[0.64rem] text-white/75">Open brief</Link>
                                        <button type="button" onClick={() => deleteBrief(brief)} className="px-2 py-2 text-[0.65rem] uppercase tracking-[0.08em] text-red-300/70 hover:text-red-200">Delete</button>
                                    </div>
                                </article>
                            )) : <div className="border-b border-white/15 py-10 text-sm text-white/45">No unresolved client intake. The queue is clear.</div>}
                        </div>
                    </section>

                    <aside className="space-y-8">
                        <section>
                            <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><Monitor size={18} className="text-brand-blue" weight="bold" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">System health</h2></div><Link href={route('diagnostics.index')} className="text-white/45 hover:text-white" aria-label="Open runtime diagnostics"><ArrowUpRight size={17} /></Link></div>
                            <div className="border-y border-white/15">{healthItems.map(([label, value, detail]) => <div key={label} className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0"><span className="text-sm text-white/65">{label}</span><span className="text-right"><StatusText value={value} label={detail} /></span></div>)}</div>
                        </section>

                        <section>
                            <div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><EnvelopeSimple size={18} className="text-brand-lime" weight="bold" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-white">Recent activity</h2></div></div>
                            <div className="border-t border-white/15">{auditLogs.length > 0 ? auditLogs.map((log) => <div key={log.id} className="border-b border-white/10 py-3"><p className="text-xs leading-5 text-white/70">{log.event}</p><p className="mt-1 font-mono text-[0.62rem] text-white/35">{formatDate(log.created_at)} · {log.ip}</p></div>) : <p className="border-b border-white/15 py-5 text-xs text-white/45">No recent activity logged.</p>}</div>
                        </section>

                        <section className="border-t border-white/15 pt-5"><p className="mono-meta text-brand-lime">Quick actions</p><div className="mt-4 flex flex-col items-start gap-3"><Link href={route('pipelines.index')} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><Plus size={15} /> New project pipeline</Link><Link href={route('portfolios.index')} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowUpRight size={15} /> Manage selected systems</Link></div></section>
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}

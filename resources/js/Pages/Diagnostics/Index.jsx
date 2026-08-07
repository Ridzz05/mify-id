import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, Database, GitBranch, Pulse, Wrench } from '@phosphor-icons/react';
import AdminLayout from '@/Layouts/AdminLayout';

const stateLabel = (value) => value === 'active' ? 'operational' : value === 'warning' ? 'attention' : 'blocked';

function DiagnosticRow({ label, value, detail, icon: Icon }) {
    return (
        <div className="flex flex-col gap-3 border-b border-white/10 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <Icon size={18} className="mt-0.5 text-brand-blue" />
                <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-white/45">{detail}</p>
                </div>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-white/70">
                <span className={`status-dot status-dot--${stateLabel(value)}`} />
                {value}
            </span>
        </div>
    );
}

export default function DiagnosticsIndex({ openDesignStatus = 'offline', viteStatus = 'offline', dbSize = 'N/A', gitCommit = 'N/A' }) {
    return (
        <AdminLayout activeTab="diagnostics" title="Runtime diagnostics">
            <Head title="Runtime diagnostics | Systemify" />

            <div className="space-y-10">
                <section className="grid gap-6 border-b border-white/15 pb-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-lime"><Pulse size={15} weight="bold" /> System / diagnostics</div>
                        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl">Technical checks belong here, away from the operating queue.</h2>
                    </div>
                    <p className="max-w-sm text-sm leading-7 text-white/55">Use this view to verify the local runtime, development services, data store, and current source state.</p>
                </section>

                <section className="border-y border-white/15">
                    <DiagnosticRow label="Open Design daemon" value={openDesignStatus} detail="Local design tooling on port 7456." icon={Wrench} />
                    <DiagnosticRow label="Vite compiler" value={viteStatus} detail="Development asset server on port 5173." icon={Pulse} />
                    <DiagnosticRow label="Application database" value={dbSize === 'N/A' ? 'offline' : 'active'} detail={`SQLite footprint: ${dbSize}.`} icon={Database} />
                    <DiagnosticRow label="Source revision" value="active" detail={gitCommit} icon={GitBranch} />
                </section>

                <section className="flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xl text-sm leading-6 text-white/50">Diagnostics describe the environment. They do not replace testing, deployment checks, or evidence review.</p>
                    <Link href={route('live-preview.index')} className="inline-flex items-center gap-2 text-sm text-brand-lime hover:text-white">Review public surface <ArrowUpRight size={16} /></Link>
                </section>
            </div>
        </AdminLayout>
    );
}

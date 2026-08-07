import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowRight,
    Check,
    Cpu,
    EnvelopeSimple,
    MagnifyingGlass,
    Trash,
    User,
    Warning,
} from '@phosphor-icons/react';

const statusColor = (status) => status === 'approved' ? 'operational' : status === 'discussion' || status === 'pending' ? 'attention' : 'blocked';

const dateLabel = (value) => value ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value)) : 'Recent';

export default function BriefsIndex({ briefs = [] }) {
    const [selectedId, setSelectedId] = useState(briefs[0]?.id || null);
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('all');
    const [priority, setPriority] = useState('all');
    const selectedBrief = briefs.find((brief) => brief.id === selectedId) || null;
    const { data, setData, patch, processing, errors } = useForm({ priority: selectedBrief?.priority || 'medium', notes: selectedBrief?.notes || '' });

    const chooseBrief = (brief) => {
        setSelectedId(brief.id);
        setData({ priority: brief.priority || 'medium', notes: brief.notes || '' });
    };

    const filteredBriefs = briefs.filter((brief) => {
        const haystack = `${brief.name} ${brief.company || ''} ${brief.email} ${brief.current_workflow || ''} ${brief.operational_constraint || ''} ${brief.desired_change || ''} ${brief.message || ''}`.toLowerCase();
        return haystack.includes(query.toLowerCase()) && (status === 'all' || brief.status === status) && (priority === 'all' || brief.priority === priority);
    });

    const saveNotes = (event) => {
        event.preventDefault();
        if (!selectedBrief) return;
        patch(route('briefs.update-notes-priority', selectedBrief.id), { preserveScroll: true });
    };

    const updateStatus = (nextStatus) => {
        if (!selectedBrief) return;
        router.patch(route('briefs.update-status', selectedBrief.id), { status: nextStatus }, { preserveScroll: true });
    };

    const removeBrief = () => {
        if (!selectedBrief || !window.confirm(`Delete the brief from ${selectedBrief.company || selectedBrief.name}?`)) return;
        router.delete(route('briefs.destroy', selectedBrief.id), { preserveScroll: true, onSuccess: () => setSelectedId(null) });
    };

    const generateBlueprint = () => {
        if (!selectedBrief) return;
        router.post(route('briefs.generate-blueprint', selectedBrief.id), { focus: 'speed' }, { preserveScroll: true });
    };

    return (
        <AdminLayout activeTab="briefs" title="Client intake">
            <Head title="Client intake | Systemify" />
            <div className="space-y-8">
                <div className="grid grid-cols-2 gap-5 border-b border-white/15 pb-7 md:grid-cols-4">
                    {[['Total submissions', briefs.length, 'text-white'], ['Needs attention', briefs.filter((brief) => brief.status === 'pending').length, 'text-brand-lime'], ['Approved', briefs.filter((brief) => brief.status === 'approved').length, 'text-white'], ['Conversion', `${briefs.length ? Math.round((briefs.filter((brief) => brief.status === 'approved').length / briefs.length) * 100) : 0}%`, 'text-brand-blue']].map(([label, value, color]) => <div key={label}><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">{label}</p><p className={`mt-2 font-mono text-2xl ${color}`}>{value}</p></div>)}
                </div>

                <div className="flex flex-col gap-3 border-y border-white/15 py-4 md:flex-row md:items-center">
                    <label className="flex min-w-0 flex-1 items-center gap-3 border border-white/15 px-3 py-2"><MagnifyingGlass size={17} className="text-white/45" /><span className="sr-only">Search client intake</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, company, or message" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" /></label>
                    <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)} className="border border-white/15 bg-brand-dark px-3 py-2 text-sm text-white"><option value="all">All status</option><option value="pending">Pending</option><option value="discussion">Discussion</option><option value="approved">Approved</option></select>
                    <select aria-label="Filter by priority" value={priority} onChange={(event) => setPriority(event.target.value)} className="border border-white/15 bg-brand-dark px-3 py-2 text-sm text-white"><option value="all">All priority</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-start">
                    <section>
                        <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><EnvelopeSimple size={18} className="text-brand-lime" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em]">Inbox</h2></div><span className="font-mono text-[0.64rem] text-white/35">{filteredBriefs.length} visible</span></div>
                        <div className="border-t border-white/15">
                            {filteredBriefs.length > 0 ? filteredBriefs.map((brief) => <button key={brief.id} type="button" onClick={() => chooseBrief(brief)} className={`block w-full border-b border-white/15 p-5 text-left transition-colors ${selectedId === brief.id ? 'bg-white/8' : 'hover:bg-white/5'}`}><div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="truncate font-semibold text-white">{brief.company || 'Personal project'}</h3><p className="mt-1 truncate text-xs text-white/45">{brief.name} · {brief.email}</p></div><span className="inline-flex shrink-0 items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/55"><span className={`status-dot status-dot--${statusColor(brief.status)}`} />{brief.status}</span></div><p className="mt-4 line-clamp-2 text-sm leading-6 text-white/60">{brief.desired_change || brief.message}</p><div className="mt-4 flex items-center justify-between gap-3 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/35"><span>{brief.priority || 'medium'} priority</span><span>{dateLabel(brief.created_at)}</span></div></button>) : <div className="border-b border-white/15 py-12 text-center text-sm text-white/45">No intake matches the current filters.</div>}
                        </div>
                    </section>

                    <aside className="border-t border-white/15 lg:border lg:border-white/15 lg:p-6">
                        {selectedBrief ? <>
                            <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5"><div><p className="mono-meta text-brand-lime">Selected intake</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{selectedBrief.company || 'Personal project'}</h2><p className="mt-2 flex items-center gap-2 text-xs text-white/45"><User size={14} /> {selectedBrief.name} · {selectedBrief.email}</p></div><button type="button" onClick={removeBrief} className="p-2 text-white/40 hover:text-red-300" title="Delete brief"><Trash size={17} /></button></div>
                            <div className="mt-6 space-y-6"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Operational brief</p><div className="mt-4 grid gap-4 border-y border-white/15 py-4">{[['Current workflow', selectedBrief.current_workflow], ['Constraint', selectedBrief.operational_constraint], ['Desired change', selectedBrief.desired_change], ['Timeline', selectedBrief.timeline]].map(([label, value]) => <div key={label}><p className="font-mono text-[0.62rem] uppercase text-white/35">{label}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/75">{value || 'Not provided'}</p></div>)}</div><p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Canonical message</p><p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/75">{selectedBrief.message}</p></div><div className="grid grid-cols-2 gap-4 border-y border-white/15 py-4"><div><p className="font-mono text-[0.62rem] uppercase text-white/35">Budget</p><p className="mt-2 text-sm text-white">{selectedBrief.budget || 'Not set'}</p></div><div><p className="font-mono text-[0.62rem] uppercase text-white/35">Received</p><p className="mt-2 text-sm text-white">{dateLabel(selectedBrief.created_at)}</p></div></div><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Detected stack</p><div className="mt-3 flex flex-wrap gap-2">{(selectedBrief.tech_stack || []).length > 0 ? selectedBrief.tech_stack.map((tech) => <span key={tech} className="border border-brand-lime/30 px-2 py-1 font-mono text-[0.62rem] text-brand-lime">{tech}</span>) : <span className="text-sm text-white/45">No stack named yet</span>}</div></div></div>
                            <div className="mt-7 border-t border-white/15 pt-6"><div className="flex flex-wrap gap-2"><button type="button" onClick={() => updateStatus('discussion')} className="button-secondary py-2 text-[0.64rem] text-white">Move to discussion</button><button type="button" onClick={() => updateStatus('approved')} className="button-primary py-2 text-[0.64rem]">Approve <Check size={14} weight="bold" /></button></div><button type="button" onClick={generateBlueprint} className="mt-3 inline-flex items-center gap-2 text-xs text-brand-blue hover:text-brand-lime"><Cpu size={15} /> {selectedBrief.ai_blueprint ? 'Regenerate system blueprint' : 'Generate system blueprint'} <ArrowRight size={14} /></button></div>
                            <form onSubmit={saveNotes} className="mt-7 border-t border-white/15 pt-6"><label className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Internal notes<select value={data.priority} onChange={(event) => setData('priority', event.target.value)} className="mt-3 w-full border border-white/15 bg-brand-dark px-3 py-2 text-sm text-white"><option value="high">High priority</option><option value="medium">Medium priority</option><option value="low">Low priority</option></select><textarea value={data.notes} onChange={(event) => setData('notes', event.target.value)} className="mt-3 min-h-24 w-full border border-white/15 bg-white/5 p-3 text-sm text-white outline-none focus:border-brand-lime" placeholder="Record the next decision or constraint…" /></label>{errors.notes && <p className="mt-2 text-xs text-red-300">{errors.notes}</p>}<button type="submit" disabled={processing} className="button-secondary mt-3 py-2 text-[0.64rem] text-white">Save notes</button></form>
                        </> : <div className="py-14 text-center text-sm text-white/45"><Warning size={24} className="mx-auto mb-3 text-brand-lime" />Select an intake item to review its message and next action.</div>}
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}

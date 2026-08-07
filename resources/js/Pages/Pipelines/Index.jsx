import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowRight,
    Check,
    Gear,
    Lightning,
    Plus,
    Trash,
    X,
} from '@phosphor-icons/react';

const phases = [
    ['discovery', 'Discovery & spec', 25],
    ['database_setup', 'Database & API sync', 50],
    ['core_features', 'Core features build', 75],
    ['deployment', 'Final audit & deploy', 100],
];

const statusColor = (health) => health === 'nominal' ? 'operational' : health === 'warning' ? 'attention' : 'blocked';

const emptyForm = { project_name: '', client_name: '', client_email: '', tech_stack: [], budget: '', phase: 'discovery', health: 'nominal', repo_commit: '', system_architecture: { frontend: '', backend: '', database: '', hosting: '' }, deadline: '', brief_id: null };

export default function PipelinesIndex({ pipelines = [], approvedBriefs = [] }) {
    const [formOpen, setFormOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const { data, setData, post, patch, processing, errors, reset } = useForm(emptyForm);

    const openCreate = (brief = null) => {
        if (brief) {
            const architecture = brief.ai_blueprint?.architecture || {};
            setData({ ...emptyForm, project_name: `${brief.company || brief.name}'s system`, client_name: brief.name, client_email: brief.email, tech_stack: brief.tech_stack || [], budget: brief.budget || '', system_architecture: { frontend: architecture.frontend || 'React + Tailwind', backend: architecture.backend || 'Laravel monolith', database: architecture.database || 'SQLite', hosting: architecture.hosting || 'Managed production host' }, deadline: new Date(Date.now() + 60 * 86400000).toISOString().slice(0, 10), brief_id: brief.id });
        } else {
            reset();
            setData(emptyForm);
        }
        setEditing(null);
        setFormOpen(true);
    };

    const openEdit = (pipeline) => {
        setEditing(pipeline);
        setData({ ...pipeline, tech_stack: pipeline.tech_stack || [], system_architecture: pipeline.system_architecture || emptyForm.system_architecture });
        setFormOpen(true);
    };

    const closeForm = () => { setFormOpen(false); setEditing(null); reset(); };

    const submit = (event) => {
        event.preventDefault();
        const options = { onSuccess: closeForm };
        if (editing) patch(route('pipelines.update', editing.id), options);
        else post(route('pipelines.store'), options);
    };

    const remove = (pipeline) => {
        if (window.confirm(`Delete ${pipeline.project_name}?`)) router.delete(route('pipelines.destroy', pipeline.id), { preserveScroll: true });
    };

    return (
        <AdminLayout activeTab="pipelines" title="Project pipeline">
            <Head title="Project pipeline | Systemify" />
            <div className="space-y-8">
                <div className="flex flex-col gap-4 border-b border-white/15 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="mono-meta text-brand-lime">Live build tracker / {pipelines.length} projects</p><p className="mt-3 max-w-xl text-sm leading-6 text-white/55">Keep the current phase, health, and next delivery visible to the people operating the work.</p></div><button type="button" onClick={() => openCreate()} className="button-primary self-start py-2 text-[0.65rem]"><Plus size={15} weight="bold" /> New pipeline</button></div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
                    <section>
                        <div className="mb-3 flex items-center gap-2"><Lightning size={18} className="text-brand-blue" weight="bold" /><h2 className="text-sm font-semibold uppercase tracking-[0.08em]">Active projects</h2></div>
                        <div className="border-t border-white/15">
                            {pipelines.length > 0 ? pipelines.map((pipeline) => { const phase = phases.find(([key]) => key === pipeline.phase) || phases[0]; return <article key={pipeline.id} className="border-b border-white/15 py-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex items-center gap-3"><h3 className="text-lg font-semibold text-white">{pipeline.project_name}</h3><span className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase text-white/55"><span className={`status-dot status-dot--${statusColor(pipeline.health)}`} />{pipeline.health}</span></div><p className="mt-1 text-xs text-white/45">{pipeline.client_name} · {pipeline.client_email}</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => openEdit(pipeline)} className="p-2 text-white/45 hover:text-white" title={`Edit ${pipeline.project_name}`}><Gear size={16} /></button><button type="button" onClick={() => remove(pipeline)} className="p-2 text-white/45 hover:text-red-300" title={`Delete ${pipeline.project_name}`}><Trash size={16} /></button></div></div><div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"><div><div className="flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/45"><span>{phase[1]}</span><span className="text-brand-lime">{phase[2]}%</span></div><div className="mt-2 h-1 bg-white/15"><div className={`h-full ${pipeline.health === 'critical' ? 'bg-red-400' : 'bg-brand-blue'}`} style={{ width: `${phase[2]}%` }} /></div></div><div className="text-right font-mono text-[0.62rem] uppercase text-white/35">Due {pipeline.deadline || '—'}</div></div><div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">{(pipeline.tech_stack || []).map((tech) => <span key={tech} className="border border-white/15 px-2 py-1 font-mono text-[0.62rem] text-white/55">{tech}</span>)}</div></article>; }) : <div className="border-b border-dashed border-white/20 py-12 text-sm text-white/45">No projects are being tracked yet.</div>}
                        </div>
                    </section>

                    <aside className="border-t border-white/15 pt-6 lg:border lg:p-6 lg:pt-6"><p className="mono-meta text-brand-lime">Approved intake / ready to convert</p><div className="mt-5 border-t border-white/15">{approvedBriefs.length > 0 ? approvedBriefs.map((brief) => <div key={brief.id} className="border-b border-white/15 py-4"><div className="flex items-start justify-between gap-3"><div><h3 className="text-sm font-semibold text-white">{brief.company || 'Personal project'}</h3><p className="mt-1 text-xs text-white/45">{brief.name} · {brief.budget}</p></div><button type="button" onClick={() => openCreate(brief)} className="text-brand-lime hover:text-white" title={`Convert ${brief.company || brief.name}`}><ArrowRight size={17} weight="bold" /></button></div></div>) : <p className="border-b border-white/15 py-5 text-sm text-white/45">Approved client briefs will appear here before they become tracked projects.</p>}</div></aside>
                </div>
            </div>

            {formOpen && <div className="fixed inset-0 z-[100] overflow-y-auto bg-brand-dark/90 p-4 sm:p-8"><div className="mx-auto max-w-3xl border border-white/20 bg-brand-dark p-6 sm:p-8"><div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5"><div><p className="mono-meta text-brand-lime">{editing ? 'Edit project' : data.brief_id ? 'Convert approved intake' : 'New project'}</p><h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{editing ? editing.project_name : 'Define the operating system'}</h2></div><button type="button" onClick={closeForm} className="p-2 text-white/45 hover:text-white" aria-label="Close form"><X size={18} /></button></div><form onSubmit={submit} className="mt-6 space-y-6"><div className="grid gap-4 sm:grid-cols-2">{[['project_name', 'Project name'], ['client_name', 'Client name'], ['client_email', 'Client email'], ['budget', 'Budget'], ['repo_commit', 'Current commit'], ['deadline', 'Target deadline']].map(([key, label]) => <label key={key} className="block text-sm font-semibold text-white/75">{label}<input type={key === 'client_email' ? 'email' : key === 'deadline' ? 'date' : 'text'} value={data[key] || ''} onChange={(event) => setData(key, event.target.value)} className="brand-input mt-2" required={['project_name', 'client_name', 'client_email', 'budget', 'deadline'].includes(key)} />{errors[key] && <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>}</label>)}</div><label className="block text-sm font-semibold text-white/75">Technologies<input value={(data.tech_stack || []).join(', ')} onChange={(event) => setData('tech_stack', event.target.value.split(',').map((item) => item.trim()).filter(Boolean))} className="brand-input mt-2" placeholder="Laravel, React, PostgreSQL" required /></label><div className="grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2"><label className="block text-sm font-semibold text-white/75">Phase<select value={data.phase} onChange={(event) => setData('phase', event.target.value)} className="brand-input mt-2"><option value="discovery">Discovery & spec</option><option value="database_setup">Database & API sync</option><option value="core_features">Core features build</option><option value="deployment">Final audit & deploy</option></select></label><label className="block text-sm font-semibold text-white/75">Health<select value={data.health} onChange={(event) => setData('health', event.target.value)} className="brand-input mt-2"><option value="nominal">Operational</option><option value="warning">Attention</option><option value="critical">Blocked</option></select></label></div><div className="grid gap-4 border-t border-white/15 pt-5 sm:grid-cols-2">{['frontend', 'backend', 'database', 'hosting'].map((key) => <label key={key} className="block text-sm font-semibold text-white/75">{key}<input value={data.system_architecture?.[key] || ''} onChange={(event) => setData('system_architecture', { ...data.system_architecture, [key]: event.target.value })} className="brand-input mt-2" required /></label>)}</div><div className="flex justify-end gap-3 border-t border-white/15 pt-5"><button type="button" onClick={closeForm} className="button-secondary text-white">Cancel</button><button type="submit" disabled={processing} className="button-primary">{processing ? 'Saving…' : editing ? 'Save project' : 'Create project'} <Check size={15} weight="bold" /></button></div></form></div></div>}
        </AdminLayout>
    );
}

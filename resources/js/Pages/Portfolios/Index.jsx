import { useRef, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ArrowUpRight,
    Check,
    FolderSimple,
    MagnifyingGlass,
    PencilSimple,
    Plus,
    Star,
    Trash,
    UploadSimple,
    X,
} from '@phosphor-icons/react';

const blank = {
    system_code: '',
    title: '',
    category: 'Web System',
    description: '',
    problem: '',
    solution: '',
    result: '',
    image: null,
    image_url_input: '',
    image_alt: '',
    project_url: '',
    tech_stack: 'Laravel, React, Inertia',
    is_featured: true,
    order: 0,
};

export default function PortfoliosIndex({ portfolios = [], categories = [] }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);
    const { data, setData, processing, errors, reset, clearErrors } = useForm(blank);
    const categoryList = ['All', ...new Set([...categories, ...portfolios.map((portfolio) => portfolio.category)])];
    const visible = portfolios.filter((portfolio) => {
        const haystack = [portfolio.system_code, portfolio.title, portfolio.description, portfolio.problem, portfolio.solution, portfolio.result].join(' ').toLowerCase();
        return haystack.includes(query.toLowerCase()) && (category === 'All' || portfolio.category === category);
    });

    const openCreate = () => {
        setEditing(null);
        reset();
        clearErrors();
        setPreview(null);
        setModalOpen(true);
    };

    const openEdit = (portfolio) => {
        setEditing(portfolio);
        clearErrors();
        setData({
            system_code: portfolio.system_code || '',
            title: portfolio.title || '',
            category: portfolio.category || 'Web System',
            description: portfolio.description || '',
            problem: portfolio.problem || '',
            solution: portfolio.solution || '',
            result: portfolio.result || '',
            image: null,
            image_url_input: portfolio.image_path || '',
            image_alt: portfolio.image_alt || '',
            project_url: portfolio.project_url || '',
            tech_stack: (portfolio.tech_stack || []).join(', '),
            is_featured: Boolean(portfolio.is_featured),
            order: portfolio.order || 0,
        });
        setPreview(portfolio.image_url || null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(null);
        reset();
    };

    const selectFile = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'tech_stack' && key !== 'image' && value !== null && value !== '') formData.append(key, value);
        });
        if (data.image) formData.append('image', data.image);
        String(data.tech_stack || '').split(',').map((item) => item.trim()).filter(Boolean).forEach((item, index) => formData.append(`tech_stack[${index}]`, item));
        formData.set('is_featured', data.is_featured ? '1' : '0');
        router.post(editing ? route('portfolios.update', editing.id) : route('portfolios.store'), formData, { forceFormData: true, onSuccess: closeModal });
    };

    const toggleFeatured = (portfolio) => {
        const formData = new FormData();
        const fields = ['system_code', 'title', 'category', 'description', 'problem', 'solution', 'result', 'image_alt', 'project_url', 'order'];
        fields.forEach((field) => formData.append(field, portfolio[field] ?? ''));
        (portfolio.tech_stack || []).forEach((tech, index) => formData.append(`tech_stack[${index}]`, tech));
        formData.append('is_featured', portfolio.is_featured ? '0' : '1');
        router.post(route('portfolios.update', portfolio.id), formData, { forceFormData: true, preserveScroll: true });
    };

    const remove = (portfolio) => {
        if (window.confirm(`Delete ${portfolio.title}?`)) router.delete(route('portfolios.destroy', portfolio.id), { preserveScroll: true });
    };

    return (
        <AdminLayout activeTab="portfolios" title="Selected systems">
            <Head title="Selected systems | Systemify" />

            <div className="space-y-8">
                <div className="flex flex-col gap-4 border-b border-white/15 pb-7 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mono-meta text-brand-lime">Public evidence / {portfolios.length} records</p>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">Publish the problem, system, result, and stack that give prospective clients something concrete to evaluate.</p>
                    </div>
                    <button type="button" onClick={openCreate} className="button-primary self-start py-2 text-[0.65rem]"><Plus size={15} weight="bold" /> Add system</button>
                </div>

                <div className="flex flex-col gap-3 border-y border-white/15 py-4 md:flex-row md:items-center">
                    <label className="flex min-w-0 flex-1 items-center gap-3 border border-white/15 px-3 py-2">
                        <MagnifyingGlass size={17} className="text-white/45" />
                        <span className="sr-only">Search systems</span>
                        <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" placeholder="Search systems or evidence" />
                    </label>
                    <div className="flex gap-2 overflow-x-auto" aria-label="Filter systems by category">
                        {categoryList.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap border px-3 py-2 text-xs ${category === item ? 'border-brand-lime text-brand-lime' : 'border-white/15 text-white/50 hover:text-white'}`} aria-pressed={category === item}>{item}</button>)}
                    </div>
                </div>

                {visible.length > 0 ? (
                    <div className="border-t border-white/15">
                        {visible.map((portfolio) => (
                            <article key={portfolio.id} className="grid gap-5 border-b border-white/15 py-6 md:grid-cols-[12rem_minmax(0,1fr)_auto] md:items-start">
                                <div className="aspect-video overflow-hidden border border-white/10 bg-white/[0.02]">
                                    {portfolio.image_url ? <img src={portfolio.image_url} alt={portfolio.image_alt || `${portfolio.title} system evidence`} className="h-full w-full object-cover" loading="lazy" /> : <div className="flex h-full items-center justify-center p-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/35">Evidence image pending</div>}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="mono-meta text-brand-lime">{portfolio.system_code || 'SYS—PENDING'}</span>
                                        <span className="mono-meta text-white/45">{portfolio.category}</span>
                                        {portfolio.is_featured && <span className="inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase text-white/45"><Star size={13} weight="fill" className="text-brand-lime" /> Published</span>}
                                    </div>
                                    <h2 className="mt-2 text-lg font-semibold text-white">{portfolio.title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-white/55">{portfolio.description}</p>
                                    <dl className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-sm sm:grid-cols-3">
                                        <div><dt className="mono-meta text-white/35">Problem</dt><dd className="mt-1 text-white/70">{portfolio.problem || 'Not documented'}</dd></div>
                                        <div><dt className="mono-meta text-white/35">Result</dt><dd className="mt-1 text-white/70">{portfolio.result || 'Not documented'}</dd></div>
                                        <div><dt className="mono-meta text-white/35">Stack</dt><dd className="mt-1 text-white/70">{(portfolio.tech_stack || []).join(' / ') || 'Not documented'}</dd></div>
                                    </dl>
                                </div>
                                <div className="flex items-center gap-3 md:flex-col md:items-end">
                                    <button type="button" onClick={() => toggleFeatured(portfolio)} className="text-xs text-white/50 hover:text-brand-lime">{portfolio.is_featured ? 'Unpublish' : 'Publish'}</button>
                                    <div className="flex items-center gap-2">
                                        <button type="button" onClick={() => openEdit(portfolio)} className="p-2 text-white/45 hover:text-white" title={`Edit ${portfolio.title}`} aria-label={`Edit ${portfolio.title}`}><PencilSimple size={16} /></button>
                                        <button type="button" onClick={() => remove(portfolio)} className="p-2 text-white/45 hover:text-red-300" title={`Delete ${portfolio.title}`} aria-label={`Delete ${portfolio.title}`}><Trash size={16} /></button>
                                        {portfolio.project_url && <a href={portfolio.project_url} target="_blank" rel="noreferrer" className="p-2 text-white/45 hover:text-brand-lime" title={`Open ${portfolio.title}`} aria-label={`Open ${portfolio.title}`}><ArrowUpRight size={16} /></a>}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="border border-dashed border-white/20 py-14 text-center text-sm text-white/45"><FolderSimple size={24} className="mx-auto mb-3 text-white/35" />No systems match the current filters.</div>
                )}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto bg-brand-dark/90 p-4 sm:p-8" role="presentation">
                    <div className="mx-auto max-w-3xl border border-white/20 bg-brand-dark p-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="evidence-form-title">
                        <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
                            <div><p className="mono-meta text-brand-lime">{editing ? 'Edit evidence record' : 'New evidence record'}</p><h2 id="evidence-form-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{editing ? editing.title : 'Add selected system'}</h2></div>
                            <button type="button" onClick={closeModal} className="p-2 text-white/45 hover:text-white" aria-label="Close evidence form"><X size={18} /></button>
                        </div>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div className="grid gap-4 sm:grid-cols-3">
                                {[['system_code', 'System ID'], ['title', 'System title'], ['category', 'Category']].map(([key, label]) => <label key={key} className="block text-sm font-semibold text-white/75">{label}<input value={data[key] || ''} onChange={(event) => setData(key, event.target.value)} className="brand-input mt-2" placeholder={key === 'system_code' ? 'Auto: SYS-001' : ''} required={key === 'title' || key === 'category'} />{errors[key] && <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>}</label>)}
                            </div>
                            <label className="block text-sm font-semibold text-white/75">Summary<textarea value={data.description} onChange={(event) => setData('description', event.target.value)} className="brand-input mt-2 min-h-24 resize-y" required />{errors.description && <span className="mt-1 block text-xs text-red-300">{errors.description}</span>}</label>
                            <div className="grid gap-4 md:grid-cols-3">
                                {[['problem', 'Problem'], ['solution', 'System / solution'], ['result', 'Result']].map(([key, label]) => <label key={key} className="block text-sm font-semibold text-white/75">{label}<textarea value={data[key] || ''} onChange={(event) => setData(key, event.target.value)} className="brand-input mt-2 min-h-32 resize-y" placeholder={`Document the ${label.toLowerCase()}.`} />{errors[key] && <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>}</label>)}
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block text-sm font-semibold text-white/75">Stack<input value={data.tech_stack} onChange={(event) => setData('tech_stack', event.target.value)} className="brand-input mt-2" placeholder="Laravel, React, Inertia" /></label>
                                <label className="block text-sm font-semibold text-white/75">Project URL<input value={data.project_url} onChange={(event) => setData('project_url', event.target.value)} className="brand-input mt-2" /></label>
                            </div>
                            <div className="border-t border-white/15 pt-5">
                                <p className="mono-meta text-white/45">Approved evidence image</p>
                                {preview && <img src={preview} alt={data.image_alt || 'Evidence preview'} className="mt-3 h-40 w-full object-cover" />}
                                {!preview && <div className="mt-3 border border-dashed border-white/20 p-6 text-center font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/35">No image attached yet</div>}
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <button type="button" onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center border border-dashed border-white/20 p-4 text-sm text-white/60 hover:border-brand-lime hover:text-brand-lime"><UploadSimple size={20} /><span className="mt-2">Upload approved image</span></button>
                                    <div><input ref={fileRef} type="file" accept="image/*" onChange={selectFile} className="hidden" /><input value={data.image_url_input} onChange={(event) => { setData('image_url_input', event.target.value); setPreview(event.target.value); }} className="brand-input" placeholder="Or paste approved image URL" /><input value={data.image_alt} onChange={(event) => setData('image_alt', event.target.value)} className="brand-input mt-3" placeholder="Image description" /></div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5"><label className="flex items-center gap-3 text-sm text-white/70"><input type="checkbox" checked={Boolean(data.is_featured)} onChange={(event) => setData('is_featured', event.target.checked)} className="h-4 w-4 accent-brand-lime" /> Publish on public selected systems</label><div className="flex gap-3"><button type="button" onClick={closeModal} className="button-secondary text-white">Cancel</button><button type="submit" disabled={processing} className="button-primary">{processing ? 'Saving…' : editing ? 'Save evidence' : 'Save system'} <Check size={15} weight="bold" /></button></div></div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

import { useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { ArrowClockwise, ClockCounterClockwise, Eye, FloppyDisk, PaintBrush, RocketLaunch, SlidersHorizontal } from '@phosphor-icons/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { LandingRenderer } from '@/Pages/Landing/LandingRenderer';
import { landingSections } from '@/Pages/Landing/config/defaults';
import { motionDelayOptions, motionDurationOptions, motionIntensityOptions, motionPresets, motionScrollOptions } from '@/Pages/Landing/config/motionPresets';
import { normalizeLandingConfig } from '@/Pages/Landing/config/schema';
import { shapeOptions, shapeTokens } from '@/Pages/Landing/config/shapeTokens';

const viewportOptions = [1440, 1024, 768, 390, 360];
const inspectorTabs = [
    { id: 'content', label: 'Content', icon: Eye },
    { id: 'layout', label: 'Layout', icon: SlidersHorizontal },
    { id: 'shape', label: 'Shape', icon: PaintBrush },
    { id: 'motion', label: 'Motion', icon: ArrowClockwise },
];

const sectionEditorFields = {
    disciplines: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
        { key: 'intro', label: 'Intro', multiline: true },
    ],
    systems: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
        { key: 'intro', label: 'Intro', multiline: true },
    ],
    transformation: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
    ],
    process: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
    ],
    principles: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
    ],
    intake: [
        { key: 'eyebrow', label: 'Eyebrow' },
        { key: 'title', label: 'Title', multiline: true },
        { key: 'intro', label: 'Intro', multiline: true },
    ],
};

const dateLabel = (value) => value ? new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : 'Not published';

function OptionGroup({ label, value, options, onChange }) {
    return (
        <fieldset className="border-t border-white/10 pt-4">
            <legend className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">{label}</legend>
            <div className="mt-3 grid grid-cols-2 gap-2">
                {options.map((option) => <button key={option.value} type="button" onClick={() => onChange(option.value)} className={`border px-3 py-2 text-left text-xs transition-colors ${value === option.value ? 'border-brand-lime bg-brand-lime/10 text-brand-lime' : 'border-white/15 text-white/55 hover:border-white/35 hover:text-white'}`} aria-pressed={value === option.value}>{option.label}</button>)}
            </div>
        </fieldset>
    );
}

function TextField({ label, value, onChange, multiline = false, hint }) {
    const id = `studio-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const Field = multiline ? 'textarea' : 'input';
    return (
        <label htmlFor={id} className="block text-sm font-semibold text-white/80">
            {label}
            {hint && <span className="ml-2 text-[0.65rem] font-normal text-white/35">{hint}</span>}
            <Field id={id} value={value} onChange={(event) => onChange(event.target.value)} className={`brand-input mt-2 ${multiline ? 'min-h-28 resize-y' : ''}`} />
        </label>
    );
}

function ShapePreview({ shape, active, onClick }) {
    return (
        <button type="button" onClick={onClick} className={`border p-2 text-left ${active ? 'border-brand-lime' : 'border-white/15 hover:border-white/35'}`} aria-pressed={active}>
            <span className={`block h-12 bg-brand-lime ${shapeTokens[shape].className}`} />
            <span className={`mt-2 block text-[0.65rem] uppercase tracking-[0.06em] ${active ? 'text-brand-lime' : 'text-white/55'}`}>{shapeTokens[shape].label}</span>
        </button>
    );
}

function SectionInspector({ sectionId, locale, setLocale, sectionConfig, onVisibilityChange, onContentChange }) {
    const fields = sectionEditorFields[sectionId] || [];
    const sectionLabel = landingSections.find((section) => section.id === sectionId)?.label || sectionId;
    const sourceNote = sectionId === 'systems'
        ? 'Evidence rows are sourced from published portfolio records.'
        : sectionId === 'intake'
            ? 'Form fields and validation remain part of the production intake flow.'
            : 'Lists and process rows remain governed by the production renderer.';

    return (
        <>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div><p className="mono-meta text-brand-lime">{sectionLabel} inspector</p><h2 className="mt-2 text-lg font-semibold text-white">Section content</h2></div>
                <div className="flex border border-white/15 p-0.5"><button type="button" onClick={() => setLocale('en')} className={`px-2 py-1 font-mono text-[0.6rem] ${locale === 'en' ? 'bg-brand-lime text-brand-dark' : 'text-white/45'}`}>EN</button><button type="button" onClick={() => setLocale('id')} className={`px-2 py-1 font-mono text-[0.6rem] ${locale === 'id' ? 'bg-brand-lime text-brand-dark' : 'text-white/45'}`}>ID</button></div>
            </div>
            <div className="mt-5 space-y-5">
                <label className="flex items-center justify-between gap-3 border border-white/10 bg-white/[0.03] px-3 py-3 text-xs text-white/75">
                    <span><span className="block font-semibold text-white">Show section</span><span className="mt-1 block text-[0.68rem] text-white/40">Hide it from the public renderer without deleting its content.</span></span>
                    <input type="checkbox" checked={sectionConfig.visible} onChange={(event) => onVisibilityChange(event.target.checked)} className="h-4 w-4 border-white/20 bg-white/5 text-brand-lime focus:ring-brand-lime" />
                </label>
                {fields.map((field) => <TextField key={field.key} label={field.label} value={sectionConfig.content[locale][field.key]} onChange={(value) => onContentChange(field.key, value)} multiline={field.multiline} />)}
                <p className="border-t border-white/10 pt-4 text-xs leading-5 text-white/40">{sourceNote}</p>
            </div>
        </>
    );
}

export default function SiteStudioIndex({ configuration, revisions = [], portfolios = [] }) {
    const initialDraft = normalizeLandingConfig(configuration?.draft_config || {});
    const [draft, setDraft] = useState(initialDraft);
    const [activeSection, setActiveSection] = useState('hero');
    const [activeTab, setActiveTab] = useState('content');
    const [locale, setLocale] = useState('en');
    const [viewport, setViewport] = useState(1440);
    const [motionKey, setMotionKey] = useState(0);
    const [savedSnapshot, setSavedSnapshot] = useState(JSON.stringify(initialDraft));
    const [publishedSnapshot, setPublishedSnapshot] = useState(JSON.stringify(normalizeLandingConfig(configuration?.published_config || {})));

    const content = draft.hero.content[locale];
    const isUnsaved = JSON.stringify(draft) !== savedSnapshot;
    const hasUnpublishedChanges = JSON.stringify(draft) !== publishedSnapshot;
    const viewportClass = useMemo(() => viewport >= 768 ? 'min-h-[780px]' : 'min-h-[720px]', [viewport]);

    const updateHero = (group, key, value) => {
        setDraft((current) => ({
            ...current,
            hero: {
                ...current.hero,
                [group]: { ...current.hero[group], [key]: value },
            },
        }));
    };

    const updateContent = (key, value) => updateHero('content', locale === 'en' ? 'en' : 'id', { ...content, [key]: value });
    const updateSecondaryPosition = (value) => setDraft((current) => ({
        ...current,
        hero: {
            ...current.hero,
            layout: { ...current.hero.layout, secondaryObjectPosition: value },
            secondaryObject: { ...current.hero.secondaryObject, position: value === 'center' ? 'top' : value },
        },
    }));
    const updateVisibility = (device, value) => setDraft((current) => ({
        ...current,
        hero: {
            ...current.hero,
            layout: { ...current.hero.layout, visibility: { ...current.hero.layout.visibility, [device]: value } },
            secondaryObject: { ...current.hero.secondaryObject, [device]: value },
        },
    }));
    const updateSectionContent = (sectionId, key, value) => setDraft((current) => ({
        ...current,
        sections: {
            ...current.sections,
            [sectionId]: {
                ...current.sections[sectionId],
                content: {
                    ...current.sections[sectionId].content,
                    [locale]: { ...current.sections[sectionId].content[locale], [key]: value },
                },
            },
        },
    }));
    const updateSectionVisibility = (sectionId, value) => setDraft((current) => ({
        ...current,
        sections: { ...current.sections, [sectionId]: { ...current.sections[sectionId], visible: value } },
    }));
    const saveDraft = () => {
        router.patch(route('site-studio.save-draft'), { config: draft }, { preserveScroll: true, onSuccess: () => setSavedSnapshot(JSON.stringify(draft)) });
    };

    const publish = () => {
        if (!window.confirm('Publish the current Landing Studio draft to the public site?')) return;
        router.post(route('site-studio.publish'), {}, { preserveScroll: true, onSuccess: () => { setSavedSnapshot(JSON.stringify(draft)); setPublishedSnapshot(JSON.stringify(draft)); } });
    };

    const restore = (revision) => {
        if (!window.confirm(`Restore revision ${revision.revision} as the new draft?`)) return;
        router.post(route('site-studio.restore-revision', revision.id), {}, { preserveScroll: true, onSuccess: () => window.location.reload() });
    };

    return (
        <AdminLayout activeTab="site-studio" title="Landing Studio">
            <Head title="Landing Studio | Systemify" />

            <div className="space-y-6">
                <section className="flex flex-col gap-5 border-b border-white/15 pb-6 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                        <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-lime"><PaintBrush size={15} weight="bold" /> Site / controlled configuration</div>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">Change semantic landing decisions while the production renderer stays shared, bounded, and recognizable.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] ${isUnsaved ? 'border-status-attention/50 text-status-attention' : 'border-white/15 text-white/55'}`}><span className={`status-dot status-dot--${isUnsaved ? 'attention' : 'operational'}`} />{isUnsaved ? 'Unsaved changes' : 'Draft saved'}</span>
                        <span className="border border-white/15 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/45">Revision {configuration?.revision || 0}</span>
                        <button type="button" onClick={saveDraft} disabled={!isUnsaved} className="button-secondary py-2 text-[0.65rem] text-white/80 disabled:opacity-40"><FloppyDisk size={15} /> Save draft</button>
                        <button type="button" onClick={publish} disabled={!hasUnpublishedChanges || isUnsaved} className="button-primary py-2 text-[0.65rem] disabled:opacity-40" title={isUnsaved ? 'Save the draft before publishing.' : undefined}><RocketLaunch size={15} /> Publish</button>
                    </div>
                </section>

                <div className="grid gap-5 xl:grid-cols-[11rem_minmax(0,1fr)_21rem]">
                    <aside className="border border-white/15 bg-white/[0.02] p-3">
                        <p className="px-2 pb-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">Sections</p>
                        <nav aria-label="Landing sections" className="space-y-1">
                            {landingSections.map((section, index) => <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} className={`flex w-full items-center gap-2 border-l-2 px-2 py-2.5 text-left text-xs ${activeSection === section.id ? 'border-brand-lime bg-white/7 text-white' : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white'}`} aria-pressed={activeSection === section.id}><span className="font-mono text-[0.6rem] text-brand-blue">0{index + 1}</span>{section.label}</button>)}
                        </nav>
                        <div className="mt-7 border-t border-white/10 pt-4"><p className="px-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white/30">Public state</p><p className="mt-2 px-2 text-xs leading-5 text-white/45">Only published configuration reaches the public landing page.</p></div>
                    </aside>

                    <section className="min-w-0 border border-white/15 bg-brand-ink p-3 sm:p-5" aria-label="Landing preview">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3"><div className="flex items-center gap-2"><Eye size={16} className="text-brand-lime" /><span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/45">Live preview / {activeSection}</span></div><div className="flex flex-wrap gap-1">{viewportOptions.map((option) => <button key={option} type="button" onClick={() => setViewport(option)} className={`border px-2 py-1 font-mono text-[0.6rem] ${viewport === option ? 'border-brand-lime text-brand-lime' : 'border-white/15 text-white/45 hover:text-white'}`} aria-pressed={viewport === option}>{option}</button>)}</div></div>
                        <div className={`overflow-auto border border-white/10 bg-brand-paper ${viewportClass}`}>
                            <div style={{ width: `${viewport}px`, minWidth: `${viewport}px` }} className="origin-top-left">
                                <LandingRenderer portfolios={portfolios} landingConfig={draft} motionKey={motionKey} preview />
                            </div>
                        </div>
                    </section>

                    <aside className="border border-white/15 bg-white/[0.02] p-4 sm:p-5">
                        {activeSection === 'hero' ? <>
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4"><div><p className="mono-meta text-brand-lime">Hero inspector</p><h2 className="mt-2 text-lg font-semibold text-white">Controlled decisions</h2></div><div className="flex border border-white/15 p-0.5"><button type="button" onClick={() => setLocale('en')} className={`px-2 py-1 font-mono text-[0.6rem] ${locale === 'en' ? 'bg-brand-lime text-brand-dark' : 'text-white/45'}`}>EN</button><button type="button" onClick={() => setLocale('id')} className={`px-2 py-1 font-mono text-[0.6rem] ${locale === 'id' ? 'bg-brand-lime text-brand-dark' : 'text-white/45'}`}>ID</button></div></div>
                            <div className="mt-4 grid grid-cols-2 gap-1 border-b border-white/10 pb-4">{inspectorTabs.map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => setActiveTab(id)} className={`flex items-center justify-center gap-1 px-2 py-2 text-[0.65rem] ${activeTab === id ? 'bg-brand-blue text-white' : 'text-white/45 hover:bg-white/5 hover:text-white'}`} aria-pressed={activeTab === id}><Icon size={13} />{label}</button>)}</div>

                            {activeTab === 'content' && <div className="mt-5 space-y-5"><TextField label="Eyebrow" value={content.eyebrow} onChange={(value) => updateContent('eyebrow', value)} /><TextField label="Headline" value={content.headline} onChange={(value) => updateContent('headline', value)} multiline /><TextField label="Supporting copy" value={content.description} onChange={(value) => updateContent('description', value)} multiline /><TextField label="Primary CTA" value={content.primaryCta} onChange={(value) => updateContent('primaryCta', value)} /><TextField label="Secondary CTA" value={content.secondaryCta} onChange={(value) => updateContent('secondaryCta', value)} /></div>}

                            {activeTab === 'layout' && <div className="mt-5 space-y-5"><OptionGroup label="Horizontal alignment" value={draft.hero.layout.alignment} options={['left', 'center', 'right'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('layout', 'alignment', value)} /><OptionGroup label="Vertical alignment" value={draft.hero.layout.verticalAlignment} options={['start', 'center', 'end'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('layout', 'verticalAlignment', value)} /><OptionGroup label="Content width" value={draft.hero.layout.contentWidth} options={['compact', 'wide', 'full'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('layout', 'contentWidth', value)} /><OptionGroup label="Hero height" value={draft.hero.layout.height} options={['auto', 'tall', 'full'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('layout', 'height', value)} /><OptionGroup label="Secondary object" value={draft.hero.layout.secondaryObjectPosition} options={['left', 'center', 'right'].map((value) => ({ value, label: value }))} onChange={updateSecondaryPosition} /><fieldset className="border-t border-white/10 pt-4"><legend className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Visibility</legend><div className="mt-3 space-y-2">{['desktop', 'tablet', 'mobile'].map((device) => <label key={device} className="flex items-center justify-between gap-3 text-xs text-white/65"><span className="capitalize">{device}</span><input type="checkbox" checked={draft.hero.layout.visibility[device]} onChange={(event) => updateVisibility(device, event.target.checked)} className="h-4 w-4 border-white/20 bg-white/5 text-brand-lime focus:ring-brand-lime" /></label>)}</div></fieldset></div>}

                            {activeTab === 'shape' && <div className="mt-5 space-y-6"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Surface preset</p><div className="mt-3 grid grid-cols-2 gap-2">{shapeOptions.map(({ value }) => <ShapePreview key={value} shape={value} active={draft.cards.shape === value} onClick={() => setDraft((current) => ({ ...current, cards: { ...current.cards, shape: value } }))} />)}</div></div><div className="border-t border-white/10 pt-4"><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Highlight style</p><OptionGroup label="" value={draft.hero.highlight.style} options={['none', 'marker', 'underline', 'offset-block', 'signal-line'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('highlight', 'style', value)} /><div className="mt-4"><TextField label="Highlighted phrase" value={locale === 'en' ? draft.hero.highlight.text : draft.hero.highlight.textId} onChange={(value) => updateHero('highlight', locale === 'en' ? 'text' : 'textId', value)} /></div><div className="mt-4"><OptionGroup label="Highlight width" value={draft.hero.highlight.width} options={['compact', 'balanced', 'wide'].map((value) => ({ value, label: value }))} onChange={(value) => updateHero('highlight', 'width', value)} /></div><div className="mt-4"><OptionGroup label="Highlight shape" value={draft.hero.highlight.shape} options={shapeOptions} onChange={(value) => updateHero('highlight', 'shape', value)} /></div></div></div>}

                            {activeTab === 'motion' && <div className="mt-5 space-y-5"><div><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Preset</p><div className="mt-3 space-y-2">{motionPresets.map((preset) => <button key={preset.value} type="button" onClick={() => updateHero('motion', 'preset', preset.value)} className={`w-full border p-3 text-left ${draft.hero.motion.preset === preset.value ? 'border-brand-lime bg-brand-lime/10' : 'border-white/15 hover:border-white/35'}`} aria-pressed={draft.hero.motion.preset === preset.value}><span className="block text-xs font-semibold text-white">{preset.label}</span><span className="mt-1 block text-[0.68rem] leading-5 text-white/45">{preset.description}</span></button>)}</div></div><OptionGroup label="Intensity" value={draft.hero.motion.intensity} options={motionIntensityOptions} onChange={(value) => updateHero('motion', 'intensity', value)} /><OptionGroup label="Scroll behavior" value={draft.hero.motion.scrollBehavior} options={motionScrollOptions} onChange={(value) => updateHero('motion', 'scrollBehavior', value)} /><OptionGroup label="Duration preset" value={draft.hero.motion.duration} options={motionDurationOptions} onChange={(value) => updateHero('motion', 'duration', value)} /><OptionGroup label="Delay preset" value={draft.hero.motion.delay} options={motionDelayOptions} onChange={(value) => updateHero('motion', 'delay', value)} /><button type="button" onClick={() => setMotionKey((value) => value + 1)} className="button-secondary w-full py-2 text-xs text-white"><ArrowClockwise size={15} /> Replay motion</button><p className="text-xs leading-5 text-white/40">Motion is enhancement only. Reduced-motion preferences disable it automatically.</p></div>}
                        </> : <SectionInspector sectionId={activeSection} locale={locale} setLocale={setLocale} sectionConfig={draft.sections[activeSection]} onVisibilityChange={(value) => updateSectionVisibility(activeSection, value)} onContentChange={(key, value) => updateSectionContent(activeSection, key, value)} />}

                        <div className="mt-8 border-t border-white/10 pt-5"><div className="flex items-center gap-2"><ClockCounterClockwise size={15} className="text-brand-lime" /><p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40">Revision history</p></div><div className="mt-3 space-y-2">{revisions.length > 0 ? revisions.map((revision) => <div key={revision.id} className="border-b border-white/10 pb-3 pt-2 last:border-b-0"><div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold text-white">Revision {revision.revision}</span><button type="button" onClick={() => restore(revision)} className="text-[0.62rem] uppercase tracking-[0.08em] text-brand-lime hover:text-white">Restore draft</button></div><p className="mt-1 text-[0.68rem] text-white/40">{dateLabel(revision.published_at)} · {revision.publisher?.name || 'System operator'}</p></div>) : <p className="text-xs leading-5 text-white/40">No published revisions yet. Publish the first controlled configuration when ready.</p>}</div></div>
                    </aside>
                </div>
            </div>
        </AdminLayout>
    );
}

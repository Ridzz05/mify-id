import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppLayout from '@/Layouts/AppLayout';
import { normalizeLandingConfig } from '@/Pages/Landing/config/schema';
import { shapeTokens } from '@/Pages/Landing/config/shapeTokens';
import { useTranslation } from '@/Contexts/LanguageContext';
import { ArrowRight, ArrowUpRight, Check, EnvelopeSimple, Globe, Lightning, Wrench } from '@phosphor-icons/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroAlignmentClasses = { left: 'items-start text-left', center: 'items-center text-center', right: 'items-end text-right' };
const heroCtaClasses = { left: 'items-start sm:justify-start', center: 'items-center sm:justify-center', right: 'items-end sm:justify-end' };
const heroVerticalClasses = { start: 'xl:items-start', center: 'xl:items-center', end: 'xl:items-end' };
const heroWidthClasses = { compact: 'max-w-2xl', wide: 'max-w-4xl', full: 'max-w-none' };
const heroHeightClasses = { auto: '', tall: 'min-h-[34rem]', full: 'min-h-[calc(100vh-4.75rem)]' };
const secondaryPositionClasses = { left: 'xl:order-first', center: 'xl:col-start-4', right: '' };
const highlightStyleClasses = { none: '', marker: 'hero-highlight', underline: 'hero-underline', 'offset-block': 'hero-highlight hero-highlight--offset', 'signal-line': 'hero-signal-line' };
const highlightWidthClasses = { compact: 'hero-highlight--compact', balanced: 'hero-highlight--balanced', wide: 'hero-highlight--wide' };
const disciplineIcons = { globe: Globe, lightning: Lightning, wrench: Wrench };

const localizedValue = (value, locale) => value?.[locale] || value?.en || '';
const responsiveVisibility = ({ desktop, tablet, mobile }, { preview = false, previewViewport = null } = {}) => {
    if (preview && previewViewport) {
        const state = previewViewport >= 1280 ? desktop : previewViewport >= 768 ? tablet : mobile;
        return state ? '' : 'hidden';
    }

    return [desktop ? '' : 'xl:hidden', tablet ? '' : 'md:max-xl:hidden', mobile ? '' : 'max-md:hidden'].filter(Boolean).join(' ');
};

function StatusLine({ label, value, status = 'operational' }) {
    return (
        <div className="flex items-center justify-between border-b border-white/15 py-3 last:border-b-0">
            <span className="text-sm text-white/65">{label}</span>
            <span className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/90">
                <span className={`status-dot status-dot--${status}`} />
                {value}
            </span>
        </div>
    );
}

function SectionIntro({ copy, light = false }) {
    return copy.intro ? <p className={`mt-6 max-w-md text-sm leading-7 ${light ? 'text-white/60' : 'text-brand-dark/62'}`}>{copy.intro}</p> : null;
}

export function LandingRenderer({ portfolios = [], landingConfig = {}, motionKey = 0, preview = false, previewViewport = null }) {
    const { locale } = useTranslation();
    const config = normalizeLandingConfig(landingConfig);
    const copy = (sectionId) => config.sections?.[sectionId]?.content?.[locale] || config.sections?.[sectionId]?.content?.en || {};
    const heroContent = config.hero.content[locale] || config.hero.content.en;
    const disciplines = config.sections.disciplines;
    const systems = config.sections.systems;
    const transformation = config.sections.transformation;
    const process = config.sections.process;
    const principles = config.sections.principles;
    const intake = config.sections.intake;
    const disciplinesCopy = copy('disciplines');
    const systemsCopy = copy('systems');
    const transformationCopy = copy('transformation');
    const processCopy = copy('process');
    const principlesCopy = copy('principles');
    const intakeCopy = copy('intake');
    const intakePresentation = intake.presentation;
    const intakeFields = intake.fields;
    const [submitted, setSubmitted] = useState(false);
    const motionRoot = useRef(null);
    const { data, setData, post, processing, errors, reset } = useForm(Object.fromEntries(Object.keys(intakeFields).map((key) => [key, ''])));
    const presentation = systems.presentation;
    const selectedSystems = portfolios
        .filter((portfolio) => presentation.selectionMode === 'selected'
            ? presentation.selectedIds.map(String).includes(String(portfolio.id))
            : portfolio.is_featured)
        .slice(0, presentation.displayLimit);
    const heroHighlightText = locale === 'id' ? config.hero.highlight.textId : config.hero.highlight.text;
    const heroHeadline = heroContent.headline;
    const heroHighlightClass = `${highlightStyleClasses[config.hero.highlight.style]} ${highlightWidthClasses[config.hero.highlight.width]} ${shapeTokens[config.hero.highlight.shape]?.className || ''}`.trim();
    const heroLayout = config.hero.layout;
    const heroObject = config.hero.secondaryObject;
    const motion = config.hero.motion;
    const panelKey = { 'system-status': 'operatingModel', 'operating-model': 'operatingModel', workflow: 'workflow', 'active-project': 'activeProject' }[heroObject.type];
    const heroPanel = panelKey ? config.hero[panelKey] : null;
    const panelCopy = heroPanel ? localizedValue(heroPanel.content, locale) : {};
    const compactPreview = preview && previewViewport && previewViewport < 1280;
    const previewModeClass = preview && previewViewport ? previewViewport < 768 ? 'landing-renderer--mobile-preview' : previewViewport < 1280 ? 'landing-renderer--compact-preview' : '' : '';
    const heroGridClass = compactPreview ? 'grid-cols-1' : 'xl:grid-cols-12';
    const heroVerticalClass = compactPreview ? '' : heroVerticalClasses[heroLayout.verticalAlignment] || heroVerticalClasses.center;
    const heroCopyGridClass = compactPreview ? '' : 'xl:col-span-7';
    const heroPanelGridClass = compactPreview ? '' : `xl:col-span-5 ${secondaryPositionClasses[heroLayout.secondaryObjectPosition] || ''}`;
    const label = (key) => localizedValue(presentation.fieldLabels[key], locale);
    const missingValue = localizedValue(presentation.missingValue, locale);
    const valueOrMissing = (value) => value || missingValue;

    useGSAP(() => {
        const root = motionRoot.current;
        if (!root || motion.preset === 'none' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
        const duration = { quick: 0.45, standard: 0.7, long: 1.1 }[motion.duration] || 0.7;
        const delay = { none: 0, short: 0.12, staggered: 0.2 }[motion.delay] || 0;
        const scrollTrigger = preview || motion.scrollBehavior === 'none' ? undefined : { trigger: root, start: 'top 82%', once: motion.scrollBehavior !== 'scrub' };
        const reveal = (selector, options = {}) => {
            const targets = gsap.utils.toArray(selector, root);
            if (!targets.length) return;
            gsap.fromTo(targets, { autoAlpha: 0 }, { autoAlpha: 1, duration, delay, ease: 'power2.out', stagger: 0.08, scrollTrigger, ...options });
        };
        if (motion.preset === 'editorial-reveal') reveal('[data-motion="hero"]');
        if (motion.preset === 'system-stagger') reveal('[data-motion="system"]', { stagger: 0.12 });
        if (motion.preset === 'evidence-reveal') reveal('[data-motion="evidence"]');
        if (motion.preset === 'signal-wipe') {
            const highlight = root.querySelector('[data-motion="highlight"]');
            if (highlight) gsap.fromTo(highlight, { autoAlpha: 0 }, { autoAlpha: 1, duration, delay, ease: 'power2.out', scrollTrigger });
        }
        if (motion.preset === 'process-progress') {
            gsap.utils.toArray('[data-motion="process"]', root).forEach((row, index) => gsap.fromTo(row, { autoAlpha: 0.35 }, { autoAlpha: 1, duration: duration * 0.75, delay: index * 0.05, ease: 'none', scrollTrigger: preview || motion.scrollBehavior === 'none' ? undefined : { trigger: row, start: 'top 82%', end: 'top 42%', scrub: motion.scrollBehavior === 'scrub' } }));
        }
    }, { scope: motionRoot, dependencies: [motionKey, motion.preset, motion.intensity, motion.scrollBehavior, motion.duration, motion.delay, preview, previewViewport], revertOnUpdate: true });

    const renderHeroHeadline = () => {
        if (config.hero.highlight.style === 'none' || !heroHighlightText || !heroHeadline.includes(heroHighlightText)) return heroHeadline;
        const [before, after] = heroHeadline.split(heroHighlightText);
        return <>{before}<span data-motion="highlight" className={heroHighlightClass}>{heroHighlightText}</span>{after}</>;
    };

    const submitBrief = (event) => {
        event.preventDefault();
        if (preview) return;
        post(route('briefs.store'), { preserveScroll: true, onSuccess: () => { setSubmitted(true); reset(); } });
    };

    return (
        <AppLayout title={localizedValue(config.global.meta.title, locale)} description={localizedValue(config.global.meta.description, locale)} containerClassName="w-full" landingConfig={config}>
            <div ref={motionRoot} className={`landing-renderer ${previewModeClass}`}>
                <section id="hero" className={`border-b border-brand-dark/15 py-20 sm:py-28 ${heroHeightClasses[heroLayout.height] || ''}`}>
                    <div className={`site-container min-w-0 grid gap-14 ${heroGridClass} ${heroVerticalClass}`}>
                        <div data-motion="hero" className={`min-w-0 flex flex-col ${heroCopyGridClass} ${heroAlignmentClasses[heroLayout.alignment] || heroAlignmentClasses.left}`}>
                            <p className="eyebrow">{heroContent.eyebrow}</p>
                            <h1 className={`mt-7 min-w-0 whitespace-pre-line break-words ${heroWidthClasses[heroLayout.contentWidth] || heroWidthClasses.wide} text-[clamp(3.25rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.075em]`}>{renderHeroHeadline()}</h1>
                            <p className={`mt-8 min-w-0 ${heroWidthClasses[heroLayout.contentWidth] || heroWidthClasses.wide} text-lg leading-8 text-brand-dark/68 sm:text-xl`}>{heroContent.description}</p>
                            <div className={`mt-9 flex flex-col gap-3 sm:flex-row sm:items-center ${heroCtaClasses[heroLayout.alignment] || heroCtaClasses.left}`}>
                                <a href={heroContent.primaryTarget} className="button-ink">{heroContent.primaryCta} <ArrowRight size={16} weight="bold" /></a>
                                <a href={heroContent.secondaryTarget} className="button-secondary">{heroContent.secondaryCta} <ArrowUpRight size={16} weight="bold" /></a>
                            </div>
                            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-6 border-t border-brand-dark/20 pt-5 sm:grid-cols-4">
                                {config.hero.metaItems.map((item, index) => <div key={item.id} className="flex gap-2"><span className="font-mono text-[0.65rem] text-brand-blue">{String(index + 1).padStart(2, '0')}</span><span className="text-[0.64rem] font-semibold leading-4 text-brand-dark/55">{localizedValue(item.text, locale)}</span></div>)}
                            </div>
                        </div>

                        {heroPanel && <div data-motion="hero" className={`min-w-0 ${heroPanelGridClass} ${responsiveVisibility(heroObject, { preview, previewViewport })}`}>
                            <div className={`min-w-0 bg-brand-dark p-5 text-white sm:p-7 ${shapeTokens[config.cards.shape]?.className || ''}`}>
                                <div className="flex items-start justify-between gap-5 border-b border-white/15 pb-5">
                                    <div><p className="mono-meta text-brand-lime">{panelCopy.eyebrow}</p><p className="mt-2 text-sm text-white/55">{panelCopy.description}</p></div>
                                    <span className="flex items-center gap-2 font-mono text-[0.64rem] uppercase text-white/70"><span className={`status-dot status-dot--${heroPanel.status || 'operational'}`} /> {panelCopy.statusLabel}</span>
                                </div>
                                <div className="py-3">{heroPanel.rows.map((row) => <div data-motion="system" key={row.id}><StatusLine label={localizedValue(row.label, locale)} value={localizedValue(row.value, locale)} status={row.status} /></div>)}</div>
                                {panelCopy.outcomeStatement && <div className="mt-4 border-l-2 border-brand-lime pl-4 text-sm leading-6 text-white/75">{panelCopy.outcomeStatement}</div>}
                                <p className="mt-8 font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/35">{panelCopy.footerLabel}</p>
                            </div>
                        </div>}
                    </div>
                </section>

                {disciplines.visible && <section id="capabilities" className="border-b border-brand-dark/15 py-20 sm:py-28">
                    <div className="site-container grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-4"><p className="eyebrow">{disciplinesCopy.eyebrow}</p><h2 className="mt-5 max-w-sm text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{disciplinesCopy.title}</h2><SectionIntro copy={disciplinesCopy} /></div>
                        <div className="grid gap-10 md:grid-cols-3 lg:col-span-8 lg:gap-8">
                            {disciplines.groups.map((group, index) => { const Icon = disciplineIcons[group.icon] || Globe; return <div key={group.id} className={`${index > 0 ? 'border-t pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0' : ''}`}><div className="flex items-center justify-between gap-3"><h3 className="text-2xl font-semibold tracking-[-0.04em]">{localizedValue(group.label, locale)}</h3><Icon size={22} weight="bold" className="text-brand-blue" /></div><p className="mt-3 min-h-12 text-sm leading-6 text-brand-dark/60">{localizedValue(group.description, locale)}</p><ul className="mt-6 border-t border-brand-dark/15">{group.items.map((item) => <li key={item.id} className="flex items-center gap-3 border-b border-brand-dark/15 py-3 text-sm"><span className="font-mono text-[0.65rem] text-brand-blue">+</span>{localizedValue(item.text, locale)}</li>)}</ul></div>; })}
                        </div>
                    </div>
                </section>}

                {systems.visible && <section id="systems" className="bg-brand-dark py-20 text-white sm:py-28">
                    <div className="site-container"><div className="grid gap-10 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><p className="eyebrow eyebrow--light">{systemsCopy.eyebrow}</p><h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">{systemsCopy.title}</h2></div><p className="max-w-md text-sm leading-7 text-white/60 lg:col-span-4 lg:col-start-9">{systemsCopy.intro}</p></div>
                        <div className="mt-14 border-t border-white/20">{selectedSystems.length > 0 ? selectedSystems.map((portfolio, index) => <article key={portfolio.id || portfolio.slug || portfolio.title} data-motion="evidence" className="grid gap-6 border-b border-white/20 py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-8"><span className="font-mono text-xs text-brand-lime">{String(index + 1).padStart(2, '0')}</span><div>{presentation.showImage && <div className="flex aspect-[16/9] items-end overflow-hidden border border-white/15 bg-white/[0.02] p-4">{portfolio.image_url ? <img src={portfolio.image_url} alt={portfolio.image_alt || portfolio.title} className="h-full w-full object-cover" loading="lazy" /> : <span className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-white/35">{portfolio.system_code || '—'} / {localizedValue(presentation.missingImage, locale)}</span>}</div>}</div><div><div className="flex flex-wrap items-start justify-between gap-4"><div>{presentation.showCategory && <p className="mono-meta text-brand-lime">{portfolio.category}</p>}<h3 className="mt-3 max-w-lg text-2xl font-semibold leading-tight tracking-[-0.04em]">{portfolio.title}</h3></div>{presentation.showProjectLink && portfolio.project_url && <a href={portfolio.project_url} target="_blank" rel="noreferrer" className="text-brand-lime" aria-label={localizedValue(presentation.fieldLabels.openProject, locale).replace('{title}', portfolio.title)}><ArrowUpRight size={21} weight="bold" /></a>}</div>{presentation.showDescription && <p className="mt-5 text-sm leading-7 text-white/62">{valueOrMissing(portfolio.description)}</p>}<dl className="mt-7 grid gap-4 border-t border-white/15 pt-4 text-sm sm:grid-cols-2">{[[presentation.showProblem, 'problem', portfolio.problem], [presentation.showSolution, 'solution', portfolio.solution], [presentation.showResult, 'result', portfolio.result], [presentation.showStack, 'stack', (portfolio.tech_stack || []).join(' / ')]].filter(([show]) => show).map(([, key, value]) => <div key={key}><dt className="font-mono text-[0.64rem] uppercase text-white/40">{label(key)}</dt><dd className="mt-1 text-white/80">{valueOrMissing(value)}</dd></div>)}</dl></div></article>) : <div className="border-b border-white/20 py-14 text-sm text-white/55">{localizedValue(presentation.emptyState, locale)}</div>}</div>
                    </div>
                </section>}

                {transformation.visible && <section id="transformation" className="border-b border-brand-dark/15 py-20 sm:py-28"><div className="site-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow">{transformationCopy.eyebrow}</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{transformationCopy.title}</h2><SectionIntro copy={transformationCopy} /></div><div className="lg:col-span-7"><div className="border-t border-brand-dark/20">{transformation.rows.map((row) => <div key={row.id} data-motion="process" className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-brand-dark/20 py-5 text-sm sm:gap-6 sm:text-base"><span className="min-w-0 break-words text-brand-dark/55">{localizedValue(row.before, locale)}</span><ArrowRight size={18} className="text-brand-blue" weight="bold" /><span className="min-w-0 break-words font-semibold">{localizedValue(row.after, locale)}</span></div>)}</div></div></div></section>}

                {process.visible && <section id="method" className="bg-brand-paper-muted border-b border-brand-dark/15 py-20 sm:py-28"><div className="site-container"><div className="max-w-3xl"><p className="eyebrow">{processCopy.eyebrow}</p><h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{processCopy.title}</h2><SectionIntro copy={processCopy} /></div><div className="mt-14 grid gap-0 border-t border-brand-dark/20 md:grid-cols-4">{process.steps.map((step, index) => <div key={step.id} data-motion="process" className={`${index > 0 ? 'border-t md:border-l md:border-t-0' : ''} border-brand-dark/20 p-5 pl-0 md:p-6 md:pl-6`}><span className="font-mono text-xs text-brand-blue">{step.number}</span><h3 className="mt-10 text-2xl font-semibold tracking-[-0.04em]">{localizedValue(step.label, locale)}</h3><p className="mt-4 text-sm leading-7 text-brand-dark/62">{localizedValue(step.description, locale)}</p></div>)}</div></div></section>}

                {principles.visible && <section id="principles" className="bg-brand-blue py-20 text-white sm:py-28"><div className="site-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow eyebrow--light">{principlesCopy.eyebrow}</p><h2 className="mt-5 max-w-md text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl">{principlesCopy.title}</h2><SectionIntro copy={principlesCopy} light /></div><div className="lg:col-span-7"><ol className="border-t border-white/25">{principles.items.map((item, index) => <li key={item.id} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/25 py-6 text-xl leading-tight tracking-[-0.025em] sm:text-2xl"><span className="font-mono text-xs text-brand-lime">{String(index + 1).padStart(2, '0')}</span><span>{localizedValue(item.text, locale)}</span></li>)}</ol></div></div></section>}

                {intake.visible && <section id="intake" className="bg-brand-dark py-20 text-white sm:py-28"><div className="site-container grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="eyebrow eyebrow--light">{intakeCopy.eyebrow}</p><h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl">{intakeCopy.title}</h2><p className="mt-7 max-w-md text-sm leading-7 text-white/60">{intakeCopy.intro}</p><div className="mt-10 flex items-center gap-3 text-sm text-white/55"><EnvelopeSimple size={18} className="text-brand-lime" /> <a href={`mailto:${config.global.contact.email}`}>{config.global.contact.email}</a></div></div><div className="lg:col-span-6 lg:col-start-7">{submitted ? <div className="border border-brand-lime/50 p-7 sm:p-10"><Check size={28} className="text-brand-lime" weight="bold" /><h3 className="mt-7 text-3xl font-semibold tracking-[-0.04em]">{localizedValue(intake.success.title, locale)}</h3><p className="mt-4 max-w-md text-sm leading-7 text-white/65">{localizedValue(intake.success.description, locale)}</p><button type="button" onClick={() => setSubmitted(false)} className="button-secondary mt-8 text-white">{localizedValue(intake.success.sendAnother, locale)}</button></div> : <form onSubmit={submitBrief} className="border-t border-white/25 pt-6"><div className="grid gap-5 sm:grid-cols-2">{Object.entries(intakeFields).map(([key, field], index) => { const fieldCopy = { label: localizedValue(field.label, locale), placeholder: localizedValue(field.placeholder, locale) }; const control = key === 'current_workflow' || key === 'operational_constraint' || key === 'desired_change' ? <textarea value={data[key]} onChange={(event) => setData(key, event.target.value)} className="site-input site-input--dark mt-2 min-h-28 resize-y" placeholder={fieldCopy.placeholder} aria-invalid={Boolean(errors[key])} required={field.required} /> : <input type={key === 'email' ? 'email' : 'text'} value={data[key]} onChange={(event) => setData(key, event.target.value)} className="site-input site-input--dark mt-2" placeholder={fieldCopy.placeholder} aria-invalid={Boolean(errors[key])} required={field.required} />; return <label key={key} className={`${index > 1 ? 'sm:col-span-2' : ''} block text-sm font-semibold`}>{fieldCopy.label}{control}{errors[key] && <span className="mt-1 block text-xs text-red-300">{errors[key]}</span>}</label>; })}</div><div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center"><span className="font-mono text-[0.64rem] uppercase tracking-[0.08em] text-white/40">{localizedValue(intakePresentation.note, locale)}</span><button type="submit" className="button-primary" disabled={processing || preview}>{preview ? localizedValue(intakePresentation.previewOnly, locale) : processing ? localizedValue(intakePresentation.sending, locale) : localizedValue(intakePresentation.submit, locale)} <ArrowRight size={16} weight="bold" /></button></div></form>}</div></div></section>}
            </div>
        </AppLayout>
    );
}

export default function Welcome({ portfolios = [], landingConfig = {} }) {
    return <LandingRenderer portfolios={portfolios} landingConfig={landingConfig} />;
}

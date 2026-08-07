import { cloneConfig, defaultLandingConfig, locales } from './defaults';

const enumOr = (value, allowed, fallback) => allowed.includes(value) ? value : fallback;
const boolOr = (value, fallback) => typeof value === 'boolean' ? value : fallback;
const textOr = (value, fallback, limit = 255) => {
    if (typeof value !== 'string' || value.trim() === '') return fallback;

    return value.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, '').trim().slice(0, limit);
};
const targetOr = (value, fallback) => ['#hero', '#capabilities', '#systems', '#transformation', '#method', '#principles', '#intake'].includes(value) ? value : fallback;
const objectOr = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const arrayOrDefault = (source, key, fallback) => Array.isArray(source) && Object.prototype.hasOwnProperty.call(source, key) ? source[key] : fallback;
const idOr = (value, fallback) => {
    const candidate = typeof value === 'string' ? value.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) : '';
    return candidate || fallback;
};
const uniqueId = (value, fallback, used) => {
    const base = idOr(value, fallback);
    let id = base;
    let index = 2;
    while (used.has(id)) id = `${base}-${index++}`;
    used.add(id);
    return id;
};

const localized = (value, fallback, limit = 1000) => {
    const source = objectOr(value);
    const result = {};

    locales.forEach((locale) => {
        result[locale] = textOr(source[locale], fallback[locale], limit);
    });

    return result;
};

const localizedObject = (value, fallback, keys) => {
    const source = objectOr(value);
    const result = {};

    locales.forEach((locale) => {
        const sourceLocale = objectOr(source[locale]);
        result[locale] = {};
        keys.forEach(([key, limit]) => {
            result[locale][key] = textOr(sourceLocale[key], fallback[locale]?.[key] ?? '', limit);
        });
    });

    return result;
};

const normalizeLocalizedItems = (source, fallback, prefix, max, mapItem) => {
    const items = Array.isArray(source) ? source : fallback;
    const used = new Set();

    return items.slice(0, max).map((item, index) => mapItem(objectOr(item), fallback[index] || {}, uniqueId(item?.id, `${prefix}-${index + 1}`, used)));
};

const normalizeRows = (source, fallback, prefix, max, mapper) => normalizeLocalizedItems(source, fallback, prefix, max, mapper);

export function normalizeLandingConfig(input = {}) {
    const defaults = cloneConfig(defaultLandingConfig);
    const source = objectOr(input);
    const sourceGlobal = objectOr(source.global);
    const sourceHero = objectOr(source.hero);
    const sourceContent = objectOr(sourceHero.content);
    const sourceLayout = objectOr(sourceHero.layout);
    const sourceHighlight = objectOr(sourceHero.highlight);
    const sourceSecondary = objectOr(sourceHero.secondaryObject);
    const sourceMotion = objectOr(sourceHero.motion);
    const sourceSections = objectOr(source.sections);
    const legacy = source.version !== 2;

    defaults.global.brand = {
        name: textOr(objectOr(sourceGlobal.brand).name, defaults.global.brand.name, 80),
        mark: textOr(objectOr(sourceGlobal.brand).mark, defaults.global.brand.mark, 12),
        homeLabel: localized(objectOr(sourceGlobal.brand).homeLabel, defaults.global.brand.homeLabel, 80),
    };
    defaults.global.meta = {
        title: localized(objectOr(sourceGlobal.meta).title, defaults.global.meta.title, 160),
        description: localized(objectOr(sourceGlobal.meta).description, defaults.global.meta.description, 1000),
    };
    const sourceNavigation = objectOr(sourceGlobal.navigation);
    Object.keys(defaults.global.navigation).forEach((key) => {
        defaults.global.navigation[key] = localized(sourceNavigation[key], defaults.global.navigation[key], 100);
    });
    const sourceFooter = objectOr(sourceGlobal.footer);
    Object.keys(defaults.global.footer).forEach((key) => {
        defaults.global.footer[key] = localized(sourceFooter[key], defaults.global.footer[key], 255);
    });
    defaults.global.contact.email = textOr(objectOr(sourceGlobal.contact).email, defaults.global.contact.email, 160);

    locales.forEach((locale) => {
        const content = objectOr(sourceContent[locale]);
        defaults.hero.content[locale] = {
            ...defaults.hero.content[locale],
            eyebrow: textOr(content.eyebrow, defaults.hero.content[locale].eyebrow),
            headline: textOr(content.headline, defaults.hero.content[locale].headline, 500),
            description: textOr(content.description, defaults.hero.content[locale].description, 1000),
            primaryCta: textOr(content.primaryCta, defaults.hero.content[locale].primaryCta, 120),
            primaryTarget: targetOr(content.primaryTarget, defaults.hero.content[locale].primaryTarget),
            secondaryCta: textOr(content.secondaryCta, defaults.hero.content[locale].secondaryCta, 120),
            secondaryTarget: targetOr(content.secondaryTarget, defaults.hero.content[locale].secondaryTarget),
        };
    });

    const legacyPosition = sourceSecondary.position === 'top' ? 'center' : sourceSecondary.position;
    const visibility = objectOr(sourceLayout.visibility);
    const responsive = (device) => Object.prototype.hasOwnProperty.call(sourceSecondary, device) ? sourceSecondary[device] : visibility[device];
    const secondaryPosition = enumOr(sourceLayout.secondaryObjectPosition, ['left', 'center', 'right'], enumOr(legacyPosition, ['left', 'center', 'right'], defaults.hero.layout.secondaryObjectPosition));
    defaults.hero.layout = {
        ...defaults.hero.layout,
        alignment: enumOr(sourceLayout.alignment, ['left', 'center', 'right'], defaults.hero.layout.alignment),
        verticalAlignment: enumOr(sourceLayout.verticalAlignment, ['start', 'center', 'end'], defaults.hero.layout.verticalAlignment),
        contentWidth: enumOr(sourceLayout.contentWidth, ['compact', 'wide', 'full'], defaults.hero.layout.contentWidth),
        height: enumOr(sourceLayout.height, ['auto', 'tall', 'full'], defaults.hero.layout.height),
        secondaryObjectPosition: secondaryPosition,
        visibility: {
            desktop: boolOr(responsive('desktop'), defaults.hero.layout.visibility.desktop),
            tablet: boolOr(responsive('tablet'), defaults.hero.layout.visibility.tablet),
            mobile: boolOr(responsive('mobile'), defaults.hero.layout.visibility.mobile),
        },
    };
    defaults.hero.highlight = {
        text: textOr(sourceHighlight.text, defaults.hero.highlight.text, 120),
        textId: textOr(sourceHighlight.textId, defaults.hero.highlight.textId, 120),
        style: enumOr(sourceHighlight.style, ['none', 'marker', 'underline', 'offset-block', 'signal-line'], defaults.hero.highlight.style),
        width: enumOr(sourceHighlight.width, ['compact', 'balanced', 'wide'], defaults.hero.highlight.width),
        shape: enumOr(sourceHighlight.shape, ['sharp', 'soft', 'half-rounded', 'full-rounded'], defaults.hero.highlight.shape),
    };
    defaults.hero.secondaryObject = {
        type: enumOr(sourceSecondary.type, ['none', 'system-status', 'operating-model', 'workflow', 'active-project'], defaults.hero.secondaryObject.type),
        position: secondaryPosition === 'center' ? 'top' : secondaryPosition,
        desktop: defaults.hero.layout.visibility.desktop,
        tablet: defaults.hero.layout.visibility.tablet,
        mobile: defaults.hero.layout.visibility.mobile,
    };
    defaults.hero.motion = {
        preset: enumOr(sourceMotion.preset, ['none', 'editorial-reveal', 'signal-wipe', 'system-stagger', 'evidence-reveal', 'process-progress'], defaults.hero.motion.preset),
        intensity: enumOr(sourceMotion.intensity, ['subtle', 'standard', 'expressive'], defaults.hero.motion.intensity),
        scrollBehavior: enumOr(sourceMotion.scrollBehavior, ['none', 'once', 'scrub'], defaults.hero.motion.scrollBehavior),
        duration: enumOr(sourceMotion.duration, ['quick', 'standard', 'long'], defaults.hero.motion.duration),
        delay: enumOr(sourceMotion.delay, ['none', 'short', 'staggered'], defaults.hero.motion.delay),
    };

    const metaItems = arrayOrDefault(sourceHero, 'metaItems', defaults.hero.metaItems);
    const metaUsed = new Set();
    defaults.hero.metaItems = metaItems.slice(0, 8).map((item, index) => {
        const fallback = defaults.hero.metaItems[index] || { id: `hero-meta-${index + 1}`, text: { en: '', id: '' } };
        return { id: uniqueId(item?.id, fallback.id, metaUsed), text: localized(item?.text, fallback.text, 100) };
    });
    ['operatingModel', 'workflow', 'activeProject'].forEach((panelKey) => {
        const panelSource = objectOr(sourceHero[panelKey]);
        const panelDefault = defaults.hero[panelKey];
        defaults.hero[panelKey].content = localizedObject(panelSource.content, panelDefault.content, [['eyebrow', 160], ['description', 500], ['statusLabel', 80], ['outcomeStatement', 500], ['footerLabel', 160]]);
        defaults.hero[panelKey].status = enumOr(panelSource.status, ['operational', 'attention', 'offline'], panelDefault.status || 'operational');
        const rowFallback = panelDefault.rows || [];
        defaults.hero[panelKey].rows = normalizeRows(arrayOrDefault(panelSource, 'rows', rowFallback), rowFallback, `hero-${panelKey}`, 8, (item, fallback, id) => ({
            id,
            label: localized(item.label, fallback.label, 100),
            value: localized(item.value, fallback.value, 180),
            status: enumOr(item.status, ['operational', 'attention', 'offline'], fallback.status || 'operational'),
        }));
    });

    defaults.cards.shape = enumOr(objectOr(source.cards).shape, ['sharp', 'soft', 'half-rounded', 'full-rounded'], defaults.cards.shape);

    Object.entries(defaults.sections).forEach(([sectionId, defaultSection]) => {
        const sourceSection = objectOr(sourceSections[sectionId]);
        const content = objectOr(sourceSection.content);
        const legacyContent = objectOr(sourceSection.content);
        defaults.sections[sectionId] = {
            ...defaultSection,
            visible: boolOr(sourceSection.visible, defaultSection.visible),
            content: localizedObject(content, defaultSection.content, [['eyebrow', 255], ['title', 500], ['intro', 1000]]),
        };

        if (sectionId === 'disciplines') {
            const groupFallback = defaultSection.groups;
            defaults.sections[sectionId].groups = normalizeRows(arrayOrDefault(sourceSection, 'groups', groupFallback), groupFallback, 'discipline', 3, (group, fallback, id) => {
                const itemFallback = fallback.items || [];
                defaults.sections[sectionId].groups;
                return {
                    id,
                    label: localized(group.label, fallback.label, 80),
                    description: localized(group.description, fallback.description, 300),
                    icon: enumOr(group.icon, ['globe', 'lightning', 'wrench'], fallback.icon),
                    items: normalizeLocalizedItems(arrayOrDefault(group, 'items', itemFallback), itemFallback, `${id}-item`, 12, (item, itemDefault, itemId) => ({ id: itemId, text: localized(item.text, itemDefault.text, 120) })),
                };
            });
        }

        if (sectionId === 'systems') {
            const presentation = objectOr(sourceSection.presentation);
            const defaultPresentation = defaultSection.presentation;
            const fieldLabels = {};
            Object.keys(defaultPresentation.fieldLabels).forEach((key) => {
                fieldLabels[key] = localized(objectOr(presentation.fieldLabels)[key], defaultPresentation.fieldLabels[key], 100);
            });
            defaults.sections[sectionId].presentation = {
                displayLimit: Math.max(1, Math.min(12, Number.isInteger(presentation.displayLimit) ? presentation.displayLimit : defaultPresentation.displayLimit)),
                layout: enumOr(presentation.layout, ['evidence', 'compact', 'split'], defaultPresentation.layout),
                selectionMode: enumOr(presentation.selectionMode, ['featured', 'selected'], defaultPresentation.selectionMode),
                selectedIds: Array.isArray(presentation.selectedIds) ? presentation.selectedIds.filter((id) => typeof id === 'number' || (typeof id === 'string' && id.length < 80)).slice(0, 24) : defaultPresentation.selectedIds,
                ...Object.fromEntries(['showImage', 'showCategory', 'showDescription', 'showProblem', 'showSolution', 'showResult', 'showStack', 'showProjectLink'].map((key) => [key, boolOr(presentation[key], defaultPresentation[key])])),
                emptyState: localized(presentation.emptyState, defaultPresentation.emptyState, 255),
                missingImage: localized(presentation.missingImage, defaultPresentation.missingImage, 255),
                missingValue: localized(presentation.missingValue, defaultPresentation.missingValue, 160),
                fieldLabels,
            };
        }

        if (sectionId === 'transformation') {
            const fallback = defaultSection.rows;
            defaults.sections[sectionId].rows = normalizeRows(arrayOrDefault(sourceSection, 'rows', fallback), fallback, 'transformation', 12, (item, itemDefault, id) => ({ id, before: localized(item.before, itemDefault.before, 180), after: localized(item.after, itemDefault.after, 180) }));
        }
        if (sectionId === 'process') {
            const fallback = defaultSection.steps;
            defaults.sections[sectionId].steps = normalizeRows(arrayOrDefault(sourceSection, 'steps', fallback), fallback, 'process', 12, (item, itemDefault, id) => ({ id, number: textOr(item.number, itemDefault.number, 12), label: localized(item.label, itemDefault.label, 120), description: localized(item.description, itemDefault.description, 500) }));
        }
        if (sectionId === 'principles') {
            const fallback = defaultSection.items;
            defaults.sections[sectionId].items = normalizeLocalizedItems(arrayOrDefault(sourceSection, 'items', fallback), fallback, 'principle', 12, (item, itemDefault, id) => ({ id, text: localized(item.text, itemDefault.text, 300) }));
        }
        if (sectionId === 'intake') {
            const presentation = objectOr(sourceSection.presentation);
            const defaultPresentation = defaultSection.presentation;
            defaults.sections[sectionId].presentation = {};
            Object.keys(defaultPresentation).forEach((key) => {
                defaults.sections[sectionId].presentation[key] = localized(presentation[key], defaultPresentation[key], 255);
            });
            const fieldsSource = objectOr(sourceSection.fields);
            defaults.sections[sectionId].fields = {};
            Object.entries(defaultSection.fields).forEach(([key, fallback]) => {
                const field = objectOr(fieldsSource[key]);
                defaults.sections[sectionId].fields[key] = {
                    label: localized(field.label, fallback.label, 180),
                    placeholder: localized(field.placeholder, fallback.placeholder, 500),
                    required: boolOr(field.required, fallback.required),
                };
            });
            const successSource = objectOr(sourceSection.success);
            defaults.sections[sectionId].success = {
                title: localized(successSource.title, defaultSection.success.title, 180),
                description: localized(successSource.description, defaultSection.success.description, 500),
                sendAnother: localized(successSource.sendAnother, defaultSection.success.sendAnother, 180),
            };
        }

        // V1 section objects only had scalar copy and visibility. Keeping this merge
        // explicit makes old drafts/revisions safe without reviving arbitrary keys.
        if (legacy && sourceSection.content) {
            defaults.sections[sectionId].content = localizedObject(legacyContent, defaultSection.content, [['eyebrow', 255], ['title', 500], ['intro', 1000]]);
        }
    });

    return defaults;
}

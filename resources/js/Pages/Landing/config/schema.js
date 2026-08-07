import { cloneConfig, defaultLandingConfig } from './defaults';

const enumOr = (value, allowed, fallback) => allowed.includes(value) ? value : fallback;
const boolOr = (value, fallback) => typeof value === 'boolean' ? value : fallback;
const stringOr = (value, fallback) => typeof value === 'string' ? value : fallback;

export function normalizeLandingConfig(input = {}) {
    const defaults = cloneConfig(defaultLandingConfig);
    const source = input && typeof input === 'object' ? input : {};
    const hero = source.hero && typeof source.hero === 'object' ? source.hero : {};
    const sourceContent = hero.content && typeof hero.content === 'object' ? hero.content : {};
    const sourceLayout = hero.layout && typeof hero.layout === 'object' ? hero.layout : {};
    const sourceHighlight = hero.highlight && typeof hero.highlight === 'object' ? hero.highlight : {};
    const sourceObject = hero.secondaryObject && typeof hero.secondaryObject === 'object' ? hero.secondaryObject : {};
    const sourceMotion = hero.motion && typeof hero.motion === 'object' ? hero.motion : {};
    const sourceSections = source.sections && typeof source.sections === 'object' ? source.sections : {};

    ['en', 'id'].forEach((locale) => {
        const content = sourceContent[locale] && typeof sourceContent[locale] === 'object' ? sourceContent[locale] : {};
        defaults.hero.content[locale] = {
            ...defaults.hero.content[locale],
            eyebrow: stringOr(content.eyebrow, defaults.hero.content[locale].eyebrow),
            headline: stringOr(content.headline, defaults.hero.content[locale].headline),
            description: stringOr(content.description, defaults.hero.content[locale].description),
            primaryCta: stringOr(content.primaryCta, defaults.hero.content[locale].primaryCta),
            secondaryCta: stringOr(content.secondaryCta, defaults.hero.content[locale].secondaryCta),
        };
    });

    const objectPosition = sourceObject.position === 'top' ? 'center' : sourceObject.position;
    const secondaryObjectPosition = enumOr(sourceLayout.secondaryObjectPosition, ['left', 'center', 'right'], enumOr(objectPosition, ['left', 'center', 'right'], defaults.hero.layout.secondaryObjectPosition));
    const sourceVisibility = sourceLayout.visibility && typeof sourceLayout.visibility === 'object' ? sourceLayout.visibility : {};
    const responsiveValue = (device) => Object.prototype.hasOwnProperty.call(sourceObject, device) ? sourceObject[device] : sourceVisibility[device];

    defaults.hero.layout = {
        ...defaults.hero.layout,
        alignment: enumOr(sourceLayout.alignment, ['left', 'center', 'right'], defaults.hero.layout.alignment),
        verticalAlignment: enumOr(sourceLayout.verticalAlignment, ['start', 'center', 'end'], defaults.hero.layout.verticalAlignment),
        contentWidth: enumOr(sourceLayout.contentWidth, ['compact', 'wide', 'full'], defaults.hero.layout.contentWidth),
        height: enumOr(sourceLayout.height, ['auto', 'tall', 'full'], defaults.hero.layout.height),
        secondaryObjectPosition,
        visibility: {
            desktop: boolOr(responsiveValue('desktop'), defaults.hero.layout.visibility.desktop),
            tablet: boolOr(responsiveValue('tablet'), defaults.hero.layout.visibility.tablet),
            mobile: boolOr(responsiveValue('mobile'), defaults.hero.layout.visibility.mobile),
        },
    };

    defaults.hero.highlight = {
        ...defaults.hero.highlight,
        text: stringOr(sourceHighlight.text, defaults.hero.highlight.text),
        textId: stringOr(sourceHighlight.textId, defaults.hero.highlight.textId),
        style: enumOr(sourceHighlight.style, ['none', 'marker', 'underline', 'offset-block', 'signal-line'], defaults.hero.highlight.style),
        width: enumOr(sourceHighlight.width, ['compact', 'balanced', 'wide'], defaults.hero.highlight.width),
        shape: enumOr(sourceHighlight.shape, ['sharp', 'soft', 'half-rounded', 'full-rounded'], defaults.hero.highlight.shape),
    };

    defaults.hero.secondaryObject = {
        ...defaults.hero.secondaryObject,
        type: 'system-status',
        position: secondaryObjectPosition === 'center' ? 'top' : secondaryObjectPosition,
        desktop: defaults.hero.layout.visibility.desktop,
        tablet: defaults.hero.layout.visibility.tablet,
        mobile: defaults.hero.layout.visibility.mobile,
    };

    defaults.hero.motion = {
        ...defaults.hero.motion,
        preset: enumOr(sourceMotion.preset, ['none', 'editorial-reveal', 'signal-wipe', 'system-stagger', 'evidence-reveal', 'process-progress'], defaults.hero.motion.preset),
        intensity: enumOr(sourceMotion.intensity, ['subtle', 'standard', 'expressive'], defaults.hero.motion.intensity),
        scrollBehavior: enumOr(sourceMotion.scrollBehavior, ['none', 'once', 'scrub'], defaults.hero.motion.scrollBehavior),
        duration: enumOr(sourceMotion.duration, ['quick', 'standard', 'long'], defaults.hero.motion.duration),
        delay: enumOr(sourceMotion.delay, ['none', 'short', 'staggered'], defaults.hero.motion.delay),
    };

    defaults.cards.shape = enumOr(source.cards?.shape, ['sharp', 'soft', 'half-rounded', 'full-rounded'], defaults.cards.shape);

    Object.entries(defaults.sections).forEach(([sectionId, defaultSection]) => {
        const sourceSection = sourceSections[sectionId] && typeof sourceSections[sectionId] === 'object' ? sourceSections[sectionId] : {};
        const sourceSectionContent = sourceSection.content && typeof sourceSection.content === 'object' ? sourceSection.content : {};

        defaults.sections[sectionId] = {
            visible: boolOr(sourceSection.visible, defaultSection.visible),
            content: {},
        };

        ['en', 'id'].forEach((locale) => {
            const localeContent = sourceSectionContent[locale] && typeof sourceSectionContent[locale] === 'object' ? sourceSectionContent[locale] : {};
            defaults.sections[sectionId].content[locale] = {
                eyebrow: stringOr(localeContent.eyebrow, defaultSection.content[locale].eyebrow),
                title: stringOr(localeContent.title, defaultSection.content[locale].title),
                intro: stringOr(localeContent.intro, defaultSection.content[locale].intro),
            };
        });
    });

    return defaults;
}

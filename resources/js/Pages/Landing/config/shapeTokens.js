export const shapeTokens = {
    sharp: { label: 'Sharp', className: 'shape-sharp' },
    soft: { label: 'Soft', className: 'shape-soft' },
    'half-rounded': { label: 'Half-rounded', className: 'shape-half-rounded' },
    'full-rounded': { label: 'Full-rounded', className: 'shape-full-rounded' },
};

export const shapeOptions = Object.entries(shapeTokens).map(([value, token]) => ({ value, ...token }));

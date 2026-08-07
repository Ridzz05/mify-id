export default function BrandSelect({
    label,
    value,
    options = [],
    onChange,
    error,
    placeholder = 'Select option',
    className = '',
    disabled = false,
    ...props
}) {
    const formattedOptions = options.map((option) => typeof option === 'string' ? { value: option, label: option } : option);

    return (
        <label className="flex w-full flex-col gap-1.5">
            {label && <span className="pl-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white/50">{label}</span>}
            <select value={value} onChange={(event) => onChange?.(event.target.value)} disabled={disabled} className={`brand-input ${className}`} {...props}>
                {placeholder && <option value="">{placeholder}</option>}
                {formattedOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {error && <span className="pl-1 text-xs text-red-300">{error}</span>}
        </label>
    );
}

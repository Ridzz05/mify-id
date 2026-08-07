export default function BrandBadge({
    children,
    variant = 'lime', // 'lime', 'blue', 'neutral', 'danger', 'ghost'
    className = '',
    icon: Icon,
    ...props
}) {
    const baseStyles = "inline-flex items-center gap-1.5 font-bold select-none";
    
    const variants = {
        lime: "bg-brand-lime text-brand-dark px-2.5 py-1 text-[11px]",
        blue: "bg-brand-blue text-white px-2.5 py-1 text-[11px]",
        neutral: "border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70",
        danger: "border border-status-blocked/30 bg-status-blocked/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-red-300",
        ghost: "border border-white/10 bg-transparent px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/50 hover:border-white/20"
    };

    return (
        <span
            className={`${baseStyles} ${variants[variant] || variants.lime} ${className}`}
            {...props}
        >
            {Icon && <Icon className="w-3.5 h-3.5" weight="bold" />}
            {children}
        </span>
    );
}

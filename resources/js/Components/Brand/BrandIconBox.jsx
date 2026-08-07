export default function BrandIconBox({
    icon: Icon,
    variant = 'lime', // 'lime', 'blue'
    className = '',
    ...props
}) {
    const boxStyles = "relative inline-flex h-11 w-11 shrink-0 select-none items-center justify-center border border-white/18 bg-white/4";
    
    return (
        <div 
            className={`${boxStyles} ${variant === 'blue' ? 'text-brand-blue' : 'text-brand-lime'} ${className}`}
            {...props}
        >
            {Icon && <Icon className="w-5.5 h-5.5" weight="bold" />}
        </div>
    );
}

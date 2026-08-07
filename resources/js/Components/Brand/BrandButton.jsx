export default function BrandButton({ 
    children, 
    variant = 'primary', 
    type = 'button', 
    onClick, 
    disabled = false,
    className = '',
    isLoading = false,
    ...props 
}) {
    const baseStyles = "shrink-0 select-none";
    
    const variants = {
        primary: "button-primary",
        secondary: "button-secondary text-white",
        danger: "button-secondary text-red-400 hover:bg-red-500/10",
        blue: "button-ink"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            {isLoading && (
                <span aria-hidden="true" className="h-2 w-2 bg-current" />
            )}
            {children}
        </button>
    );
}
